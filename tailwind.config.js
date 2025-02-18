/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],

  daisyui: {
    themes: [
      {
        light: {
          primary: "#183C6D", // Sky blue
          secondary: "#002C5B", // Icy azure
          accent: "#4B5563", // Glacier blue
          neutral: "#E2E8F0", // Frosty gray
          "base-300": "#F0FDF4", // Frosty green
          "base-100": "#FFFFFF", // Snow white FFFFFF
        },
        dark: {
          primary: "#183C6D", // Midnight blue
          secondary: "#CCCDD1", // Deep sky
          accent: "#9CA3AF", // Cool glacier
          neutral: "#E2E8F0", // Mountain shadow
          "base-300": "#1F2937", // Frosty gray
          "base-100": "#1A202C", // Night black
        },
      },
    ], // Include light and dark themes
  },
};
