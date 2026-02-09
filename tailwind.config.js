/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'depin': {
          'dark': '#0a0e17',
          'card': '#111827',
          'border': '#1f2937',
          'neon-green': '#00ff88',
          'neon-blue': '#00d4ff',
          'muted': '#6b7280',
        }
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00ff88, 0 0 10px #00ff88' },
          '100%': { boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff' },
        }
      }
    },
  },
  plugins: [],
}
