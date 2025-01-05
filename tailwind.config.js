/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
