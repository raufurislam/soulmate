/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text1: "var(--text1)",
        text2: "var(--text2)",
        text3: "var(--text3)",
        text4: "var(--text4)",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],

  daisyui: {
    themes: [
      {
        light: {
          primary: "#E63946",
          neutral: "#F4F4F4",
          accent: "#F9FAFB",
          "base-100": "#FFFFFF",
          "--text1": "#44444D", // Text color 1
          "--text2": "#717376", // Text color 2 7F8287
          "--text3": "#44444D", // Text color 2
          "--text4": "#D1D5DB", // Text color 2
        },
        dark: {
          primary: "#E63946",
          neutral: "#252631",
          accent: "#22232D",
          "base-100": "#1C1D27",
          "--text1": "#F1F1F1", // Text color 1
          "--text2": "#AAB8C5", // Text color 2
          "--text3": "#44444D", // Text color 2
          "--text4": "#44444D", // Text color 2
        },
      },
    ], // Include light and dark themes
  },
};
