import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    foreground: 'var(--color-primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    foreground: 'var(--color-secondary-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',
                    foreground: 'var(--color-accent-foreground)',
                },
                background: 'var(--color-background)',
                foreground: 'var(--color-foreground)',
                card: {
                    DEFAULT: 'var(--color-card)',
                    foreground: 'var(--color-card-foreground)',
                },
                popover: {
                    DEFAULT: 'var(--color-popover)',
                    foreground: 'var(--color-popover-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--color-muted)',
                    foreground: 'var(--color-muted-foreground)',
                },
                border: 'var(--color-border)',
                input: 'var(--color-input)',
                ring: 'var(--color-ring)',
                success: {
                    DEFAULT: 'var(--color-success)',
                    foreground: 'var(--color-success-foreground)',
                },
                warning: {
                    DEFAULT: 'var(--color-warning)',
                    foreground: 'var(--color-warning-foreground)',
                },
                error: {
                    DEFAULT: 'var(--color-error)',
                    foreground: 'var(--color-error-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--color-destructive)',
                    foreground: 'var(--color-destructive-foreground)',
                },
            },
            borderRadius: {
                luxury: 'var(--radius-md)',
                'luxury-sm': 'var(--radius-sm)',
                'luxury-lg': 'var(--radius-lg)',
                'luxury-xl': 'var(--radius-xl)',
            },
            fontFamily: {
                heading: ['Playfair Display', 'serif'],
                body: ['Source Sans 3', 'sans-serif'],
                caption: ['Karla', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            zIndex: {
                navigation: '100',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
};

export default config;
