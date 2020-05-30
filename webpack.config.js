const webpack = require("webpack");
const path = require("path");
const glob = require("glob");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { GenerateSW } = require("workbox-webpack-plugin");

const autoprefixer = require("autoprefixer");
const precss = require("precss");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const Critters = require("critters-webpack-plugin");
const SizePlugin = require("size-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  entry: {
    bundle: ["./src/index"],
  },
  resolve: {
    extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
    mainFields: ["browser", "module", "main"],
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      // Must be below test-utils
    },
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].[chunkhash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [precss, autoprefixer];
              },
              sourceMap: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    targets: [
                      "last 1 version",
                      "> 1%",
                      "maintained node versions",
                      "not dead",
                    ],
                  },
                ],
              ],
              plugins: [
                [
                  "transform-react-jsx",
                  {
                    pragma: "h",
                    pragmaFrag: "Fragment",
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: "responsive-loader",
        options: {
          adapter: require("responsive-loader/sharp"),
          format: "jpg",
          quality: 70,
          name: "[name]~[sha512:hash:base64:7].[ext]",
          outputPath: "imgs",
        },
      },
      {
        test: /\.svg$/,
        use: [
          { loader: "file-loader" },
          {
            loader: "svgo-loader",
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
              ],
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]~[sha512:hash:base64:7].[ext]",
            outputPath: "fonts",
          },
        },
      },
      {
        test: /\.mp4$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "videos",
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      dry: false,
    }),
    new HtmlWebpackPlugin({
      template: "!!prerender-loader?string!public/index.html",
      meta: {},
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      },
    }),
    new WebpackPwaManifest({
      //filename: "manifest.json",
      name: "preactjs starter kit",
      short_name: "PSK",
      description: "preact js progressive web app starter kit",
      background_color: "#000000",
      theme_color: "#000000",
      orientation: "portrait",
      display: "standalone",
      start_url: ".",
      crossorigin: null,
      inject: false,
      fingerprints: false,
      ios: true,
      publicPath: null,
      includeDirectory: true,
      icons: [
        {
          src: path.resolve("public/icons/icon.png"),
          sizes: [16, 32, 57, 60, 72, 76, 114, 120, 144, 152, 167, 180], // multiple sizes
        },
        {
          src: path.resolve("public/icons/icon.png"),
          size: "1024x1024", // you can also use the specifications pattern
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name]~[contentHash].css",
    }),
    new PurgecssPlugin({
      paths: glob.sync(path.join(__dirname, "src/**/*"), { nodir: true }),
    }),
    new Critters(),
    new OptimizeCssAssetsPlugin(),
    new TerserPlugin({
      cache: true,
      parallel: true,
      extractComments: true,
      sourceMap: true, // Must be set to true if using source-maps in production
    }),
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.js$|\.css$|\.svg$|\.html$/,
      threshold: 10240,
      minRatio: 0.7,
    }),
    new SizePlugin(),
    new GenerateSW({
      swDest: "service-worker.js",
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: "index.html",
    }),
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      logo: path.resolve("public/icons/icon.png"),
      suppressSuccess: true,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true,
    },
  },
};
