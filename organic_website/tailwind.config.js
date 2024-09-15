/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ['Roboto', 'sans-serif'],
        'heading': ['Lora', 'serif'],
      },
      colors: {
        'highlight': '#FACC15', // Yellow color
      },
    },
  },
  plugins: [],
}

