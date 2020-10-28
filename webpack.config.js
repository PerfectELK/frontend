const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const { env } = require('process');


const project = env.npm_config_project;

if (!project) {
	throw new Error('Не указан проект!');
}

const PAGES_DIR = `./projects/${project}/src/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
	entry: `./projects/${project}/src/js/index.js`,
	watch: true,
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'projects', project, 'dist'),
		filename: 'js/bundle.min.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
	},
	plugins: [
		new LiveReloadPlugin({
			hostname: 'localhost',
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style.css',
		}),
		...PAGES.map(page => new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/${page}`,
			filename: path.resolve(__dirname, 'projects', project, 'dist', `${page.replace(/\.pug/, '.html')}`),
		}))
	]
};