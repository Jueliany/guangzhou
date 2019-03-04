<template>
  <div class="product-main">
    <div class="product-header" >
      <div class="blackto" @click="goBack()">
        <img class="icon-black" src="../../assets/images/My/sp_icon_back.png">
      </div>
      <p class="header-title">商品详情</p>
    </div>
    <div class="product-center">
      <div class="product-top-img">
        <div class="warpper">
          <swiper :options="swiperOption" >
            <swiper-slide v-for="(item,index) of pictureList"  :key='index'>
              <img  class="product-swiper-img" :src="item" >
            </swiper-slide>
          </swiper>
        </div>
        <!-- <img src="http://file.quhappy.com/images/2018/08/23/16/38406500945d46828b7d4fa71fbf402e.jpg"> -->
        <div class="img-bot"></div>
      </div>
      <div class="product-info">
        <h2 class="product-info-title">{{productInfo.productName}}</h2>
        <div class="product-info-num">
          <p>
            <span class="product-info-cur">￥</span>
            <span class="product-info-price">{{productInfo.childrenAgePrice}}</span>
          </p>
          <p class="product-info-snum" >
            已售{{productInfo.saleSum}}
          </p>
        </div>
        <div class="product-info-icon">
          <div class="info-icon-item" >
            <img src="../../assets/images/product/d.png">
            <span>精选</span>
          </div>
        </div> 
        <div class="product-info-strengths">
          <p class="product-strengths-title product-h-title">亮点推荐</p>
          <div class="product-strengths-item">
            <div  class="product-strengths-text">
              <div><img src="../../assets/images/product/sp_icon_x.png"></div>
              <p >{{productInfo.brightSpot}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="product-instructions-list">
        <a href="#use" class="product-instructions-item">使用说明</a>
        <a href="#booking" class="product-instructions-item">费用包含</a>
      </div>
      <div class="product-instructions">
        <div class="product-use" id="use">
          <p class=" product-h-title">使用说明</p>
          <div class="product-use-list">
            <div class="product-use-item">
              <p class="product-use-text">{{productInfo.instructions}}</p>
            </div>
           
          </div>
        </div>
        <div class="product-booking" id="booking">
          <p class="product-h-product product-h-title">费用包含</p>
          <div class="product-booking-list">
            <div class="product-booking-item">
              <p class="product-booking-text" v-html="productInfo.costIncludes"></p>
            </div>
            
          </div>
        </div>
        
        <!-- 退改流程 -->
        <!-- <div class="product-change" id="change">
          <p class=" product-h-title">{{$t('title.tglc')}}</p>
          <div class="product-change-item">
            一经预定成功不可退改。
          </div>
        </div> -->
        <!-- 退改流程结束 -->
        <!-- 景点介绍开始 -->
        <div class="product-details-area">
          <p id="details" class=" product-h-title">{{$t('title.jdjs')}}</p>
          <div class="product-details-info" @click="showInfo()">
            <img class="product-details-left" :src="productInfo.pic0">
            <div class="product-details-right">
              <div class="product-details-t">
                <p class="product-details-right-text" >{{productInfo.introduce}}</p>
              </div>
              <div class="product-details-right-img">
                <img  src="../../assets/images/product/sp_icon_more.png">
              </div>
            </div>
          </div>
        </div>
        <!-- 景点介绍结束 -->

      </div>
    </div>
    <div class="product-footer">
     <!--  <div class="product-collection-btn">
        <div class="product-collection-icon">
          <img src="../../assets/images/product/sp_icon_collection.png">
          {{$t('buttom.collection')}}
        </div>
      </div> -->
      <a   @click="toPackage()" class="product-footer-btn">
        立即预定
      </a>
    </div>
   
    <div v-if="showInfoBl" class="product-show-info" >
      <div class="product-show-area">
        <h2 class="product-show-title">景点介绍 <span @click="hideInfo()">×</span></h2>
        <div class="product-show-item-list" >
          <div class="product-show-item" >
            <p v-html="productInfo.introduce"></p>
            <div>
              <img :src="productInfo.pic1">
              <img :src="productInfo.pic2">
            </div>
          </div>
          
          <div class="product-show-item-bot"></div>
        </div>
       
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'Product',
  data () {
    return {
      swiperOption: {
        loop:true
      },
      pictureList:[],
      productId : "",
      productInfo : {},
      productShow: {},
      showInfoBl : false,
    }
  },
  created: function () {
    this.productId = this.$route.params.id;
    let that = this;
    this.$store.commit('changeLoading',true);
    let postData = {};
    postData.id = this.productId;
    this.$http.post(this.api + 'product/queryProductInfo',JSON.stringify(postData))
    .then((res) => {
      console.log(res.data);
      if(res.data.resultCode == 0){
        let data = res.data.data.productInfo;
        console.log(data.pic0)
        if(data.pic0 != ""){
          that.pictureList.push(data.pic0)
        }
        if(data.pic1 != ""){
          that.pictureList.push(data.pic1)
        }
        if(data.pic2 != ""){
          that.pictureList.push(data.pic2)
        }
        that.productInfo = data;
        this.$store.commit('changeLoading',false);
       
      }else{
        that.$toast(res.data.resultMsg ,{
            // className: 'et-no',
            horizontalPosition: 'center',
            duration: 1000,
            verticalPosition: 'top'
            }
          );
        this.$store.commit('changeLoading',false);
        this.$router.go(-1) ;
      }
    })
  },
  beforeRouteLeave (to, from, next) { 
    if (to.name == 'Seach') {
        to.meta.isUseCache = true;    
    }        
    next();
  },
  methods:{
    goBack: function () { 
      this.$router.go(-1);
    },
    showInfo: function(){
      this.showInfoBl =  true;
    },
    hideInfo: function(){
      this.showInfoBl =  false;
    },
    toPackage(){
      this.$router.push("/package/" + this.productInfo.id);
    },
  },
  computed: {
  },
}
</script>

