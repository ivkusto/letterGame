const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
        publicPath: path.resolve(__dirname, 'dist')+'/',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

