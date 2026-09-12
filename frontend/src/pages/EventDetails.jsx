import { ArrowLeft, CalendarDays, Clock, Edit, MapPin, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();

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
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                Scheduled
              </span>

              <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                Annual College Function
              </h1>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                College Event
              </p>
            </div>

            <Link
              to={`/events/edit/${id}`}
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
                  20 September 2026
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
                  10:00 AM - 2:00 PM
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
                  Main Auditorium
                </p>
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
                  Student Committee
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
              Annual college function organized for students, faculty members,
              and guests. The event includes cultural activities, speeches,
              awards, and entertainment programs.
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}

export default EventDetails;