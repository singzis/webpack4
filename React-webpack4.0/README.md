
不使用官方cli的情况下手动配置

基于上面简单webpack配置

文件结构

```
  ├── public
  │   └── index.html      # html 模板
  ├── src
  │   ├── assets          # 静态资源
  │   │   └── logo.png
  │   ├── components      # 组件
  │   │   └── App.js
  │   ├── index.js        # 入口文件
  │   └── styles
  │       └── index.css
  ├── .babelrc
  ├── package.json
  ├── postcss.config.js
  └── webpack.config.js
```

也需要更改一些地方

.babelrc文件下

```
{
  "presets":[
    "@babel/preset-env",
    "@babel/preset-react"
    ]
 }
```

建议package.json下开启实时更新

```
"start": "webpack-dev-server --mode development --open"
```

需要手动更新一些依赖

```
yarn add react react-dom -S
yarn add @babel/preset-react -D
```
