<template>
  <div class="retrieve-main">
    <div class="retrieve-header">
      <router-link class="blackto" to="/Login">
        <img class="icon-black" src="../../assets/images/My/sp_icon_back.png">
      </router-link>
      <p class="header-title">找回密码</p>
    </div>
    <div v-if="!showNext" class="retrieve-center">
      <div class="retrieve-input">
        <input v-model="userName"  type="text" name="phoneNum" placeholder="请输入用户名">
      </div>
      <a v-bind:class="{can_retrieve : canNext}" :disabled="!canNext"  @click="next()" class="retrieve-btn">{{$t('buttom.next')}}</a>
    </div>
    <div v-else  class="retrieve-next">
       <div class="retrieve-input">
        <input    v-model="problem" disabled="true" type="text"  >
      </div>
       <div class="retrieve-input">
        <input    v-model="answer"  type="text"  placeholder="请输入安全问题答案">
      </div>
      <div class="retrieve-input">
        <input    v-model="retrievePassword"  type="password" name="password" placeholder="请输入新密码">
      </div>
      <a v-bind:class="{can_retrieve : canRetrieve}" :disabled="!canRetrieve" @click="retrieve()" class="retrieve-btn">{{$t('buttom.determine')}}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Retrieve',
  data () {
    return {
      showNext: false,
      canRetrieve: false,
      canNext: false,
      userName: "",
      problem: "？",
      id:"",
      retrievePassword: "",
      answer: "",
      answerc: "",
      getCodeBoolean: true,
      getCode: this.$t('buttom.getCode'),
    }
  },
  methods:{
    inputPasswordeOrCode: function() {
      console.log(this.retrievePassword.length);
    },
   
    //获取
    next: function () {
      if(this.canNext){
        let that = this;
        let postData = '{"useName":"'+this.userName+'"}'
        this.$http.post(this.api + 'user/queryUserInfo',postData)
        .then((res) => {
          if(res.data.resultCode == 0){
            this.showNext = true;
            this.problem = res.data.data.userInfo.safetyProblem;
            this.answerc = res.data.data.userInfo.answer;
            this.id = res.data.data.userInfo.id;
          }
          else{
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
    //修改新密码
    retrieve: function () {
      let that = this;
      if(this.answer == this.answerc){
        let postData = '{"id":"'+this.id+'", "password":"'+ this.retrievePassword +'"}'
        this.$http.post(this.api + 'user/updateInfo',postData)
        .then((res) => {
          if(res.data.resultCode == 0){
            that.$toast(res.data.resultMsg ,{
            // className: 'et-no',
            horizontalPosition: 'center',
            duration: 1000,
            verticalPosition: 'top'
            });
            this.$store.commit('changeToken',"");
            this.$store.commit('changeUser',"");
            this.$router.replace('/login')
          }
          else{
            that.$toast(res.data.resultMsg ,{
            // className: 'et-no',
            horizontalPosition: 'center',
            duration: 1000,
            verticalPosition: 'top'
            });
          }
        });
      }else{
         that.$toast("安全答案错误" ,{
          // className: 'et-no',
          horizontalPosition: 'center',
          duration: 1000,
          verticalPosition: 'top'
          });
      }
    },
    
  },
  watch: {
    userName: function(val) {
      if(val.length > 0 &&  val.length < 16){
        this.canNext = true;
      }else{
        this.canNext = false;
      }
    },
    retrievePassword: function(val) {
      if(val.length >= 6 &&  val.length < 16){
        this.canRetrieve = true;
      }else{
        this.canRetrieve = false;
      }
    },
  }
}

</script>

<style>


.retrieve-main{
  display: flex;
  flex-direction: column;
  padding-bottom: 0.9rem;
}
.retrieve-header{
  position: fixed;
  width: 100%;
  /* margin-top: 0.3rem; */
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  border-bottom: 1px solid #ddd; 
  z-index: 201;
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
.retrieve-center{
  margin-top: 1rem;
  padding:0 0.8rem;
  display: flex;
  flex-direction: column;

}
.retrieve-next{
   margin-top: 1rem;
  padding:0 0.8rem;
  display: flex;
  flex-direction: column;
}
.retrieve-input{
  height: 1.12rem;
  line-height: 1.2rem;
  font-size: 0.26rem;
  color: #000;
  border-bottom: 0.01rem solid #eee;
  overflow: hidden;
}
.retrieve-get-code{
  height: 0.70rem;
  width: 1.56rem;
  font-size: 0.2rem;
  line-height: 0.75rem;
  text-align: center;
  border-radius: 0.12rem;
  color: #fff;
  margin-top: 0.2rem;
  background-color: #17a2e7;
}
.retrieve-code-area{
   display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.retrieve-input input{
  height: 0.4rem;
  padding: 0.34rem 0;
  background-color: #f5f5f5;
}
.retrieve-btn{
  text-align: center;
  height: 0.8rem;
  line-height: 0.85rem;
  border-radius: 0.12rem;
  color: #fff;
  margin-top: 0.7rem;
  background-color: #dbdbdb;
}
.can_retrieve{
  background-color: #17a2e7;
}
.connot_get{
  background-color:#ddd;
}
</style>
