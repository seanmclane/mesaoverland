const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["public/**/*.html", "src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        gray: colors.blueGray,
        mesa: "#b85641",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
