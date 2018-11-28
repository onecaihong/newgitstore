var path = require('path')
var webpack = require('webpack')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // 基本路径
    baseUrl: process.env.NODE_ENV === 'production'
        ? '/production-sub-path/'
        : '/',
    // 输出文件目录
    outputDir: 'dist',
    pages: {
        index: {
          // page 的入口
          entry: 'src/main.js',
          // 模板来源
          template: 'public/index.html',
          // 在 dist/index.html 的输出
          filename: 'index.html',
          // 当使用 title 选项时，
          // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
          title: 'Index Page',
          // 在这个页面中包含的块，默认情况下会包含
          // 提取出来的通用 chunk 和 vendor chunk。
          chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        subpage: 'src/main.js'
    },
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: true,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack:  {
        module:{
            rules: [
            {
              test: /\.vue$/,
              loader: 'eslint-loader',
              exclude: /node_modules/
            },
            {
              test: /\.js$/,
              loader: 'eslint-loader',
              exclude: /node_modules/
            },
            {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/
              // query: { presets: ['es2015'] }
            },
            {
              test: /\.vue$/,
              loader: 'vue-loader',
              options: {
                  loaders: {
                      // Customize to your liking
                      js: 'babel-loader',
                      scss: [
                          'style-loader',
                          'css-loader',
                          'sass-loader'
                      ]
                  }
              }
            },
            {
              test: /\.json$/,
              loader: 'json-loader'
            },
            {
              test: /\.(png|jpg|gif|svg)$/,
              loader: 'url-loader',
              query: {
                limit: 10000,
                name: '[name].[ext]?[hash:7]'
              }
            }
          ]
        }
    },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
     // 是否使用css分离插件 ExtractTextPlugin
     extract: true,
     // 开启 CSS source maps?
     sourceMap: false,
     // css预设器配置项
     loaderOptions: {},
     // 启用 CSS modules for all css / pre-processor files.
     modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    // parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    // pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
     open: process.platform === 'Chrome',
     host: '0.0.0.0',
     port: 8080,
     https: false,
     hotOnly: false,
     proxy: {
        '/api': {
         target: 'http://localhost:54905/', // 设置你调用的接口域名和端口号
         changeOrigin: true,   // 跨域
         pathRewrite: {
          '^/api': '/'    
         }
        }
       }, // 设置代理
     before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
        // foo: new VueLoaderPlugin()
    }
}