import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Plus,
  Search,
  Users,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

function Events() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Temporary event data
  // Later this will come from your backend / MongoDB
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Annual College Function",
      type: "College Event",
      description:
        "Annual college function for students and faculty members.",
      startDate: "2026-09-20",
      startTime: "10:00",
      endDate: "2026-09-20",
      endTime: "14:00",
      venue: "Main Auditorium",
      organizer: "Student Committee",
      capacity: 500,
      status: "Scheduled",
    },
    {
      id: 2,
      title: "JavaScript Workshop",
      type: "Workshop",
      description:
        "Practical JavaScript workshop for students.",
      startDate: "2026-09-22",
      startTime: "10:00",
      endDate: "2026-09-22",
      endTime: "13:00",
      venue: "Lab 1",
      organizer: "IT Department",
      capacity: 100,
      status: "Pending",
    },
    {
      id: 3,
      title: "Tech Seminar",
      type: "Seminar",
      description:
        "Technology seminar covering modern software development.",
      startDate: "2026-09-25",
      startTime: "11:00",
      endDate: "2026-09-25",
      endTime: "15:00",
      venue: "Conference Hall",
      organizer: "Computer Department",
      capacity: 250,
      status: "Scheduled",
    },
    {
      id: 4,
      title: "Sports Day",
      type: "Sports",
      description:
        "Annual sports day with multiple competitions.",
      startDate: "2026-09-28",
      startTime: "08:00",
      endDate: "2026-09-28",
      endTime: "16:00",
      venue: "College Ground",
      organizer: "Sports Committee",
      capacity: 1000,
      status: "Completed",
    },
  ]);

  // Search + Status filter
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        event.type
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        event.venue
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        event.organizer
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        event.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [events, search, statusFilter]);

  // Delete event
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id)
    );
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // Format time
  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(hours, minutes);

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-[1600px] p-4 md:p-6 lg:p-8">

        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Events
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Create, manage and schedule all your events.
            </p>
          </div>

          <Link
            to="/events/add"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Event
          </Link>

        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row">

          {/* Search */}
          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events, venue, organizer..."
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-indigo-950"
            />

          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <option value="All">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

        </div>

        {/* Result Count */}
        <div className="mt-5 flex items-center justify-between">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {filteredEvents.length}
            </span>{" "}
            {filteredEvents.length === 1 ? "event" : "events"}
          </p>

        </div>

        {/* Events */}
        {filteredEvents.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >

                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-5 dark:border-slate-800">

                  <div className="min-w-0">
                    <p className="mb-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                      {event.type}
                    </p>

                    <h2 className="truncate text-lg font-semibold text-slate-900 dark:text-white">
                      {event.title}
                    </h2>
                  </div>

                  {/* Status */}
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      event.status === "Scheduled"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                        : event.status === "Completed"
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                          : event.status === "Cancelled"
                            ? "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400"
                            : "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                    }`}
                  >
                    {event.status}
                  </span>

                </div>

                {/* Card Body */}
                <div className="p-5">

                  <p className="mb-5 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {event.description}
                  </p>

                  <div className="space-y-3">

                    {/* Date */}
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <CalendarDays
                        size={17}
                        className="shrink-0 text-indigo-500"
                      />

                      <span>
                        {formatDate(event.startDate)}
                      </span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <Clock
                        size={17}
                        className="shrink-0 text-indigo-500"
                      />

                      <span>
                        {formatTime(event.startTime)}
                        {" - "}
                        {formatTime(event.endTime)}
                      </span>
                    </div>

                    {/* Venue */}
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <MapPin
                        size={17}
                        className="shrink-0 text-indigo-500"
                      />

                      <span className="truncate">
                        {event.venue}
                      </span>
                    </div>

                    {/* Capacity */}
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <Users
                        size={17}
                        className="shrink-0 text-indigo-500"
                      />

                      <span>
                        Capacity: {event.capacity}
                      </span>
                    </div>

                  </div>

                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 dark:border-slate-800">

                  <div className="text-xs text-slate-400">
                    By {event.organizer}
                  </div>

                  <div className="flex items-center gap-1">

                    {/* View */}
                    <Link
                      to={`/events/${event.id}`}
                      title="View Event"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
                    >
                      <Eye size={17} />
                    </Link>

                    {/* Edit */}
                    <Link
                      to={`/events/edit/${event.id}`}
                      title="Edit Event"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-amber-50 hover:text-amber-600 dark:text-slate-400 dark:hover:bg-amber-950/50 dark:hover:text-amber-400"
                    >
                      <Edit size={17} />
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      title="Delete Event"
                      onClick={() => handleDelete(event.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/50 dark:hover:text-red-400"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        ) : (
          /* Empty State */
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center dark:border-slate-700 dark:bg-slate-900">

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
              No events match your current search or filter.
              Try changing your search or create a new event.
            </p>

            <Link
              to="/events/add"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Plus size={17} />
              Create Event
            </Link>

          </div>
        )}

      </div>
    </div>
  );
}

export default Events;