const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },

    type: {
      type: String,
      required: [true, "Event type is required"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Upcoming",
        "Ongoing",
        "Completed",
        "Cancelled",
      ],
      default: "Upcoming",
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },

    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },

    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },

    endTime: {
      type: String,
      required: [true, "End time is required"],
    },

    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true,
    },

    room: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    organizer: {
      type: String,
      required: [true, "Organizer is required"],
      trim: true,
    },

    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },

    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },

    registrationRequired: {
      type: Boolean,
      default: false,
    },

    registrationDeadline: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      default: "",
    },


    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);