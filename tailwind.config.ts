import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		keyframes: {
			'pulse-border': {
				'0%': { backgroundPosition: '0% 50%' },
				'100%': { backgroundPosition: '300% 50%' }
			},
			'orb-float': {
				'0%, 100%': { transform: 'translate(0,0) rotate(0)' },
				'33%': { transform: 'translate(30px,-40px) rotate(8deg)' },
				'66%': { transform: 'translate(-20px,30px) rotate(-6deg)' }
			},
			'scan-line': {
				'0%': { top: '0', opacity: '0' },
				'10%, 90%': { opacity: '1' },
				'100%': { top: '100%', opacity: '0' }
			},
			'wave-audio': {
				'0%, 100%': { height: '6px' },
				'50%': { height: '22px' }
			},
			'accordion-down': {
				from: { height: '0' },
				to: { height: 'var(--radix-accordion-content-height)' }
			},
			'accordion-up': {
				from: { height: 'var(--radix-accordion-content-height)' },
				to: { height: '0' }
			},
			'fade-in': {
				from: { opacity: '0', transform: 'translateY(10px)' },
				to: { opacity: '1', transform: 'translateY(0)' }
			},
			'slide-in-bottom': {
				from: { opacity: '0', transform: 'translateY(20px)' },
				to: { opacity: '1', transform: 'translateY(0)' }
			},
			'slide-up': {
				from: { opacity: '0', transform: 'translateY(30px)' },
				to: { opacity: '1', transform: 'translateY(0)' }
			},
			'scale-in': {
				from: { opacity: '0', transform: 'scale(0.9)' },
				to: { opacity: '1', transform: 'scale(1)' }
			},
			'float': {
				'0%, 100%': { transform: 'translateY(0)' },
				'50%': { transform: 'translateY(-10px)' }
			},
			'shimmer': {
				'0%': { backgroundPosition: '-200% 0' },
				'100%': { backgroundPosition: '200% 0' }
			},
			'glow-pulse': {
				'0%, 100%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
				'50%': { boxShadow: '0 0 40px hsl(var(--primary) / 0.6)' }
			},
			'zoom-slow': {
				'0%': { transform: 'scale(1)' },
				'100%': { transform: 'scale(1.1)' }
			},
			'text-reveal': {
				from: { opacity: '0', transform: 'translateY(20px)', filter: 'blur(10px)' },
				to: { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' }
			},
			'highlight': {
				'0%': { backgroundSize: '0% 100%' },
				'100%': { backgroundSize: '100% 100%' }
			}
		},
		animation: {
			'pulse-border': 'pulse-border 3s linear infinite',
			'orb-float': 'orb-float 20s ease-in-out infinite',
			'scan-line': 'scan-line 2.5s linear infinite',
			'wave-audio': 'wave-audio 1s ease-in-out infinite',
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'fade-in': 'fade-in 0.4s ease-out forwards',
			'slide-in-bottom': 'slide-in-bottom 0.5s ease-out forwards',
			'slide-up': 'slide-up 0.6s ease-out forwards',
			'scale-in': 'scale-in 0.5s ease-out forwards',
			'float': 'float 3s ease-in-out infinite',
			'shimmer': 'shimmer 2s linear infinite',
			'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
			'zoom-slow': 'zoom-slow 20s ease-in-out infinite alternate',
			'text-reveal': 'text-reveal 0.8s ease-out forwards',
			'highlight': 'highlight 0.6s ease-out forwards'
		},
  		boxShadow: {
  			'2xs': 'var(--shadow-2xs)',
  			xs: 'var(--shadow-xs)',
  			sm: 'var(--shadow-sm)',
  			md: 'var(--shadow-md)',
  			lg: 'var(--shadow-lg)',
  			xl: 'var(--shadow-xl)',
  			'2xl': 'var(--shadow-2xl)'
  		},
  		fontFamily: {
  			sans: [
  				'Roboto',
  				'ui-sans-serif',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Helvetica Neue',
  				'Arial',
  				'Noto Sans',
  				'sans-serif'
  			],
  			serif: [
  				'Libre Caslon Text',
  				'ui-serif',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			],
  			mono: [
  				'Roboto Mono',
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			]
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
