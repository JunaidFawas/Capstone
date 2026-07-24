/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#E8734A',
        secondary: '#1F6F5C',
        accent: '#F2B705',
        background: '#FFF3E6',
        heading: '#1F3A5F',
        body: '#555555',
      },
    },
  },
  plugins: [],
};
