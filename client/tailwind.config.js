/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        background: "#0f172a",
        card: "#1e293b",
      },
      boxShadow: {
        soft: "0 12px 32px rgba(15, 23, 42, 0.3)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
