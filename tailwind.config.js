/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        primaryDark: "#1E3A8A",
        secondary: "#38BDF8",
        navy: "#0F172A",
        accentGreen: "#22C55E",
        ink: "#0E1530",
        inkSoft: "#4A5578",
        bg: "#F6F8FF",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
