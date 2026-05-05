/** @type {import("prettier").Config} */
const config = {
	semi: false,
	useTabs: true,
	singleQuote: true,
	experimentalTernaries: true,
	plugins: ['prettier-plugin-tailwindcss'],
	tailwindFunctions: ['cn', 'tv'],
	endOfLine: 'auto',
}

export default config
