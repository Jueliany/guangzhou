<template>
  <div class="login-main">
    <div class="login-header">
      <router-link class="blackto" to="/main">
        <img class="icon-black" src="../../assets/images/Login/login_icon_back.png">
      </router-link>
    </div>
    <div  class="login-center-area">
      <div class="login-top-img">
        <img  src="../../assets/images/Login/login_zh.jpg">
      </div>
      <div class="login-input-area">
        <div class="login-input">
          <img src="../../assets/images/Login/icon_login_user.png">
          <input v-model="userName" type="text" name="phone" placeholder="请输入账号">
        </div>
        <div class="login-input">
          <img src="../../assets/images/Login/icon_login_password.png">
          <input  v-model="password" type="password" name="password" placeholder="请输入密码">
        </div>
        <div class="login-forget-password">
          <a @click="gotoRetrieve()" class="login-forget-password">{{$t('buttom.forget')}}</a>
        </div>
        <div class="login-btn-area">
        <!-- <span @click="changeLoginType()" class="login-type">{{loginType}}</span>  -->
          <button v-bind:class="{can_click : canClick}" :disabled="!canClick" @click="login()" class="login-btn">{{$t('buttom.login')}}</button>
        </div>
        <div class="login-register">
           <a @click="gotoRegister()" >{{$t('buttom.newUserRegistered')}}</a>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginBoolean: true,
      loginType: this.$t("buttom.codeLogin"),
      canClick: false,
      goBlack: false,
      loginCode: "",
      userName: "",
      password: "",
    }
  },
  methods:{
    // 选择登陆类型
    gotoRegister(){
      this.$router.replace({ path: "/register" });
    },
    gotoRetrieve(){
      this.$router.replace({ path: "/retrieve" });
    },
    inputPasswordeOrCode: function() {
      console.log(this.password.length);
    },
    //获取验证码
    
    // 登陆
    login: function(){
      let that = this;
      // console.log(this.$qs.stringify({ 'bar': 123 }))
      var data = '{ "useName": "'+ this.userName +'", "password":"'+ this.password +'","type":"1" }';
      this.$http.post(this.api + 'user/login',data)
      .then((res)=>{
        console.log(res);
        if(res.data.resultCode == 0){
          that.$store.commit('changeToken',res.data.data.sessionId);
          that.$store.commit('changeUser',that.userName);
          that.$router.go(-1) ;
        }else{
          that.$toast(res.data.resultMsg ,{
          // className: 'et-no',
          horizontalPosition: 'center',
          duration: 1000,
          verticalPosition: 'top'
          });
        }
      });
    }
  },
  watch: {
    // 密码是否大于6
    password: function(val) {
      if(val.length >= 6){
        this.canClick = true;
      }else{
        this.canClick = false;
      }
    },
    
  },
  computed:{
    language(){
      return this.$store.state.language;
    }
  }
}

</script>

<style>
.login-main{
  position: absolute;
  top: 0;left: 0;
  width: 100%;height: 100%;
  background-color: #fff ;
}
.login-header{
  position: fixed;
  height: 0.9rem;
  width: 100%;
  line-height: 0.9rem;
  top: 0;
  z-index: 201;
  /* background-color: #fff ; */
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
  left: 0.25rem;
  float: left;
  height: 0.4rem;
  width: 0.2rem;
}
.login-center-area{
  /* margin-top: 0.9rem; */
  display: flex;
  flex-direction: column;
}
.login-top-img{
  width: 100%;
  height: auto;
}
.login-top-img img{
  width: 100%;
}
.login-input-area{
}
.login-input{
  margin-left: 1rem;
  margin-top: 0.3rem;
  margin-bottom: 0.2rem; 
}
.login-input img{
  width: .4rem;
  margin-right: 0.3rem;
}
.login-input input{
  width: 4.2rem;
  border-bottom: 0.01rem solid #ddd;
  font-size: 0.28rem;
  padding: 0.20rem 0;
  height: 0.32rem;
  display: inline-block;
  background-color: transparent;
}
.login-forget-password a{
  font-size: 0.24rem;
  color: #808080;
  margin-left: 4.94rem;
}
.login-btn-area{
  margin-top: 0.6rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.login-btn{
  height: 0.84rem;
  width: 5rem;
  text-align: center;
  font-size: 0.24rem;
  background-color: #ddd;
  color: #fff;
  border-radius: 0.42rem;
  background-color: #ddd;
  box-shadow: 0.05rem 0.05rem 0.18rem rgba(221,221,221,0.8);
}

.can_click{
  box-shadow: 0.05rem 0.05rem 0.18rem rgba(141,210,250,0.8);
  background-color: #8dd2fa;
}

.login-register{
  margin-top: 0.7rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.login-register a{
  font-size: 0.24rem;
  color: #808080;
}



.login-type{
  font-size: 0.26rem;
  color: #808080;
}

.login-top{
  margin-top: 0.7rem;
  font-size: 0.66rem;
  color: #333;

}
.login-title{
  margin-top: 0.3rem;
  font-size: 0.3rem;
  color: #808080;
  margin-bottom: 0.84rem;
}
.login-to-register{
  color: #ff8800;
}
.login-input-item{
  height: 1.1rem;
  line-height: 1.2rem;
  font-size: 0.32rem;
  color: #000;
  border-bottom: 0.01rem solid #ddd;
  background-color: #f5f5f5;
}

.login-code-area{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.login-input-code{
  background-color: #f5f5f5;
}
.login-get-code{
  height: 0.70rem;
  width: 1.56rem;
  font-size: 0.2rem;
  line-height: 0.8rem;
  text-align: center;
  border-radius: 0.2rem;
  color: #fff;
  margin-top: 0.2rem;
  background-color: #17a2e7;
}


.connot_get{
  background-color:#ddd;
}
.login-main input{
  
}
</style>
