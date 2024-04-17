import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { type Configuration } from "webpack";
import { type Configuration as DevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";
import commonConfig, { paths } from "./webpack.common";

const devServer: DevServerConfiguration = {
    historyApiFallback: true,
    hot: true,
    liveReload: true,
    open: true,
    port: process.env["PORT"] ?? 8080,
    static: paths.destination
};

const devConfig: Configuration = merge(commonConfig, {
    mode: "development",
    devServer,
    devtool: "source-map",
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                use: ["source-map-loader"],
                include: paths.source
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css"
        })
    ]
});

export default devConfig;
