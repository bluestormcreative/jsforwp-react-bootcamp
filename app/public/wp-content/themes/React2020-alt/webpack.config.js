const defaults = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');

const production = process.env.NODE_ENV === '';

module.exports = {
	...defaults,
	entry: {
		index: path.resolve(process.cwd(), 'src', 'index.js'),
		style: path.resolve(process.cwd(), 'src', 'App.css'),
	},
	optimization: {
		...defaults.optimization,
		splitChunks: {
			cacheGroups: {
				editor: {
					name: 'editor',
					test: /editor\.(sc|sa|c)ss$/,
					chunks: 'all',
					enforce: true,
				},
				style: {
					name: 'style',
					test: /style\.(sc|sa|c)ss$/,
					chunks: 'all',
					enforce: true,
				},
				default: false,
			},
		},
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	module: {
		...defaults.module,
		rules: [
			...defaults.module.rules,
			{
				test: /\.(sc|sa|c)ss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: !production,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								postcssPresetEnv({
									stage: 3,
									features: {
										'custom-media-queries': {
											preserve: false,
										},
										'custom-properties': {
											preserve: true,
										},
										'nesting-rules': true,
									},
								}),
							],
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: !production,
						},
					},
				],
			},
		],
	},
	plugins: [
		...defaults.plugins,
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new IgnoreEmitPlugin(['editor.js', 'style.js']),
	],
};
