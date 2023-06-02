module.exports = {
	env: {
		browser: true,
		es2021: true,
		commonjs: true,
		node: true,
	},
	extends: ["airbnb-base", "prettier"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["prettier"],
	rules: {
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto",
			},
		],
	},
}
