module.exports = {
  module: {
    rules: [
      {
        test: /\.(svg)/,
        loader: "file-loader?name=assets/[name].[ext]"
      }
    ]
  }
}