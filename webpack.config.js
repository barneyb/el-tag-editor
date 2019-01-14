const path = require('path');

module.exports = env => {
    process.env.NODE_ENV = env.NODE_ENV;
    const config = {
        mode: 'production',
        entry: './src/TagEditor.js',
        output: {
            filename: 'TagEditor.js',
            library: 'TagEditor',
            libraryTarget: 'umd',
            path: path.resolve(__dirname, 'dist'),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                },
            ],
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
