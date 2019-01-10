const path = require('path');

module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    entry: './index.ts',
    output: {
        filename: 'index.min.js',
        path: path.resolve(__dirname, 'dist')
    }
};
