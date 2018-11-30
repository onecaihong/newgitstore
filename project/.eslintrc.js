module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   {
  //     test: /\.vue$/,
  //     loader: 'eslint-loader',
  //     exclude: /node_modules/
  //   },
  //   {
  //     test: /\.js$/,
  //     loader: 'eslint-loader',
  //     exclude: /node_modules/
  //   },
  //   {
  //     test: /\.js$/,
  //     loader: 'babel-loader',
  //     exclude: /node_modules/
  //     // query: { presets: ['es2015'] }
  //   },
  //   {
  //     test: /\.vue$/,
  //     loader: 'vue-loader',
  //     options: {
  //         loaders: {
  //             // Customize to your liking
  //             js: 'babel-loader',
  //             scss: [
  //                 'style-loader',
  //                 'css-loader',
  //                 'sass-loader'
  //             ]
  //         }
  //     }
  //   },
  //   {
  //     test: /\.json$/,
  //     loader: 'json-loader'
  //   },
  //   {
  //     test: /\.(png|jpg|gif|svg)$/,
  //     loader: 'url-loader',
  //     query: {
  //       limit: 10000,
  //       name: '[name].[ext]?[hash:7]'
  //     }
  //   }
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
