/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)', /* warm taupe */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* charcoal */
          foreground: 'var(--color-secondary-foreground)', /* warm white */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* gold */
          foreground: 'var(--color-accent-foreground)', /* charcoal */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* burgundy */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* elevated surface */
          foreground: 'var(--color-muted-foreground)', /* medium gray */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* elevated surface */
          foreground: 'var(--color-card-foreground)', /* charcoal */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* elevated surface */
          foreground: 'var(--color-popover-foreground)', /* charcoal */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* forest green */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber */
          foreground: 'var(--color-warning-foreground)', /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* burgundy */
          foreground: 'var(--color-error-foreground)', /* white */
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['Karla', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'h1': ['2.75rem', { lineHeight: '1.15' }],
        'h2': ['2.25rem', { lineHeight: '1.2' }],
        'h3': ['1.75rem', { lineHeight: '1.25' }],
        'h4': ['1.375rem', { lineHeight: '1.3' }],
        'h5': ['1.125rem', { lineHeight: '1.4' }],
      },
      borderRadius: {
        'luxury-sm': 'var(--radius-sm)',
        'luxury': 'var(--radius-md)',
        'luxury-lg': 'var(--radius-lg)',
        'luxury-xl': 'var(--radius-xl)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'luxury-sm': '0 2px 6px var(--shadow-warm)',
        'luxury': '0 6px 12px var(--shadow-warm-md)',
        'luxury-lg': '0 12px 24px var(--shadow-warm-lg)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.34, 1.26, 0.64, 1)',
      },
      maxWidth: {
        'prose': '70ch',
      },
      zIndex: {
        'navigation': '100',
        'dropdown': '110',
        'modal': '200',
        'toast': '300',
      },
    },
  },
  plugins: [],
}