<style>
/* 隐藏的商品介绍 */
.product-show-info{
  position: fixed;
  z-index: 110;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  }
.product-show-area{
  position: fixed;
  z-index: 112;
  height: 75%;
  width: 90%;
  left: 5%;
  top: 10%;
  background-color: #fff;
  border-radius: 0.2rem; 
  overflow: hidden;
}
.product-show-title{
  z-index: 120;
  position: absolute;
  top: 0;
  background: #fff;
  width: 100%;
  text-align: center;
  line-height: 1rem;
  font-size: 0.35rem;
  height: auto;
}
.product-show-title span{
  display: block;
  position: absolute;
  right: 0.1rem;
  top: 0.1rem;
  height: 0.35rem;
  width: 0.35rem;
  background-color: #aaa;
  color: #fff;
  font-size: 0.4rem;
  line-height: 0.355rem;
  border-radius: 0.18rem;
}
.product-show-item-list{
  margin-top: 1rem;
  z-index: 115;
  position: relative;
  height: 10rem;
  overflow-y: auto;
}
.product-show-item{
  padding: 0 4%;
}
.product-show-item h3{
  line-height: 0.5rem;
  color: #3399cc;
} 
.product-show-item p{
  text-indent: 0.4rem;
  line-height: 0.33rem;
  color: #777;
}
.product-show-item div{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.2rem 0;
}
.product-show-item img{
  width: 2.8rem;
  height: 1.5rem;
}
.product-show-item-bot{
height: 3rem;}
.product-h-title{
  font-weight: bold;
  height: 0.8rem;
  line-height: 0.9rem;
  padding-right: 0.3rem;
  border-bottom: 0.01rem  solid #f0f0f0;
  background-color: #fff;
  font-size: 0.28rem;
}
.product-main {
  
}
.product-header{
  top: 0;
  position: fixed;
  z-index: 201;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center; 
  width: 100%;
  background-color: #fff;
}
.blackto{
  position: absolute;
  height: 100%;
  width: 0.9rem;
  top: 0;
  left: 0;
}
.icon-black{
  position: absolute;
  top: 0.25rem;
  left: 0.35rem;
  float: left;
  height: 0.4rem;
  width: 0.2rem;
}
.header-title{
  font-size: 0.35rem;
}
.product-center{
  margin-top: 0.9rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.9rem;
  background-color: #f5f5f5;
}


