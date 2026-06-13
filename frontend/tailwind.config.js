/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B132B',
          deep: '#1C2541',
          blue: '#1E3A5F',
          cyan: '#00A8CC',
          light: '#F4F7F6'
        }
      }
    },
  },
  plugins: [],
}
