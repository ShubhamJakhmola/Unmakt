/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary gradient family
        'unmakt-1': '#FF725E', // orange-light
        'unmakt-2': '#FF3E6C', // pinkish-red
        'unmakt-3': '#E91E63', // deep pink

        // Secondary / neutrals
        'unmakt-dark': '#0D0D0D',
        'unmakt-dark-2': '#1A1A1A',
        'unmakt-white': '#FFFFFF',
        'unmakt-muted': '#D4D4D4',
      },
      // Optional: provide default gradient stops as utilities via names
      backgroundImage: {
        'gradient-unmakt': 'linear-gradient(90deg, #FF725E 0%, #FF3E6C 50%, #E91E63 100%)',
      },
    },
  },
  plugins: [],
};
