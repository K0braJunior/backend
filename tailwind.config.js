/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // pour analyser ton code React
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#FBBF24",
      },
    },
  },
  plugins: [],
}
