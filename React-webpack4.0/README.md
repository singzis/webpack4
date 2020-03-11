手动记一个react相关的webpack工具，方便多次使用
相关依赖可见package.json

目前的方案是可行的，但其中存在一些问题以及以后可能存在的问题，这里做个记录，便于学习和记忆

1.打包后文件过大的处理方法

2.postcss-loader的警告处理

  主要是在build中，webpack发出的一种警告（也并没有加warning）
  `You did not set any plugins, parser, or stringifier. Right now, PostCSS does nothing`
  查找的原因，其实目前也没看懂，就是在postcss.config.js中加入一个插件`require('postcss-import')`
  
  ```js
  module.exports = {
    plugins: [
      require('postcss-import'),
      require('precss'),
      require('cssnano')
    ]
  }
  ```
  
  [原答案](https://github.com/postcss/postcss/issues/1247#issuecomment-467965813)，可能也有不同的解决方法，但这个目前确实帮我解决了这个问题
  
3.optimization的使用方法

4.代码分离的一些方法

5.source mapping

6.待更新







