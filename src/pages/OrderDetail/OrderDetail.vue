<template>
  <div class="detail-main">
    <div class="detail-header">
      <a class="blackto" @click="goBack()">
        <img class="icon-black" src="../../assets/images/My/sp_icon_back.png">
      </a>
      <p class="header-title">订单详情</p>
    </div>
    <div class="orderdetail-info">
      <div class="orderdetail-item">
        <div class="orderdetail-item-info">
          <div class="orderdetail-info-img">
            <img :src="orderDetail.productView.pic0">
              <div  class="orderdetail-info-img-type">{{orderStatusList[(orderDetail.orderView.orderStatus)+1].status}}</div>
          </div>
          <div class="orderdetail-info-text">
            <div class="orderdetail-info-spu">{{orderDetail.productView.productName}}</div>
            <div class="orderdetail-info-sku">{{ageType}}</div>
            <div class="orderdetail-info-bot">
              <div class="orderdetail-info-num">数量： {{orderDetail.orderView.num}}张</div>
              <a @click="toAftersale(orderDetail.orderView.id)" v-if="orderDetail.orderView.afterSaleStatus == 0 && orderDetail.orderView.orderStatus == 1" class="orderdetail-item-btn">申请退款</a>
            </div>
          </div>
        </div>
      </div>
      <div class="orderdetail-text">
        <h2 class="orderdetail-title">预订信息</h2>
        <p class="orderdetail-orderNum">订单号：{{orderDetail.orderView.orderNum}}</p>
        <p class="orderdetail-orderNum">预定人姓名：{{orderDetail.orderView.guestName}}</p>
        <p class="orderdetail-orderNum">预订人手机：{{orderDetail.orderView.guestPhone}}</p>
        <p class="orderdetail-orderNum">出行时间：{{orderDetail.orderView.useTime.split(" ")[0]}}</p>
      </div>
    </div>
    <div v-if="orderDetail.orderView.orderStatus == 1 ||orderDetail.orderView.orderStatus == 2" class="orderdetail-code">
      <div id="query">
        <p class="orderdetail-code-num">核销码：{{orderDetail.orderView.checkCode}}</p>
        <canvas id="canvas"></canvas>
      </div>
    </div>
    <div v-if="showAlter" class="main-currency-back" @touchmove.prevent>
      <div class="sale-after">
        <p><span class="red">*</span>退款理由</p>
        <textarea v-model="remark">
          
        </textarea>
        <div>
          <button @click="refund()">退款</button>
          <button @click="cannel()">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'OrderDetail',
  data () {
    return {
      showAlter:false,
      orderId: 1,
      postNum: "",
      remark:"",
      voucherImg:false,
      voucherPDF: false,
      orderDetail: {productView:{pic:""}},
      orderStatusList : [
        {status: '订单', id: -1},
        {status: '待付款', id: 0},
        {status: '待出行', id: 1},
        {status: '已使用', id: 2},
        {status: '已取消', id: 3},
        {status: '退款中', id: 4},
        {status: '已退款', id: 5},
      ],
    }
  },
  methods:{
    goBack: function () { 
      this.$router.go(-1);
    },
    toAftersale: function (){
      this.showAlter = true;
    },
    cannel(){
      this.showAlter = false;
    },
    refund(){
      this.orderId = this.$route.params.id;
      let that = this;
      let postData = {};
      postData.id = this.orderId;
      postData.orderStatus = 4;
      postData.afterSaleStatus = 1;
      postData.afterSaleRemark = this.remark;
      postData.onlineToken = this.$store.state.token;
      this.$store.commit('changeLoading',true);
      this.$http.post(this.api + 'order/updateOrderStatus',JSON.stringify(postData))
      .then((res) =>{
        console.log(res.data)
        if(res.data.resultCode == 0){
          that.$router.go(0);
        }else{
          
        }
          that.$store.commit('changeLoading',false);
      })
      .catch(function (error) {
        console.log(error);
        that.$store.commit('changeLoading',false);
      });
    },
    useqrcode(code){ 
      //生成的二维码内容，可以添加变量
　　　　this.QueryDetail=code+"";
        var canvas = document.getElementById('canvas');
        console.log(canvas)
        QRCode.toCanvas(canvas, this.QueryDetail, function (error) {
        if (error) console.error(error)
        console.log('success!');
        })
    },
    
  },
  mounted(){
    
  },
  updated(){
    this.useqrcode(this.orderDetail.orderView.checkCode)
  },
  created: function(){
    this.orderId = this.$route.params.id;
    let that = this;
    let postData = {};
    postData.id = this.orderId;
    this.$store.commit('changeLoading',true);
    this.$http.post(this.api + 'order/queryOrderInfo',JSON.stringify(postData))
    .then((res) =>{
      console.log(res.data)
      if(res.data.resultCode == 0){
        that.orderDetail = that.common.setImgUrl2(res.data.data.orderInfo,that.api);
      }else{
      }
        that.$store.commit('changeLoading',false);
    })
    .catch(function (error) {
      console.log(error);
      that.$store.commit('changeLoading',false);
    });
  },
  beforeRouteLeave (to, from, next) { 
    if (to.name == 'Order') {
        to.meta.isUseCache = true;    
    }        
    next();
  },
  computed: {
    ageType(){
      return this.orderDetail.orderView.adultAgePrice==0?"儿童票":"成人票";
    }
  },
}
</script>

