module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          'lighter': '#303030',
          'DEFAULT': '#101010',
          'darker': '#050505'
        }
      }
    },
  },
  variants: {
    extend: {
      opacity: [
        "disabled"
      ],
      cursor: [
        "disabled"
      ],
    }
  },
  plugins: [],
}
