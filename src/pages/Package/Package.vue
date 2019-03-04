<template>
  <div class="package-main">
    <div class="package-header">
      <a class="blackto" @click="goBack()">
        <img class="icon-black" src="../../assets/images/My/sp_icon_back.png">
      </a>
      <p class="header-title">下单</p>
    </div>
    <div class="package-center">
      <div class="booking-order-info">
        <div class="booking-spu-title ">{{productInfo.productName}}</div>
      </div>
      <!-- 套餐类型开始 -->
      <div class="package-type">
        <div class="package-type-list">
          <div @click="chooseSku(0)" :class="{package_choose: 0 == skuIndex}"  class="package-type-item">成人票</div>
          <div @click="chooseSku(1)" :class="{package_choose: 1 == skuIndex}"  class="package-type-item">儿童票</div>
        </div>
      </div>
      <!-- 出游人群开始 -->
     <!--  <div class="package-people">
        <p class="package-title">{{$t('title.cyrq')}}</p>
        <div class="package-people-list">
          <div v-for="(item,index) of skuList[skuIndex].ageList" @click="chooseAge(index)" :class="{package_choose: index == ageIndex}" class="package-people-item">{{item.ageName}}</div>
        </div>
      </div> -->
      <!-- 出游人群结束 -->
      <!-- 购买数量开始 -->
      <div class="package-buy"  >
        <div class="package-buy-title">数量</div>
        <div class="package-buy-num">
          <button class="package-buy-set " :class="{package_buy_no:number == 0}" @click="delNumber()">-</button>
          <div>{{number}}</div>
          <button class="package-buy-set" @click="addNumber()">+</button>
        </div>
      </div>
       <div class="booking-person-info">
        <div class="booking-info-list">
          <div class="booking-info-item booking-info-title">
            <div class="booking-info-name">{{$t('itemName.bookInfo')}}</div>
            <span>{{$t('placeholder.bookingMessage')}}</span>
          </div>
          <!-- 预定信息行 -->
          <div class="booking-info-item" >
            <div  class="booking-info-name">预订人
            </div>
            
            <!-- 手动输入 -->
             <!-- 普通输入框 -->
            <input class="booking-info-input" v-model="name" type="text" placeholder="请输入联系人"/>
            <!-- <input class="booking-time" type="date" v-else-if="item.inputTypeId == 56" v-model="bookingInfoList[index].bookInfoValue" /> -->
           
          </div>
          <div class="booking-info-item" >
            <div  class="booking-info-name">联系电话
            </div>
            
            <!-- 手动输入 -->
             <!-- 普通输入框 -->
            <input class="booking-info-input" v-model="phone" type="text"  name="booking-info" placeholder="请输入手机号码"/>
           
          </div>
          <div class="booking-info-item" >
            <div  class="booking-info-name">邮箱
            </div>
            
            <!-- 手动输入 -->
             <!-- 普通输入框 -->
            <input class="booking-info-input" v-model="email" type="text"  name="booking-info" placeholder="请输入邮箱"/>
           
          </div>
          <div class="booking-info-item" >
            <div  class="booking-info-name">使用时间
            </div>
            <!-- 手动输入 -->
             <!-- 普通输入框 -->
            
            <datetime 
              class="booking-time"
              v-model="useDate" 
              format="YYYY-MM-DD"    
              placeholder="请选择使用时间"
              >
            </datetime>
          </div>
        </div>
      </div>
       <div class="booking-remark">
        <div class="booking-remark-name">{{$t('itemName.remark')}}</div>
        <div class="booking-remark-input"><textarea v-model="remark" type="area" name="remark"/></div>
      </div>
      <!-- 购买数量结束 -->
      <!-- 底部按钮 -->
      <div class="package-footer">
        <div class="package-footer-num">
          <span class="package-footer-cur">￥</span>
          <span class="package-footer-price">{{priceSum}}</span>
        </div>
        <button :disabled="priceSum < 0" @click="booking()" class="package-footer-btn">
          {{$t('buttom.booking')}}
        </button>
      </div>
    </div>
      
  </div>
</template>

