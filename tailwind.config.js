/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#58CC02',
          dark: '#46A302',
          light: '#89E219',
        },
        danger: {
          DEFAULT: '#FF4B4B',
          dark: '#EA2B2B',
        },
        accent: {
          DEFAULT: '#FF9600',
          dark: '#E08600',
        },
        info: '#1CB0F6',
        purple: '#CE82FF',
        gold: '#FFC800',
        ink: '#3C3C3C',
        muted: '#777777',
        surface: '#F7F7F7',
        line: '#E5E5E5',
      },
      fontFamily: {
        arabic: ['Amiri', 'Noto Naskh Arabic', 'serif'],
        sans: ['Nunito', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '16px',
      },
      boxShadow: {
        btn: '0 4px 0 0 rgba(0,0,0,0.18)',
        card: '0 2px 8px rgba(0,0,0,0.08)',
      },
      keyframes: {
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%,60%': { transform: 'translateX(-8px)' },
          '40%,80%': { transform: 'translateX(8px)' },
        },
        pop: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-40px)', opacity: '0' },
        },
      },
      animation: {
        shake: 'shake 0.4s ease',
        pop: 'pop 0.3s ease',
        slideUp: 'slideUp 0.35s ease',
        fadeIn: 'fadeIn 0.3s ease',
        floatUp: 'floatUp 0.9s ease forwards',
      },
    },
  },
  plugins: [],
}
