<template>
  <div class="seach-main">
    <div class="seach-header">
      <router-link class="blackto" to="/main">
        <img class="icon-black" src="../../assets/images/My/sp_icon_back.png">
      </router-link>
      <p class="header-title">商品</p>
    </div>
    <nav class="seach-top-nav">
      <div class="seach-seach">
        <router-link to="/destination" class="seach-top-city">
          <p>{{city}}</p><span class="iconfont seach-down-arrow">&#xe674;</span>
        </router-link><!-- 
        <div class="seach-seach-area"> -->
        <input v-model="seachText"  type="text" placeholder="长隆欢乐世界" to="/seach" class="seach-seach-input" />
         <!--  <img src="../../assets/images/Main/home_icon_search.png">
        </div> --> 
       <div  class="seach-message">
          <!-- <img src="../../assets/images/Main/home_icon_xx_s.png"> -->
          <a @click="seachInput()">搜索</a>
        </div>
      </div>
      <ul id="seach_type" class="seach-type-list">
        <li v-for="item of seachTypeList"  :class="{seach_type_choose : item.name == seachType }"  class="seach-type-item" @click="changeSeachType(item.name)">{{item.name}}</li>
      </ul>
    </nav>   
    <scroller :on-infinite="infinite" ref="product_scroller" class="product_scroller" >
      <ul class="seach-spu-list">
        <router-link tag="li" v-for="item of productInfoList" :to="'/product/'+item.id" :key="item.id" class="seach-spu-item">
          <img :src="item.pic0">
          <div class="seach-spu-info">
            <p class="seach-spu-title">
              {{item.productName}}
            </p>
            <div class="seach-spu-bot">
              <p>
                <!-- <span class="seach-spu-score">{{item.score}}{{$t('text.fen')}}</span> -->
                <span class="seach-spu-snum">{{$t('text.yxl')}}{{item.saleSum}}{{$t('text.num')}}</span>
              </p>
              <p>
                <span class="seach-spu-cur">￥</span>
                <span class="seach-spu-price">{{item.childrenAgePrice}}</span>
                <span class="seach-spu-text">起</span>
              </p>
            </div>
          </div>
        </router-link>
      </ul>
    </scroller>
  </div>
</template>

