const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a202c",
        secondary: "#2d3748",
        accent: "#4a5568",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // ← Add this line
  ],
};
