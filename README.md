# 前言

	这是一个基于Vue2.0的售卖广州景点门票的demo

# 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + axios + i18n

[Vue官方文档](https://cn.vuejs.org/)

# 安装指导

###注意：本机安装node版本必须6.0以上，vue版本2.0以上

##Node到官方网站下载最新版本安装。

``` 
# 安装Vue
npm install vue

#安装Vue-cli
npm install vue-cli -g

#到项目目录下

# 安装依赖
npm install

# 运行开发环境
npm run dev

# 打包生产环境
npm run build

```
#项目配置


##进入config文件夹下


### index.js 环境基本配置

#### 测试环境配置

```
dev:{ //
	 ***
	 host: '192.168.0.168', // 配置本地测试地址，局域网内访问及内网地址，本机访问127.0.0.1 or localhost
   	 port: 8088, 			// 配置本机访问端口 
}


```

#项目布局
```
├── build                                       // webpack配置文件（一般不动）
├── config                                      // 项目环境配置
│   ├── dev.env.js                              // 开发环境接口配置
│   ├── index.js                             	// 环境基本配置
│   └── prod.env.js                             // 生产环境接口配置
├── dist                                        // 上线项目文件，放在服务器即可正常访问
├── src                                         // 源码目录
│   ├── assets                             		// 静态资源
│   │   ├── img                              	// 图片
│   │   │   ├── city              			    // 城市图片
│   │   │   ├── Main                		    // 首页图片
│   │   │   ├── My               				// 我的图片
│   │   │   └── product                		    // 商品图片
│   │   └── styles								// 公共css样式
│   │       └── iconfont               		    // 图标库
│   ├── common                                  // 公共包
│   │   └── Function                            // 公共方法库
│   │   	└── common.js               		// 常用的js方法
│   ├── page
│   │   ├── Booking								// 下单页
│   │   ├── Contact								// 联系我们
│   │   ├── Destination							// 地区
│   │   ├── Index								// 进入首页
│   │   ├── Login								// 登陆
│   │   ├── Main								// 首页
│   │   ├── My									// 我的
│   │   ├── Order								// 订单列表
│   │   ├── OrderDetail							// 订单详情
│   │   ├── Package								// 套餐选择下单
│   │   ├── Payment								// 付款
│   │   ├── Product								// 商品详情
│   │   ├── Register							// 注册
│   │   ├── Retrieve							// 找回密码
│   │   ├── Revise								// 修改密码
│   │   ├── Seach								// 商品搜索
│   │   ├── Setting								// 设置
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── store                                   
│   │   └── index.js                            // 公共全局数据
│   ├── App.vue                                 // 页面入口文件
│   └──  main.js                                // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
└── index.html                                  // 入口html文件
```
.




## 创作者 Jueliany
