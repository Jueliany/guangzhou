<!-- 首页 -->
<template>
  <div class="main">
    <!-- 顶部搜索栏 -->
    <div class="main-top-area">
      <div class="main-seach" v-bind:class="{ mainseachout: scrollOut }">

        <a class="main-top-city">
           <router-link to="/destination" >
            <p>{{area}}
            </p><span class="iconfont main-down-arrow">&#xe674;</span>
          </router-link>
          
        </a>
          <router-link to="/seach/all" class="main-seach-input">
            <img src="../../assets/images/Main/home_icon_search.png">
            长隆欢乐世界
          </router-link>
        <router-link to="/message"  class="main-message">
          <img :src="messageIcon">
        </router-link>
      
      </div>
    </div>
    <!-- 顶部轮播图 -->
    <div class="main-top">
      <div class="warpper">
        <swiper :options="swiperOption" >
          <swiper-slide v-for="item of swiperList"  :key='item.id'>
            <img @click="gotoProduct(item.id)" class="swiper-img" :src="item.img" >
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <!-- 商品类型导航 -->
    <ul class="main-spu-type">
      <router-link tag="li"jx to="/seach/jq" class="spu-type-icon">
        <img  class="type-icon-img" src="../../assets/images/Main/home_icon_jx.png">
        <p  class="type-icon-title">景区</p>
      </router-link>
      <router-link tag="li" to="/seach/ylc" class="spu-type-icon">
        <img  class="type-icon-img" src="../../assets/images/Main/home_icon_jd.png">
        <p  class="type-icon-title">游乐场</p>
      </router-link>
      <router-link tag="li" to="/seach/ty" class="spu-type-icon">
        <img  class="type-icon-img" src="../../assets/images/Main/home_icon_yry.png">
        <p  class="type-icon-title">体验</p>
      </router-link>
      <router-link tag="li" to="/seach/all" class="spu-type-icon">
        <img  class="type-icon-img" src="../../assets/images/Main/home_icon_all.png">
        <p  class="type-icon-title">全部</p>
      </router-link>
    </ul>
    
   
    <!-- 热门商品 -->
    <div class="main-hot">
      <h2>热卖榜</h2>
      <ul class="hot-spu-list">
        <router-link v-for="item of hotProductList" :key="item.id" tag="li" :to="'/product/'+item.id" class="hot-spu-item">
          <div class="hot-spu-img">
           <img :src="item.pic0">
          </div>
          <div class="hot-spu-info">
            <p class="hot-spu-title">
              {{item.productName}}
            </p>
            <div class="hot-spu-tag">
              <!-- <span class="red-mark">随订随用</span> -->
            </div>
            <div class="hot-spu-bot">
              <span class="hot-spu-snum">{{$t('text.yxl')}}{{item.saleSum}}{{$t('text.num')}}</span>
              <p>
                <span class="hot-spu-cur">￥</span>
                <span class="hot-spu-price">{{item.childrenAgePrice}}</span>
                <span class="hot-spu-text">{{$t('text.q')}}</span>
              </p>
            </div>
          </div>
        </router-link>
      </ul>
    </div>
    <!-- <div v-if="cityShow" class="main-currency-back" @touchmove.prevent>
      <ul class="main-currency">
        <li @click="chooseCurrency(index+1)" v-for="(cur,index) of $t('area')"><span>{{cur}}</span><i :class="{currency_choose: index==$store.state.currency-1}"></i></li>
      </ul>
    </div> -->
      
  </div>
