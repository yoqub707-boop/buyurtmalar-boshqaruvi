/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          bg: '#FAF8F5',
          surface: '#FFFFFF',
          primary: '#70452F',
          'primary-hover': '#5B3724',
          'primary-light': '#F5EBE4',
          accent: '#D99A66',
          'accent-light': '#FAF0E6',
          'accent-hover': '#C58652',
          text: '#29231F',
          muted: '#8D8178',
          'muted-light': '#F3EFEA',
          border: '#EEE8E1',
          success: '#16865B',
          'success-bg': '#EBF7F1',
          'success-border': '#B7E4CF',
          amber: '#E68A2E',
          'amber-bg': '#FFF8ED',
          'amber-border': '#FCE1B6',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(112, 69, 47, 0.05)',
        'card': '0 4px 20px -2px rgba(112, 69, 47, 0.08), 0 2px 6px -1px rgba(112, 69, 47, 0.04)',
        'modal': '0 20px 40px -10px rgba(112, 69, 47, 0.18)',
        'drawer': '-10px 0 30px rgba(112, 69, 47, 0.1)',
      }
    },
  },
  plugins: [],
}
