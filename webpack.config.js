const path = require("path");
const glob = require("glob");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "src"),
};

function collectSafelist() {
  return {
    standard: ['leaflet', /^leaflet-/, 'svg', 'path', 'canvas'],
    deep: [/^leaflet-marker-/],
    greedy: [/^leaflet-layer/]
  }
}

module.exports = ({ mode } = { mode: "production" }) => {
  console.log(`mode is: ${mode}`);
  return {
    mode,
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[hash].[name].js",
      clean: true,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
      minimizer: [new CssMinimizerPlugin()],
    },

    plugins: [
      new HTMLWebpackPlugin({
        template: "./src/index.html",
        favicon: "./src/assets/favicon.ico",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      // new PurgecssPlugin({
      //   safelist: collectSafelist(),
      //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      // }),
    ],

    target: "web",
    devServer: {
      port: "3000",
      static: ["./dist"],
      open: false,
      hot: true,
      liveReload: true,
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts"],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: "babel-loader",
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset",
        },
      ],
    },
  };
};
