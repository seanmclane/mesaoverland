const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["public/**/*.html", "src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        gray: colors.blueGray,
        mesa: "#CE6B49",
        sky: "#293E84",
        grass: "#162416",
      },
      fontFamily: {
        title: ["Rubik Mono One"],
        body: ["Nunito"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
