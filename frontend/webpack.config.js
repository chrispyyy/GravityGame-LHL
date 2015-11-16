module.exports = {
    entry: [/*'./css/style.css',*/'./public/application.js'],
    output: {
        filename: './public/bundle.js',
    },
    module: {
        loaders: [
            // {include:/.*\.css/, loader:"style-loader!css-loader"},
            {include: /.*\.js/, loaders: ['jsx-loader?harmony']}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}

