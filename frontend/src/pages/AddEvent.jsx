import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  Phone,
  Save,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useEvents } from "../context/EventContext";

function AddEvent() {
  const navigate = useNavigate();
  const { addEvent } = useEvents();

  // Today's date
  const today = new Date().toISOString().split("T")[0];

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    // Basic Information
    title: "",
    type: "",
    description: "",
    status: "Scheduled",

    // Date & Time
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",

    // Location
    venue: "",
    room: "",
    address: "",

    // Organizer
    organizer: "",
    contactNumber: "",
    email: "",

    // Registration
    capacity: "",
    registrationRequired: true,
    registrationDeadline: "",

    // Additional
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Contact number - only 10 digits
    if (name === "contactNumber") {
      const onlyNumbers = value.replace(/\D/g, "");

      // Maximum 10 digits
      if (onlyNumbers.length > 10) {
        return;
      }

      setFormData((prev) => ({
        ...prev,
        contactNumber: onlyNumbers,
      }));

      if (errors.contactNumber) {
        setErrors((prev) => ({
          ...prev,
          contactNumber: "",
        }));
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Remove error when user changes field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ==========================================
  // VALIDATE FORM
  // ==========================================

  const validateForm = () => {
    const newErrors = {};

    // ------------------------------------------
    // Event Name
    // ------------------------------------------

    if (!formData.title.trim()) {
      newErrors.title = "Event name is required.";
    }

    // ------------------------------------------
    // Event Type
    // ------------------------------------------

    if (!formData.type) {
      newErrors.type = "Please select event type.";
    }

    // ------------------------------------------
    // Start Date
    // ------------------------------------------

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    } else if (formData.startDate < today) {
      newErrors.startDate =
        "Start date cannot be in the past.";
    }

    // ------------------------------------------
    // Start Time
    // ------------------------------------------

    if (!formData.startTime) {
      newErrors.startTime = "Start time is required.";
    }

    // ------------------------------------------
    // End Date
    // ------------------------------------------

    if (!formData.endDate) {
      newErrors.endDate = "End date is required.";
    } else if (formData.endDate < today) {
      newErrors.endDate =
        "End date cannot be in the past.";
    } else if (
      formData.startDate &&
      formData.endDate < formData.startDate
    ) {
      newErrors.endDate =
        "End date cannot be before start date.";
    }

    // ------------------------------------------
    // End Time
    // ------------------------------------------

    if (!formData.endTime) {
      newErrors.endTime = "End time is required.";
    }

    // ------------------------------------------
    // Same-day time validation
    // ------------------------------------------

    if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate === formData.endDate &&
      formData.startTime &&
      formData.endTime &&
      formData.endTime <= formData.startTime
    ) {
      newErrors.endTime =
        "End time must be after start time.";
    }

    // ------------------------------------------
    // Venue
    // ------------------------------------------

    if (!formData.venue.trim()) {
      newErrors.venue = "Venue is required.";
    }

    // ------------------------------------------
    // Organizer
    // ------------------------------------------

    if (!formData.organizer.trim()) {
      newErrors.organizer =
        "Organizer name is required.";
    }

    // ------------------------------------------
    // Contact Number
    // ------------------------------------------

    if (!formData.contactNumber) {
      newErrors.contactNumber =
        "Contact number is required.";
    } else if (
      formData.contactNumber.length !== 10
    ) {
      newErrors.contactNumber =
        "Contact number must be exactly 10 digits.";
    }

    // ------------------------------------------
    // Email
    // ------------------------------------------

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    // ------------------------------------------
    // Maximum Participants
    // ------------------------------------------

    if (!formData.capacity) {
      newErrors.capacity =
        "Maximum participants is required.";
    } else if (Number(formData.capacity) <= 0) {
      newErrors.capacity =
        "Capacity must be greater than 0.";
    }

    // ------------------------------------------
    // Registration Deadline
    // ------------------------------------------

    if (
      formData.registrationRequired &&
      !formData.registrationDeadline
    ) {
      newErrors.registrationDeadline =
        "Registration deadline is required.";
    }

    // Deadline cannot be in past
    if (
      formData.registrationRequired &&
      formData.registrationDeadline &&
      formData.registrationDeadline < today
    ) {
      newErrors.registrationDeadline =
        "Registration deadline cannot be in the past.";
    }

    // Deadline cannot be after event
    if (
      formData.registrationRequired &&
      formData.registrationDeadline &&
      formData.startDate &&
      formData.registrationDeadline > formData.startDate
    ) {
      newErrors.registrationDeadline =
        "Registration deadline must be before or on the event start date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      console.log("❌ Event form validation failed");
      return;
    }

    setIsSubmitting(true);

    const newEvent = {
      ...formData,
      capacity: Number(formData.capacity),
    };

    // ==========================================
    // CONSOLE LOG
    // ==========================================

    console.log(
      "========================================"
    );

    console.log("✅ NEW EVENT CREATED");

    console.log(
      "========================================"
    );

    console.log(newEvent);

    console.log(
      "========================================"
    );

    // Add event to EventContext
    addEvent(newEvent);

    // Redirect to Events page
    navigate("/events");
  };

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl p-4 md:p-6 lg:p-8">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="mb-6">
          <Link
            to="/events"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
          >
            <ArrowLeft size={16} />
            Back to Events
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Add New Event
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Create and schedule a new event.
          </p>
        </div>

        {/* ======================================
            FORM
        ====================================== */}

        <form onSubmit={handleSubmit}>

          {/* ======================================
              BASIC INFORMATION
          ====================================== */}

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Enter the basic information about your event.
              </p>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">

              {/* Event Name */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Event Name{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter event name"
                  className={`h-11 w-full rounded-lg border bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 dark:bg-slate-800 dark:text-white ${
                    errors.title
                      ? "border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 dark:border-slate-700"
                  }`}
                />

                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Event Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Event Type{" "}
                  <span className="text-red-500">*</span>
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`h-11 w-full rounded-lg border bg-white px-4 text-sm text-slate-700 outline-none focus:ring-2 dark:bg-slate-800 dark:text-slate-300 ${
                    errors.type
                      ? "border-red-500"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 dark:border-slate-700"
                  }`}
                >
                  <option value="">
                    Select event type
                  </option>

                  <option value="College Event">
                    College Event
                  </option>

                  <option value="Workshop">
                    Workshop
                  </option>

                  <option value="Seminar">
                    Seminar
                  </option>

                  <option value="Conference">
                    Conference
                  </option>

                  <option value="Sports">
                    Sports
                  </option>

                  <option value="Cultural">
                    Cultural
                  </option>

                  <option value="Meeting">
                    Meeting
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>

                {errors.type && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.type}
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Event Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  <option value="Scheduled">
                    Scheduled
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your event..."
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* ======================================
              DATE & TIME
          ====================================== */}

          <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <CalendarDays
                  size={20}
                  className="text-indigo-500"
                />

                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Date & Time
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Select when your event will take place.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">

              {/* Start Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Start Date{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={today}
                  className={`h-11 w-full rounded-lg border bg-white px-4 text-sm outline-none focus:ring-2 dark:bg-slate-800 dark:text-white ${
                    errors.startDate
                      ? "border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 dark:border-slate-700"
                  }`}
                />

                <p className="mt-1 text-xs text-slate-400">
                  Past dates are disabled.
                </p>

                {errors.startDate && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.startDate}
                  </p>
                )}
              </div>

              {/* Start Time */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Start Time{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Clock
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 dark:bg-slate-800 dark:text-white ${
                      errors.startTime
                        ? "border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 dark:border-slate-700"
                    }`}
                  />
                </div>

                {errors.startTime && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.startTime}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  End Date{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate || today}
                  className={`h-11 w-full rounded-lg border bg-white px-4 text-sm outline-none focus:ring-2 dark:bg-slate-800 dark:text-white ${
                    errors.endDate
                      ? "border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 dark:border-slate-700"
                  }`}
                />

                <p className="mt-1 text-xs text-slate-400">
                  End date must be same or after start date.
                </p>

                {errors.endDate && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.endDate}
                  </p>
                )}
              </div>

              {/* End Time */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  End Time{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Clock
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 dark:bg-slate-800 dark:text-white ${
                      errors.endTime
                        ? "border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 dark:border-slate-700"
                    }`}
                  />
                </div>

                {errors.endTime && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.endTime}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ======================================
              LOCATION
          ====================================== */}

          <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <MapPin
                  size={20}
                  className="text-indigo-500"
                />

                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Location
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Where will the event take place?
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">

              {/* Venue */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Venue{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="Main Auditorium"
                  className={`h-11 w-full rounded-lg border bg-white px-4 text-sm outline-none focus:ring-2 dark:bg-slate-800 dark:text-white ${
                    errors.venue
                      ? "border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 dark:border-slate-700"
                  }`}
                />

                {errors.venue && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.venue}
                  </p>
                )}
              </div>

              {/* Room */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Room / Hall
                </label>

                <input
                  type="text"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  placeholder="Room 101 / Hall A"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete address"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* ======================================
              ORGANIZER DETAILS
          ====================================== */}

          <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <Users
                  size={20}
                  className="text-indigo-500"
                />

                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Organizer Details
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Add the person or department responsible for this event.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">

              {/* Organizer Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Organizer Name{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                  placeholder="Enter organizer name"
                  className={`h-11 w-full rounded-lg border bg-white px-4 text-sm outline-none focus:ring-2 dark:bg-slate-800 dark:text-white ${
                    errors.organizer
                      ? "border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 dark:border-slate-700"
                  }`}
                />

                {errors.organizer && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.organizer}
                  </p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Contact Number{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="9876543210"
                    className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 dark:bg-slate-800 dark:text-white ${
                      errors.contactNumber
                        ? "border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 dark:border-slate-700"
                    }`}
                  />
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Enter exactly 10 digits.
                </p>

                {errors.contactNumber && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Organizer Email{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="organizer@example.com"
                    className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 dark:bg-slate-800 dark:text-white ${
                      errors.email
                        ? "border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 dark:border-slate-700"
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ======================================
              REGISTRATION SETTINGS
          ====================================== */}

          <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Registration Settings
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Configure participant registration.
              </p>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">

              {/* Maximum Participants */}
              <div className="min-w-0">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Maximum Participants{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Users
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    min="1"
                    placeholder="500"
                    className={`h-11 w-full rounded-lg border bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 dark:bg-slate-800 dark:text-white ${
                      errors.capacity
                        ? "border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 dark:border-slate-700"
                    }`}
                  />
                </div>

                {errors.capacity && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.capacity}
                  </p>
                )}
              </div>

              {/* Registration Required */}
              <div className="flex min-w-0 items-center md:pt-7">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="registrationRequired"
                    checked={formData.registrationRequired}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />

                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Registration Required
                  </span>
                </label>
              </div>

              {/* Registration Deadline */}
              {formData.registrationRequired && (
                <div className="min-w-0">
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Registration Deadline{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="date"
                    name="registrationDeadline"
                    value={formData.registrationDeadline}
                    onChange={handleChange}
                    min={today}
                    max={formData.startDate || undefined}
                    className={`h-11 w-full rounded-lg border bg-white px-4 text-sm outline-none focus:ring-2 dark:bg-slate-800 dark:text-white ${
                      errors.registrationDeadline
                        ? "border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 dark:border-slate-700"
                    }`}
                  />

                  {errors.registrationDeadline && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.registrationDeadline}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ======================================
              ADDITIONAL NOTES
          ====================================== */}

          <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="p-6">
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Additional Notes
              </label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Any additional information..."
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* ======================================
              BUTTONS
          ====================================== */}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            {/* Cancel */}
            <Link
              to="/events"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              Cancel
            </Link>

            {/* Create Event */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              <Save size={17} />

              {isSubmitting
                ? "Creating..."
                : "Create Event"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddEvent;