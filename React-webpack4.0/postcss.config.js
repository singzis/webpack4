module.exports = {
  plugins: [
    require('postcss-import'),
    require('precss'),
    require('cssnano')
  ],
  // 有使用该插件做rem的转换，以后得学习更先进的方法，避免使用这个
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            rootValue: 50,
            remUnit: 75
          })
        ]
      }
    }
  }
};
