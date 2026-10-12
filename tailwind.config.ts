import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { ink: '#151521', ember: '#ff6b4a', bone: '#f5eee6', dusk: '#6f6b7a' }, fontFamily: { display: ['Georgia', 'serif'] } } },
  plugins: [],
};
export default config;
