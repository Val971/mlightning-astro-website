/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#07070c',
        'bg-scrollbar': '#0d0d16',
      },
      fontFamily: {
        heading: ['Syne Variable', 'sans-serif'],
        body: ['Manrope Variable', 'sans-serif'],
      },
      maxWidth: {
        content: '1280px',
      },
      borderRadius: {
        card: '22px',
        'card-lg': '28px',
        pill: '999px',
        input: '12px',
      },
      boxShadow: {
        cta: '0 8px 30px -8px rgba(160,180,255,.5)',
      },
      backgroundSize: {
        holo: '220% 220%',
      },
      spacing: {
        section: 'clamp(4rem,7vw,7rem)',
      },
    },
  },
  plugins: [],
};
