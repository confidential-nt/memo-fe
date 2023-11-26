/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-mint": "#CCE5E5",
        "main-purple": "#F2E5F7",
        "main-yellow": "#FED979",
        "main-orange": "#FFC17E",
        "kakao-yellow": "#F7DE11",
      },
      boxShadow: {
        standard: "4px 4px 0px 0px #000",
      },
    },
  },
  plugins: [],
};
