// noinspection NodeJsCodingAssistanceForCoreModules
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    process.env.NODE_ENV = env.NODE_ENV;
    const config = {
        mode: 'production',
        entry: './src/index.js',
        output: {
            filename: 'TagEditor.js',
            library: 'TagEditor',
            libraryTarget: 'umd',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                },
            ],
        },
        optimization: {
            usedExports: true,
        },
        externals: {
            react: {
                commonjs: 'react',
                commonjs2: 'react',
                amd: 'react',
                root: 'React',
            },
        },
    };
    if (env.NODE_ENV === 'development') {
        config.mode = 'development';
        config.devtool = 'inline-source-map';
        config.watch = true;
    }
    return config;
};
