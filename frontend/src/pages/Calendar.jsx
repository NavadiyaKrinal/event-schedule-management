import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Calendar() {
  const days = [
    1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
    29, 30,
  ];

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

            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <ChevronLeft size={18} />
            </button>

            <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              September 2026
            </button>

            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <ChevronRight size={18} />
            </button>

          </div>
        </div>

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

          {/* Days */}
          <div className="grid grid-cols-7">

            {days.map((day) => {
              const hasEvent =
                day === 20 ||
                day === 22 ||
                day === 25;

              return (
                <div
                  key={day}
                  className="min-h-28 border-b border-r border-slate-100 p-3 dark:border-slate-800"
                >

                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                      day === 12
                        ? "bg-indigo-600 font-semibold text-white"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {day}
                  </span>

                  {hasEvent && (
                    <div className="mt-3 rounded-md bg-indigo-50 px-2 py-1.5 text-xs font-medium text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                      {day === 20
                        ? "Annual Function"
                        : day === 22
                          ? "JS Workshop"
                          : "Tech Seminar"}
                    </div>
                  )}

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Calendar;