<template>
  <div class="payment-main">
    <div class="payment-header">
      <div class="blackto" @click="goBack()">
        <img class="icon-black" src="../../assets/images/My/sp_icon_back.png">
      </div>
      <p class="header-title">订单支付</p>
    </div>
    <div class="payment-center">
      <div class="payment-contnet">
        <div class="payment-time">
          {{$t('text.paymentTime')}}<span v-if="endTime.hours != 0">: {{endTime.hours}}:</span>{{endTime.minutes}}:{{endTime.seconds}}
        </div>
        <div class="payment-money">
          <span class="payment-money-cur">￥</span>{{sum}}
        </div>
      </div>
      
      <ul class="payment-type-list">
        <li @click="choosePaymentType(0)" class="payment-type-item">
          <div class="payment-type-left">
            <img src="../../assets/images/product/alipay.png">
            <span class="payment-type-name">{{$t('itemName.zhifubao')}}</span>
          </div>
          <span class="payment-type-right" :class="{payment_type_choose: paymentType == 0}">
            <img src="../../assets/images/product/hook.png">
          </span>
        </li>
        <li  @click="choosePaymentType(1)" class="payment-type-item">
          <div class="payment-type-left">
            <img src="../../assets/images/product/wechat.png">
            <span class="payment-type-name">{{$t('itemName.weixin')}}</span>
          </div>
          <div class="payment-type-right" :class="{payment_type_choose: paymentType == 1}">
            <img src="../../assets/images/product/hook.png">
          </div>
        </li>
        <li  @click="choosePaymentType(2)" class="payment-type-item">
          <div class="payment-type-left">
            <img src="../../assets/images/product/PayPal.png">
            <span class="payment-type-name">PayPal</span>
          </div>
          <div class="payment-type-right" :class="{payment_type_choose: paymentType == 2}">
            <img src="../../assets/images/product/hook.png">
          </div>
        </li>
      </ul>
    </div>
    <div class="warm-text">
      <p>*本网站不收取任何交易手续费或附加费。</p>
    </div>
    <a @click="paymentOrder()">
      <div class="payment-footer">
        {{$t('buttom.payment')}}
      </div>
    </a>
    <div style="display: none" id="paymentArea2">0</div>
  </div>
</template>

<script>
export default {
  name: 'Payment',
  data () {
    return {
      sum: 0,
     paymentType: 0,
     orderInfo: {},
     endTime: {hours: 0,minutes: 0,seconds: 0},
    }
  },
  created: function () {
    this.$store.commit('showNav',false);
    this.$store.commit('changeLoading',true);
    this.orderId = this.$route.params.id;
    let that = this;
    let postData = {};
    postData.id = this.orderId;
    this.$store.commit('changeLoading',true);
    this.$http.post(this.api + 'order/queryOrderInfo',JSON.stringify(postData))
    .then((res) =>{
      console.log(res.data)
      if(res.data.resultCode == 0){
         that.orderInfo = res.data.data.orderInfo;
          that.sum = that.orderInfo.orderView.num * that.common.getAgeAndPrice(that.orderInfo.orderView).price;
         let createTime = res.data.data.orderInfo.orderView.createTime;
         // var interval = setInterval(function(){
         //    var now = Date.parse(new Date());
         //    var etime = Date.parse(new Date(createTime.replace(/-/g, '/')));
         //    let usedTime = etime + (2*3600*1000) - now;  //两个时间戳相差的毫秒数
         //    var leave1=usedTime%(24*3600*1000)    //计算天数后剩余的毫秒数
         //    that.endTime.hours=Math.floor(leave1/(3600*1000))
         //    var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
         //    that.endTime.minutes=Math.floor(leave2/(60*1000))
         //    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
         //    that.endTime.seconds=Math.round(leave3/1000)  
         //      // clearInterval(interval);
         //  },1000); 
        that.$store.commit('changeLoading',false);
      }else{
        that.$store.commit('changeLoading',false);
      }
        that.$store.commit('changeLoading',false);
    })
    .catch(function (error) {
      console.log(error);
      that.$store.commit('changeLoading',false);
    });
   
  },
  methods:{
    goBack: function () {
      this.$router.go(-1);
    },
    choosePaymentType: function (index) {
      this.paymentType = index;
    },
    paymentOrder: function () {
      let that = this;
      let postData = {};
      postData.id = this.orderId;
      postData.orderStatus = 1;
      postData.onlineToken = this.$store.state.token;

      this.$store.commit('changeLoading',true);
      this.$http.post(this.api + 'order/updateOrderStatus',JSON.stringify(postData))
      .then((res) =>{
        console.log(res.data)
        if(res.data.resultCode == 0){
          this.$router.replace({ path: "/order/-1" });
        }else{

        }
          that.$store.commit('changeLoading',false);
      })
      .catch(function (error) {
        console.log(error);
        that.$store.commit('changeLoading',false);
      });
    },
  },
  computed:{
  }
}

</script>

<style>
.payment-title{
   font-weight: bold;
  height: 0.8rem;
  line-height: 0.9rem;
  padding-right: 0.3rem;
  border-bottom: 0.01rem  solid #f0f0f0;
  background-color: #fff;
  font-size: 0.28rem;
}
.header-title{
  font-size: 0.35rem;
}
.payment-main{
  display: flex;
  flex-direction: column;
  padding-bottom: 0.9rem;
}
.payment-header{
  position: fixed;
  width: 100%;
  z-index: 201;
  /* margin-top: 0.3rem; */
  background: #fff;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  /* border-bottom: 1px solid #ddd;  */
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
.payment-center{
  
  margin-top: 1rem;
  
}
.payment-contnet{
  padding-left:0.3rem; 
  height: 2rem;
  background-color: #fff;
}
.payment-time{
  font-size: 0.28rem;
  color: #808080;
  text-align: center;
  padding-top: 0.4rem;
}
.payment-money{
  font-size: 0.6rem;
  padding-top: 0.3rem;
  color:#333;
  text-align: center;
}
.payment-money-cur{
  font-size: 0.4rem;
}
.payment-type-list{
  background-color: #fff;
  margin-top: 0.1rem;
}
.payment-type-item{
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  height: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 1.1rem;
  border-bottom: 0.01rem  solid #f0f0f0;
}
.payment-type-left{
  display: inline-block;
  font-size: 0.28rem;
  color: #4e4e4e;
}
.payment-type-left img{
  width: 0.6rem;
  margin-right: 0.12rem;
}
.payment-type-name{

}
.payment-type-right{
  height: 0.34rem;
  width: 0.34rem;
  margin-top: 0.35rem;
  position: relative;
  background-color: #fff; 
  border-radius: 0.19rem;
  border: 0.01rem solid #ddd;
}
.payment-type-right img{
  top: 0.07rem;
  width: 0.3rem;
  left: 0.02rem;
  position: absolute;
}
.payment_type_choose{
  background-color: #24abf0;
  border:0.01rem solid #24abf0;
}
.payment-footer{
  height: 0.9rem;
  font-size: 0.28rem;
  width: 100%;
  z-index: 101;
  background: linear-gradient(to right, #54c3fc, #24abf0);
  color: #fff;
  text-align: center;
  line-height: 0.9rem;
  position: fixed;
  bottom: 0;
}
.warm-text{
  padding:  0.2rem;
  color: #4e4e4e;
  font-size: 0.22rem;
  line-height: 0.3rem;
}
</style>
