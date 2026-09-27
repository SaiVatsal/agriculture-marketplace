/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          olive: '#365314',
          lime: '#65a30d',
          gold: '#ca8a04',
          wheat: '#fef08a',
          bg: '#fefce8',
          card: '#ffffff',
          border: '#fef08a'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
