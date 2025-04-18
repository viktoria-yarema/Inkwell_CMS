/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	fontSize: {
  		xxs: '10px',
  		xs: '12px',
  		sm: '14px',
  		base: '16px',
  		lg: '18px',
  		xl: '20px',
  		'2xl': '24px',
  		'3xl': '30px',
  		'4xl': '36px',
  		'5xl': '48px'
  	},
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'rgba(var(--background), <alpha-value>)',
  			foreground: 'rgba(var(--foreground), <alpha-value>)',
  			card: {
  				DEFAULT: 'rgba(var(--card), <alpha-value>)',
  				foreground: 'rgba(var(--card-foreground), <alpha-value>)'
  			},
  			popover: {
  				DEFAULT: 'rgba(var(--popover), <alpha-value>)',
  				foreground: 'rgba(var(--popover-foreground), <alpha-value>)'
  			},
  			primary: {
  				DEFAULT: 'rgba(var(--primary), <alpha-value>)',
  				foreground: 'rgba(var(--primary-foreground), <alpha-value>)'
  			},
  			secondary: {
  				DEFAULT: 'rgba(var(--secondary), <alpha-value>)',
  				foreground: 'rgba(var(--secondary-foreground), <alpha-value>)'
  			},
  			muted: {
  				DEFAULT: 'rgba(var(--muted), <alpha-value>)',
  				foreground: 'rgba(var(--muted-foreground), <alpha-value>)'
  			},
  			accent: {
  				DEFAULT: 'rgba(var(--accent), <alpha-value>)',
  				foreground: 'rgba(var(--accent-foreground), <alpha-value>)'
  			},
  			destructive: {
  				DEFAULT: 'rgba(var(--destructive), <alpha-value>)',
  				foreground: 'rgba(var(--destructive-foreground), <alpha-value>)'
  			},
  			border: 'rgba(var(--border), <alpha-value>)',
  			input: 'rgba(var(--input), <alpha-value>)',
  			sidebar: {
  				DEFAULT: 'rgba(var(--sidebar-background), <alpha-value>)',
  				foreground: 'rgba(var(--sidebar-foreground), <alpha-value>)',
  				primary: 'rgba(var(--sidebar-primary), <alpha-value>)',
  				'primary-foreground': 'rgba(var(--sidebar-primary-foreground), <alpha-value>)',
  				accent: 'rgba(var(--sidebar-accent), <alpha-value>)',
  				'accent-foreground': 'rgba(var(--sidebar-accent-foreground), <alpha-value>)',
  				border: 'rgba(var(--sidebar-border), <alpha-value>)',
  				ring: 'rgba(var(--sidebar-ring), <alpha-value>)'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
