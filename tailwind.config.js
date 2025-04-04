/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#0ff',
        'neon-purple': '#9d4edd',
        'blue-accent': '#3a86ff',
        'dark-bg': '#0f1729',
        'dark-secondary': '#1a2438',
        'dark-tertiary': '#2a3549',
        'light-bg': '#ffffff',
        'light-secondary': '#f5f7fc',
        'light-tertiary': '#eaecf7',
        'purple-accent': '#9d4edd',
        // Text colors
        'text-primary': '#4b5563',
        'text-secondary': '#6b7280',
        'text-darker': '#111827',
        'text-light': '#9ca3af',
        // Theme colors
        'primary': '#6b46ed',
        'primary-dark': '#5838c9',
        'primary-light': '#8b5cf6',
        'accent': '#22d3ee',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
        'hologram-scan': 'hologram-scan 4s ease-in-out infinite',
        'hologram-glitch': 'hologram-glitch 8s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'hologram-scan': {
          '0%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'hologram-glitch': {
          '0%, 100%': { 
            opacity: '0',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
          },
          '10%, 15%': { 
            opacity: '0.2',
            clipPath: 'polygon(0 15%, 100% 15%, 100% 85%, 0 85%)',
            transform: 'translateX(-5px)'
          },
          '20%, 25%': { opacity: '0' },
          '30%, 35%': { 
            opacity: '0.3',
            clipPath: 'polygon(0 10%, 100% 10%, 100% 75%, 0 75%)',
            transform: 'translateX(5px)'
          },
          '40%, 95%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
} 


