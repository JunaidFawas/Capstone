/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
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
        authBackground: '#FFF4EA',
        authSurface: '#FFFFFF',
        authPrimary: '#EB7449',
        authPrimaryPressed: '#D9653E',
        authPrimarySoft: '#FFE2D4',
        authHeading: '#1D1D1D',
        authBody: '#7A7A7A',
        authBorder: '#BDBDBD',
        authBorderStrong: '#535353',
        authAccent: '#FF6B3D',
        authMuted: '#9C9C9C',
        authDivider: '#1F1F1F',
      },
      fontFamily: {
        authDisplay: ['Avenir Next', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        authBody: ['Avenir Next', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        authButton: ['Avenir Next', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
