import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useEvents } from "../context/EventContext";

function Calendar() {
  const { events, loading, error } = useEvents();

  // ==========================================
  // CURRENT MONTH
  // ==========================================

  const [currentDate, setCurrentDate] = useState(
    new Date()
  );

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // ==========================================
  // MONTH NAME
  // ==========================================

  const monthName = currentDate.toLocaleDateString(
    "en-IN",
    {
      month: "long",
      year: "numeric",
    }
  );

  // ==========================================
  // DAYS IN CURRENT MONTH
  // ==========================================

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  // ==========================================
  // FIRST DAY OF CURRENT MONTH
  // ==========================================

  const firstDayOfMonth = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  // ==========================================
  // CALENDAR DAYS
  // ==========================================

  const calendarDays = useMemo(() => {
    const days = [];

    // Empty cells before first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [firstDayOfMonth, daysInMonth]);

  // ==========================================
  // PREVIOUS MONTH
  // ==========================================

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(
        currentYear,
        currentMonth - 1,
        1
      )
    );
  };

  // ==========================================
  // NEXT MONTH
  // ==========================================

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(
        currentYear,
        currentMonth + 1,
        1
      )
    );
  };

  // ==========================================
  // CHECK TODAY
  // ==========================================

  const today = new Date();

  const isToday = (day) => {
    if (!day) return false;

    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  // ==========================================
  // GET EVENTS FOR SPECIFIC DAY
  // ==========================================

  const getEventsForDay = (day) => {
    if (!day) return [];

    return events.filter((event) => {
      if (!event.startDate) return false;

      const eventDate = new Date(event.startDate);

      return (
        eventDate.getFullYear() === currentYear &&
        eventDate.getMonth() === currentMonth &&
        eventDate.getDate() === day
      );
    });
  };

  // ==========================================
  // FORMAT EVENT TIME
  // ==========================================

  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(
      Number(hours),
      Number(minutes)
    );

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-[1600px] p-4 md:p-6 lg:p-8">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Calendar
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              View your events by date.
            </p>
          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={handlePreviousMonth}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              {monthName}
            </button>

            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>

          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Calendar */}
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

          {/* Week */}
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800">

            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (
              <div
                key={day}
                className="p-3 text-center text-xs font-semibold text-slate-500 dark:text-slate-400"
              >
                {day}
              </div>
            ))}

          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-96 items-center justify-center text-sm text-slate-500 dark:text-slate-400">
              Loading events...
            </div>
          ) : (
            /* Days */
            <div className="grid grid-cols-7">

              {calendarDays.map((day, index) => {
                const dayEvents = getEventsForDay(day);

                return (
                  <div
                    key={`${day}-${index}`}
                    className={`min-h-28 border-b border-r border-slate-100 p-3 dark:border-slate-800 ${
                      !day
                        ? "bg-slate-50/50 dark:bg-slate-950/30"
                        : ""
                    }`}
                  >

                    {day && (
                      <>
                        {/* Day Number */}
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                            isToday(day)
                              ? "bg-indigo-600 font-semibold text-white"
                              : "text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {day}
                        </span>

                        {/* Events */}
                        {dayEvents.length > 0 && (
                          <div className="mt-3 space-y-1.5">

                            {dayEvents.map((event) => (
                              <Link
                                key={event._id}
                                to={`/events/${event._id}`}
                                className="block rounded-md bg-indigo-50 px-2 py-1.5 text-xs font-medium text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-400 dark:hover:bg-indigo-950"
                                title={event.title}
                              >
                                <p className="truncate">
                                  {event.title}
                                </p>

                                {event.startTime && (
                                  <p className="mt-0.5 text-[10px] opacity-75">
                                    {formatTime(
                                      event.startTime
                                    )}
                                  </p>
                                )}
                              </Link>
                            ))}

                          </div>
                        )}

                      </>
                    )}

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Calendar;