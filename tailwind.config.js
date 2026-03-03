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
          DEFAULT: '#0F4C75',
          50: '#F0F7FF',
          100: '#E0EFFF',
          500: '#0F4C75',
          600: '#0D3F63',
          700: '#0A3251',
        },
        secondary: {
          DEFAULT: '#3282B8',
          50: '#F0F8FF',
          100: '#E0F2FE',
          500: '#3282B8',
          600: '#2B6E9E',
        },
        accent: {
          DEFAULT: '#B8860B',
          50: '#FFFDF0',
          100: '#FFFBE0',
          500: '#B8860B',
          600: '#A07209',
        },
        success: '#16A34A',
        warning: '#F59E0B',
        danger: '#DC2626',
        gray: {
          900: '#1E293B',
          600: '#475569',
        },
        background: {
          DEFAULT: '#F8FAFC',
          card: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}