/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#14120F",
        graphite: "#211F1A",
        ivory: "#F3EFE3",
        washi: "#E7DCC2",
        hinomaru: "#B3211B",
        hinomaru2: "#8C1913",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        serif: ["var(--font-serif)"],
        brush: ["var(--font-brush)"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};
