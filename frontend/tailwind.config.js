/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#001f3f',
        'slate': '#5a6c7d',
        'light-bg': '#f5f7fa',
        'text-dark': '#1a2332',
        'text-light': '#6b7280',
        'border': '#e5e7eb',
      },
      fontFamily: {
        'sans': ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        'mono': ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}