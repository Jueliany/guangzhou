<!-- 订单列表 -->
<template>
  <div class="order-main">
    <div class="order-header">
      <a class="blackto" @click="goBack()">
        <img class="icon-black" src="../../assets/images/My/sp_icon_back.png">
      </a>
      <p class="header-title">{{$t('pages.myOrderList')}}</p>
    </div>
    <!-- 订单类型列表 -->
    <nav class="order-type">
      <ul class="order-type-list" id="orderlist">
        <li @click="chooseOrderStatus(item.id)" v-if="indexx < 4" v-for="(item,indexx) of orderStatusList" :class="{choose_order_type: orderStatus == item.id}" class="order-type-item " :key="item.id">{{item.status}}</li>
      </ul>
    </nav>
    <!-- 订单列表 -->
    <scroller :on-infinite="infinite" ref="order_scroller" class="order_scroller" >
      <ul class="order-list">
        <li v-for="(item, index) of orderList"  class="order-item">
          <div class="order-item-ordernum">订单号：{{item.orderView.orderNum}}</div>
          <div class="order-item-info">
            <div class="order-info-img">
              <img :src="item.productView.pic0">
              <div  class="order-info-img-type">{{orderStatusList[(item.orderView.orderStatus)+1].status}}</div>
            </div>
            <div class="order-info-text">
              <div @click="gotoOrder(index)" class="order-info-spu">{{item.productView.productName}}</div>
              <div class="order-info-bot">
                <div class="order-info-num">{{$t('itemName.package')}}： {{item.orderView.num}}{{$t('text.z')}}</div>
                <div @click="gotoOrder(index)" :class="{order_item_btn2: item.orderView.orderStatus != 0}" class="order-item-btn">{{orderStatusBtn(item.orderView.orderStatus)}}</div>
              </div>
            </div>
          </div>
        </li>
        <li class="order-boot"></li>
      </ul>
    </scroller>  
    <!-- 加载logo -->
    <!-- <div class="order-loading" v-if="loadMoreOrder">
      <hr>
      <div>
        <span>Loading</span>
        <img src="../../assets/images/loading2.gif">
      </div>
      <hr>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
      orderStatus: 0,
      pageOrderNum: 1,
      haveOrder: true,
      loadMoreOrder: false,
      orderStatusList : [
        {status: '订单', id: -1},
        {status: '待付款', id: 0},
        {status: '待出行', id: 1},
        {status: '已使用', id: 2},
        {status: '已取消', id: 3},
        {status: '退款中', id: 4},
        {status: '已退款', id: 5},
      ],
      orderList: [
       
      ],
    }
  },
  beforeCreate: function(){
     this.$store.commit('showNav',false);
  },
  created: function(){
  },
  mounted: function(){
  },
  computed:{
    
  },
  methods:{
    
    chooseOrderStatus: function(id){
      this.orderStatus = id;
      this.$router.replace('/order/'+id);
      this.$router.go(0);
      this.pageOrderNum = 1;
      let that = this;
      let postData = {};
      postData.pageNum = this.pageOrderNum;
      postData.pageSize = 10;
      if(this.orderStatus != -1){
        postData.orderStatus = this.orderStatus;
      }
      postData.createUserName = this.$store.state.user;
      this.$store.commit('changeLoading',true);
      this.$http.post(this.api + 'order/queryOrderInfoList',JSON.stringify(postData))
      .then((res) =>{
        that.orderList = res.data.data.orderInfoList;
        this.$store.commit('changeLoading',false);
      })

    },
    // 点击订单
    gotoOrder: function(index) {
      switch(this.orderList[index].orderView.orderStatus){
        case 0: this.$router.push({path: '/payment/' + this.orderList[index].orderView.id});
          break;
        case 1: this.$router.push({path: '/orderdetail/' + this.orderList[index].orderView.id});
          break;
        case 2: this.$router.push({path: '/orderdetail/' + this.orderList[index].orderView.id});
          break;
        case 3: this.$router.push({path: '/orderdetail/' + this.orderList[index].orderView.id});
         break;
        case 4: this.$router.push({path: '/orderdetail/' + this.orderList[index].orderView.id});
         break;
        case 5: this.$router.push({path: '/orderdetail/' + this.orderList[index].orderView.id});
         break;
        default: ;
         break;
      }
    },
    orderStatusBtn: function(id) {
      var btn = "";
      switch(id){
        case 0: btn = this.$t('buttom.payment');
          break;
        case 1: btn = this.$t('buttom.dateil');
          break;
        case 2: btn = this.$t('buttom.dateil');
          break;
        case 3: btn = this.$t('buttom.dateil') ;
         break;
        case 4: btn = this.$t('buttom.dateil');
          break;
        case 5: btn = this.$t('buttom.dateil');
          break;
        default: btn = "";
         break;
      }
      return btn;
    },
    // 下拉加载
    handleScrollOrderBottom: function () {
      let self = this;
        if(self.pageOrderNum == 1){
          self.pageOrderNum = 2;
        }
        if(self.haveOrder){
          self.$store.commit('changeLoading',true);
          // self.loadMoreOrder = true;
          let postData = {};
          postData.pageNum = this.pageOrderNum;
          postData.pageSize = 10;
          if(this.orderStatus != -1){
            postData.orderStatus = this.orderStatus;
          }
          postData.createUserName = this.$store.state.user;
          this.$http.post(this.api + 'order/queryOrderInfoList',JSON.stringify(postData))
          .then((res) =>{
            if(res.data.resultCode == 0){
              if(res.data.data.orderInfoList.length > 0){
                self.pageOrderNum++;
                self.haveOrder = true;
                // self.loadMoreOrder = false;
                for (var i = 0; i < res.data.data.orderInfoList.length; i++) {
                  self.orderList.push(res.data.data.orderInfoList[i]);
                }
              }else{
                if(self.haveOrder){
                  self.$toast("没有更多订单",{
                  // className: 'et-no',
                  horizontalPosition: 'center',
                  duration: 1000,
                  verticalPosition: 'top'
                  });
                }
                self.haveOrder = false;
                // self.loadMoreOrder = false;
              }
            }
            self.$store.commit('changeLoading',false);
          });
        }
        return self.haveOrder;
    },
    //
    onLoadOrder(){
      this.orderStatus = this.$route.params.id;
      let that = this;
      let postData = {};
      postData.pageNum = this.pageOrderNum;
      if(this.orderStatus != -1){
        postData.orderStatus = this.orderStatus;
      }
      postData.pageSize = 10;
      postData.createUserName = this.$store.state.user;
      
      this.$store.commit('changeLoading',true);
      this.$http.post(this.api + 'order/queryOrderInfoList',JSON.stringify(postData))
      .then((res) =>{
        that.orderList = res.data.data.orderInfoList;
        that.$store.commit('changeLoading',false);
      })
    },
    goBack: function () { 
      this.$router.replace('/my');
    },
    infinite(){
      var more = this.handleScrollOrderBottom();
        console.log(more)
      if(more){
         this.$refs.order_scroller.finishInfinite(true);
      }else{
         this.$refs.order_scroller.finishInfinite(false);
      }
    },
  },
  beforeDestroy:function(){
  },
  activated() {  
    // window.addEventListener('scroll', this.handleScrollOrderBottom);
    if(!this.$route.meta.isUseCache){            
        this.orderList = []; // 清空原有数据
        this.pageOrderNum = 1;
        this.haveOrder = true;
        this.loadMoreOrder = false;
        this.onLoadOrder(); // 这是我们获取数据的函数
        this.$route.meta.isUseCache = false;    
      } 
  },
  beforeRouteLeave (to, from, next) { 
    if (to.name != 'OrderDetail') {
        from.meta.isUseCache = false;    
    }        
    // window.removeEventListener('scroll', this.handleScrollOrderBottom);
    next();
  },
}
</script>

