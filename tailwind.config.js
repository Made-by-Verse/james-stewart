/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./frontend/**/*.{js,jsx,ts,tsx}",
    "./sections/*.liquid",
    "./snippets/*.liquid",
    "./templates/**/*.{json,liquid}",
    "./layout/*.liquid",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Dia", "sans-serif"],
        serif: ["Frasa", "sans-serif"],
      },
      colors: {
        primary: "var(--color-primary)",
        contrast: "var(--color-contrast)",
        accent: "var(--color-accent)",
        lines: "#C3C2BC",
      },
    },
  },
  plugins: [],
};
