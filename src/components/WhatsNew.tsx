import React, { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

const items = [
  {
    title: "Native speech generation",
    desc: "Generate high quality text to speech with Gemini",
    tag: "New",
    image: "	https://www.gstatic.com/aistudio/zero-state/text_soundswave.png",
  },
  {
    title: "Live audio-to-audio dialog",
    desc: "Try Gemini’s natural, real-time dialog with audio and video inputs",
    tag: "New",
    image: "	https://www.gstatic.com/aistudio/zero-state/blue_blob.png",
  },
  {
    title: "Native image generation",
    desc: "Interleaved text-and-image generation with Gemini 2.0 Flash",
    tag: "",
    image:
      "	https://www.gstatic.com/aistudio/zero-state/horse_in_chat_opt_62x62.png",
  },
  {
    title: "Explore and co-develop apps",
    desc: "See Gemini in action with open-source examples",
    tag: "",
    image: "https://www.gstatic.com/aistudio/zero-state/promo_chat_applets.png",
  },
];

const Whatsnew = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <section className="p-6">
      <h2
        className={`text-sm font-semibold mb-4 ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        What's new
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 p-4 rounded-xl border shadow-sm hover:shadow-md transition ${
              isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50"
            }`}
          >
            {/* Icon / image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-10 h-10 rounded-md object-cover"
            />

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3
                  className={`text-sm font-semibold ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {item.title}
                </h3>
                {item.tag && (
                  <span className="ml-2 text-xs text-white bg-blue-600 px-2 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                )}
              </div>
              <p
                className={`mt-1 text-sm leading-tight ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Whatsnew;
