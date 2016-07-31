let path = require('path')
module.exports = {
    entry: {
        dragSelector: './demos/dragSelect/entry.js',
        polygon: './demos/polygonCalculator/entry.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}
