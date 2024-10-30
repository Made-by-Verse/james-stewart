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
      colors: {
        light: "#F6F5ED",
        dark: "#241917",
        lines: "#C3C2BC",
      },
    },
  },
  plugins: [],
};
