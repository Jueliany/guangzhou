// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueI18n from 'vue-i18n'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
import 'swiper/dist/css/swiper.css'
import store from './store/'
import axios from 'axios'
import zh_cn from './common/lang/zh_cn'
import zh_hk from './common/lang/zh_hk'
import common from './common/Function/common'
import Exif from 'exif-js' 
import Toast from 'vue-easy-toast'
import moment from 'moment'
import { Datetime } from 'vux'
import { PopupRadio } from 'vux'
import VueScroller from 'vue-scroller'
import QRCode from 'qrcode'
Vue.use(VueScroller)                  
Vue.use(Toast)
Vue.use(VueAwesomeSwiper)
Vue.use(VueI18n)
Vue.use(Vuex);
Vue.component('popup-radio', PopupRadio)
Vue.component('qrcode', QRCode)  
Vue.component('datetime', Datetime)   //增加全局时间选择组件
Vue.prototype.api = "http://192.168.0.188:8080/guang_zhou/"      //接口地址
Vue.prototype.$http = axios                                      //重定义axios进行ajax请求
Vue.prototype.$exif = Exif
Vue.prototype.$moment = moment
Vue.prototype.common = common                                    //定义公共方法库
axios.defaults.headers.post['Content-Type'] = 'application/json';//请求头配置
Vue.config.productionTip = false
fastClick.attach(document.body)
router.afterEach((to,from,next) => { //默认滑倒顶部
  window.scrollTo(0,0);
})
/* eslint-disable no-new */
var language = ["cn","hk"]
const i18n = new VueI18n({                     //定义语言包环境
  locale: language[store.state.language - 1], //根据公共数据源里的语言Id
  messages: {
    'cn': zh_cn,
    'hk': zh_hk
  }
})
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
