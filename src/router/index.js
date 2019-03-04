import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index/Index'
import Main from '@/pages/Main/Main'
import My from '@/pages/My/My'
import Destination from '@/pages/Destination/Destination'
import Order from '@/pages/Order/Order'
import Seach from '@/pages/Seach/Seach'
import Login from '@/pages/Login/Login'
import Register from '@/pages/Register/Register'
import Product from '@/pages/Product/Product'
import Package from '@/pages/Package/Package'
import Payment from '@/pages/Payment/Payment'
import Retrieve from '@/pages/Retrieve/Retrieve'
import Setting from '@/pages/Setting/Setting'
import Revise from '@/pages/Revise/Revise'
import OrderDetail from '@/pages/OrderDetail/OrderDetail'
import Contact from '@/pages/Contact/Contact'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',  
      name: 'Index',
      component: Index
    },
    {
      path: '/main',  //地址路径 
      name: 'Main',    //名字等同页面名
      component: Main,  //组件名等同页面名
      meta: {           //缓存设置 一般不用
            pageTitle: '主页',
            keepAlive: true
        }
    },
    {
      path: '/my',
      name: 'My',
      component: My,
    },
    {
      path: '/destination',
      name: 'Destination',
      component: Destination
    },
    {
      path: '/order/:id', //地址传参
      name: 'Order',
      component: Order,
      meta: {             //缓存设置 一般不用
        isUseCache: false,  //缓存状态，默认为true 如果是列表页着默认false然后在实现前进刷新，后退缓存
        keepAlive: true  //是否缓存 
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/seach/:id',
      name: 'Seach',
      component: Seach,
      meta: {        
        isUseCache: false, 
        keepAlive: true 
      } 
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: Product,
    },
    {
      path: '/package/:id',
      name: 'Package',
      component: Package
    },
    {
      path: '/payment/:id',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/retrieve',
      name: 'Retrieve',
      component: Retrieve
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/revise',
      name: 'Revise',
      component: Revise
    },
    {
      path: '/orderdetail/:id',
      name: 'OrderDetail',
      component: OrderDetail 
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
  ]
})
