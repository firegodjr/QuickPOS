const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  watch: true,
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
            'vue-style-loader',
            'css-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "vue-style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};