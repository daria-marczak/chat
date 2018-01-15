const env = process.env.NODE_ENV || "development";


const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeJsPlugin = require("optimize-js-plugin");

const plugins = [];

console.log("NODE_ENV", env);

if (env === "production") {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new OptimizeJsPlugin({
            sourceMap: false
        })
    );
}

module.exports = {
    entry: (env !== "production" ? [
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://localhost:8080",
        "webpack/hot/only-dev-server",
    ] : []).concat(["./client/index.js"]),
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "./bundle.js"
    },
    plugins: [
        ...plugins,
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            inject: "body"
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_module)/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    }
};
