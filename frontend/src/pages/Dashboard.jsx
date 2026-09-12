import {
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  Plus,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard() {
  const stats = [
    {
      title: "Total Events",
      value: "24",
      description: "+12% from last month",
      icon: CalendarDays,
      iconClass: "text-indigo-600 dark:text-indigo-400",
      bgClass: "bg-indigo-50 dark:bg-indigo-950/50",
    },
    {
      title: "Upcoming Events",
      value: "12",
      description: "Next event in 2 days",
      icon: CalendarClock,
      iconClass: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-50 dark:bg-blue-950/50",
    },
    {
      title: "Completed",
      value: "9",
      description: "+8% from last month",
      icon: CheckCircle2,
      iconClass: "text-emerald-600 dark:text-emerald-400",
      bgClass: "bg-emerald-50 dark:bg-emerald-950/50",
    },
    {
      title: "Cancelled",
      value: "3",
      description: "2 this month",
      icon: XCircle,
      iconClass: "text-red-600 dark:text-red-400",
      bgClass: "bg-red-50 dark:bg-red-950/50",
    },
  ];

  const recentEvents = [
    {
      id: 1,
      name: "Annual College Function",
      date: "20 September 2026",
      venue: "Main Auditorium",
      status: "Scheduled",
    },
    {
      id: 2,
      name: "JavaScript Workshop",
      date: "22 September 2026",
      venue: "Lab 1",
      status: "Pending",
    },
    {
      id: 3,
      name: "Tech Seminar",
      date: "25 September 2026",
      venue: "Conference Hall",
      status: "Scheduled",
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
                      {stat.value}
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
                  {stat.description}
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

            {recentEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col gap-3 px-5 py-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between dark:hover:bg-slate-800/40"
              >

                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">
                    {event.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {event.date}
                    <span className="mx-2">•</span>
                    {event.venue}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                    event.status === "Scheduled"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                      : "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                  }`}
                >
                  {event.status}
                </span>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;