<script>
export default {
  name: 'Package',
  data () {
    return {
      skuIndex: 0,
      productInfo: {},
      name:"",
      phone: "",
      useDate: "",
      email:'',
      remark:"",
      number: 0,
      dayPrice: [0,0],
    }
  },
  beforeCreate: function(){
    this.$store.commit('showNav',false);
    if(this.$store.state.token == ''){
       this.$router.replace({ path: "/login" }) ;
    }
  },
  created: function() {
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
        var prices = [];
        prices.push(data.adultAgePrice)
        prices.push(data.childrenAgePrice)
        that.dayPrice = prices;
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

  computed: {
    priceSum: function() {
      let sum = 0;
      sum = this.dayPrice[this.skuIndex] * this.number;
      return sum;
      // return (this.skuList[this.skuIndex].ageList[this.ageIndex].price * this.number);
    },
    
  },
  methods: {
    goBack: function () { 
      this.$router.go(-1);
    },

    chooseSku: function (index) {
      let that = this;
      this.skuIndex = index;
      this.ageIndex = 0;
      this.number = 0;
      
    },
    addNumber: function(index) {
         this.number ++;
    },
    delNumber: function(index) {
      if(this.number > 0){
        this.number --;
      }
    },
    booking: function() {
      if(this.priceSum > 0){
        let that = this;
        if(this.$store.state.token != ""){
          let postData = {};
          postData.productId = this.$route.params.id;
          postData.num = this.number;
          postData.guestName = this.name;
          postData.guestPhone = this.phone;
          postData.guestEmail = this.email;
          postData.useTime = this.useDate;
          postData.remark = this.remark;
          if(this.skuIndex){
            postData.childrenAgePrice = this.dayPrice[this.skuIndex];
          }else{
            postData.adultAgePrice = this.dayPrice[this.skuIndex];
          }
          postData.onlineToken = this.$store.state.token;
          this.$http.post(this.api + 'order/insertOrder',JSON.stringify(postData))
          .then((res) => {
            if(res.data.resultCode == 0){
              that.$router.replace({ path: "/payment/"+res.data.data.orderId }) ;
            }else{
              that.$toast(res.data.data.resultMsg,{
                horizontalPosition: 'center',
                duration: 2000,
                verticalPosition: 'top'
                }
              );
              // that.$store.commit('changeToken',"");
              // that.$router.push({ path: "/login" }) ;
            }
          }).catch(function (error) {
            console.log(error);
          });
        }else{
          that.$toast("请登录！",{
              horizontalPosition: 'center',
              duration: 2000,
              verticalPosition: 'top'
              }
            );
          that.$router.push({ path: "/login" }) ;
        }
       
      }else{
         this.$toast("请选择数量" ,{
            // className: 'et-no',
            horizontalPosition: 'center',
            duration: 1000,
            verticalPosition: 'top'
            }
          );
      }
    },
  },
  beforeCreate: function(){
     this.$store.commit('showNav',false);
  },
}
</script>

<style>
.package-title{
   font-weight: bold;
  height: 0.8rem;
  line-height: 0.9rem;
  padding-right: 0.3rem;
  border-bottom: 0.01rem  solid #f0f0f0;
  background-color: #fff;
  font-size: 0.28rem;
}

.package-main{
  display: flex;
  flex-direction: column;
}
.package-header{
  position: fixed;
  z-index: 201;
  width: 100%;
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
.header-title{
  font-size: 0.35rem;
}
.package-center{
  margin-top: 1rem;
  background:  #fff;
}
.package-type{
  padding-left: 0.3rem;
}
.package-type-list{
  display: block;
  margin-bottom: 0.3rem;
}
.package-type-item{
  display: inline-block;
  height: 0.6rem;
  line-height: 0.62rem;
  padding: 0 0.25rem;
  font-size: 0.24rem;
  margin-top: 0.3rem;
  margin-right: 0.2rem;
  color: #1a1a1a;
  background-color: #f5f5f5;
  border-radius: 0.3rem;
}
.package-details{
  padding-left: 0.3rem;
  border-top: 0.1rem solid #f5f5f5; 
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.package-details-item{
  
}
.package-details-text{
  overflow: hidden;
  word-wrap: break-word;
  color: #1a1a1a;
  font-size: 0.22rem;
  line-height: 0.32rem;
  padding: 0.3rem 0;
}

.package-people{
  border-top: 0.1rem solid #f5f5f5; 
  padding-left: 0.3rem;
}
.package-people-list{
  
}
.package-people-item{
  display: inline-block;
  height: 0.6rem;
  width: 1.3rem;
  text-align: center;
  line-height: 0.65rem;
  overflow: hidden;
  font-size: 0.24rem;
  margin: 0.3rem 0;
  margin-right: 0.3rem;
  color: #1a1a1a;
  background-color: #f5f5f5;
  border-radius: 0.3rem;
}
/* 出行时间 */
.package-date{
  border-top: 0.1rem solid #f5f5f5; 
  display: flex;
  flex-direction: column;
}
.package-date-title{
  padding-left: 0.3rem;
}

.package-date-month-list{
  display: flex;
  flex-direction: row;
  border-bottom: 0.01rem  solid #f0f0f0;
  overflow-y: scroll;
  white-space:nowrap;
}
.package-date-month{
  font-size: 0.3rem;
  color: #585858;
  line-height: 0.88rem;
  padding: 0 0.50rem;

}
.date_month_choose{
   color: #3399cc;
   border-bottom: 0.04rem solid #3399cc;
}
.package-date-tb{
  width: 100%;
  text-align: center;
}
.package-date-tb thead{
  border-bottom: 0.01rem  solid #f8f8f8;
  line-height: 0.6rem;
  height: 0.6rem
}
.package-date-tb thead th{
  font-weight: normal;
  color: #585858;
  font-size: 0.26rem;
}
.package-date-tb tbody{
  
}
.package-date-tb tbody tr{
  height: 1.3rem;
}
.package-date-tb tbody td{
  font-size: 0.26rem;
  width: 14.28%;
  margin: 0.2rem 0;
  vertical-align: middle;
}
.date-day-yes{
  color: #4d4d4d;
}
.date_day_no{
  color: #c4c4c4;
}
.package-date-tb tbody td p{
  font-size: 0.2rem;
  height: 0.2rem;
  margin-top: 0.05rem;
}
.date_day_choose{
  border-radius: 0.2rem;
  color: #fff;
  background: linear-gradient(to right, #54c3fc, #24abf0);
}

/* 购买数量 */
.package-buy{
  border-top: 0.1rem solid #f5f5f5; 
  padding: 0.24rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 0.5rem;
}
.package-buy-title{
  margin-left: 0.3rem;
  font-size: 0.28rem;
  color: #4d4d4d;
}
.package-buy-num{
  display: flex;
  flex-direction: row;
}
.package-buy-num div{
  font-size: 0.3rem;
  color: #4d4d4d;
}
.package-buy-set{
  height: 0.5rem;
  width: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.4rem;
  margin: 0 0.3rem;
  text-align: center;
  border-radius: 0.1rem;
  background-color: #e5e5e5;
}
.package-bot{
  height: 0.9rem;
}
.package_buy_no{
  color: #cacaca;
}
/* 底部按钮 */
.package-footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.9rem;
  background: #fff;
  z-index: 101;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  justify-content: space-between;
  box-shadow:0 -0.05rem 0.1rem #ebebeb;
}
.package-footer-num{
  width: 70%;
  line-height: 0.9rem;
  color: #ff6631;
  margin-left: 0.3rem;
}
.package-footer-cur{
  font-size: 0.28rem;
}
.package-footer-price{
  
  font-size: 0.6rem;
}
.package-footer-btn{
  width: 30%;
  text-align: center;
  line-height: 0.9rem;
  background-color: #17a1e6;
  color: #fff;
  font-size: 0.3rem;
}

.package_choose{
  color: #fff;
  background: linear-gradient(to right, #54c3fc, #24abf0);
}
.package-hotel-day{
  height: 0.8rem;
  display: flex;
  flex-direction: row;
  padding-left: 0.3rem;
  line-height: 0.85rem;
  font-size: 0.28rem;
  border-top: 0.1rem solid #f5f5f5;
  justify-content: space-between;
  padding-right: 0.3rem;
}
.package_hotel_end{
  background-color: #ff8800;
  color: #fff;
  border-radius: 0.2rem;
}
.booking-title{
   font-weight: bold;
  height: 0.8rem;
  line-height: 0.9rem;
  padding-right: 0.3rem;
  border-bottom: 0.01rem  solid #f0f0f0;
  background-color: #fff;
  font-size: 0.28rem;
}

.booking-main{
  display: flex;
  flex-direction: column;
  padding-bottom: 0.9rem;
}
.booking-header{
  position: fixed;
  width: 100%;
  /* margin-top: 0.3rem; */
  background: #fff;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  z-index: 201;
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
.booking-center{
  margin-top: 0.9rem;
}
.booking-order-info{
  padding-left: 0.3rem;
  background-color: #fff;
}
.booking-spu-title{
  line-height: 0.86rem;
  font-size: 0.28rem;
  font-weight: bold;
  border-bottom: 0.01rem  solid #f0f0f0;
  color: #1a1a1a;
}
.booking-sku-title{
  line-height: 0.86rem;
  font-size: 0.26rem;
  border-bottom: 0.01rem  solid #f0f0f0;
  color: #1a1a1a;
}
.booking-num{
  line-height: 0.86rem;
  font-size: 0.26rem;
  color: #1a1a1a;
}
.booking-info-input{
  background-color: #fff;
  height: 0.32rem;
  padding: 0.26rem 0;
}
.booking-info-input-area{
  display: flex;
  flex-direction: row;
}

.booking-info-input-area select{
  padding-top: 0.03rem;
  display: inline-block;
  font-size: 0.26rem;
  color: #ff8800;
  margin-right: 0.1rem;
  width: auto;
  border: 0.01rem solid #ddd;
}
.booking-info-input-area input{
  background-color: #fff;
  padding: 0.25rem 0;
  height: 0.32rem;
  width: 3rem;
}
.booking-info-input-area option{
  height: 0.32rem !important;
  font-size: 0.28rem !important;
}
.booking-info-list{
  font-size: 0.26rem;
  padding-left: 0.3rem;
  line-height: 0.9rem;
  background-color: #fff;
}
.booking-info-item{
  height: 0.86rem;
  display: flex;
  flex-direction: row;
  border-bottom: 0.01rem  solid #f0f0f0;
}
.booking-info-title{
  height: 1rem;
  line-height: 1.1rem;
  font-size: 0.28rem;
  display: flex;
  flex-direction: row;
  padding-right: 0.3rem;
  justify-content: space-between;
}
.booking-info-title div{
  font-weight: bold;
}
.booking-info-name{
  width: 32%;
}

/* 底部按钮 */
.booking-footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.9rem;
  z-index: 101;
  background: #fff;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  justify-content: space-between;
  box-shadow:0 -0.05rem 0.1rem #ebebeb;
}
.booking-footer-num{
  width: 70%;
  line-height: 0.9rem;
  color: #ff6631;
  margin-left: 0.3rem;
}
.booking-footer-cur{
  font-size: 0.28rem;
}
.booking-footer-price{
  
  font-size: 0.6rem;
}
.booking-footer-btn{
  width: 30%;
  text-align: center;
  line-height: 0.9rem;
  background-color: #17a1e6;
  color: #fff;
  font-size: 0.3rem;
}
.booking-person-info{
  margin-top: 0.2rem;
}
.person-info-title{
  height: 1rem;
  line-height: 1.1rem;
  display: flex;
  flex-direction: row;
  padding-right: 0.3rem;
  justify-content: space-between;
  font-size: 0.28rem;
  padding-left: 0.3rem;
  margin-top: 0.1rem;
  background-color: #fff;
}
.person-info-title div{
  font-weight: bold;
}
.person-list-title{
  margin-top: 0.1rem;
  font-size: 0.28rem;
  text-align: center;
  border-bottom: 0.01rem  solid #f0f0f0;
}
.booking-info-item select{
  border: none;
  outline: none;
  height: 40px;
  line-height: 40px;
  background-color: transparent;
  color: #1a1a1a;
  /* appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none; */
}
.booking-time{
  height: 0.84rem;
  background-color: #fff;
}
.errorinput{
  color: red;
}
.booking-remark{
  padding: 0.2rem 0.3rem;
  margin-top: 0.1rem;
  background-color: #fff;
  display: flex;
  height: 1.2rem;
}
.booking-remark-name{
  margin-top: 0.12rem;
  width: 32%;
  font-size: 0.26rem;
}
.booking-remark-input{
  flex: 1;
}
.booking-remark textarea{
  border: 0.01rem  solid #f0f0f0;
  font-size: 0.26rem;
  line-height: 0.4rem;
  color: #666;
  padding: 0.05rem 0.05rem;
  width: 100%;
  height: 1.1rem;
}
</style>
