/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:  {
      fontFamily: {
        'fredoka-one': ['Fredoka One', 'cursive'],
        'gaegu': ['Gaegu', 'cursive']
      },
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: [require("daisyui")],
}
