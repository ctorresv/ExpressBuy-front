/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary-50': '#eef2ff',
        'primary-100': '#e0e7ff',
        'primary-200': '#c7d2fe',
        'primary-300': '#a5b4fc',
        'primary-400': '#818cf8',
        'primary-500': '#6366f1',
        'primary-600': '#4f46e5',
        'primary-700': '#4338ca',
        'primary-800': '#5b21b6',
        'primary-900': '#4c1d95',
        'primary-950': '#2e1065',
        'paragraph-primary': '#111827',
        'paragraph-secondary': '#6B7280',
        'success-500': '#065F46',
        'success-100': '#D1FAE5',
        'error-700': 'B91C1C',
        'error-500': '#DC2626',
        'error-100': '#FEE2E2',
        'bg-light': '#F9FAFB',
        'bg-medium': '#E5E7EB',
        'bg-dark': '#D1D5DB'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class' // only generate classes
    })
  ]
}
