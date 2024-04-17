import CompressionPlugin from "compression-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common";

const prodConfig: Configuration = merge(commonConfig, {
    mode: "production",
    devtool: false,
    output: {
        filename: "[name].[contenthash].js"
    },
    optimization: {
        mangleExports: "deterministic",
        minimizer: ["...", new CssMinimizerPlugin()],
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        }),
        new CompressionPlugin({
            algorithm: "brotliCompress",
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            deleteOriginalAssets: false
        })
    ]
});

export default prodConfig;
