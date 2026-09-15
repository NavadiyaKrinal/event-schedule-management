import {
  BookOpen,
  CalendarDays,
  CircleHelp,
  Mail,
  MessageCircle,
  Search,
} from "lucide-react";

import { Link } from "react-router-dom";

function HelpSupport() {
  return (
    <div className="min-h-full bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <CircleHelp size={17} />
              <span>Support Center</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Help & Support
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Find answers, learn how to use Event Management, or contact
              our support team.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex w-fit items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search for help..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-950"
            />
          </div>
        </div>

        {/* Help Topics */}
        <div className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            How can we help?
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            {/* Getting Started */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                <BookOpen size={21} />
              </div>

              <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">
                Getting Started
              </h3>

              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                Learn how to create, manage, edit, and organize your events.
              </p>
            </div>

            {/* Event Management */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                <CalendarDays size={21} />
              </div>

              <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">
                Event Management
              </h3>

              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                Manage event schedules, venues, organizers, capacity, and
                registration information.
              </p>
            </div>

            {/* Support */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                <MessageCircle size={21} />
              </div>

              <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">
                Contact Support
              </h3>

              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                Need additional help? Contact our support team for assistance.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {/* FAQ 1 */}
            <div className="border-b border-slate-200 p-6 dark:border-slate-800">
              <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                How do I create a new event?
              </h3>

              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                Go to the Add Event section from the sidebar, enter the event
                details, and click the save button to create your event.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="border-b border-slate-200 p-6 dark:border-slate-800">
              <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                Can I edit an existing event?
              </h3>

              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                Yes. Open the Events page, select the event you want to
                modify, and use the Edit option to update its information.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="border-b border-slate-200 p-6 dark:border-slate-800">
              <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                Can I delete an event?
              </h3>

              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                Yes. You can delete an event from the Events page using the
                delete action associated with the event.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="p-6">
              <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                Where can I see my scheduled events?
              </h3>

              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                You can view your events from the Events page or use the
                Calendar section to see them according to their dates.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 dark:border-indigo-950/50 dark:bg-indigo-950/20 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Still need help?
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                If you cannot find the answer you're looking for, contact our
                support team and we'll be happy to help.
              </p>
            </div>

            <a
              href="mailto:support@example.com"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <Mail size={18} />
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpSupport;