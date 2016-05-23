var loaders = require("./loaders");
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        './src/index.ts'
    ],
    output: {
        filename: 'jsonforms.js',
        path: 'dist',
        publicPath: '/assets/'
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json']
    },
    resolveLoader: {
        modulesDirectories: ["node_modules"]
    },
    devServer: {
        contentBase: './examples',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // TODO
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        })
    ],
    module:{
        loaders: loaders
    }
};