import React, { useContext } from "react";
import {
  HiOutlineChat,
  HiOutlinePhotograph,
  HiOutlinePlay,
  HiOutlineClock,
  HiOutlineSwitchHorizontal,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../theme/ThemeContext";

type SidebarDrawerProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ isOpen, setIsOpen }) => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  const navItems = [
    { label: "Chat", icon: <HiOutlineChat />, path: "/dashboard" },
    { label: "Stream", icon: <HiOutlinePlay /> },
    { label: "Generate Media", icon: <HiOutlinePhotograph /> },
    { label: "Build", icon: <HiOutlinePlay /> },
    { label: "History", icon: <HiOutlineClock /> },
    { label: "Enable saving", icon: <HiOutlineSwitchHorizontal /> },
  ];

  return (
    <div className="relative z-30">
      <aside
        className={`fixed top-100 left-0 h-screen transition-all duration-300 overflow-hidden border-r
          ${isOpen ? "w-60" : "w-16"}
          ${theme === "dark" ? "text-white" : "text-gray-800"}`}
        style={{
          backgroundColor: theme === "dark" ? "#232946" : "#dae2ff",
        }}
      >
        <div className="h-full p-4 flex flex-col">
          <nav className="space-y-2">
            {navItems.map(({ label, icon, path }) => {
              const isActive = location.pathname === path;

              return (
                <div
                  key={label}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150
                    ${
                      isActive
                        ? theme === "dark"
                          ? "bg-gray-800 text-blue-200"
                          : "bg-white text-black"
                        : theme === "dark"
                        ? "hover:bg-gray-700"
                        : "hover:bg-white"
                    }`}
                  style={{
                    justifyContent: isOpen ? "flex-start" : "center",
                    cursor: "default",
                  }}
                >
                  <span className="text-lg">{icon}</span>
                  {isOpen && <span>{label}</span>}
                </div>
              );
            })}
          </nav>

          {isOpen && (
            <div
              className={`text-xs top-0 px-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
              style={{
                marginTop: "300px",
              }}
            >
              This model is not stable and may not be suitable for production
              use.
              <button
                type="button"
                className="text-blue-600 hover:underline ml-1 p-0 bg-transparent border-none cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md",
                    "_blank"
                  )
                }
              >
                Learn more.
              </button>
            </div>
          )}
        </div>
      </aside>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-12 z-40 border rounded-full shadow p-2 transition-colors duration-200
          ${
            theme === "dark"
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-white text-black hover:bg-gray-100"
          }
          ${isOpen ? "left-64" : "left-16"}`}
        style={{
          transform: isOpen ? "translateX(-50%)" : "translateX(0)",
        }}
      >
        {isOpen ? <HiChevronLeft size={20} /> : <HiChevronRight size={20} />}
      </button>
    </div>
  );
};

export default SidebarDrawer;
