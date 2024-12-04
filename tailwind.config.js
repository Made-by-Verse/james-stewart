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
        lines: "var(--color-lines)",
        dark: '#241917',
        "btn--dark-hover": "#443F3E",
        lines: "#C3C2BC",
      },
      transitionDuration: {
        1500: '1500ms',
        2000: '2000ms',
        2500: '2500ms'
      }
    },
  },
  plugins: [],
};
