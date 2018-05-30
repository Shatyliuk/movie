module.exports = function () {
    return {
        module: {
            rules: [{
                test: /\.sass$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            }]
        }
    }
};