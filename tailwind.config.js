/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      colors: {
        gold: {
          light: '#E8D48B',
          DEFAULT: '#D4AF37',
          warm: '#C9A961',
          dark: '#B8960C',
        },
        silver: '#C0C0C0',
        cream: '#FAFAFA',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
