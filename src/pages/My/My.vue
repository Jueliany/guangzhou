<!-- 我的主页 -->
<template>
  <div class="main">
    <a @click="gotoPerson()" class="person">
      <div class="person-tx" :style="'backgroundImage:url('+myData.btcUserPhoto+')'">
        <!-- <img src="../../assets/images/My/my_icon_tx.png"> -->
        <!-- <img :src="myData.btcUserPhoto"> -->
      </div>
      <!-- 个人信息 -->
      <div class="person-info" >
      <p class="person-name">{{user}}</p>
      </div>
    </a>
    <!-- 订单 -->
    <div class="my-order">
      <!-- 全部 -->
      <a @click="gotoOrder(0)">
        <div class="my-order-btn">
          <img src="../../assets/images/My/my_icon_order.png">
          <p class="my-order-type">订单</p>
          <!-- <p class="my-order-num">{{myData.orderTotal}}</p> -->
        </div>
      </a>
      <a @click="gotoOrder(1)">
        <div class="my-order-btn">
          <img src="../../assets/images/My/my_icon_wait.png">
          <p class="my-order-type">待付款</p>
          <!-- <p class="my-order-num">{{myData.notPayTotal}}</p> -->
        </div>
      </a>
      <a @click="gotoOrder(2)">
        <div class="my-order-btn">
          <img src="../../assets/images/My/my_icon_dg.png">
          <p class="my-order-type">待出行</p>
          <!-- <p class="my-order-num">{{myData.sendingTotal}}</p> -->
        </div>
      </a>
    </div>
    <div class="center-list">
      <!-- 联系我们 -->
      <router-link to="/contact">
        <div class="center-item">
          <img class="item-icon" src="../../assets/images/My/my_icon_contact.png">
          <p class="item-text">联系我们</p>
          <img class="goto-icon" src="../../assets/images/My/home_icon_more.png">
        </div>
      </router-link>
      <!-- 设置 -->
      <router-link to="/setting">
        <div class="center-item">
          <img class="item-icon" src="../../assets/images/My/my_icon_sp.png">
          <p class="item-text">设置</p>
          <img class="goto-icon" src="../../assets/images/My/home_icon_more.png">
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'My',
  components: {
  },
  data () {
    return {
      myData: {btcUserPhoto:require('../../assets/images/My/my_icon_tx.png')},
      btcUserPhoto: '',
      orderTotal: 0,
      notPayTotal: 0,
      sendingTotal: 0
    }
  },
  beforeCreate: function(){
    this.$store.commit('changeLoading',false);
    this.$store.commit('changeNavIndex',2);
    this.$store.commit('showNav',true);
    if(this.$store.state.token == ''){
       this.$router.push({ path: "/login" }) ;
    }
  },
  created: function() {
    let that = this;
    this.$store.commit('changeLoading',true);
    if(this.$store.state.token != ""){
      // this.$http.get(this.api_b2c + 'quhappy-btc/user/getUserInfo/' +this.$store.state.token+ '/' + this.$store.state.language+ '/')
      // .then((res) => {
      //   if(res.data.resultCode == 0){
      //     that.myData = res.data.data.userInfo;
      //     if(res.data.data.userInfo.email==undefined){
      //       that.$store.commit('changeEmail',"");
      //     }else{
      //       that.$store.commit('changeEmail',res.data.data.userInfo.email);
      //     }
      //     console.log(res.data.data)
      //   }else{
      //     this.$toast(res.data.data.resultMsg,{
      //       // className: 'et-info',
      //       horizontalPosition: 'center'2
      //       duration: 2000,
      //       verticalPosition: 'top'
      //       }
      //     );
      //     // this.$store.commit('changeToken',"");
      //     // this.$router.push({ path: "/login" }) ;
      //   }
      // });
      this.$store.commit('changeLoading',false);
    }else{
      // that.$toast(this.$t('text.pleaseLogin'),{
      //   horizontalPosition: 'center',
      //   duration: 2000,
      //   verticalPosition: 'top'
      //   }
      // );
      this.$store.commit('changeLoading',false);
      this.$router.push({ path: "/login" }) ;
    }
    
  },
  computed:{
    isLogin(){
      return this.$store.state.token != '';
    },
    user(){
      return this.$store.state.user;
    }
  },
  methods:{
    gotoOrder(id){
      if(this.$store.state.token != ''){
        this.$router.push('/order/' + (id-1))
      }else{
        // this.$toast(this.$t('text.pleaseLogin'),{
        //   horizontalPosition: 'center',
        //   duration: 2000,
        //   verticalPosition: 'top'
        //   }
        // );
      }
    },
    gotoPerson(){
      if(this.$store.state.token != ''){
        this.$router.push('/person');
      }else{
         this.$router.push('/login');
      }
    }
  }
}
</script>
<style scoped>
.main{

}
.person{
  display: flex;
  padding-top: 0.7rem;
  padding-left: 0.4rem;
}
.person-tx{
  height: 1.16rem;
  width: 1.16rem;
  border-radius: 0.58rem;
  float: left;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.person-tx img{
  width: 100%;
  height: 100%;

}
.person-info{
  height: 1.16rem;
  margin-left: 0.3rem;
}
.person-name{
   height: 0.58rem;
   line-height: 0.78rem;
   font-size: 0.36rem;
   color: #191c28;
}
.person-goto{
   height: 0.58rem;
   line-height: 0.38rem;
   color: #969da7;
}
.my-order{
  display:-webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  margin: 0 0.15rem 0 0.15rem;
  display: flex;
  margin-top: 0.6rem;
  justify-content: space-around;
}
.my-order-btn{
   height: 2rem;
   width: 2rem;
   border-radius: 0.2rem;
   box-shadow: 0px 0px 15px #ddd;
   text-align: center;
}
.my-order-btn img{
  width: 0.48rem;
  height: 0.48rem;
  margin-top: 0.4rem;
  margin-bottom: 0.2rem;
  
}
.my-order-type{
  font-size: 0.26rem;
  color: #040614;
}
.my-order-num{
  margin-top: 0.15rem;
  font-size: 0.22rem;
  color: #8e959f;
}
.center-list{
  flex: 1;
  margin-top: 0.36rem; 
  padding-left: 0.42rem; 
  padding-right: 0.5rem;
}
.center-item{
  height: 0.9rem;
  line-height: 0.9rem;
  color: #1a1a1a;
  border-bottom: 1px solid #ddd;
}
.item-icon{
  width: 0.35rem;
  height: 0.35rem;
  margin-right: 0.2rem;
}
.item-text{
  font-size: 0.30rem;
  display: inline-block;
}
.goto-icon{
  height: 0.2rem;
  width: 0.1rem;
  float: right;
  margin-top: 0.35rem;
}
</style>