const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["public/**/*.html", "src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        gray: colors.blueGray,
        mesa: "#CF6B4A",
        sky: "#4F97C8",
        ground: "#B34F3A",
        outline: "#2E251F",
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
