import { useEffect, useState } from "react";

import {
  Bell,
  ChevronDown,
  HelpCircle,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // =========================================================
  // LOAD SAVED THEME
  // =========================================================

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  // =========================================================
  // TOGGLE DARK / LIGHT MODE
  // =========================================================

  const toggleTheme = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  // =========================================================
  // CLOSE PROFILE DROPDOWN
  // =========================================================

  const closeProfile = () => {
    setProfileOpen(false);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    closeProfile();
    logout();
  };

  // =========================================================
  // USER INFORMATION
  // =========================================================

  const userName = user?.name || "User";
  const userEmail = user?.email || "";
  const userRole = user?.role || "User";

  const userInitial = userName
    .charAt(0)
    .toUpperCase();

  return (
    <header
      className="
        relative
        z-40
        flex
        h-16
        shrink-0
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white
        px-4
        shadow-sm
        transition-colors
        duration-300
        dark:border-slate-800
        dark:bg-slate-900
        md:px-6
      "
    >
      {/* =====================================================
          LEFT SIDE
      ====================================================== */}

      <div className="flex min-w-0 flex-1 items-center">
        <div className="hidden md:block">
          <p
            className="
              text-sm
              font-semibold
              text-slate-600
              dark:text-slate-300
            "
          >
            Event Management
          </p>

          <p
            className="
              text-xs
              text-slate-400
              dark:text-slate-500
            "
          >
            Manage your events efficiently
          </p>
        </div>
      </div>

      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}

      <div className="flex items-center gap-1.5 sm:gap-2">

        {/* SEARCH */}

        <div className="relative hidden lg:block">
          <Search
            size={17}
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              h-9
              w-56
              rounded-lg
              border
              border-slate-200
              bg-slate-50
              pl-9
              pr-3
              text-sm
              text-slate-700
              outline-none
              transition-all
              duration-200
              placeholder:text-slate-400
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-100
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              dark:placeholder:text-slate-500
              dark:focus:border-indigo-500
              dark:focus:ring-indigo-950
            "
          />
        </div>

        {/* HELP */}

        <button
          type="button"
          title="Help"
          aria-label="Help"
          className="
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
          "
        >
          <HelpCircle size={19} />
        </button>

        {/* NOTIFICATIONS */}

        <button
          type="button"
          title="Notifications"
          aria-label="Notifications"
          className="
            relative
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
          "
        >
          <Bell size={19} />

          <span
            className="
              absolute
              right-1.5
              top-1.5
              h-2
              w-2
              rounded-full
              bg-red-500
              ring-2
              ring-white
              dark:ring-slate-900
            "
          />
        </button>

        {/* THEME TOGGLE */}

        <button
          type="button"
          onClick={toggleTheme}
          title={
            darkMode
              ? "Switch to Light Mode"
              : "Switch to Dark Mode"
          }
          aria-label={
            darkMode
              ? "Switch to Light Mode"
              : "Switch to Dark Mode"
          }
          className="
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
          "
        >
          <div className="relative h-5 w-5">
            <Sun
              size={19}
              className={`
                absolute
                inset-0
                transition-all
                duration-300
                ${
                  darkMode
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-90 scale-0 opacity-0"
                }
              `}
            />

            <Moon
              size={19}
              className={`
                absolute
                inset-0
                transition-all
                duration-300
                ${
                  darkMode
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }
              `}
            />
          </div>
        </button>

        {/* =================================================
            USER PROFILE
        ================================================== */}

        <div className="relative ml-1">

          {/* Profile Button */}

          <button
            type="button"
            onClick={() =>
              setProfileOpen(
                (previous) => !previous
              )
            }
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            className="
              flex
              items-center
              gap-2
              rounded-lg
              px-2
              py-1.5
              transition-all
              duration-200
              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
          >

            {/* Avatar */}

            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-indigo-600
                text-xs
                font-bold
                text-white
              "
            >
              {userInitial}
            </div>

            {/* User Details */}

            <div className="hidden text-left sm:block">
              <p
                className="
                  text-sm
                  font-semibold
                  text-slate-800
                  dark:text-white
                "
              >
                {userName}
              </p>

              <p
                className="
                  text-xs
                  text-slate-400
                  dark:text-slate-500
                "
              >
                {userRole}
              </p>
            </div>

            {/* Arrow */}

            <ChevronDown
              size={16}
              className={`
                text-slate-400
                transition-transform
                duration-200
                ${
                  profileOpen
                    ? "rotate-180"
                    : "rotate-0"
                }
              `}
            />
          </button>

          {/* PROFILE DROPDOWN */}

          {profileOpen && (
            <>
              {/* Outside Click */}

              <button
                type="button"
                aria-label="Close profile menu"
                onClick={closeProfile}
                className="
                  fixed
                  inset-0
                  z-40
                  cursor-default
                "
              />

              {/* Dropdown */}

              <div
                role="menu"
                className="
                  absolute
                  right-0
                  top-12
                  z-50
                  w-56
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  shadow-xl
                  dark:border-slate-700
                  dark:bg-slate-900
                "
              >

                {/* PROFILE HEADER */}

                <div
                  className="
                    border-b
                    border-slate-200
                    p-4
                    dark:border-slate-800
                  "
                >
                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-indigo-600
                        text-sm
                        font-bold
                        text-white
                      "
                    >
                      {userInitial}
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          truncate
                          text-sm
                          font-semibold
                          text-slate-900
                          dark:text-white
                        "
                      >
                        {userName}
                      </p>

                      <p
                        className="
                          truncate
                          text-xs
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        {userEmail}
                      </p>
                    </div>

                  </div>
                </div>

                {/* PROFILE OPTIONS */}

                <div className="p-2">

                  <button
                    type="button"
                    role="menuitem"
                    onClick={closeProfile}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-2.5
                      text-sm
                      text-slate-600
                      transition-all
                      duration-200
                      hover:bg-slate-100
                      hover:text-slate-900
                      dark:text-slate-300
                      dark:hover:bg-slate-800
                      dark:hover:text-white
                    "
                  >
                    <User size={17} />

                    <span>My Profile</span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={closeProfile}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-2.5
                      text-sm
                      text-slate-600
                      transition-all
                      duration-200
                      hover:bg-slate-100
                      hover:text-slate-900
                      dark:text-slate-300
                      dark:hover:bg-slate-800
                      dark:hover:text-white
                    "
                  >
                    <Settings size={17} />

                    <span>Settings</span>
                  </button>

                </div>

                {/* LOGOUT */}

                <div
                  className="
                    border-t
                    border-slate-200
                    p-2
                    dark:border-slate-800
                  "
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-2.5
                      text-sm
                      text-red-500
                      transition-all
                      duration-200
                      hover:bg-red-50
                      dark:hover:bg-red-950/30
                    "
                  >
                    <LogOut size={17} />

                    <span>Logout</span>
                  </button>
                </div>

              </div>
            </>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;