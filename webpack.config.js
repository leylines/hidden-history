const path = require('path');

const webpack = require('webpack');
const CopywebpackPlugin = require('copy-webpack-plugin');

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = {
	context: __dirname,
   	devtool: 'eval',
	entry: {
		app: './source/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'public/cesium'),

        // Needed to compile multiline strings in Cesium
        sourcePrefix: ''

	},
        resolve: {
		alias: {
			// Cesium module name
			cesium: path.resolve(__dirname, cesiumSource)
		}
	},
        module: {
            rules: [{
                test: /\.css$/,
                use: [
		    { loader: 'style-loader', options: { sourceMap: true } },
		    { loader: 'css-loader', options: { sourceMap: true } },
		    { loader: 'postcss-loader',
			options: {
				sourceMap: true,
				ident: 'postcss',
				plugins: (loader) => [
					require('autoprefixer')(),
					require('cssnano')()
				]
			}
		    }
                ]
            }, {
                test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
                use: [ 'url-loader' ]
            }, {
                test: /\.js$/,
               	    enforce: 'pre',
           	    include: path.resolve(__dirname, cesiumSource),
           	    use: [{
           		loader: 'strip-pragma-loader',
           		options: {
           		    pragmas: {
           				debug: false
           			}
           		}
           	    }]
            }]
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            },
            minimize: true
        },
        plugins: [
            // Copy Cesium Assets, Widgets, and Workers to a static directory
            new CopywebpackPlugin([ { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' } ]),
            new CopywebpackPlugin([ { from: path.join(cesiumSource, 'Assets'), to: 'Assets' } ]),
            new CopywebpackPlugin([ { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' } ]),
            new webpack.DefinePlugin({
                // Define relative base path in cesium for loading assets
                CESIUM_BASE_URL: JSON.stringify('')
            })
        ],
};

