module.exports = {
    entry: [/*'./css/style.css',*/'./public/js/application.js'],
    output: {
        filename: './public/js/bundle.js'
    },
    module: {
        loaders: [
            // {include:/.*\.css/, loader:"style-loader!css-loader"},
            {include: /.*\.js/, loaders: ['jsx-loader?harmony']},
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?name=[path][name].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}

