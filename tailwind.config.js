/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        proxima: ['Proxima Nova', 'sans-serif'],
      },
      fontSize: {
        'heading-five': '16px',
      },
      lineHeight: {
        'heading-five': '24px',
      },
      fontWeight: {
        'heading-five': '700',
      },
    },
  },
  plugins: [],
};
