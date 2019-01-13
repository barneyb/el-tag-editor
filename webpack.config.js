const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/Greet.js',
    output: {
	filename: 'Greet.js',
	library: 'Greet',
	libraryTarget: 'umd',
	path: path.resolve(__dirname, 'dist')
    },
    externals: {
	react: {
	    commonjs: 'react',
	    commonjs2: 'react',
	    amd: 'react',
	    root: 'React'
	}
    },
};