</template>
<script>
export default {
  name: 'Main',
  data () {
    return {
      scrollOut : false,
      hotProductOfCity: 0,
      productId: "0001",
      msProductList: [
      ],
      choiceProductList: [
       
      ],
      hotProductOfCityList: this.$t('country'),
      hotProductList: [],
      messageIcon: require('../../assets/images/Main/home_icon_xx_n.png'),
      swiperOption: {
        pagination: '.swiper-pagination',
        loop:true
      },
      swiperList: [
        // {id:'5',fileAddress:'https://file.quhappy.com/images/2018/02/05/19/5a02ff4ee5a84f04b7b01bf9581a462b.jpeg'},
        {id:'0002',fileAddress:'https://file.quhappy.com/images/2018/02/02/22/754505a02a7e46bb9bcd0eec6a2da5c1.jpg'}
      ],
      msTime: {day: 0, hours: 0,minutes: 0,seconds: 0},
      mainData: {},
      // cityShow: false,
    }
  },
  //顶部轮播
  activated: function (){
    this.swiperList = [];
    let that = this;
    let postData = {};
    if(this.area !="全部"){
      postData.localName = this.area;
    }
    this.$http.post(this.api + 'product/queryHomePageImg',JSON.stringify(postData))
    .then((res)=> {
      console.log(res.data)
      that.swiperList = res.data.data.imgList;
    })
    let data = {};
    if(this.area !="全部"){
      data.localName = this.area;
    }
    data.saleSum = true;
    // this.$store.commit('changeLoading',true);
    this.$http.post(this.api + 'product/productInfoList/',JSON.stringify(data))
    .then(function (response) {
      // console.log(response.data.data.homePage);
      if(response.data.resultCode == 0){
         that.hotProductList = response.data.data.productInfoList;
      }else{
        that.$store.commit('changeLoading',false);
        this.$toast(response.data.resultMsg,{
          horizontalPosition: 'center',
          duration: 2000,
          verticalPosition: 'top'
          }
        );
      }
      
    })
    .catch(function (error) {
      console.log(error);
        that.$store.commit('changeLoading',false);
    });

  },
  //底部导航
  beforeCreate: function() {
    this.$store.commit('changeNavIndex',0);
    this.$store.commit('showNav',true);
  },
  //获取首页
  created: function() {
    let that = this;
    let data = {};
    if(this.area !="全部"){
      data.localName = this.area;
    }
    data.saleSum = true;
    // this.$store.commit('changeLoading',true);
    this.$http.post(this.api + 'product/productInfoList/',JSON.stringify(data))
    .then(function (response) {
      // console.log(response.data.data.homePage);
      if(response.data.resultCode == 0){
         that.hotProductList = response.data.data.productInfoList;
      }else{
        that.$store.commit('changeLoading',false);
        this.$toast(response.data.resultMsg,{
          horizontalPosition: 'center',
          duration: 2000,
          verticalPosition: 'top'
          }
        );
      }
      
    })
    .catch(function (error) {
      console.log(error);
        that.$store.commit('changeLoading',false);
    });
  },
  mounted() {
  //监听滑动事件
    window.addEventListener('scroll', this.handleScroll);
  },
  computed: {
     // 获取币种
    area: function () {
      return this.$store.state.city;
    },
    // 获取语言
    language (){
      return this.$t('switch')[this.$store.state.language - 1]
    },
  },
  methods: {
    showCurrencyChoose(){
      this.cityShow = true;
    },
    chooseCurrency(index){
        this.$store.commit('changeCurrency',index);
        this.cityShow = false;
        location.reload();
    },
    // 切换语言
    switchLanguage(){
      let id = this.$store.state.language;
      if(id == 1){
        window.location.href = (window.location.href.split('com')[0] + "com" );
        localStorage.setItem('currency',2);
      }else{
        window.location.href = (window.location.href.split('com')[0] + "com/zh" );
        localStorage.setItem('currency',1);
      }
      // var language = ["cn","hk"];
      // localStorage.setItem('language', id);
      // this.$i18n.locale = language[localStorage.getItem('language') - 1];
      // this.$store.commit('changeLanguage',id);
      // this.$router.go(0);
    },
    // 商品跳转
    gotoProduct (id) {
      this.$router.push('/product/'+id);
    },
    //滑动超出轮播图背景置白
    handleScroll () {
      if (window.scrollY > 136){
        this.scrollOut = true;
        this.messageIcon = require("../../assets/images/Main/home_icon_xx_s.png");
      }else{
        this.scrollOut = false;
        this.messageIcon = require("../../assets/images/Main/home_icon_xx_n.png");
      }
    },
    //变更热门城市
    changeHotCity: function(id) {
      this.hotProductOfCity = id;
      let that = this;
      that.$store.commit('changeLoading',true);
      this.$http.get(this.api_b2c +'quhappy-btc/homePage/hotProduct/'+ id +'/'+this.$store.state.language+'/'+this.$store.state.currency+'/')
      .then(function (response) {
        let data = response.data.data;
        if(response.data.resultCode == 0){
          if(data.hotProduct.length > 0){
            for( var i = 0; i < data.hotProduct.length; i++){
              that.$set (that.hotProductList ,i, data.hotProduct[i]);
            }
          }else{
            that.hotProductList = [];
          }
        }
        that.$store.commit('changeLoading',false);
      })
      .catch(function (error) {
        console.log(error);
        that.$store.commit('changeLoading',false);
      });
    },

  },

}
</script>
<style scoped>
.main{
  display: flex;
  flex-direction: column;
  padding-bottom: 0.9rem;
}
/* 顶部搜索栏 */
.main-top-area{
  position: fixed;
  top: 0rem;
  z-index: 101;
  width: 100%;
}
.main-seach{
  padding: 0.1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.main-seach *{
  display: inline-block;
}
.main-top-city{
  line-height: 0.60rem;
  font-size: 0.28rem;
  color: #fff;
  overflow: hidden; 
  margin-left: 0.1rem;
}
.main-top-city p,span{
  color: #fff;
}
.main-down-arrow{
  line-height: 0.1rem;
}
.main-seach-input{
  height: 0.56rem;
  line-height: 0.6rem;
  padding-left: 0.3rem;
  width: 4.5rem;
  background-color: #fff;
  border-radius: 0.28rem;
  font-size: 0.26rem;
  color: #cccccc;
}
.main-seach-input img{
  height: 0.30rem;
}
.main-message{
  line-height: 0.60rem;
  margin-right: 0.1rem;
}
.main-message img{
  height: 0.4rem;
}
.mainseachout{
  background-color: #fff;
}
.mainseachout {
  color: #000;
}
.mainseachout .main-down-arrow{
  color: #ccc;
}
.mainseachout .main-seach-input{
  background-color: #f2f2f2;
}
/* 轮播图 */
.main-top{
  flex: 1;
  display: flex;
  flex-direction: column;
}
.warpper{
  flex: 1;
  width: 100%;
  height: 3.5rem;
  overflow: hidden;
}
.swiper-img{
  width: 100%;
  height: 3.5rem;
}
.warpper >>> .swiper-pagination-bullet-active{
    background: #fff;
}
.main-spu-type{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
  padding-bottom: 0.4rem;
  padding-top: 0.1rem;
  margin-bottom: 0.1rem;
}
.spu-type-icon{
  width: 25%;
  text-align: center;
  margin-top: 0.3rem;
}
.type-icon-img{
  width: 1rem;
  height: 1rem;
}
.type-icon-title{
  margin-top: 0.15rem;
  font-size: 0.22rem;
  color: #333;
}
.main-coupon{
  background-color: #fff;
  padding: 0.4rem 0;
}
.main-coupon-item{
  font-size: 0.24rem;
  height: 0.6rem;
  line-height: 0.64rem;
  display: flex;
  margin:0 0.3rem;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 0.3rem;
  background-color: #fafafa;
  box-shadow: 0.05rem 0.1rem 0.1rem #FBD4D2;
}
.main-coupon-left{
  width: 1.7rem;
  text-align: center;
  color: #fff;
  background: linear-gradient(to right, #fc466a, #9178ff);
  border-radius: 0.3rem;
}
.main-coupon-title{
  background:linear-gradient(to right, #ef4b69, #9178ff);
  -webkit-background-clip: text;
  color: transparent;
}
.main-coupon-arrow{
  margin-right: 0.2rem;
  background:linear-gradient(to bottom, #ef4b69, #9178ff);
  -webkit-background-clip: text;
  color: transparent;
}
.main-ms{
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding:0 0.3rem;
}
h2{
  height: 0.28rem;
  border-left: 0.06rem solid #ff9900;
  padding-left: 0.16rem;
  font-size: 0.3rem;
  color: #333333;
  margin-bottom: 0.5rem;
}
.main-ms-pic{
  height: 2.7rem;
  overflow: hidden;
  position: relative;
}
.main-ms-pic img{
  width: 100%;
}
.main-ms-date{
  position: absolute;
  bottom: 0.3rem;
  left: 0.3rem;
  color: #fff;
  line-height: 0.34rem;
  font-size: 0.2rem;
}
.main-ms-date p{
  font-size: 0.24rem;
  margin-bottom: 0.1rem;
}
.main-ms-date span{
  font-size: 0.22rem;
  display: inline-block;
  height: .32rem;
  text-align: center;
  line-height: .34rem;
  width: .40rem;
  border-radius: 0.03rem;
  background-color: rgba(0, 0, 0, 0.7);
}
.main-ms-list{
  display: flex;
  flex-direction: row;
  margin: 0.2rem 0;
  justify-content: space-between;
}
.ms-null{
  width: 1.8rem;
}
.main-ms-spu{
  width: 1.8rem;
  color: #000;
}
.main-ms-spu img{
  width: 1.8rem;
  height: 1.8rem;
  margin-bottom: 0.2rem;
}
.ms-spu-title{
  font-size: 0.22rem;
  line-height: 0.28rem;
  margin-bottom: .1rem;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
}
.ms-spu-price {
  font-size: 0.18rem;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.ms-spu-price p{
  display: inline-block;
  font-size: 0.18rem;
}
.ms-spu-price span{
  color: #9d9ca1;
  text-decoration:line-through;
  margin-bottom: .28rem;
  font-size: 0.18rem;
}
/* 精选 */
.main-choice{
  margin-top: 0.1rem;
  background-color: #fff;
  padding: 0.5rem 0.3rem 0.3rem 0.3rem;
}
.main-choice-item{
  display: flex;
  flex-direction: row;
  height: 4.8rem;
}
.main-choice-left{
  width: 0.9rem;
  line-height: 0.4rem;
  font-size: .22rem;
  background-color: #41b3ea;
  padding : 2rem 0.2rem;
  color: #fff;
  margin-right: 0.05rem; 
}
.main-choice-spu-list{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.main-choice-spu{
  width: 2.7rem;
  overflow: hidden;

  margin-bottom: 0.1rem;
}
.main-choice-spu img{
  height: 1.5rem;
  width: 2.7rem;
}
.choice-spu-title{
  font-size: 0.22rem;
  color: #333333;
  line-height: 0.24rem;
  margin-top: 0.08rem;
  height: 0.48rem;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
}
.choice-spu-about{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.2rem;
  padding-top: 0.02rem;
  color: #333;
}
.choice-spu-about span{
  width: 0.8rem;
  height: 0.22rem;
  line-height: 0.28rem;
  color: #777;
  font-size: 0.18rem;
  text-align: center;
  border: 0.001rem solid #ddd;
}
.choice-spu-price{
  line-height: 0.31rem;
}
.main-choice-btn{
  margin-top: 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 0.1rem;
  background-color: #e5e5e5;
  height: 0.7rem;
  line-height: 0.75rem;
  border-radius: 0.05rem;
}
.main-choice-btn a{
  color: #333;
}
/* 热卖 */
.main-hot{
  margin-top: 0.1rem;
  background-color: #fff;
  padding: 0.5rem 0 0 0.3rem;
}
.main-hot-area{
  overflow-y: scroll;
  white-space:nowrap;
  display: block;
  margin-bottom: 0.3rem;
}
.hot-area-item{
  display: inline-block;
  font-size: 0.28rem;
  padding: 0.15rem 0.15rem;
  margin-right: 0.3rem;
}
.hot_area_choose{
  color: #3399cc;
  border-bottom: 0.05rem solid #3399cc;
}
.hot-spu-item{
  display: flex;
  flex-direction: row;
  margin-top: 0.2rem;
}
.hot-spu-item img{
  width: 2.7rem;
  height: 1.6rem;
  border-radius: 0.1rem;
}
.hot-spu-info{
  display: flex;
  flex:1;
  height: 1.6rem;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 0.2rem;
  padding-bottom: 0.2rem;
  border-bottom: .01rem solid #ddd;
}
.hot-spu-title{
  font-size: 0.28rem;
  line-height: 0.35rem;
  color: #1a1a1a;
}
.hot-spu-tag {
  line-height: 0.5rem;
}
.hot-spu-tag span{
  display: inline-block;
  font-size: 0.20rem;
  width: 0.9rem;
  height: 0.32rem;
  text-align: center;
  line-height: 0.36rem;
  color: #595959;
  border: 0.01rem solid #e5e5e5;
  border-radius: 0.05rem;
  margin-right: 0.1rem;
}
.red-mark{
  color: #ff5351 !important;
  border: 0.01rem solid #ff5351 !important;
}
.hot-spu-bot{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.hot-spu-snum{
  font-size: 0.22rem;
  color: #8f8f8f;
}
.hot-spu-bot p{
  margin-right: 0.2rem;
}
.hot-spu-cur{
  font-size: 0.22rem;
  color: #ff4242;
}
.hot-spu-price{
  font-size: 0.3rem;
  color: #ff4242;
}
.hot-spu-text{
  font-size: 0.2rem;
  color: #8f8f8f;
}
.main-switch{
  color: #fff;
  margin-top: 0.12rem;
}
.main-currency-back{
  position: fixed;
  top: 0;
  z-index: 1111;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.main-currency{
  position: fixed;
  z-index: 1112;
  top: 10%;
  left: 20%;
  width: 60%; 
  background-color: #fff;
}
.main-currency li{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.1rem .15rem;
  text-indent: 0.1rem;
  height: 0.6rem;
  line-height: 0.6rem;
  border-bottom: 0.01rem solid #ddd;
}
.main-currency span{

}
.main-currency i{
  height: 0.3rem;
  width: 0.3rem;
  border-radius: 0.16rem;
  margin-top: 0.12rem;
  margin-right: 0.1rem;
  border: 0.01rem solid #aaa;
}
.currency_choose{
  background-color: green;
  border: 0.01rem solid green;
}
</style>