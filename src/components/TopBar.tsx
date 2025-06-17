import React, { useContext, useState, useRef, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../theme/ThemeContext";

const TopBar = () => {
  const { user, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setSettingsOpen(false);
      }
    }
    if (profileOpen || settingsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen, settingsOpen]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleThemeChange = (mode: "light" | "dark") => {
    if (theme !== mode) {
      toggleTheme();
    }
    setSettingsOpen(false);
  };

  return (
    <header
      className="flex items-center justify-between px-6 py-4 border-b"
      style={{
        backgroundColor: theme === "dark" ? "#1a2233" : "#dae2ff",
      }}
    >
      <h1
        className={`text-xl font-bold ${
          theme === "dark" ? "text-blue-200" : "text-blue-900"
        }`}
        style={{ marginBottom: 0 }}
      >
        Google AI Studio
      </h1>

      <nav className="flex items-center gap-4">
        <a
          href="https://aistudio.google.com/apikey"
          className="text-sm text-blue-600 hover:underline hover:text-blue-800 transition"
        >
          Get API key
        </a>

        <span
          className={`px-2 py-1 rounded cursor-pointer transition ${
            location.pathname === "/dashboard"
              ? "text-blue-600 font-semibold bg-blue-50"
              : theme === "dark"
              ? "text-gray-200 hover:bg-gray-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Dashboard
        </span>
        <a
          href="https://ai.google.dev/gemini-api/docs"
          target="_blank"
          rel="noopener noreferrer"
          className={`px-2 py-1 rounded cursor-pointer transition ${
            theme === "dark"
              ? "text-gray-200 hover:bg-gray-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Documentation
        </a>
        <span
          className={`px-2 py-1 rounded cursor-pointer text-lg transition relative ${
            theme === "dark"
              ? "text-gray-200 hover:bg-gray-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          title="Settings"
          ref={settingsRef}
          onClick={() => setSettingsOpen((open) => !open)}
        >
          ⚙️
          {settingsOpen && (
            <div
              className={`absolute right-0 mt-2 w-40 rounded shadow-lg z-50 ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-900"
              }`}
            >
              <button
                className={`w-full text-left px-4 py-2 text-sm ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } ${theme === "light" ? "font-bold" : ""}`}
                onClick={() => handleThemeChange("light")}
                disabled={theme === "light"}
              >
                Light Mode
              </button>
              <button
                className={`w-full text-left px-4 py-2 text-sm ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } ${theme === "dark" ? "font-bold" : ""}`}
                onClick={() => handleThemeChange("dark")}
                disabled={theme === "dark"}
              >
                Dark Mode
              </button>
            </div>
          )}
        </span>

        {user ? (
          <div className="flex items-center gap-3 ml-2" ref={profileRef}>
            <img
              src={user.imageUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
              onClick={() => setProfileOpen((open) => !open)}
            />
            {profileOpen && (
              <div
                className={`absolute right-6 mt-12 w-56 rounded shadow-lg z-50 ${
                  theme === "dark"
                    ? "bg-gray-800 text-gray-100"
                    : "bg-white text-gray-900"
                }`}
                style={{ minWidth: "200px", marginTop: "170px" }}
              >
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={signIn}
            className="text-sm text-blue-600 hover:underline hover:text-blue-800 transition"
          >
            Sign in with Google
          </button>
        )}
      </nav>
    </header>
  );
};

export default TopBar;
