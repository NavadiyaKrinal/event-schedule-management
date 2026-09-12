import {
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">

      <div className="flex items-start justify-between gap-4">

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {event.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {event.type}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
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

      <div className="mt-5 space-y-2 text-sm text-slate-500 dark:text-slate-400">

        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          {event.date}
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} />
          {event.time}
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          {event.venue}
        </div>

      </div>

      <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
        <Link
          to={`/events/${event.id}`}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
        >
          View Details →
        </Link>
      </div>

    </div>
  );
}

export default EventCard;