const nodeExternals = require('webpack-node-externals');
const {resolve} = require('path');
const webpack = require('webpack');
const WebpackErrorNotificationPlugin = require('webpack-error-notification');

module.exports = {

    target: "node",

    entry: {
        index: resolve(__dirname, 'src', 'index.ts'),
    },

    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        modules: ['node_modules'],
        extensions: [".ts", ".tsx", ".js"],
        descriptionFiles: ['package.json'],
    },

    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name]-[id].js',
        libraryTarget: 'commonjs2'
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',
    externals: [nodeExternals()],

    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    },

    node: {
        console: false,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true
    },

    // Add the loader for .ts files.
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts(x?)$/,
                use: "source-map-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.ts(x?)$/,
                use: [
                    {loader: 'awesome-typescript-loader'}
                ],
                include: [
                    resolve(__dirname, 'src')
                ]
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new WebpackErrorNotificationPlugin(),
        // new CheckerPlugin(),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
    ],

    watch: true,
};