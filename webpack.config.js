var path = require("path"),
    StatsPlugin = require("stats-webpack-plugin");

var devServerPort = process.env.WEBPACK_DEV_SERVER_PORT,
    devServerHost = process.env.WEBPACK_DEV_SERVER_HOST,
    publicPath = process.env.WEBPACK_PUBLIC_PATH;

var config = {
  entry: {
    web: './apps/web/assets/javascripts/application.js'
  },

  output: {
    path: path.join(__dirname, "public"),
    filename: "[name]-[chunkhash].js"
  },

  resolve: {
    modules: [path.join(__dirname, "apps"), 'node_modules']
  },

  plugins: [
    new StatsPlugin("webpack_manifest.json")
  ]
};

if (process.env.INBUILT_WEBPACK_DEV_SERVER) {
  config.devServer = {
    port: devServerPort,
    headers: { "Access-Control-Allow-Origin": "*" },
    host: "0.0.0.0"
  };
  config.output.publicPath = "//" + devServerHost + ":" + devServerPort + "/";
}

module.exports = config;