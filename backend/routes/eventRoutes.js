const express = require("express");

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  protect,
  getEvents
);

router.get(
  "/:id",
  protect,
  getEventById
);


router.post(
  "/",
  protect,
  authorize("Admin", "Event Organizer"),
  createEvent
);

router.put(
  "/:id",
  protect,
  authorize("Admin", "Event Organizer"),
  updateEvent
);

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteEvent
);

module.exports = router;