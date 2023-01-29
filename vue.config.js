/*
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2023-01-03 17:43:20
 * @FilePath: \blog-vue\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require('@vue/cli-service');

const path = require("path");
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const  IconsResolver =require('unplugin-icons/resolver') 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack=require('webpack')
// const { default: webpack } = require('unplugin-auto-import/webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    open: false, // 编译完成是否打开网页
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    port: 6103,
    client: {
      webSocketURL: 'ws://0.0.0.0:6103/ws',
    },
    proxy:{
    '/api':{// 匹配所有以 '/api'开头的请求路径
     
    target:'http://localhost:3000',// 代理目标的基础路径
     
    pathRewrite:{'^/api':''},//正则匹配所有以api开头的路径，把api替换为''空
     
    // changeOrigin设置为true时，服务器收到的请求头中的host为要代理的host：localhost:3000
     
    //changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
     
    changeOrigin: true,//默认值为true,可省略不写
     
    ws:true//用于支持websocket 默认值为true,可省略不写
     
     }
    }
     
 },
  configureWebpack:{
    
    plugins: [
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep'],
          }),
        ],
      }),
      new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				"windows.jQuery": "jquery"
			})
    ],
    module:{
    rules:[
      {
        test: /\.md$/,
         use: [
            { loader: 'html-loader' },
            { loader: 'markdown-loader', options: {} }
         ]
    },
    ]
    }

}

})