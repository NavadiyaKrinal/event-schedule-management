import {
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  Plus,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useEvents } from "../context/EventContext";

function Dashboard() {
  const { events, loading, error } = useEvents();

  // ==========================================
  // DYNAMIC STATISTICS
  // ==========================================

  const totalEvents = events.length;

  const upcomingEvents = events.filter(
    (event) => event.status === "Upcoming"
  );

  const completedEvents = events.filter(
    (event) => event.status === "Completed"
  );

  const cancelledEvents = events.filter(
    (event) => event.status === "Cancelled"
  );

  // ==========================================
  // NEXT UPCOMING EVENT
  // ==========================================

  const sortedUpcomingEvents = [...upcomingEvents].sort(
    (a, b) => {
      const dateA = new Date(
        `${a.startDate?.split("T")[0]}T${a.startTime || "00:00"}`
      );

      const dateB = new Date(
        `${b.startDate?.split("T")[0]}T${b.startTime || "00:00"}`
      );

      return dateA - dateB;
    }
  );

  const nextEvent = sortedUpcomingEvents[0];

  // ==========================================
  // RECENT EVENTS
  // ==========================================

  const recentEvents = [...events]
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt);
      const dateB = new Date(b.updatedAt || b.createdAt);

      return dateB - dateA;
    })
    .slice(0, 3);

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ==========================================
  // DAYS UNTIL NEXT EVENT
  // ==========================================

  const getDaysUntilEvent = () => {
    if (!nextEvent?.startDate) {
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventDate = new Date(nextEvent.startDate);
    eventDate.setHours(0, 0, 0, 0);

    const difference =
      eventDate.getTime() - today.getTime();

    const days = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    return days;
  };

  const daysUntilNextEvent = getDaysUntilEvent();

  // ==========================================
  // STATISTICS
  // ==========================================

  const stats = [
    {
      title: "Total Events",
      value: totalEvents,
      description: "All events in the system",
      icon: CalendarDays,
      iconClass: "text-indigo-600 dark:text-indigo-400",
      bgClass: "bg-indigo-50 dark:bg-indigo-950/50",
    },
    {
      title: "Upcoming Events",
      value: upcomingEvents.length,
      description: nextEvent
        ? daysUntilNextEvent === 0
          ? "Next event is today"
          : daysUntilNextEvent === 1
            ? "Next event is tomorrow"
            : `Next event in ${daysUntilNextEvent} days`
        : "No upcoming events",
      icon: CalendarClock,
      iconClass: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-50 dark:bg-blue-950/50",
    },
    {
      title: "Completed",
      value: completedEvents.length,
      description: "Completed events",
      icon: CheckCircle2,
      iconClass: "text-emerald-600 dark:text-emerald-400",
      bgClass: "bg-emerald-50 dark:bg-emerald-950/50",
    },
    {
      title: "Cancelled",
      value: cancelledEvents.length,
      description: "Cancelled events",
      icon: XCircle,
      iconClass: "text-red-600 dark:text-red-400",
      bgClass: "bg-red-50 dark:bg-red-950/50",
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-[1600px] p-4 md:p-6 lg:p-8">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Welcome back, Admin. Here's what's happening with your events.
            </p>
          </div>

          <Link
            to="/events/add"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Event
          </Link>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {stat.title}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                      {loading ? "..." : stat.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgClass}`}
                  >
                    <Icon
                      size={20}
                      className={stat.iconClass}
                    />
                  </div>

                </div>

                <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {loading ? "Loading..." : stat.description}
                </p>
              </div>
            );
          })}

        </div>

        {/* Recent Events */}
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Recent Events
              </h2>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Recently created and updated events
              </p>
            </div>

            <Link
              to="/events"
              className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              View All
              <ArrowUpRight size={15} />
            </Link>

          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">

            {/* Loading */}
            {loading && (
              <div className="px-5 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                Loading events...
              </div>
            )}

            {/* Empty */}
            {!loading && recentEvents.length === 0 && (
              <div className="px-5 py-8 text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  No events found
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Create your first event to see it here.
                </p>
              </div>
            )}

            {/* Dynamic Events */}
            {!loading &&
              recentEvents.map((event) => (
                <Link
                  key={event._id}
                  to={`/events/${event._id}`}
                  className="flex flex-col gap-3 px-5 py-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between dark:hover:bg-slate-800/40"
                >

                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      {event.title}
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(event.startDate)}

                      <span className="mx-2">
                        •
                      </span>

                      {event.venue || "Venue not specified"}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      event.status === "Upcoming"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                        : event.status === "Ongoing"
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                          : event.status === "Completed"
                            ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                            : "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400"
                    }`}
                  >
                    {event.status}
                  </span>

                </Link>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;