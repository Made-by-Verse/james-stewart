/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/**/*.{js,jsx,ts,tsx}",
    "./sections/*.liquid",
    "./snippets/*.liquid",
    "./templates/**/*.{json,liquid}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
