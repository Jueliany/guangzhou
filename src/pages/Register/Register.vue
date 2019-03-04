<template>
  <div class="register-main">
    <div class="register-header">
      <router-link class="blackto" to="/Login">
        <img class="icon-black" src="../../assets/images/My/sp_icon_back.png">
      </router-link>
      <p class="header-title">{{$t('pages.register')}}</p>
    </div>
    <div class="register-center">
      <div class="register-input"> 
        <input v-model="useName" type="text" name="phoneNum" placeholder="请输入账号">
      </div>
      <div  class="register-input">
        <input    v-model="password" type="password" name="password" placeholder="请输入密码">
      </div>
       <div  class="register-input">
        <select v-model="safetyProblem">
          <option value="">设置安全问题</option>
          <option value="你的小学名字是？">你的小学名字是？</option>
          <option value="你的第一只宠物名字是？">你的第一只宠物名字是？</option>
        </select>
      </div>
      <div class="register-input">
        <input v-model="answer" class="register-input-code"  type="text" name="code" placeholder="请输入安全问题答案">
        </div>
      <a @click="register()" v-bind:class="{can_register : canRegister}" :disabled="!canRegister" class="register-btn">{{$t('pages.register')}}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      isErr:false,
      answer: "",
      b2cAreaCodeList: this.$t('b2cAreaCodeList'),
      canRegister: false,
      useName: "",
      safetyProblem: "",
      password: "",
      getCodeBoolean: true,
      getCode: this.$t('buttom.getCode'),
    }
  },
  methods:{
    inputPasswordeOrCode: function() {
      console.log(this.registerPassword.length);
    },
    resetErr(){
      this.isErr = false;
    },
   
    register: function(){
      let that = this;
      var postData = {};
      postData.useName = this.useName;
      postData.password = this.password;
      postData.safetyProblem = this.safetyProblem;
      postData.answer = this.answer;
      postData.type = 1;
      
      this.$http.post(this.api + 'user/register', JSON.stringify(postData))
      .then((res)=>{
        console.log(res);
        if(res.data.resultCode == 0){
          var data = '{ "useName": "'+ that.useName +'", "password":"'+ that.password +'","type":"1" }';
          that.$http.post(that.api + 'user/login',data)
          .then((res)=>{
            console.log(res);
            if(res.data.resultCode == 0){
              that.$store.commit('changeToken',res.data.data.sessionId);
              that.$store.commit('changeUser',that.useName);
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
          that.$store.commit('changeToken',res.data.data.token);
          that.$router.go(-1) ;
        }else{
          that.$toast(res.data.resultMsg ,{
          horizontalPosition: 'center',
          duration: 1000,
          verticalPosition: 'top'
          });
        }
      });
    }
  },
  watch: {
    password: function(val) {
      if(val.length >= 6&& val.length <= 16){
        this.canRegister = true;
      }else{
        this.canRegister = false;
      }
    },
  }
}

</script>

<style>


.register-main{
  display: flex;
  flex-direction: column;
  padding-bottom: 0.9rem;
}
.register-header{
  position: fixed;
  width: 100%;
  /* margin-top: 0.3rem; */
  height: 0.9rem;
  z-index: 201;
  line-height: 0.9rem;
  text-align: center;
  border-bottom: 1px solid #ddd; 
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
.register-center{
  margin-top: 1rem;
  padding:0 0.8rem;
  display: flex;
  flex-direction: column;

}
.register-input{
  height: 1.1rem;
  line-height: 1.2rem;
  font-size: 0.26rem;
  color: #000;
  border-bottom: 0.01rem solid #eee;
}
.register-get-code{
  height: 0.70rem;
  width: 1.56rem;
  font-size: 0.2rem;
  line-height: 0.8rem;
  text-align: center;
  border-radius: 0.12rem;
  color: #fff;
  margin-top: 0.2rem;
  background-color: #17a2e7;
}
.register-code-area{
   display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.register-input input{
  height: 0.4rem;
  padding: 0.35rem 0 !important;
  background-color: #f5f5f5;
}
.register-btn{
  text-align: center;
  height: 0.8rem;
  line-height: 0.85rem;
  border-radius: 0.12rem;
  color: #fff;
  margin-top: 0.7rem;
  background-color: #dbdbdb;
}
.can_register{
  background-color: #17a2e7;
}
.connot_get{
  background-color:#ddd;
}
.register-center-item {
  overflow: hidden;
}
.register-input{
  overflow: hidden;
}
.register-input select{
  margin-left: 0.05rem;
  display: inline-block;
  width: 95%;
  border: none;
  outline: none;
  appearance: none;
  background-color: transparent;
  color: #989ea8;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.register-area-code{}
.red_err{
  box-sizing: border-box;
  box-shadow: 0rem 0rem 0.1rem red;
}
</style>
