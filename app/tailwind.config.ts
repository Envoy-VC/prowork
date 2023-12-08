import { type Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#4fcdfb',
				secondary: '#6eb9d4',
			},
		},
	},
	plugins: [],
	darkMode: 'class',
} satisfies Config;
