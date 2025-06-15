/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Lighter, more vibrant palette for students
        slate: {
          900: '#1a202c', // Lighter dark background
          800: '#2d3748', // Lighter secondary
          700: '#4a5568', // More approachable
          600: '#718096',
          500: '#a0aec0',
          400: '#cbd5e0',
          300: '#e2e8f0',
          200: '#edf2f7',
          100: '#f7fafc',
        },
        teal: {
          400: '#38d9a9', // More vibrant green-teal
          300: '#4fd1c7',
          500: '#319795',
        },
        blue: {
          400: '#4299e1',
          500: '#3182ce',
        },
        purple: {
          400: '#9f7aea',
          500: '#805ad5',
        },
        orange: {
          400: '#f6ad55',
          500: '#ed8936',
        },
        pink: {
          400: '#f687b3',
          500: '#ed64a6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        bounceGentle: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '33%': {
            transform: 'translateY(-10px) rotate(2deg)',
          },
          '66%': {
            transform: 'translateY(-5px) rotate(-1deg)',
          },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(56, 217, 169, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(56, 217, 169, 0.6)',
          },
        },
      },
    },
  },
  plugins: [],
};