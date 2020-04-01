const defaults = require('@wordpress/scripts/config/webpack.config');

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
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
					},
				],
			},
		],
	},
};
