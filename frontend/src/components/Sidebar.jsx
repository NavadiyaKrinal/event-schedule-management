import {
  CalendarDays,
  CircleHelp,
  Grid2X2,
  PanelLeftClose,
  PanelLeftOpen,
  PlusCircle,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Sidebar({
  collapsed,
  setCollapsed,
}) {
  const { user } = useAuth();

  const userName = user?.name || "User";
  const userRole = user?.role || "User";

  const userInitial = userName
    .charAt(0)
    .toUpperCase();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Grid2X2,
    },
    {
      name: "Events",
      path: "/events",
      icon: CalendarDays,
      end: true,
    },
    {
      name: "Add Event",
      path: "/events/add",
      icon: PlusCircle,
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: CalendarDays,
    },
  ];

  return (
    <aside
      className={`
        fixed
        left-0
        top-0
        z-30
        flex
        h-screen
        shrink-0
        flex-col
        overflow-hidden

        border-r
        border-slate-200
        bg-white

        transition-[width]
        duration-300
        ease-in-out

        dark:border-slate-800
        dark:bg-slate-900

        ${
          collapsed
            ? "w-[88px]"
            : "w-64"
        }
      `}
    >
      {/* =====================================================
          SIDEBAR HEADER
      ====================================================== */}

      <div
        className={`
          flex
          h-20
          shrink-0
          items-center

          border-b
          border-slate-200
          dark:border-slate-800

          ${
            collapsed
              ? "justify-center px-2"
              : "justify-between px-5"
          }
        `}
      >
        {/* Logo */}

        <div
          className={`
            flex
            min-w-0
            items-center

            ${
              collapsed
                ? "hidden"
                : "gap-3"
            }
          `}
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-indigo-600
              text-white
            "
          >
            <CalendarDays size={20} />
          </div>

          <span
            className="
              whitespace-nowrap
              text-lg
              font-bold
              tracking-tight
              text-slate-900
              dark:text-white
            "
          >
            EventFlow
          </span>
        </div>

        {/* Collapse Button */}

        <button
          type="button"
          onClick={() =>
            setCollapsed(
              (previous) => !previous
            )
          }
          title={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          aria-label={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-slate-500
            transition-all
            duration-200
            hover:bg-slate-100
            hover:text-slate-900
            dark:text-slate-400
            dark:hover:bg-slate-800
            dark:hover:text-white

            ${
              collapsed
                ? "mx-auto"
                : ""
            }
          `}
        >
          {collapsed ? (
            <PanelLeftOpen
              size={20}
              strokeWidth={1.8}
            />
          ) : (
            <PanelLeftClose
              size={20}
              strokeWidth={1.8}
            />
          )}
        </button>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <nav
        className={`
          flex-1
          overflow-y-auto
          py-7

          ${
            collapsed
              ? "px-2"
              : "px-4"
          }
        `}
      >
        {/* Main Heading */}

        <p
          className={`
            mb-4
            overflow-hidden
            whitespace-nowrap
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-slate-400
            dark:text-slate-500
            transition-all
            duration-200

            ${
              collapsed
                ? "h-0 opacity-0"
                : "h-auto px-4 opacity-100"
            }
          `}
        >
          Main
        </p>

        {/* Menu */}

        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                title={
                  collapsed
                    ? item.name
                    : undefined
                }
                className={({ isActive }) =>
                  `
                    flex
                    h-12
                    items-center
                    rounded-xl
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      collapsed
                        ? "justify-center px-2"
                        : "gap-4 px-4"
                    }

                    ${
                      isActive
                        ? `
                          bg-indigo-50
                          text-indigo-600
                          dark:bg-indigo-950/40
                          dark:text-indigo-400
                        `
                        : `
                          text-slate-600
                          hover:bg-slate-100
                          hover:text-slate-900
                          dark:text-slate-300
                          dark:hover:bg-slate-800
                          dark:hover:text-white
                        `
                    }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={21}
                      className="shrink-0"
                      strokeWidth={
                        isActive
                          ? 2.2
                          : 1.8
                      }
                    />

                    <span
                      className={`
                        overflow-hidden
                        whitespace-nowrap
                        transition-all
                        duration-200

                        ${
                          collapsed
                            ? "w-0 opacity-0"
                            : "w-auto opacity-100"
                        }
                      `}
                    >
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* =====================================================
          BOTTOM
      ====================================================== */}

      <div
        className={`
          shrink-0
          border-t
          border-slate-200
          dark:border-slate-800

          ${
            collapsed
              ? "p-2"
              : "p-4"
          }
        `}
      >
        {/* Help */}

        <NavLink
          to="/help-support"
          title={
            collapsed
              ? "Help & Support"
              : undefined
          }
          className={({ isActive }) =>
            `
              flex
              h-11
              w-full
              items-center
              rounded-xl
              text-sm
              font-medium
              transition-all
              duration-200

              ${
                collapsed
                  ? "justify-center"
                  : "gap-3 px-4"
              }

              ${
                isActive
                  ? `
                    bg-indigo-50
                    text-indigo-600
                    dark:bg-indigo-950/40
                    dark:text-indigo-400
                  `
                  : `
                    text-slate-500
                    hover:bg-slate-100
                    hover:text-slate-900
                    dark:text-slate-400
                    dark:hover:bg-slate-800
                    dark:hover:text-white
                  `
              }
            `
          }
        >
          {({ isActive }) => (
            <>
              <CircleHelp
                size={19}
                className="shrink-0"
                strokeWidth={
                  isActive
                    ? 2.2
                    : 1.8
                }
              />

              <span
                className={`
                  overflow-hidden
                  whitespace-nowrap
                  transition-all
                  duration-200

                  ${
                    collapsed
                      ? "w-0 opacity-0"
                      : "w-auto opacity-100"
                  }
                `}
              >
                Help & Support
              </span>
            </>
          )}
        </NavLink>

        {/* User */}

        <div
          title={
            collapsed
              ? userName
              : undefined
          }
          className={`
            mt-3
            flex
            rounded-xl
            bg-slate-100
            dark:bg-slate-800/70
            transition-all
            duration-200

            ${
              collapsed
                ? "justify-center p-2"
                : "items-center gap-3 p-3"
            }
          `}
        >
          {/* Avatar */}

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-indigo-600
              text-sm
              font-semibold
              text-white
            "
          >
            {userInitial}
          </div>

          {/* User Info */}

          <div
            className={`
              min-w-0
              overflow-hidden
              transition-all
              duration-200

              ${
                collapsed
                  ? "w-0 opacity-0"
                  : "w-auto opacity-100"
              }
            `}
          >
            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
              {userName}
            </p>

            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {userRole}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;