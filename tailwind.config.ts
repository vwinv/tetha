import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './app.config.{js,ts}',
    './error.{vue,js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.5vw + 0.5rem, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.75vw + 0.5rem, 1rem)',
        'fluid-base': 'clamp(1rem, 1vw + 0.5rem, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1.25vw + 0.5rem, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.5vw + 0.5rem, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 2vw + 0.5rem, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 2.5vw + 0.5rem, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 3vw + 0.5rem, 3rem)',
      },
      spacing: {
        'fluid': 'clamp(0.5rem, 1vw, 1rem)',
        'fluid-lg': 'clamp(1rem, 2vw, 2rem)',
      }
    }
  },
  plugins: []
} satisfies Config

