const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: "@import '@/assets/scss/app.scss';"
      },
    }
  },
  configureWebpack:{
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        //'__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),
        // Replace with true if detailed mismatch info is needed
        //'__VUE_OPTIONS_API__': JSON.stringify(true),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
    ],
  },
});
