const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/grid-draw/' : '/',
  devServer: {
    port: 8077,
  },
  pages: {
    index: {
      entry: 'src/main.js',
      title: '我有選擇障礙連標題都不知道要取啥米',
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
           @import "./src/styles/mixins.scss";
        `,
      },
    },
  },
};
