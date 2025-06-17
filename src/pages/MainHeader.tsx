import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const Header = () => {
  const { user, signIn } = useAuth();
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header
      className={`w-full ${
        theme === "dark"
          ? "bg-black text-white border-gray-800"
          : "bg-white text-gray-900 border-gray-200"
      } px-6 py-4 flex items-center justify-between border-b z-20`}
    >
      <div className="flex items-center space-x-2 font-medium text-lg">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png"
          alt="Google Logo"
          className="h-6 w-auto"
        />
        <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
          AI for Developers
        </span>
      </div>

      <nav className="hidden md:flex space-x-6 text-sm">
        <button className="hover:text-blue-500 transition">Models</button>
        <button className="hover:text-blue-500 transition">Solutions</button>
        <button className="hover:text-blue-500 transition">
          Code assistance
        </button>
        <button className="hover:text-blue-500 transition">Showcase</button>
        <button className="hover:text-blue-500 transition">Community</button>
      </nav>

      <div className="flex items-center space-x-4 text-sm">
        <button className="hover:text-blue-500 transition">🌐 English</button>
        <button
          className="hover:text-blue-500 transition"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "🌗" : "🌞"}
        </button>
        {!user && (
          <button
            onClick={signIn}
            className="text-blue-500 hover:text-blue-400 font-semibold"
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
