import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Edit,
  Eye,
  MapPin,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useEvents } from "../context/EventContext";

function Events() {
  const navigate = useNavigate();

  const {
    events,
    loading,
    error,
    deleteEvent,
  } = useEvents();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // ========================================
  // GET EVENT TYPES
  // ========================================

  const eventTypes = useMemo(() => {
    const types = events
      .map((event) => event.type)
      .filter(Boolean);

    return ["All", ...new Set(types)];
  }, [events]);

  // ========================================
  // FILTER EVENTS
  // ========================================

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        event.title?.toLowerCase().includes(search) ||
        event.type?.toLowerCase().includes(search) ||
        event.venue?.toLowerCase().includes(search) ||
        event.organizer?.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        event.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        event.type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    events,
    searchTerm,
    statusFilter,
    typeFilter,
  ]);

  // ========================================
  // DELETE EVENT
  // ========================================

  const handleDelete = async (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteEvent(id);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {
    if (!date) {
      return "No date";
    }

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
      return date;
    }

    return formattedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ========================================
  // STATUS STYLE
  // ========================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400";

      case "Ongoing":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400";

      case "Completed":
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

      case "Cancelled":
        return "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400";

      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  // ========================================
  // LOADING STATE
  // ========================================

  if (loading) {
    return (
      <div className="min-h-full bg-slate-50 p-4 dark:bg-slate-950 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400" />

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Loading events...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // ERROR STATE
  // ========================================

  if (error) {
    return (
      <div className="min-h-full bg-slate-50 p-4 dark:bg-slate-950 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/20">
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 p-4 dark:bg-slate-950 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* ========================================
            PAGE HEADER
        ======================================== */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Events
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage and view all your events.
            </p>
          </div>

          <Link
            to="/events/add"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Event
          </Link>
        </div>

        {/* ========================================
            FILTERS
        ======================================== */}

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px]">

            {/* Search */}

            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search events..."
                className="
                  h-10 w-full rounded-lg border border-slate-200
                  bg-slate-50 pl-10 pr-3 text-sm text-slate-700
                  outline-none transition
                  placeholder:text-slate-400
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
                  dark:border-slate-700 dark:bg-slate-800
                  dark:text-white dark:placeholder:text-slate-500
                  dark:focus:ring-indigo-950
                "
              />
            </div>

            {/* Status */}

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="
                h-10 rounded-lg border border-slate-200
                bg-slate-50 px-3 text-sm text-slate-700
                outline-none focus:border-indigo-500
                dark:border-slate-700 dark:bg-slate-800
                dark:text-white
              "
            >
              <option value="All">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            {/* Type */}

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value)
              }
              className="
                h-10 rounded-lg border border-slate-200
                bg-slate-50 px-3 text-sm text-slate-700
                outline-none focus:border-indigo-500
                dark:border-slate-700 dark:bg-slate-800
                dark:text-white
              "
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "All"
                    ? "All Types"
                    : type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ========================================
            EVENT COUNT
        ======================================== */}

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {filteredEvents.length}
            </span>{" "}
            {filteredEvents.length === 1
              ? "event"
              : "events"}
          </p>
        </div>

        {/* ========================================
            EMPTY STATE
        ======================================== */}

        {filteredEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <CalendarDays
                size={26}
                className="text-slate-400"
              />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
              No events found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
              {events.length === 0
                ? "You don't have any events yet. Create your first event to get started."
                : "Try changing your search or filter options."}
            </p>

            {events.length === 0 && (
              <Link
                to="/events/add"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Plus size={18} />
                Create Event
              </Link>
            )}
          </div>
        ) : (
          /* ========================================
             EVENT GRID
          ======================================== */

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="
                  group overflow-hidden rounded-2xl border
                  border-slate-200 bg-white shadow-sm
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:shadow-lg
                  dark:border-slate-800 dark:bg-slate-900
                "
              >
                {/* Card Header */}

                <div className="border-b border-slate-100 p-5 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">
                      <p className="mb-2 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                        {event.type || "Event"}
                      </p>

                      <h2 className="truncate text-lg font-semibold text-slate-900 dark:text-white">
                        {event.title}
                      </h2>
                    </div>

                    <span
                      className={`
                        shrink-0 rounded-full px-2.5 py-1
                        text-xs font-semibold
                        ${getStatusStyle(event.status)}
                      `}
                    >
                      {event.status || "Upcoming"}
                    </span>
                  </div>
                </div>

                {/* Card Body */}

                <div className="space-y-3 p-5">

                  {/* Date */}

                  <div className="flex items-center gap-3">
                    <CalendarDays
                      size={17}
                      className="shrink-0 text-slate-400"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Date
                      </p>

                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {formatDate(event.startDate)}

                        {event.endDate &&
                          event.endDate !==
                            event.startDate && (
                            <>
                              {" "}
                              -{" "}
                              {formatDate(event.endDate)}
                            </>
                          )}
                      </p>
                    </div>
                  </div>

                  {/* Time */}

                  <div className="flex items-center gap-3">
                    <Clock3
                      size={17}
                      className="shrink-0 text-slate-400"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Time
                      </p>

                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {event.startTime || "--:--"}

                        {event.endTime && (
                          <>
                            {" "}
                            - {event.endTime}
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Venue */}

                  <div className="flex items-center gap-3">
                    <MapPin
                      size={17}
                      className="shrink-0 text-slate-400"
                    />

                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">
                        Venue
                      </p>

                      <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                        {event.venue || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {/* Capacity */}

                  <div className="flex items-center gap-3">
                    <Users
                      size={17}
                      className="shrink-0 text-slate-400"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Capacity
                      </p>

                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {event.capacity || 0} people
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}

                <div className="flex items-center gap-2 border-t border-slate-100 p-4 dark:border-slate-800">

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/events/${event._id}`
                      )
                    }
                    className="
                      flex h-9 flex-1 items-center
                      justify-center gap-2 rounded-lg
                      border border-slate-200
                      text-sm font-medium text-slate-600
                      transition hover:bg-slate-100
                      dark:border-slate-700
                      dark:text-slate-300
                      dark:hover:bg-slate-800
                    "
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/events/edit/${event._id}`
                      )
                    }
                    className="
                      flex h-9 w-10 items-center
                      justify-center rounded-lg
                      border border-slate-200
                      text-slate-500
                      transition hover:bg-slate-100
                      hover:text-indigo-600
                      dark:border-slate-700
                      dark:text-slate-400
                      dark:hover:bg-slate-800
                      dark:hover:text-indigo-400
                    "
                    title="Edit Event"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(
                        event._id,
                        event.title
                      )
                    }
                    className="
                      flex h-9 w-10 items-center
                      justify-center rounded-lg
                      border border-slate-200
                      text-slate-500
                      transition hover:border-red-200
                      hover:bg-red-50 hover:text-red-600
                      dark:border-slate-700
                      dark:text-slate-400
                      dark:hover:border-red-900
                      dark:hover:bg-red-950/30
                      dark:hover:text-red-400
                    "
                    title="Delete Event"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;