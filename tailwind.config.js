/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0 2px 10px  #b6fbb8",
      },
      screens: {
        ms: "360px",
        ss: "480px",
        sm: "640px",
        md: "768px",
        lg: "960px",
        xl: "1280px",
      },

      container: {
        padding: {},
      },
      backgroundImage: {
        about1: "url('/src/assets/about/about1.jpg')",
        about2: "url('/src/assets/about/about2.jpg')",
        about3: "url('/src/assets/about/about3.jpg')",
        about4: "url('/src/assets/about/about4.jpg')"
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"]
      },

      colors: {
        "custom-gray-800": "#1f2026",
        "custom-gray-600": "#4d4f59",
        "custom-gray-500": "#7e818c",
        "custom-gray-300": "#8b8e99",
        "custom-gray-200": "#dee0e5",
        "custom-pink-500": "#7f4dff",
        "custom-green-200": "#cbfdcb",
        "custom-green-400": "#b6fbb8",
        "custom-green-500": "#49c84d",
        "custom-green-600": "#16a34a",
        "modal-bg": "#0e0e0f82",
      },
    },
  },
  plugins: [
  ],
};
