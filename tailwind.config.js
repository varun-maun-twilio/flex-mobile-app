/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ], darkMode: 'class',
  theme: {
    extend: {
      colors:{
        "flex-blue":"#06033a"
      }
    },
  },
  plugins: [],
}
