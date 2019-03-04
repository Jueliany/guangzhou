<template>
  <div id="app">
    <!-- 加载logo动画开始 -->
    <div class="app-loading" @touchmove.prevent v-if="this.$store.state.loading">
      <div class="loadingPic">
        <div class="spinner">
          <div class="spinner-container container1">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
          <div class="spinner-container container2">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
          <div class="spinner-container container3">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 加载logo动画结束 -->
    <!-- 底部导航栏开始 -->
    <div class="footer" v-if="this.$store.state.showBottomNav">
      <div class="item" @click="handleNavItem(item.id)" v-for="item of navList" :class="{item_choose: item.id == navIndex}" :key="item.id">
        <img :src="item.id == navIndex ? item.clickImg : item.img">
        <p>{{item.name}}</p>
      </div>
    </div>
    <!-- 底部导航栏结束 -->
    <!-- 缓存设置 -->
  <keep-alive>
      <router-view v-if="$route.meta.keepAlive" ></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      includePage: true, 
      navList: [
      {name:"首页", path: "/main", img: require("./assets/images/Main/home_icon_home_s.png"), clickImg: require("./assets/images/Main/home_icon_home_n.png"), id: 0},
      {name:"地区", path: "/destination", img: require("./assets/images/Main/home_icon_mdd_s.png"), clickImg: require("./assets/images/Main/home_icon_mdd_n.png"), id: 1},
      {name: "我的", path: "/my", img: require("./assets/images/Main/home_icon_my_s.png"), clickImg: require("./assets/images/Main/home_icon_my_n.png"), id: 2}
      ],
    }
  },
  methods: {
    // 导航栏点击事件
    handleNavItem: function(index){
      // 设置页面为选择页
      this.$router.replace({ path: this.navList[index].path });
    }
  },
  watch: {
    $route(to, from) {
      let toNav = true;
      for (var i = 0; i < this.navList.length; i++) {
        if(this.navList[i].path == to.fullPath){
           toNav = false;
           this.$store.commit('changeNavIndex',i);
           this.$store.commit('showNav',true);
        }
      }
      if(toNav){
        this.$store.commit('showNav',false);
      }
    }
  },
  computed: {
    showBottomNav: function () {
      return this.$store.state.showBottomNav;
    },
    navIndex: function () {
      console.log(this.$store.state.navIndex)
      return this.$store.state.navIndex
    }
  },
  mounted: function(){
    removeEventListener('scroll', this.handleScrollBottom);
  }
}
</script>

<style>
#app {
}
.footer{
  position: fixed;
  z-index: 200;
  height: 0.9rem;
  display: flex;
  width: 100%;
  bottom: 0;
  justify-content: space-around;
  border-top: 1px solid #ddd;
  background-color: #fff;
  }
  .item{
    padding-top: 0.13rem;
    text-align: center;
    width: 25%;
    font-size: 0.2rem;
    color: #8c8c8c;
  }
  .item img{
    height: 0.4rem;
  }
  .item p{
    margin-top: 0.1rem;
  }
  .item_choose{
    color: #3399cc;
  }
  .app-loading{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 150;
    background: rgba(255, 255, 255, 0.8);
  }
  
.loadingPic{
  height: 4rem;
  margin-top: 60%;
}
  .spinner {
  margin: 100px auto;
  width: 1rem;
  height: 1rem;
  position: relative;
}
 
.container1 > div, .container2 > div, .container3 > div {
  width: 0.25rem;
  height: 0.25rem;
  background-color: #16a3e6;
 
  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
 
.spinner .spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
 
.container2 {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}
 
.container3 {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}
 
.circle1 { top: 0; left: 0; }
.circle2 { top: 0; right: 0; }
.circle3 { right: 0; bottom: 0; }
.circle4 { left: 0; bottom: 0; }
 
.container2 .circle1 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.container3 .circle1 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
.container1 .circle2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
.container2 .circle2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
 
.container3 .circle2 {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
 
.container1 .circle3 {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
 
.container2 .circle3 {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
 
.container3 .circle3 {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
 
.container1 .circle4 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
 
.container2 .circle4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
 
.container3 .circle4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}
 
@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}
 
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>
