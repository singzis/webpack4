# webpack4

webpack仿佛是一个工厂，把接收（entry）进来的文件进行加工处理，再从出口（output）发放出去
而工程中就是对js以及其引入的文件等进行压缩合并得到一个新的文件用以发布上线

手动配置webpack4的一些过程

## 安装依赖

安装webpack相关依赖

```
yarn add webpack -D
yarn add webpack-cli -D
```

根目录新建webpack.config.js文件配置webpack
根目录新建src文件夹用于作为开发区域，其中新建index.js

安装js相关依赖

```
yarn add @babel/core @babel/preset-env babel-core babel-loader babel-preset-env -D 
```

根目录新建babel配置文件.babelrc

```
{“presets”:["@babel/preset-env"]}
```

安装css相关依赖

```
yarn add css-loader postcss-loader autoprefixer -D
```

根目录新建postcss.config.js

```
module.exports = {
    plugins:{
        autoprefixer:{}
    }
}
```

安装html相关依赖

```
yarn add html-loader -D
```

安装静态资源处理依赖

```
yarn add file-loader -D
```

安装相关插件

```
yarn add mini-css-extract-plugin -D  //css相关
yarn add html-webpack-plugin -D  //html相关
yarn add clean-webpack-plugin -D  //清理废弃资源相关
yarn add webpack-dev-server -D  //服务器模式下自动更新
```
