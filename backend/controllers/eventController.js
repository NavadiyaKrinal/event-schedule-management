const Event = require("../models/Event");
const mongoose = require("mongoose");

const createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body,
      createdBy:req.user._id,
     });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.error("Create Event Error:", error.message);
  if (error.name === "ValidationError") {
      const errors = {};

      Object.keys(error.errors).forEach((field) => {
        errors[field] = error.errors[field].message;
      });

      return res.status(400).json({
        success: false,
        message: "Event validation failed",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({
      startDate: 1,
    });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error("Get Events Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message,
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Get Event Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
    });
  }
};


const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Admin can update any event
    // Event Organizer can update only their own event
    if (
      req.user.role !== "Admin" &&
      String(event.createdBy) !== String(req.user._id)
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own events.",
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    console.error("Update Event Error:", error);

    // Mongoose validation error
    if (error.name === "ValidationError") {
      const errors = {};

      Object.keys(error.errors).forEach((field) => {
        errors[field] = error.errors[field].message;
      });

      return res.status(400).json({
        success: false,
        message: "Event validation failed",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Check MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
      });
    }

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete Event Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete event",
    });
  }
};


module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};