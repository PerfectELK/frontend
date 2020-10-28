const path = require('path');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const args = process.argv.splice(2);

if (!args[0]) {
	throw new Error('Не заданы аргументы командной строки');
}
if (args[0] === 'new-project') {
	if (!args[1]) {
		throw new Error('Не задано название нового проекта');
	}
}
