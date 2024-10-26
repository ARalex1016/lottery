/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00224D",
        secondary: "#FF204E",
        supporting: "#A0153E",
        supporting2: "#5D0E41",
        yellowOrange: "#FF9530",
        red: "#FA291A",
      },
      borderRadius: {
        inherit: "inherit",
      },
      boxShadow: {
        "custom-inset":
          "inset 4px 6px 15px 3px rgba(0, 0, 0, 0.6), inset 4px 4px 6px -2px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
