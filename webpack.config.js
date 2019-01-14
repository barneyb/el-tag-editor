const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/TagEditor.js',
    output: {
        filename: 'TagEditor.js',
        library: 'TagEditor',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
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
