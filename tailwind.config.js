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
          bg: '#F8FAFC', // light page background
          card: '#FFFFFF', // white cards
          main: '#1B4332', // deep forest green
          secondary: '#2D6A4F', // medium green
          gold: '#B8860B', // dark goldenrod
          success: '#059669', // green
          danger: '#DC2626', // red
          text: '#1E293B', // primary text
          'text-secondary': '#475569', // secondary text
          'text-muted': '#94A3B8', // muted text
          border: '#E2E8F0', // borders
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}