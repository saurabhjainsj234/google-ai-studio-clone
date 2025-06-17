import React, { useContext, useState } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { IoSettingsOutline, IoImagesOutline } from "react-icons/io5";

const RunSettings = ({
  isRunSettingsOpen,
  setIsRunSettingsOpen,
}: {
  isRunSettingsOpen: boolean;
  setIsRunSettingsOpen: (open: boolean) => void;
}) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [activeTab, setActiveTab] = useState<"run" | "gallery">("run");

  const [thinkingMode, setThinkingMode] = useState(false);
  const [thinkingBudget, setThinkingBudget] = useState(false);
  const [toolToggles, setToolToggles] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  return (
    <>
      <button
        onClick={() => {
          setActiveTab("run");
          setIsRunSettingsOpen(!isRunSettingsOpen);
        }}
        className={`fixed top-[70px] right-0 z-50 p-2 rounded shadow-md ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        <IoSettingsOutline
          className={`transition-transform text-xl ${
            isRunSettingsOpen && activeTab === "run" ? "rotate-180" : ""
          }`}
        />
      </button>

      <button
        onClick={() => {
          setActiveTab("gallery");
          setIsRunSettingsOpen(!isRunSettingsOpen);
        }}
        className={`fixed top-[120px] right-0 z-50 p-2 rounded shadow-md ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        <IoImagesOutline
          className={`transition-transform text-xl ${
            isRunSettingsOpen && activeTab === "gallery" ? "rotate-180" : ""
          }`}
        />
      </button>

      <aside
        className={`fixed top-100 right-0 h-full transform transition-transform duration-300 z-40 border-l rounded-l ${
          isRunSettingsOpen ? "translate-x-0" : "translate-x-full"
        } ${
          isDark
            ? "bg-gray-900 text-gray-100 border-gray-700"
            : "bg-white text-gray-900 border-gray-200"
        }`}
        style={{
          width: "320px",
          marginRight: isRunSettingsOpen ? "50px" : "0",
        }}
      >
        <div className="p-4 text-sm overflow-y-auto h-full">
          {activeTab === "run" ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Run settings</h3>
              </div>

              <label className="text-gray-500 mb-1 block text-xs">Model</label>
              <select
                className={`w-full border rounded px-2 py-1 mb-4 text-sm ${
                  isDark
                    ? "bg-gray-800 text-gray-100 border-gray-700"
                    : "bg-white border-gray-300"
                }`}
              >
                <option>Gemini 2.5 Pro Preview</option>
              </select>

              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>Token count</span>
                <span>0 / 1,048,576</span>
              </div>

              <label className="text-gray-500 text-xs mb-1 block">
                Temperature
              </label>
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  defaultValue="1"
                  className="w-full accent-blue-600"
                />
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  1
                </span>
              </div>

              <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">
                Thinking
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Thinking mode</span>
                <label className="inline-flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={thinkingMode}
                    onChange={() => setThinkingMode((v) => !v)}
                  />
                  <div className="w-10 h-5 bg-gray-200 peer-checked:bg-blue-600 rounded-full transition relative">
                    <span className="absolute top-0.5 left-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 peer-checked:left-5" />
                  </div>
                </label>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-sm">Set thinking budget</span>
                <label className="inline-flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={thinkingBudget}
                    onChange={() => setThinkingBudget((v) => !v)}
                  />
                  <div className="w-10 h-5 bg-gray-200 peer-checked:bg-blue-600 rounded-full transition relative">
                    <span className="absolute top-0.5 left-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 peer-checked:left-5" />
                  </div>
                </label>
              </div>

              <details className="mb-4">
                <summary className="cursor-pointer font-medium mb-2 text-sm">
                  Tools
                </summary>
                <div className="space-y-3 mt-2 pl-2">
                  {[
                    { label: "Structured output", editable: true },
                    { label: "Code execution", toggle: true },
                    { label: "Function calling", editable: true },
                    { label: "Grounding with Google Search", toggle: true },
                    { label: "URL context", toggle: true },
                  ].map(({ label, editable, toggle }, index) => (
                    <div
                      className="flex justify-between items-center text-sm"
                      key={index}
                    >
                      <span>{label}</span>
                      {editable ? (
                        <button className="text-blue-600 text-xs">Edit</button>
                      ) : (
                        <label className="inline-flex items-center cursor-pointer relative">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={toolToggles[index]}
                            onChange={() =>
                              setToolToggles((prev) =>
                                prev.map((v, i) => (i === index ? !v : v))
                              )
                            }
                          />
                          <div className="w-10 h-5 bg-gray-200 peer-checked:bg-blue-600 rounded-full transition relative">
                            <span className="absolute top-0.5 left-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 peer-checked:left-5" />
                          </div>
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </details>

              <details>
                <summary className="cursor-pointer font-medium mb-2 text-sm">
                  Advanced settings
                </summary>
                <div className="text-xs text-gray-500 pl-2 mt-2">
                  Additional advanced configurations can be added here.
                </div>
              </details>
            </>
          ) : (
            <>
              <h3 className="text-sm font-medium mb-4">Prompt Gallery</h3>
              <div className="space-y-2 text-sm">
                {[
                  "Test if AI knows which number is bigger.",
                  "Ask questions about key details in a video.",
                  "Image to recipe in JSON.",
                  "List recipes in JSON format.",
                  "Solve different quadratic equations.",
                  "Create a set of math worksheets for parents.",
                  "Create a scavenger hunt.",
                  "Add unit tests for a Python function.",
                  "Solve geometry problems with an image.",
                  "Convert unorganized text into structured tables.",
                  "Find time complexity & optimize it.",
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`p-2 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      isDark ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default RunSettings;
