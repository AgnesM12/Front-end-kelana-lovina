/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    container: {
      center: true, 
      padding: {
        DEFAULT: '1rem',   
        sm: '2rem',         
        lg: '4rem',         
        xl: '5rem',
      },
    },
    extend: {
      colors: {
        primary: "#005ED1", 
        second: "#FFFFFF",       
        hitam: "#000000", 
        dark:"#2c2c2c",
      },
    },
  },
  plugins: [],
}
