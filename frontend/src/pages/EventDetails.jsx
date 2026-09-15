import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Edit,
  MapPin,
  User,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEvents } from "../context/EventContext";

function EventDetails() {
  const { id } = useParams();

  const { getEventById } = useEvents();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load event from MongoDB
  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getEventById(id);

        setEvent(data);
      } catch (error) {
        console.error(
          "Failed to load event:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load event."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadEvent();
    }
  }, [id]);

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  // Format time
  const formatTime = (time) => {
    if (!time) return "N/A";

    const [hours, minutes] = time
      .split(":")
      .map(Number);

    if (
      Number.isNaN(hours) ||
      Number.isNaN(minutes)
    ) {
      return time;
    }

    const date = new Date();

    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
    );
  };

  // Status style
  const getStatusClass = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400";

      case "Ongoing":
        return "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400";

      case "Completed":
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";

      case "Cancelled":
        return "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400";

      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Loading event...
          </p>
        </div>
      </div>
    );
  }

  // Error / Not Found
  if (error || !event) {
    return (
      <div className="flex min-h-full items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Event Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {error ||
              "The event you are looking for does not exist."}
          </p>

          <Link
            to="/events"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
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
          to="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <ArrowLeft size={16} />
          Back to Events
        </Link>

        {/* Card */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">

            <div>
              {/* Status */}
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                  event.status
                )}`}
              >
                {event.status || "Upcoming"}
              </span>

              {/* Title */}
              <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                {event.title}
              </h1>

              {/* Type */}
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {event.type || "Event"}
              </p>
            </div>

            {/* Edit */}
            <Link
              to={`/events/edit/${event._id}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Edit size={17} />
              Edit Event
            </Link>
          </div>

          {/* Information */}
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">

            {/* Date */}
            <div className="flex items-start gap-3">
              <CalendarDays
                size={20}
                className="mt-0.5 text-indigo-500"
              />

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Date
                </p>

                <p className="mt-1 font-medium text-slate-800 dark:text-white">
                  {formatDate(event.startDate)}

                  {event.endDate &&
                    formatDate(event.endDate) !==
                      formatDate(event.startDate) && (
                      <>
                        {" - "}
                        {formatDate(event.endDate)}
                      </>
                    )}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3">
              <Clock
                size={20}
                className="mt-0.5 text-indigo-500"
              />

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Time
                </p>

                <p className="mt-1 font-medium text-slate-800 dark:text-white">
                  {formatTime(event.startTime)}
                  {" - "}
                  {formatTime(event.endTime)}
                </p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-start gap-3">
              <MapPin
                size={20}
                className="mt-0.5 text-indigo-500"
              />

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Venue
                </p>

                <p className="mt-1 font-medium text-slate-800 dark:text-white">
                  {event.venue || "N/A"}
                </p>

                {event.room && (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {event.room}
                  </p>
                )}
              </div>
            </div>

            {/* Organizer */}
            <div className="flex items-start gap-3">
              <User
                size={20}
                className="mt-0.5 text-indigo-500"
              />

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Organizer
                </p>

                <p className="mt-1 font-medium text-slate-800 dark:text-white">
                  {event.organizer || "N/A"}
                </p>
              </div>
            </div>

          </div>

          {/* Description */}
          <div className="border-t border-slate-200 p-6 dark:border-slate-800">

            <h2 className="font-semibold text-slate-900 dark:text-white">
              Description
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {event.description ||
                "No description available for this event."}
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default EventDetails;