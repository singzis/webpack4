# webpack4

webpack仿佛是一个工厂，把接收（entry）进来的文件进行加工处理，再从出口（output）发放出去
而工程中就是对js以及其引入的文件等进行压缩合并得到一个新的文件用以发布上线 

手动配置webpack4的一些过程

## 安装依赖

安装webpack相关依赖

```js
yarn add webpack -D
yarn add webpack-cli -D
```

根目录新建webpack.config.js文件配置webpack
根目录新建src文件夹用于作为开发区域，其中新建index.js

安装js相关依赖

```js
yarn add @babel/core @babel/preset-env babel-core babel-loader babel-preset-env -D 
```

根目录新建babel配置文件.babelrc

```json
{"presets":["@babel/preset-env"]}
```

安装css相关依赖

```
yarn add css-loader postcss-loader autoprefixer -D
```

根目录新建postcss.config.js

```js
module.exports = {
    plugins:{
        autoprefixer:{}
    }
}
```

安装html相关依赖

```js
yarn add html-loader -D
```

安装静态资源处理依赖

```js
yarn add file-loader -D
```

安装相关插件

```js
yarn add mini-css-extract-plugin -D  //css相关
yarn add html-webpack-plugin -D  //html相关
yarn add clean-webpack-plugin -D  //清理废弃资源相关
yarn add webpack-dev-server -D  //服务器模式下自动更新
```


## production & development

webpack4 之前，我们写一个项目起码会设置两种类型文件：

* 用于开发环境的webpack.dev.conf.js，定义 webpack 启动的服务器等
* 用于生产环境的webpack.prod.conf.js，定义UglifyJSPlugin或其他配置等

而 webpack4 的 mode 给出了两种配置：development 和 production

我们修改 package.json 中 scripts 部分：

```json
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production"
}
```

执行 npm run dev 打包的是未压缩的代码，而 npm run build 是压缩后的代码。

* 生产模式下：启用了 代码压缩、作用域提升（scope hoisting）、 tree-shaking，使代码最精简
* 开发模式下：相较于更小体积的代码，提供的是打包速度上的优化

添加包依赖的时候
webpack对依赖主要分了两个模块devDependencies（开发依赖模块）和dependencies（产品依赖模块）
安装依赖时

* -S，—save: 添加依赖到dependencies
* -D，—save-dev: 添加依赖到devDependencies
* -O，—save-optional: 添加依赖到optionalDependencies

对webpack项目打包基本需求

* js的处理：转换 ES6 代码，解决浏览器兼容问题

  * 使用babel-loader转换ES6，根目录新建.babelrc   `{"presets":["@babel/preset-env"]}`
  * loader配置使用babel-loader
* css的处理：编译css，自动添加前缀，抽取css到独立文件
  * webpack < 4，使用extract-text-webpack-plugin
  * webpack >=4，使用mini-css-extract-plugin提取css文件
  
    ```js
         new MiniCssExtractplugin({
             filename:'./index.css'
         })
    ```

  * 使用postcss-loader添加浏览器前缀，根目录新建文件添加配置postcss.config.js   `module.exports = {plugins:{autoprefixer:{}}}`
  * loader配置使用MiniCssExtractPlugin.loader、css-loader、postcss-loader
* html的处理：复制并压缩html文件
  
  * plugin配置使用请求html-webpack-plugin来创建的实例

    ```js
         new HtmlWebpackPlugin({
             filename:'./index.html',
             template:'./src/index.html'
         })
    ```

    * loader配置使用html-loader
* dist的清理：打包前清理源目录文件
  * plugin配置使用clean-webpack-plugin
* assets的处理：静态资源处理
  * loader使用file-loader
* server的启用：development 模式下启动服务器并实时刷新
  * 使用webpack-dev-server的，package.json新增`"scripts":{"start":"webapck-dev-server —mode development --open"}`

## HtmlWebpackPlugin说明

可以根据设置的模版，在每次运行生成的对应的模版文件中，同时将所依赖的css/js文件同时引入，如果css/js中有hash值，生成的模版中也会包含对应版的css/js

```js
new HtmlWebpackPlugin({
    title:"webpack plugin",
    filename:"./index.html",
    template:"./src/index.html",
    inject:"body",
    favicon:"",
    minify:{
        caseSensitive:false,
        collapseBooleanAttributes:true,
        collapseWhitespace:true
    },
    hash:true,
    cache:true,
    showErrors:true,
    chunks:"",
    chunksSortMode:"auto",
    excludeChunks:"",
    xhtml:false
})
```

### 参数说明

1. title：生成的HTML模板的title，如果模板中有设置title的名字，则会忽略这里的设置
2. filename：生成的模板文件的名字
3. template：模板来源文件（html文件）
4. inject：引入模板的注入位置，取值有true/false/body/head
    1. true：默认值，script标签位于html文件的body底部
    2. body:script标签位于html文件的body底部
    3. head:script标签位于html文件的head中
    4. head:script标签位于html文件的head中
5. favicon：指定页面图标，生成的html中就有一个link标签：<link rel='shortcut icon' href='example.ico'>
6. minify：使用minify会对生成的html文件进行压缩，默认是false。html-webpack-plugin内部集成了html-minifier，因此，还可以对minify进行配置，常用的配置项是：
    1. caseSensitive:false,//是否大小写敏感
    2. collapseWhitespace:true//是否去除空格
    3. removeAttributeQuotes:true// 去掉属性引用
    4. removeComments:true,//去注释
7. hash：是否生成hash添加在引入文件地址的末尾，这个可以避免缓存带来的麻烦。默认为true。
8. cache：默认是true的，表示内容变化的时候生成一个新的文件。
9. showErrors:是否将错误信息写在页面里，默认true，出现错误信息则会包裹在一个pre标签内添加到页面上。
10. chunks:引入的模块，这里指定的是entry中设置多个js时，在这里指定引入的js，如果不设置则默认全部引入。
11. excludeChunks：排除掉一些js
12. xhtml：一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件。
13. chunksSorMode：script的顺序，默认四个选项： none auto dependency {function}
    1. 'dependency' 不用说，按照不同文件的依赖关系来排序。
    2. 'auto' 默认值，插件的内置的排序方式，具体顺序....
    3. 'none' 无序？
    4. {function} 提供一个函数？

## MiniCssExtractPlugin说明

待补充...

## webpack-react 基础配置

[react-webpack4.0配置](https://github.com/Singz72/webpack4/tree/master/React-webpack4.0)
