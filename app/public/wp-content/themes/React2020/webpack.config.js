// Allow the default WP React and ReactDOM libs to be available outside of WP,
// so other bundled code can use them and keep it DRY.
// Reference: https://javascriptforwp.com/adding-react-to-a-wordpress-theme-tutorial/
// Also reference the setup here: https://github.com/fabiankaegy/callout-block/blob/extending-wp-scripts-scss/webpack.config.js
const webpack = require('webpack');
const defaults = require('@wordpress/scripts/config/webpack.config');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
	...defaults,
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	module: {
		...defaults.module, // Spread defaults so we can still use them.
		rules: [
			...defaults.module.rules,
			{
				test: /\.(sc|sa|c)ss$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].css',
						},
					},
					{
						loader: 'extract-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [postcssPresetEnv(/* pluginOptions */)],
						},
					},
				],
			},
		],
	},
};
