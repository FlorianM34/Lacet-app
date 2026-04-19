import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-deep': 'var(--bg-deep)',
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        stone: 'var(--stone)',
        line: 'var(--line)',
        forest: {
          DEFAULT: 'var(--forest)',
          deep: 'var(--forest-deep)',
          tint: 'var(--forest-tint)',
        },
        moss: 'var(--moss)',
        ochre: 'var(--ochre)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      boxShadow: {
        topo: '0 1px 2px rgba(61,52,43,0.04), 0 8px 24px -12px rgba(61,52,43,0.08)',
        'topo-lg': '0 2px 4px rgba(61,52,43,0.05), 0 20px 48px -20px rgba(61,52,43,0.14)',
      },
      borderRadius: {
        topo: '18px',
      },
    },
  },
  plugins: [],
}

export default config
