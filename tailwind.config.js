/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#0F1419', // deep dark
          card: '#1A1F2E', // dark navy
          gold: '#D4AF37', // classic gold
          silver: '#C0C0C0', // silver
          success: '#00C853', // green
          danger: '#FF1744', // red
          text: '#F5F5F5', // primary text
          'text-secondary': '#9E9E9E', // secondary text
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}