<script>
export default {
  name: 'Seach',
  data () {
    return {
      pageNum: 1,
      seachText: '',
      type: 'all',
      seachType: "",
      haveMoreProduct: true,
      my_scroller: "",
      seachTypeList: [
        {name: "全部", type: 'all', id: 0},
        {name: "景点", type: 'jq', id: 1},
        {name: "游乐场", type: 'ylc', id: 2},
        {name: "演出体验", type: 'ty', id: 3},
      ],
      noDataText: '没有更多数据了！',
      productInfoList: [
         
      ],
    }
  },
  methods:{
    getType(type){
      for (var item of this.seachTypeList) {
        if(item.type == type){
            return item.name;
        } 
      }
    },
    //搜索
    seachInput: function () {
      window.scroll(0, 0);
      let that = this;
      let postData = {};
      if(this.seachText != ''){
        postData.productTitle = this.seachText;
      }
      this.$store.commit('changeLoading',true);
      this.pageNum = 1;
      if(this.seachText != ''){
        postData.productName = this.seachText;
      }
      if(this.city != "全部"){
        postData.localName = this.city;
      }
      postData.pageNum = this.pageNum;
      postData.type = this.seachType == "全部"?"":this.seachType;
      this.$http.post(this.api + 'product/productInfoList',JSON.stringify(postData))
      .then((res) =>{
        if(res.data.resultCode == 0){
          that.productInfoList = [];
          var datalist = that.common.changeImgUrl(res.data.data.productInfoList,that.api);
          for( var i = 0; i < datalist.length; i++){
            that.$set (that.productInfoList ,i, datalist[i]);
          }
          if(datalist.length < 10){
            that.haveMoreProduct = false;
          }else{
            that.haveMoreProduct = true;
          }
        }else{
          that.$toast(res.data.resultMsg ,{
            // className: 'et-no',
            horizontalPosition: 'center',
            duration: 2000,
            verticalPosition: 'top'
            }
          );
        }
        this.$store.commit('changeLoading',false);
      });
    },
    //选择商品种类
    changeSeachType: function (type) {
      this.seachType = type;
      window.scroll(0, 0);
      let that = this;
      let postData = {};
      this.pageNum = 1;
      this.$store.commit('changeLoading',true);
      if(this.seachText != ''){
        postData.productName = this.seachText;
      }
      if(this.city != "全部"){
        postData.localName = this.city;
      }
      postData.pageNum = this.pageNum;
      postData.type = this.seachType == "全部"?"":this.seachType;
      this.$http.post(this.api + 'product/productInfoList',JSON.stringify(postData))
      .then((res) =>{
        if(res.data.resultCode == 0){
          that.productInfoList = [];
          var datalist = that.common.changeImgUrl(res.data.data.productInfoList,that.api);
          for( var i = 0; i < datalist.length; i++){
            that.$set (that.productInfoList ,i, datalist[i]);
          }
          if(datalist.length < 10){
            that.haveMoreProduct = false;
          }else{
            that.haveMoreProduct = true;
          }
        }else{
          that.$toast(res.data.resultMsg ,{
            // className: 'et-no',
            horizontalPosition: 'center',
            duration: 1000,
            verticalPosition: 'top'
            }
          );
        }
        this.$store.commit('changeLoading',false);
      });
    },
    //下滑加载更多
    handleScrollBottom: function () {
      let self = this;
      console.log(this.haveMoreProduct)
      if(this.haveMoreProduct){
        // if(window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight ){
          if(self.pageNum == 1){
            self.pageNum = 2;
          }
          let postData = {};
          this.$store.commit('changeLoading',true);
          if(this.seachText != ''){
            postData.productName = this.seachText;
          }
          if(this.city != "全部"){
            postData.localName = this.city;
          }
          postData.pageNum = this.pageNum;
          postData.type = this.seachType == "全部"?"":this.seachType;
          this.$http.post(this.api + 'product/productInfoList',JSON.stringify(postData))
          .then((res) =>{
            if(res.data.resultCode == 0){
              if(res.data.data.productInfoList.length > 0){
                var datalist = that.common.changeImgUrl(res.data.data.productInfoList,that.api);
                self.pageNum++;
                for (var i = 0; i < datalist.length; i++) {
                  self.productInfoList.push(datalist[i]);
                }
                if(res.data.data.productInfoList.length < 10){
                  self.haveMoreProduct = false;
                }else{
                  self.haveMoreProduct = true;
                }
              }
            }else{
               self.$toast(res.data.resultMsg,{
                horizontalPosition: 'center',
                duration: 1000,
                verticalPosition: 'top'
                }
              );
            }
            this.$store.commit('changeLoading',false);
          });
        // }
        return this.haveMoreProduct;
      }
    },
    //加载数据
    onLoad(){
      this.seachType = this.getType(this.$route.params.id);
      let that = this;
      this.$store.commit('changeLoading',true);
      let postData = {};
      if(this.seachText != ''){
        postData.productName = this.seachText;
      }
      if(this.city != "全部"){
        postData.localName = this.city;
      }
      postData.pageNum = this.pageNum;
      postData.type = this.seachType == "全部"?"":this.seachType;
      this.$http.post(this.api + 'product/productInfoList',JSON.stringify(postData))
      .then((res) =>{
        if(res.data.resultCode == 0){
          that.productInfoList = that.common.changeImgUrl(res.data.data.productInfoList,that.api);
        }
        if(res.data.data.productInfoList.length < 10){
          that.haveMoreProduct = false;
        }else{
          that.haveMoreProduct = true;
        }
         that.$store.commit('changeLoading',false);
      })
    },
    infinite(){
      console.log(1)
      if(this.handleScrollBottom()){
         this.$refs.product_scroller.finishInfinite(true);
      }else{
         this.$refs.product_scroller.finishInfinite(false);
      }
    },

  },
  //隐藏底部导航栏
  beforeCreate: function(){
     this.$store.commit('showNav',false);
     
  },
  
  activated() {
    // isUseCache为false时才重新刷新获取数据
    // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的   
    // window.addEventListener('scroll', this.handleScrollBottom);      
    if(!this.$route.meta.isUseCache){            
        this.productInfoList = []; // 清空原有数据
        this.seachText = '';
        this.pageNum = 1;
        this.onLoad(); // 这是我们获取数据的函数
        let index = 0;
        for (var i = 0; i < this.seachTypeList.length; i++) {
          if(this.seachTypeList[i].type == this.seachType){
            index = i;
          }
        }
        document.getElementById('seach_type').scrollLeft = (70 * index);
        this.$route.meta.isUseCache = false;    
      } 
  },
  // 回到首页清除缓存
  beforeRouteLeave (to, from, next) { 
    if (to.name == 'Main') {
        from.meta.isUseCache = false;    
    }        
    // window.removeEventListener('scroll', this.handleScrollBottom);
    next();
  },
  //获得城市
  computed: {
    city: function () {
      return this.$store.state.city;
    }
  },
}
</script>

