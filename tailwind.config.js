/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.{html,js,tsx}",
    "./src/**/*.{html,js}",
    "./src/components/**/*.{html,js,tsx}",
    "./src/components/*.{html,js,tsx}",
    "./src/pages/*.{html,js,tsx}",
    "./src/pages/**/*.{html,js,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

