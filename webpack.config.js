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

module.exports = (env, argv) => {
	
	let mode = 'development';
	let watch = true;
	if (argv.mode === 'production') {
		mode = 'production';
		watch = false;
	}
	
	return {
		entry: `./projects/${project}/src/js/index.js`,
		watch: watch,
		mode: mode,
		output: {
			path: path.resolve(__dirname, 'projects', project, 'dist'),
			filename: 'js/bundle.min.js',
		},
		devServer: {
			historyApiFallback: true,
			contentBase: path.join(__dirname, 'projects', project, 'dist'),
			open: true,
			compress: true,
			liveReload: true,
			hotOnly: false,
			hot: false,
			port: 8080,
		},
		module: {
			rules: [
				{
					test: /\.(png|jpe?g|gif)$/i,
					use: [
					{
						loader: 'file-loader',
						options: {
							name: path.join('images', '[name].[ext]') ,
						},
					},
					],
				},
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
						'css-loader?url=false',
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
			// new LiveReloadPlugin({
			// 	hostname: 'localhost',
			// }),
			new MiniCssExtractPlugin({
				filename: 'css/style.css',
			}),
			...PAGES.map(page => new HtmlWebpackPlugin({
				template: `${PAGES_DIR}/${page}`,
				filename: path.resolve(__dirname, 'projects', project, 'dist', `${page.replace(/\.pug/, '.html')}`),
				inject: false,
			}))
		]
	}
	
};