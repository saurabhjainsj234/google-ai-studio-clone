import React, { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ThemeContext } from "../../theme/ThemeContext";
import { ChatPromptProps } from "./chatPrompt.types";
import { useChatPrompt } from "./useChatPrompt";
import Whatsnew from "../WhatsNew";
import { HiOutlineRefresh } from "react-icons/hi";

const ChatPrompt: React.FC<ChatPromptProps> = () => {
  const { theme } = useContext(ThemeContext);
  const {
    input,
    setInput,
    loading,
    chatHistory,
    handlePromptSubmit,
    resetChat,
  } = useChatPrompt();

  const [showRunSettings, setShowRunSettings] = useState(true);
  const handleInputFocus = () => setShowRunSettings(false);

  return (
    <section
      className={`p-6 h-full flex flex-col justify-between rounded-[3%] mr-2 max-w-[calc(100%-60px)] ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <header className="flex items-center justify-between px-2 sm:px-4 pb-4 border-b mb-4">
        <div className="text-lg sm:text-xl font-semibold">Chat Prompt</div>
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
          <button title="Copy" className="hover:text-blue-600">
            📄
          </button>

          <button title="More" className="hover:text-blue-600">
            •••
          </button>
          <button
            title="Reset Chat"
            className="hover:text-red-500"
            onClick={resetChat}
          >
            <HiOutlineRefresh size={18} />
          </button>
        </div>
      </header>

      {showRunSettings && (
        <div className="text-center my-8">
          <h1 className="text-3xl font-semibold text-blue-700 dark:text-blue-400">
            Welcome to AI Studio
          </h1>
        </div>
      )}

      <div className="max-w-4xl w-full mx-auto flex flex-col flex-1 overflow-hidden max-w-[calc(100%-100px)]">
        <div className="flex-1 overflow-auto pr-1">
          {chatHistory.map((msg, idx) => (
            <div className="mb-6 flex flex-col gap-2" key={idx}>
              <div className="flex justify-end">
                <div
                  className={`rounded px-4 py-2 inline-block max-w-lg ml-auto ${
                    theme === "dark"
                      ? "bg-blue-900 text-gray-100"
                      : "bg-blue-50 text-gray-900"
                  }`}
                >
                  {msg.input}
                </div>
              </div>
              <div className="flex justify-start">
                <div
                  className={`rounded px-4 py-2 max-w-3xl ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-100"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div
                    className={`prose prose-sm max-w-none ${
                      theme === "dark" ? "prose-invert" : ""
                    }`}
                  >
                    <ReactMarkdown>{msg.response}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loading && input && (
            <div className="mb-6 flex flex-col gap-2">
              <div className="flex justify-end">
                <div
                  className={`rounded px-4 py-2 inline-block max-w-lg ml-auto ${
                    theme === "dark"
                      ? "bg-blue-900 text-gray-100"
                      : "bg-blue-50 text-gray-900"
                  }`}
                >
                  {input}
                </div>
              </div>
              <div className="flex justify-start">
                <div
                  className={`rounded px-4 py-2 max-w-lg ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-100"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex gap-1 text-blue-500 animate-pulse">
                    ● ● ●
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t mt-auto pt-4">
          <div
            className={`flex items-center max-w-4xl mx-auto border rounded-full px-4 py-2 shadow-md max-w-[calc(100%-100px)] ${
              theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white"
            }`}
          >
            <input
              type="text"
              placeholder="Start typing a prompt"
              className={`flex-1 outline-none text-sm ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-100 placeholder-gray-400"
                  : ""
              }`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={handleInputFocus}
              onKeyDown={(e) => e.key === "Enter" && handlePromptSubmit()}
              disabled={loading}
            />
            <button
              onClick={handlePromptSubmit}
              className={`ml-2 text-sm font-medium px-4 py-1.5 rounded-full hover:bg-blue-700 ${
                loading ? "" : "bg-blue-600 text-white"
              }`}
              disabled={loading}
            >
              {loading ? "..." : "Run"}
            </button>
          </div>
        </div>
      </div>

      {showRunSettings && <Whatsnew />}
    </section>
  );
};

export default ChatPrompt;