<style>
.seach-main{
}
.seach-header{
  top: 0;
  position: fixed;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center; 
  width: 100%;
  z-index: 201;
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
/* 顶部搜索 */
.seach-top-nav{
  top: 0.9rem;
  position: fixed;
  width: 100%;
  z-index: 50;
  background-color: #fff;
}
.seach-seach{
  padding: 0.1rem 0;
  display: flex;
  flex-direction: row;

  justify-content: space-around;
}
.seach-seach *{
  display: inline-block;
}
.seach-top-city{
  line-height: 0.60rem;
  font-size: 0.28rem;
  margin-left: 0.2rem;
  color: #000;
  overflow: hidden; 
}
.seach-down-arrow{
  line-height: 0.1rem;
}
.seach-seach-input{
  height: 0.56rem;
  line-height: 0.5rem;
  padding-left: 0.3rem;
  width: 4.5rem;
  background-color: #eeeeee;
  border-radius: 0.28rem;
  font-size: 0.26rem;
  color: #555;
}
/* .seach-seach-area{
  position: relative;
}
.seach-seach-area img{
  position: absolute;
  top: 0.12rem;
  left: 0.25rem;
  z-index: 111;
  height: 0.3rem;
} */
.seach-message{
  line-height: 0.60rem;
  margin-right: 0.1rem;
}
.seach-message a{
  color: #1a1a1a;
}
.seach-down-arrow{
  color: #ccc;
}
/* 产品分类选择 */
/* .main-seach{
  margin-top: 0.1rem;
  background-color: #fff;
  padding: 0.5rem 0 0 0.3rem;
} */
.seach-type-list{
  overflow-y: scroll;
  white-space:nowrap;
  display: block;
  margin-left: 0.05rem;
  border-bottom: .01rem solid #ddd;
  border-top: .01rem solid #ddd;
}
.seach-type-item{
  display: inline-block;
  font-size: 0.28rem;
  padding: 0.15rem 0.33rem;
  margin: 0 0.15rem;
}
.seach_type_choose{
  color: #3399cc;
  border-bottom: 0.05rem solid #3399cc;
}
.seach-spu-list{
  margin-top: 2.65rem;
  margin-left: 0.2rem;
  padding-bottom: 2.1rem;
}
.product_scroller{
}
.seach-spu-item{
  display: flex;
  flex-direction: row;
  margin-top: 0.2rem;
}
.seach-spu-item img{
  width: 2.7rem;
  height: 1.6rem;
  border-radius: 0.1rem;
}
.seach-spu-info{
  display: flex;
  flex:1;
  height: 1.6rem;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 0.2rem;
  padding-bottom: 0.2rem;
  border-bottom: .01rem solid #ddd;
}
.seach-spu-title{
  font-size: 0.28rem;
  line-height: 0.35rem;
  color: #1a1a1a;
}
.seach-spu-mark {
  line-height: 0.5rem;
}
.seach-spu-mark span{
  display: inline-block;
  font-size: 0.20rem;
  width: 0.9rem;
  height: 0.32rem;
  text-align: center;
  line-height: 0.36rem;
  margin-right: 0.1rem;
  color: #595959;
  border: 0.01rem solid #e5e5e5;
  border-radius: 0.05rem;
}
.red-mark{
  color: #ff5351 !important;
  border: 0.01rem solid #ff5351 !important;
}
.seach-spu-bot{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.seach-spu-score{
  font-size: 0.22rem;
  color: #3399cc;
}
.seach-spu-snum{
  font-size: 0.22rem;
  color: #8f8f8f;
}
.seach-spu-bot p{
  margin-right: 0.2rem;
}
.seach-spu-cur{
  font-size: 0.20rem;
  color: #ff4242;
}
.seach-spu-price{
  font-size: 0.3rem;
  color: #ff4242;
}
.seach-spu-text{
  font-size: 0.2rem;
  color: #8f8f8f;
}

</style>
