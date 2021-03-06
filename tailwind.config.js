module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        2500: "2500ms",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["hover"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
