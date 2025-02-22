const path = require('path')
const entries = require('./auto-entry')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (_, {mode}) => {
    const isDevelopment = mode === 'development'

    return {
        entry: entries.load({ type: 'entry' }),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'scripts/[name].js',
            clean: true
        },
        plugins: [
            ...entries.load({ type: 'view' }),
            new MiniCssExtractPlugin({
                filename : 'styles/[name].css'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: { api: 'modern' }
                        }
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/fonts/[name]-[hash][ext]'
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.scss'],
            alias: {
                '@': path.resolve(__dirname, 'scripts'),
                '@static': path.resolve(__dirname, 'static'),
            }
        },
        devtool: isDevelopment ? 'inline-source-map' : false
    }
}