<style>
.order-main{
  display: flex;
  flex-direction: column;
}
.order-header{
  position: fixed;
  z-index: 201;
  width: 100%;
  /* margin-top: 0.3rem; */
  background: #fff;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  border-bottom: 0.01rem solid #ddd; 
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
.order-type{
  width: 100%;
  height: 0.64rem;
  position: fixed;
  z-index: 100;
  top: 0.9rem;
  background-color: #fff;
  border-top: 0.01rem solid #ddd;
  border-bottom: 0.01rem solid #ddd; 
}

.order-type-list{
  line-height: 0.64rem;
  height: 0.64rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.order-type-item{
  padding: 0 0.15rem;
  font-size: 0.3rem;
}
.choose_order_type{
  border-bottom: 0.05rem solid #3399cc;
  color: #3399cc;
}
.order-list{
  display: flex;
  flex-direction: column; 
  flex: 1;
  margin-top: 1.7rem;
}
.order-item{
  padding-left: 0.28rem;
  background-color: #fff;
  margin: 0.05rem 0;
}
.order-item-ordernum{
  padding: 0.2rem 0;
  font-size: 0.2rem;
  border-bottom: 0.01rem solid #ddd; 
}
.order-item-info{
  padding: 0.2rem 0.28rem 0.2rem 0;
  display: flex;
  flex-direction: row; 
}
.order-info-img{
  height: 1.2rem;
  width: 2rem;
  position: relative;
  border-radius: 0.05rem;
  /* overflow: hidden; */
}
.order-info-img img{
  width: 100%;
  height: 100%;

}
.order-info-img-type{
  width: 0.75rem;
  height: 0.36rem;
  position: absolute;
  font-size: 0.18rem;
  line-height: 0.40rem;
  color: #fff;
  text-align: center;
  background-color: #3399cc;
  top: 0;
  left: 0;
}
.order-info-text{
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0.28rem;
  justify-content: space-between;
  color: #1a1a1a;
}
.order-info-spu{
  font-size: .28rem;
  overflow:hidden;
  line-height: 0.35rem;
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1; 
}
.order-info-sku{
  line-height: 0.35rem;
  font-size: .24rem;
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1; 
}
.order-info-bot{
  display: flex;
  line-height: 0.43rem;
  flex-direction: row;
  justify-content: space-between;
}
.order-info-num{
  font-size: .24rem;
}
.order-item-btn{
  width: 1.16rem;
  height: 0.36rem;
  line-height: 0.4rem;
  border-radius: 0.2rem;
  text-align: center;
  font-size: 0.22rem;
  color: #fff;
  background-color: #FE6E6E;
  border: 0.02rem solid #FE6E6E;
}
.order_item_btn2{
  color: #aaa;
  background-color: #fff;
  border: 0.01rem solid #aaa;
}
.order-loading{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.order-loading hr{
}
.order-loading div{
  width: 2rem;
  color: #bbb;
}
.order-loading img{
  height: 0.8rem;
}
.order-boot{
  height: 2rem;
  width: 100%;
}

</style>