.product-info{
  background-color: #fff;
}
.product-info-title{
  padding: 0 0.3rem;
  color: #1a1a1a;
  font-size: 0.3rem;
  line-height: 0.34rem;
}
.product-info-mark{
  padding: 0.15rem 0.3rem;
}
.product-mark-item{
  display: inline-block;
  width: 1rem;
  height: 0.3rem;
  line-height: 0.35rem;
  margin-right: 0.1rem;
  text-align: center;
  font-size: 0.2rem;
  border: 0.005rem solid #ddd;
}
.product-info-num{
  padding: 0 0.3rem;
  display: flex;
  margin-top: 0.1rem;
  flex-direction: row;
  justify-content: space-between;
}
.product-info-cur{
  font-size: 0.26rem;
  color: #ff4242;
}
.product-info-price{
  font-size: 0.4rem;
  color: #ff4242;
}
.product-info-snum{
  font-size: 0.22rem;
  line-height: 0.4rem;
  color: #8f8f8f;
}
.product-info-icon{
  padding: 0 0.3rem;
  margin-top: 0.2rem;
  height: 0.66rem;
  display: flex;
  flex-direction: row;
  line-height: 0.7rem;
  border-top: 0.01rem solid #eee;
}
.info-icon-item{
  margin-right: 0.2rem;
  font-size: 0.22rem;
}
.info-icon-item img{
  height: 0.26rem;
}
.product-info-map{
  border-top: 0.1rem  solid #f0f0f0;
  border-bottom: 0.1rem  solid #f0f0f0;
  padding: 0 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 0.8rem;
  line-height: 0.9rem;
  overflow:  hidden;
}
.product-info-map img{
  height: 0.29rem;
}
.info-map-name{
 font-size: 0.28rem;
 color: #1a1a1a;
}
.info-map-name span{
  margin-left: 0.1rem;
}
.product-info-feedback{
  padding-left: 0.3rem;
}
.product-feedback-top{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 0.8rem;
  line-height: 0.9rem;
  padding-right: 0.3rem;
  border-bottom: 0.01rem  solid #f0f0f0;
  font-size: 0.28rem;
}
.product-feedback-title{
  font-weight: bold;
  color: #1a1a1a;
}
.product-see-feedback{
  color: #fb9d00;
}
.product-feedback-area{
  margin-top: 0.3rem;
}
.product-feedback-user{
  font-size: 0.25rem;
  color: #808080;
  margin-top: 0.3rem;
  margin-bottom: 0.16rem;
}
.product-feedback-user img{
  height: 0.5rem;
  border-radius: 0.25rem;
  margin-right: 0.16rem;
}
.product-feedback-text{
  font-size: 0.22rem;
  color: #1a1a1a;
  line-height: 0.36rem;
}
.product-feedback-date{
  font-size: 0.24rem;
  margin-top: 0.1rem;
  color: #808080;
  margin-bottom: 0.5rem;
}
.product-info-strengths{
  border-top: 0.1rem  solid #f0f0f0;
  padding-left: 0.3rem; 
  border-bottom: 0.1rem  solid #f0f0f0;
}
.product-strengths-title{
  font-weight: bold;
  height: 0.8rem;
  line-height: 0.9rem;
  padding-right: 0.3rem;
  border-bottom: 0.01rem  solid #f0f0f0;
  font-size: 0.28rem;
}
.product-strengths-item{
  margin-bottom: 0.28rem;
}
.product-strengths-text{
  display: flex;
  flex-direction: row;
  font-size: 0.22rem;
  color: #1a1a1a;
  margin-top: 0.28rem;
}
.product-strengths-text div{
  height: 0.2rem;
  width: 0.2rem;
}
.product-strengths-text img{
  height: 100%;
  width: 100%;
}
.product-strengths-text p{
  margin-left: 0.05rem;
}
.product-instructions-list{
  overflow-y: scroll;/* 
  white-space:nowrap; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 0.05rem;
  border-bottom: .01rem solid #ddd;
  background-color: #fff;
}
.product-instructions-list a{
  color: #1a1a1a;
}
.product-instructions-item{
  display: inline-block;
  font-size: 0.28rem;
  padding: 0.15rem 0.15rem;
}
.product-instructions-choose{
  color: #3399cc;
  border-bottom: 0.05rem solid #3399cc;
}

.product-instructions{
  background-color: #fff;
}
/* 行程安排 */
.product-process{
  padding-left: 0.3rem;
  margin-bottom: 0.3rem;
}
.product-process-list{
  margin-top: 0.1rem;
}
.product-process-item{
  display: flex;
  flex-direction: row;
}
.product-process-time{
  width: 1.2rem;
  min-width:1.2rem;
  height: 0.3rem;
  margin-top: 0.25rem;
  background-color: #3399cc;
  color: #fff;
  border-radius: 0.15rem;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.35rem;
  flex-grow: 0;
  margin-right: 0.14rem;
}
.product-process-right{
  padding-top: 0.30rem;
  /* border-left: 0.01rem dashed #3399cc; */
  border-left: 0.01rem solid #3399cc;
  margin-bottom: 0.02rem;

}

.product-process-place{
  display: flex;
  flex-direction: row;
  margin-bottom: 0.1rem;
  line-height: 0.32rem;
  font-size: 0.26rem;
  color: #3399cc;
}
.product-process-icon{
  display: inline-block;
  height: 0rem;
  border-left: 0.14rem solid #3399cc;
  border-top: 0.1rem solid transparent;
  border-bottom: 0.1rem solid transparent;
  width: 0rem;
  margin-right: 0.12rem;
}
.product-process-text{
  line-height: 0.36rem;
  font-size: 0.24rem;
  margin-left: 0.26rem;
}
/* 预定说明 */
.product-booking{
  border-top: 0.1rem  solid #f0f0f0;
  padding-left: 0.3rem;
  background-color: #fff;
  margin-bottom: 0.4rem;
}
.product-booking-list{
  margin-right: 0.3rem;
}
.product-booking-item{
  
}
.product-booking-title{
  margin-top: 0.3rem;
  font-weight: bold;
  line-height: 0.36rem;
  font-size: 0.26rem;
  color: #1a1a1a;
}
.product-booking-text{
  font-size: 0.24rem;
  line-height: 0.34rem;
  color: #4d4d4d;
}

/* 使用流程 */
.product-use{
  border-top: 0.1rem  solid #f0f0f0;
  padding-left: 0.3rem;
  background-color: #fff;
  margin-bottom: 0.2rem;
}
.product-use-list{
  margin-top: 0.25rem;
}
.product-use-item{
  
}
.product-use-title *{
  display: inline-block;
}
.product-use-title {
  display: flex;
  flex-direction: row;
}
.product-use-title p{
  color: #3399cc;
  font-size: 0.26rem;
  line-height: 0.3rem;
  margin-left: 0.05rem;
}
.product-use-icon{
  display: inline-block;
  height: 0.26rem;
  width: 0.26rem;
  text-align: center;
  font-size: 0.20rem;
  color: #fff;
  line-height: 0.3rem;
  overflow: hidden;
  background-color: #3399cc;
  border-radius: 0.13rem;
}
.product-use-text{
  font-size: 0.26rem;
  line-height: 0.4rem;
  margin-top: 0.05rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  margin-bottom: 0.05rem;
}
.last-use-text{
  border-left: 0.01rem solid #fff !important;
}

/* 退改流程 */
.product-change{
  border-top: 0.1rem  solid #f0f0f0;
  padding-left: 0.3rem;
  background-color: #fff;
  
}
.product-change-item{
  margin: 0.25rem 0;
  line-height: 0.36rem;
  font-size: 0.26rem;
  color: #4d4d4d;
  padding-right: 0.3rem;
}
/* 景点详情 */
.product-details-area{
  border-top: 0.1rem  solid #f0f0f0;
  padding-left: 0.3rem;
  background-color: #fff;

}
.product-details-info{
  display: flex;
  flex-direction: row;
  margin: 0.2rem 0;
}
.product-details-left{
  width: 2.1rem;
  height: 1.2rem;
}
.product-details-right{
  display: flex;
  flex-direction: row;
  padding-left: 0.2rem;
  margin: 0.30rem 0;
}
.product-details-t{
   width: 4rem;
}
.product-details-right-title{
  font-size: 0.26rem;
  color: #3399cc;
}
.product-details-right-text{
  font-size: 0.22rem;
  color: #808080; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.2rem;
}
.product-details-right-img{
  line-height: 0.6rem;
  margin-left: 0.1rem; 
}
.product-details-right-img img{
  height: 0.3rem;
}

/* 店内推荐 */
.product-recommend-area{
  border-top: 0.1rem  solid #f0f0f0;
  padding-left: 0.3rem;
  padding-bottom: 0.28rem;
  margin-bottom: 0.8rem;
}
.product-recommend-list{
  margin-top: 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 0.3rem;
}
.product-recommend-item{
  width: 3.2rem;
}
.product-recommend-img{
  height: 1.78rem;
  width: 3.2rem;
}
.product-recommend-title{
  margin-top: 0.16rem;
  font-size: 0.26rem;
  line-height: 0.32rem;
  height: 0.64rem;
  margin-bottom: 0.1rem;
  color: #000;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
}
.product-recommend-can{
  font-size: 0.22rem;
  color: #8f8f8f;
  margin-bottom: 0.12rem;
}
.product-recommend-num{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.product-recommend-cur{
  font-size: 0.22rem;
  color: #ff8800;
}
.product-recommend-price{
  font-size: 0.3rem;
  color: #ff8800;
}
.product-recommend-qi{
  font-size: 0.2rem;
  color: #8f8f8f;
}
.product-recommend-snum{
  line-height: 0.3rem;
  font-size: 0.2rem;
  color: #8f8f8f;
}

/* 底部按钮 */
.product-footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 101;
  height: 0.9rem;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  box-shadow:0 -0.05rem 0.1rem #ebebeb;
}
.product-collection-btn{
  width: 27%;
  text-align: center;

}
.product-collection-icon{
  display: flex;
  flex-direction: column;
  display: inline-block;
  margin-top: 0.2rem;
  color: #999;
  width: 0.5rem;
  font-size: 0.24rem;
}
.product-collection-icon img{
  height: 0.3rem;
  width: 0.4rem;
  margin-bottom: 0.1rem;
}
.product-footer-btn{
  width: 100%;
  text-align: center;
  line-height: 0.98rem;
  background-color: #16a3e6;
  color: #fff;
}
.product-top-img{
  height: 4rem;
  position: relative;
}
.product-swiper-img{
  height: 4rem;
  width: 100%;
}
.img-bot{
  position: absolute;
  border-bottom: 0;
  bottom: 0;
  height: 0.3rem;
  background-color: #fff;
  width: 100%;
  border-radius: 0.3rem 0.3rem 0 0;
  z-index: 99;
}
.warpper{
  /* position: absolute; */
  width: 100%;
  height: 4rem;
  overflow: hidden;
}
.swiper-img{
  width: 100%;
  height: 3.5rem;
}
.warpper >>> .swiper-pagination-bullet-active{
    background: #fff;
}
.product-footer-no{
  background-color: #888;
}
</style>
