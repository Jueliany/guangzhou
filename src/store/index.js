import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		showBottomNav: false,							 //底部导航栏目显示
		language: 1,									//语言版本1为简体，2为繁体
		user: localStorage.getItem('user') || "",
		navIndex: 0,									//底部导航栏选中项
		token:  localStorage.getItem('token') || "",	 //判断本地是是否存在登陆的token
		city:  localStorage.getItem('city') || "全部",		 //判断本地是否存在已选中城市
		loading: false,									//加载logo遮罩层
		routerBack: false,		
	},
	// actions: {
	// 	changeCity (ctx,city) {
	// 		ctx.commit('changeCity',city)
	// 	}
	// },
	mutations: {
		//改变全局变量方法
 		changeCity (state,city) {
 			state.city = city;
 			localStorage.setItem('city',city);
		},
		showNav (state,bl) {
			state.showBottomNav = bl;
		},
		changeNavIndex (state,navIndex) {
 			state.navIndex = navIndex;
		},
		changeLanguage (state,language) {
 			state.language = language;
		},
		changeLoading (state,status) {
 			// state.loading = status;
		},
		changeToken (state,token) {
 			state.token = token;
 			localStorage.setItem('token',token);
		},
		changeUser (state,user) {
 			state.user = user;
 			localStorage.setItem('user',user);
		},
		changeRouterBack (state,routerBack) {
 			state.routerBack = routerBack;
		},
		changeEmail (state,email) {
 			state.email = email;
 			// localStorage.setItem('email',email);
		},
	}
})