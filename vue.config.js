const jsdom = require('jsdom')
const { JSDOM } = jsdom
module.exports = {
  devServer: {
    disableHostCheck: true  //内网穿透配置
  },

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    }
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/recommend',
        '/singer',
        '/rank',
        '/search',
        '/account',
        '/detail',
        '/recommend',
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      postProcess: route => {
        // console.log(route);
        // 预渲染内容写入之前的额外操作
        let reg = /<meta name="viewport".*user-scalable=no">/gi
        let res = route.html.match(reg)
        route.html = route.html.replace(res[1], '')
        // 1.根据字符串创建一个网页
        let html = new JSDOM(route.html)
        // 2.从创建好的网页中拿到document对象
        let dom = html.window.document
        // 3.找到对应的元素, 删除对应的元素
        let loadingEle = dom.querySelector('.container')
        dom.body.removeChild(loadingEle)
  
        route.html = html.serialize()
        return route;
      }
   /*   postProcess: route => {
        // 预渲染内容写入之前的额外操作
        let reg = /<meta name="viewport".*user-scalable=no">/gi
        let res = route.html.match(reg)
        route.html = route.html.replace(res[1], '')
    
       
        return route
      }*/
    }
  }
};
