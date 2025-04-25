/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#2DA5F3",
          100: "#F86F03",
          200: "#888883",
        },
        secondary: {
          default: "#2DA5F3",
          100: "#2DA5F3",
          200: "#888883",
        },
        yellow: "#EFD33D"
      },
      backgroundImage: {
        about:
        "linear-gradient(rgba(0, 0, 0.5, 0), rgba(0, 0, 0, 0)), url(/public/Banner.png)",
      }
    },
  },
  plugins: [],
};
