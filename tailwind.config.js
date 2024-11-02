/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./home.html", "./assets/javascript/*.js"],
  theme: {
    extend: {
      filter: {
        blur: "blur(2px)",
      },
      animation: {
        "fade-out": "fadeOut 0.5s forwards",
      },
    },
  },
  variants: {
    extend: {
      filter: ["responsive", "hover", "focus"],
    },
  },
  plugins: [require("tailwindcss-filters")],
};
