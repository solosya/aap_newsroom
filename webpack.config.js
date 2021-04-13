const path = require('path');

module.exports = {
  entry: './assets/js_wp/index.js',
  mode:'production',
  devtool: 'source-map',
  watch:true,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'static/dist'),
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env',
                {
                    plugins: ['@babel/plugin-proposal-class-properties'],
                },
            ],
        },
      },
    ],
  },
};
