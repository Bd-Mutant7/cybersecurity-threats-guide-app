/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0f0f11',
          secondary: '#161618',
          tertiary: '#1e1e26',
        },
        border: { DEFAULT: '#2a2a2f', dim: '#1e1e26' },
        text: {
          primary: '#f0ede8',
          secondary: '#8a8790',
          muted: '#5a5a6e',
        },
        accent: {
          DEFAULT: '#e8a030',
          dim: 'rgba(232,160,48,0.1)',
          border: 'rgba(232,160,48,0.25)',
        },
        severity: {
          critical: '#f87171',
          high: '#fb923c',
          medium: '#e8a030',
          low: '#4ade80',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
