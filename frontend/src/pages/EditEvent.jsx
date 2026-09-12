import { useEffect, useState } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../context/EventContext";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { events, updateEvent } = useEvents();

  const today = new Date().toISOString().split("T")[0];

  const event = events.find((item) => String(item.id) === String(id));

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    status: "Scheduled",

    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",

    venue: "",
    room: "",
    address: "",

    organizer: "",
    contactNumber: "",
    email: "",

    capacity: "",
    registrationRequired: true,
    registrationDeadline: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load selected event
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        type: event.type || "",
        description: event.description || "",
        status: event.status || "Scheduled",

        startDate: event.startDate || "",
        startTime: event.startTime || "",
        endDate: event.endDate || "",
        endTime: event.endTime || "",

        venue: event.venue || "",
        room: event.room || "",
        address: event.address || "",

        organizer: event.organizer || "",
        contactNumber: event.contactNumber || "",
        email: event.email || "",

        capacity: event.capacity || "",
        registrationRequired:
          event.registrationRequired !== undefined
            ? event.registrationRequired
            : true,
        registrationDeadline: event.registrationDeadline || "",
        notes: event.notes || "",
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Contact number - only 10 digits
    if (name === "contactNumber") {
      const onlyNumbers = value.replace(/\D/g, "");

      if (onlyNumbers.length > 10) return;

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

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event name is required.";
    }

    if (!formData.type) {
      newErrors.type = "Please select event type.";
    }

    // Start date
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    } else if (formData.startDate < today) {
      newErrors.startDate = "Past dates cannot be selected.";
    }

    if (!formData.startTime) {
      newErrors.startTime = "Start time is required.";
    }

    // End date
    if (!formData.endDate) {
      newErrors.endDate = "End date is required.";
    } else if (formData.endDate < today) {
      newErrors.endDate = "Past dates cannot be selected.";
    } else if (
      formData.startDate &&
      formData.endDate < formData.startDate
    ) {
      newErrors.endDate = "End date cannot be before start date.";
    }

    if (!formData.endTime) {
      newErrors.endTime = "End time is required.";
    }

    // Same-day time validation
    if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate === formData.endDate &&
      formData.startTime &&
      formData.endTime &&
      formData.endTime <= formData.startTime
    ) {
      newErrors.endTime = "End time must be after start time.";
    }

    if (!formData.venue.trim()) {
      newErrors.venue = "Venue is required.";
    }

    if (!formData.organizer.trim()) {
      newErrors.organizer = "Organizer name is required.";
    }

    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (formData.contactNumber.length !== 10) {
      newErrors.contactNumber = "Contact number must be exactly 10 digits.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.capacity) {
      newErrors.capacity = "Maximum participants is required.";
    } else if (Number(formData.capacity) <= 0) {
      newErrors.capacity = "Capacity must be greater than 0.";
    }

    // Registration deadline
    if (
      formData.registrationRequired &&
      !formData.registrationDeadline
    ) {
      newErrors.registrationDeadline =
        "Registration deadline is required.";
    }

    if (
      formData.registrationRequired &&
      formData.registrationDeadline &&
      formData.registrationDeadline < today
    ) {
      newErrors.registrationDeadline =
        "Registration deadline cannot be in the past.";
    }

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("❌ Event update validation failed");
      return;
    }

    setIsSubmitting(true);

    const updatedEvent = {
      ...formData,
      capacity: Number(formData.capacity),
    };

    console.log("========================================");
    console.log("✏️ EVENT UPDATED");
    console.log("========================================");
    console.log(updatedEvent);
    console.log("========================================");

    updateEvent(id, updatedEvent);

    setIsSubmitting(false);

    navigate(`/events/${id}`);
  };

  // Event not found
  if (!event) {
    return (
      <div className="flex min-h-full items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Event Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            The event you are trying to edit does not exist.
          </p>

          <Link
            to="/events"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft size={17} />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl p-4 md:p-6 lg:p-8">

        {/* Back */}
        <Link
          to={`/events/${id}`}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft size={16} />
          Back to Event
        </Link>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Edit Event
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update event information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6"
        >
          {/* ================= EVENT INFORMATION ================= */}

          <div>
            <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
              <CalendarDays size={18} />
              Event Information
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Basic information about your event.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Event Name */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Event Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event name"
                className={`h-11 w-full rounded-lg border bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-950 ${
                  errors.title
                    ? "border-red-400"
                    : "border-slate-200 dark:border-slate-700"
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
                Event Type <span className="text-red-500">*</span>
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`h-11 w-full rounded-lg border bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:bg-slate-800 dark:text-white ${
                  errors.type
                    ? "border-red-400"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <option value="">Select event type</option>
                <option value="College Event">College Event</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Conference">Conference</option>
                <option value="Sports">Sports</option>
                <option value="Meeting">Meeting</option>
                <option value="Other">Other</option>
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
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
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
                placeholder="Enter event description..."
                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-950"
              />
            </div>
          </div>

          {/* ================= DATE & TIME ================= */}

          <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
            <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
              <Clock size={18} />
              Date & Time
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Select when the event will take place.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Start Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Start Date <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  min={today}
                  onChange={handleChange}
                  className={`h-11 w-full rounded-lg border bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:bg-slate-800 dark:text-white ${
                    errors.startDate
                      ? "border-red-400"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                />

                <p className="mt-1 text-xs text-slate-400">
                  Past dates are not available.
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
                  Start Time <span className="text-red-500">*</span>
                </label>

                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={`h-11 w-full rounded-lg border bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:bg-slate-800 dark:text-white ${
                    errors.startTime
                      ? "border-red-400"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                />

                {errors.startTime && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.startTime}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  End Date <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  min={formData.startDate || today}
                  onChange={handleChange}
                  className={`h-11 w-full rounded-lg border bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:bg-slate-800 dark:text-white ${
                    errors.endDate
                      ? "border-red-400"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                />

                <p className="mt-1 text-xs text-slate-400">
                  End date cannot be before start date.
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
                  End Time <span className="text-red-500">*</span>
                </label>

                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={`h-11 w-full rounded-lg border bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:bg-slate-800 dark:text-white ${
                    errors.endTime
                      ? "border-red-400"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                />

                {errors.endTime && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.endTime}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ================= LOCATION ================= */}

          <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
            <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
              <MapPin size={18} />
              Location
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Venue */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Venue <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="Main Auditorium"
                  className={`h-11 w-full rounded-lg border bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:bg-slate-800 dark:text-white ${
                    errors.venue
                      ? "border-red-400"
                      : "border-slate-200 dark:border-slate-700"
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
                  placeholder="Room / Hall number"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* ================= ORGANIZER ================= */}

          <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Organizer Information
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Organizer */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Organizer Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                  placeholder="Enter organizer name"
                  className={`h-11 w-full rounded-lg border bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:bg-slate-800 dark:text-white ${
                    errors.organizer
                      ? "border-red-400"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                />

                {errors.organizer && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.organizer}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Contact Number <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="10 digit mobile number"
                    className={`h-11 w-full rounded-lg border bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:bg-slate-800 dark:text-white ${
                      errors.contactNumber
                        ? "border-red-400"
                        : "border-slate-200 dark:border-slate-700"
                    }`}
                  />
                </div>

                {errors.contactNumber && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="organizer@example.com"
                    className={`h-11 w-full rounded-lg border bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:bg-slate-800 dark:text-white ${
                      errors.email
                        ? "border-red-400"
                        : "border-slate-200 dark:border-slate-700"
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

          {/* ================= REGISTRATION ================= */}

          <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
            <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
              <Users size={18} />
              Registration
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Capacity */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Maximum Participants{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  min="1"
                  onChange={handleChange}
                  placeholder="e.g. 100"
                  className={`h-11 w-full rounded-lg border bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 dark:bg-slate-800 dark:text-white ${
                    errors.capacity
                      ? "border-red-400"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                />

                {errors.capacity && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.capacity}
                  </p>
                )}
              </div>

              {/* Registration Deadline */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Registration Deadline
                </label>

                <input
                  type="date"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  min={today}
                  max={formData.startDate || undefined}
                  disabled={!formData.registrationRequired}
                  onChange={handleChange}
                  className={`h-11 w-full rounded-lg border bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800 dark:text-white ${
                    errors.registrationDeadline
                      ? "border-red-400"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                />

                {errors.registrationDeadline && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.registrationDeadline}
                  </p>
                )}
              </div>

              {/* Registration Required */}
              <div className="md:col-span-2">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="registrationRequired"
                    checked={formData.registrationRequired}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />

                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Registration is required for this event
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* ================= NOTES ================= */}

          <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Additional Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Any additional information..."
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-950"
            />
          </div>

          {/* ================= ACTIONS ================= */}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:justify-end">

            <Link
              to={`/events/${id}`}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              <Save size={17} />
              {isSubmitting ? "Updating..." : "Update Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;