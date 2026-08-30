/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        navy: "#001a33",
        "navy-mid": "#002a55",
        "navy-deep": "#013a73",
        brand: "#0066cc",
        "brand-dark": "#004a99",
        "platform-blue": "#00529B",
        cyan: "#00d4ff",
        surface: "#f8fafc",
        ink: "#0f172a",
        panel: "#ffffff",
        line: "#d6dee8",
      },
      fontFamily: {
        heading: ["Outfit", "DejaVu Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "DejaVu Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
