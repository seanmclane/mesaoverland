const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["public/**/*.html", "src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        gray: colors.blueGray,
        mesa: "#d66b41",
        grass: "rgb(79 78 47)",
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
