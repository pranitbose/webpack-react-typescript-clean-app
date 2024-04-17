import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { type Configuration, DefinePlugin } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const ASSET_PATH = process.env["ASSET_PATH"] ?? "auto";
const paths = {
    source: path.resolve(__dirname, "../src"),
    destination: path.resolve(__dirname, "../dist")
};

const commonConfig: Configuration = {
    entry: path.resolve(__dirname, "../src/main.tsx"),
    output: {
        filename: "[name].bundle.js",
        path: paths.destination,
        publicPath: ASSET_PATH,
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: "ts-loader",
                include: paths.source,
                exclude: /node_modules/
            },
            {
                test: /\.(sc|c)ss?$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                include: paths.source
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: "asset/resource",
                include: paths.source
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                include: paths.source
            }
        ]
    },
    resolve: {
        alias: {
            "@app": paths.source
        },
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
        new DefinePlugin({
            "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH)
        }),
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: "body",
            template: path.resolve(__dirname, "../src/index.html")
        })
    ]
};

export default commonConfig;
export { paths };
