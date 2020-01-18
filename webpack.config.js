const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src', 'index.js'), // El js base del proyecto
        page2: path.resolve(__dirname, 'src', 'page2.js')
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'build'), // Directorio en el que se va a poner el bundle
        filename: '[name].js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'), // Directorio virtual desde donde se hostea
        port: 8080,
    },
    module: {
        rules: [ // Se establecen reglas de cómo procesar archivos que no sean .js
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            },
        ]
    },
    plugins: [ // Se añaden configuraciones específicas de plugins
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'page2.html',
            template: './src/page2.html',
            chunks: ['page2'] // Se pone esto para que incluya el app.js y app.css
          }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new CopyPlugin([
            { from: 'src/images', to: 'images' },
        ]),
    ]
}