<style>
.detail-main{
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.detail-header{
  position: fixed;
  z-index: 201;
  width: 100%;
  /* margin-top: 0.3rem; */
  background: #fff;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  /* border-bottom: 0.01rem solid #ddd;  */
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

.orderdetail-info{
  margin-top: 0.8rem;
}
.orderdetail-item{
  padding-left: 0.28rem;
  background-color: #fff;
  margin: 0.05rem 0;
}
.orderdetail-item-ordernum{
  padding: 0.2rem 0;
  font-size: 0.2rem;
  border-bottom: 0.01rem solid #ddd; 
}
.orderdetail-item-info{
  padding: 0.2rem 0.28rem 0.2rem 0;
  display: flex;
  flex-direction: row; 
}
.orderdetail-info-img{
  height: 1.2rem;
  width: 2rem;
  position: relative;
  border-radius: 0.05rem;
}
.orderdetail-info-img img{
  width: 100%;
  height: 100%;

}
.orderdetail-info-img-type{
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
.orderdetail-info-text{
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 0.28rem;
  justify-content: space-between;
  color: #1a1a1a;
}
.orderdetail-info-spu{
  font-size: .28rem;
  line-height: 0.35rem;
}
.orderdetail-info-sku{
  line-height: 0.35rem;
  font-size: .24rem;
}
.orderdetail-info-bot{
  display: flex;
  line-height: 0.33rem;
  flex-direction: row;
  justify-content: space-between;
}
.orderdetail-info-num{
  font-size: .24rem;
}
.orderdetail-item-btn{
  width: 1.16rem;
  height: 0.36rem;
  line-height: 0.4rem;
  border-radius: 0.2rem;
  text-align: center;
  font-size: 0.22rem;
  color: #aaa;
  background-color: #fff;
  border: 0.01rem solid #aaa;
}
.orderdetail-text{
  margin-top: 0.1rem;
  background-color: #fff;
  padding-left: 0.3rem;
  color: #1a1a1a;
}
.orderdetail-title{
  line-height: 0.9rem;
  font-size: 0.28rem;
  font-weight: bold;
  color: #1a1a1a;
}
.orderdetail-orderNum{
  line-height: 0.84rem;
  border-bottom: 0.01rem solid #eee;
  color: #1a1a1a;
}
.orderdetail-booking-date{
  line-height: 0.84rem;
  color: #1a1a1a;
}
.orderdetail-btn{
  margin-top: 0.3rem;
  width: 90%;
  height: 0.88rem;
  margin-left: 5%;
  background-color: #16a3e6;
  color: #fff;
  line-height:  0.9rem;
  text-align: center;
  border-radius: 0.1rem;
}
.orderdetail-img-voucher{
  position: absolute;
  top: 0.9rem;
}
.orderdetail-img-voucher span{
  display: block;
  position: fixed;
  z-index: 111;
  right: 0.2rem;
  top: 1rem;
  height: 0.5rem;
  width: 0.5rem;
  background-color: #555;
  color: #fff;
  font-size: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  border-radius: 0.26rem;
}
.orderdetail-img-voucher img{
  width: 100%;
}
.orderdetail-pdf-back{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
}
.orderdetail-pdf-voucher{
  position: fixed;
  z-index: 6;
  width: 80%;
  border-radius: 0.1rem;
  left: 10%;
  background-color: #fff;
  top: 25%;
}
.orderdetail-pdf-voucher p{
  position: absolute;
  top: 0.3rem;
  left: 0.3rem;
  font-size: 0.26rem;
}
.orderdetail-pdf-voucher span{
  display: block;
  position: absolute;
  z-index: 111;
  height: 0.4rem;
  width: 0.4rem;
  background: rgba(0, 0, 0, 0.5);
  top: 0.15rem;
  right: 0.2rem;
  color: #fff;
  font-size: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  border-radius: 0.26rem;
}
.orderdetail-pdf-voucher ul{
  padding: 0.3rem;
  margin-top: 0.4rem;
}
.orderdetail-pdf-voucher li{
  line-height: 0.8rem;
  border-top: 0.01rem solid #ddd;
  color: #ff8800;
  font-size: 0.26rem;
}
.orderdetail-code{
  margin-top: 0.05rem;
  background-color: #fff;
}
#query{
  text-align: center;
}
.orderdetail-code-q{

}
.orderdetail-code-num{
  margin-top: 0.4rem;
  text-align: center;
  font-size: 0.30rem;
}


#canvas{
  margin: 0.3rem 0;

  width: 3rem!important;
  height: auto!important;
}
.main-currency-back{
  position: fixed;
  top: 0;
  z-index: 1111;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.sale-after{
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1112;
  top: 10%;
  left: 10%;
  width: 80%; 
  padding: 0.3rem;
  height: 4.1rem;
  background-color: #fff;
  border-radius: 0.1rem;
}
.red{
  color: red;
}
.sale-after p{
  line-height: .4rem;
  margin-bottom: 0.2rem;
}
.sale-after textarea{
  border: 1px solid #ddd;
  height: 2rem;

}
.sale-after div{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.sale-after button{
  text-align: center;
  height: 0.6rem;
  width: 1.5rem;
  line-height: 0.6rem;
  border-radius: 0.12rem;
  color: #fff;
  margin-top: 0.3rem;
  background-color: #17a2e7;
}


</style>
