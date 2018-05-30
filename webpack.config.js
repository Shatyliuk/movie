const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const pug = require("./webpack/pug");
const devServer = require("./webpack/devserver");
const sass = require("./webpack/sass");
const css = require("./webpack/css");
const extractCss = require("./webpack/css.extract");
const images = require("./webpack/images");

const common = merge([
    {
        entry: "./src/index.js",
        output: {
            filename: "js/[name].js",
            path: path.resolve(__dirname, "dist")
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/pug/index.pug"
            })
        ]
    },
    pug(),
    images()
]);


module.exports = function (env) {
    if (env === "production") {
        return merge([
            common,
            extractCss()
        ]);
    }
    if (env === "development") {
        return merge([
            common,
            devServer(),
            sass(),
            css(),

        ])
    }
};