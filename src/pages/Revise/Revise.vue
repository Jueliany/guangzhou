<template>
  <div class="revise-main">
    <div class="revise-header">
      <router-link class="black-to"  to="/setting">
        <img class="icon-black" src="../../assets/images/My/sp_icon_back.png">
      </router-link>
      <p class="header-title">修改密码</p>
    </div>
    
    <div  class="revise-next">
      <div class="revise-input">
         <input  v-model="oldPassword"  type="password" name="oldpassword" :placeholder="$t('placeholder.oldPassword')">
      </div>
      <div class="revise-input">
        <input  v-model="revisePassword"  type="password" name="newpassword" :placeholder="$t('placeholder.newPassword')">
      </div>
      <div class="revise-input">
        <input  v-model="revisetwoPassword"  type="password" name="password" :placeholder="$t('placeholder.twePassword')">
      </div>
      <a v-bind:class="{can_revise : canRevise}" :disabled="!canRevise" @click="revise()" class="revise-btn">{{$t('buttom.determine')}}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Revise',
  data () {
    return {
      canRevise: false,
      revisePhone: "",
      reviseCode: "",
      oldPassword: "",
      revisePassword: "",
      revisetwoPassword: "",
      getCodeBoolean: true,
    }
  },
  methods:{
    revise: function(){
        let that = this;
        let postData = '{"useName":"'+this.$store.state.user+'"}'
        this.$http.post(this.api + 'user/queryUserInfo',postData)
        .then((res) => {
          if(res.data.resultCode == 0){
            if(that.oldPassword == res.data.data.userInfo.password){
              var id = res.data.data.userInfo.id;
              let postData1 = {};
              postData1.id = id;
              postData1.password = that.revisePassword;
              this.$http.post(this.api + 'user/updateInfo',JSON.stringify(postData1))
              .then((res1) => {
                if(res1.data.resultCode == 0){
                  this.$store.commit('changeToken',"");
                  this.$store.commit('user',"");
                  this.$router.replace('/login');
                }else{
                  that.$toast(res1.data.resultMsg ,{
                  // className: 'et-no',
                  horizontalPosition: 'center',
                  duration: 1000,
                  verticalPosition: 'top'
                  });
                }
              })
            }else{
              that.$toast("旧密码错误" ,{
              // className: 'et-no',
              horizontalPosition: 'center',
              duration: 1000,
              verticalPosition: 'top'
              });
            }
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
  watch: {
    oldPassword: function(val) {
      if(val.length >= 6 && this.revisetwoPassword == this.revisePassword && this.revisetwoPassword.length >= 6){
        this.canRevise = true;
      }else{
        this.canRevise = false;
      }
    },
    revisePassword: function(val) {
      if(val.length >= 6 && this.revisetwoPassword == val && this.oldPassword.length >= 6){
        this.canRevise = true;
      }else{
        this.canRevise = false;
      }
    },
    revisetwoPassword: function(val) {
      if(val.length >= 6 && this.revisePassword == val && this.oldPassword.length >= 6){
        this.canRevise = true;
      }else{
        this.canRevise = false;
      }
    },
  }
}

</script>

<style>


.revise-main{
  display: flex;
  flex-direction: column;
  padding-bottom: 0.9rem;
}
.revise-header{
  position: fixed;
  width: 100%;
  /* margin-top: 0.3rem; */
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  border-bottom: 1px solid #ddd; 
  z-index: 201;
}
.black-to{
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
.revise-center{
  margin-top: 1rem;
  padding:0 0.8rem;
  display: flex;
  flex-direction: column;

}
.revise-next{
  margin-top: 1rem;
  padding:0 0.8rem;
  display: flex;
  flex-direction: column;
}
.revise-input{
  display: flex;
  flex-direction: column;
  height: 0.4rem;
  line-height: 1.2rem;
  padding: 0.35rem 0;
  font-size: 0.26rem;
  border-bottom: 0.01rem solid #eee;
}
.revise-get-code{
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
.revise-code-area{
   display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.revise-input input{
  background-color: #f5f5f5;
}
.revise-btn{
  text-align: center;
  height: 0.8rem;
  line-height: 0.85rem;
  border-radius: 0.12rem;
  color: #fff;
  margin-top: 0.7rem;
  background-color: #dbdbdb;
}
.can_revise{
  background-color: #17a2e7;
}
.connot_get{
  background-color:#ddd;
}
</style>
