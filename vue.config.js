const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/grid-draw/' : '/',
  devServer: {
    port: 8077,
  },
  pages: {
    index: { entry: 'src/main.js', title: 'test titleeee' },
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
