
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');


const workboxWebpackInjectPlugin = new InjectManifest({
    swSrc: './src/service-worker.js',
    swDest: '../service-worker.js'
})

module.exports = {
    // the output bundle won't be optimized for production but suitable for development
    mode: 'production',
    // the app entry point is /src/index.js
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        // the output of the webpack build will be in /dist directory
        path: path.resolve(__dirname, 'dist'),
        // the filename of the JS bundle will be bundle.js
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                // for any file with a suffix of js or jsx
                test: /\.jsx?$/,
                // ignore transpiling JavaScript from node_modules as it should be that state
                exclude: /node_modules/,
                // use the babel-loader for transpiling JavaScript to a suitable format
                loader: 'babel-loader',
                options: {
                    // attach the presets to the loader (most projects use .babelrc file instead)
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    },
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify")
        },
        extensions: [".webpack.js", ".web.js", ".js", ".json", ".css"],
        modules: [
            './node_modules',
            './app'
        ]
    },
    // add a custom index.html as the template
    plugins: [
        // workboxWebpackInjectPlugin,
        new WebpackPwaManifest({
            name: 'Lionel Beato',
            short_name: 'Lionel',
            description: 'My awesome Progressive Web App!',
            background_color: '#ffffff',
            filename: "wm.webmanifest",
            fingerprints: false,
            crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
            icons: [
                {
                    src: path.resolve('src/el.png'),
                    sizes: [96, 144, 128, 192, 256, 384, 512], // multiple sizes
                    purpose: 'any'
                },
                //   {
                //     src: path.resolve('src/assets/large-icon.png'),
                //     size: '1024x1024' // you can also use the specifications pattern
                //   },

            ]
        }),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
        new WorkboxPlugin.GenerateSW({
            runtimeCaching: [
                {
                    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: "fd3sd-v1.0.36"
                    }
                }
            ]
        })
    ]
};