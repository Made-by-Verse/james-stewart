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
        primary: "var(--color-primary)",
        contrast: "var(--color-contrast)",
        accent: "var(--color-accent)",
      },
    },
  },
  plugins: [],
};
