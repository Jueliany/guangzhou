<template>
  <div class="setting-main">
    <div class="setting-header">
      <router-link class="blackto" to="/my">
        <img class="icon-black" src="../../assets/images/My/sp_icon_back.png">
      </router-link>
      <p class="header-title">{{$t('pages.setting')}}</p>
    </div>
    <div class="setting-center">
      
      <router-link v-if="isLogin" to="/revise" class=" setting-center-item">{{$t('itemName.changePassword')}} 
        <img class="goto-icon" src="../../assets/images/My/home_icon_more.png">
      </router-link>
    </div>
    <a v-if="isLogin" @click="logout()" class="setting-footer">
      {{$t('buttom.logout')}}
    </a>
  </div>
</template>

<script>
export default {
  name: 'Person',
  data () {
    return {
      select: this.$store.state.language,
    }
  },
  created(){
    this.$store.commit('showNav',false);
  },
  update: function() {
      console.log(this.$store.state.language);
  },
  methods:{
    setDate: function () {
     this.$picker.show({
       type:'datePicker',
       onOk: (date) =>{
         this.birthday = date
        }
      });
    },
    logout: function () {
      this.$store.commit('changeToken',"");
      this.$store.commit('user',"");
      localStorage.clear()
      this.$router.replace({ path: "/my" }) ;
    },
  },
  computed:{
    isLogin(){
      return this.$store.state.token != '';
    },
  },
}
</script>

<style>
 .setting-footer{
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 0.9rem;
  z-index: 101;
  background-color: #28a6e6;
  color: #fff;
  font-size: 0.3rem;
  text-align: center;
  line-height: 0.95rem;
}
.setting-header{
  display: flex;
  position: relative;
  justify-content: center;
  /* padding-top: 0.3rem; */
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
.setting-center{
  /* margin-top: 0.9rem; */
  display: flex;
  flex-direction: column;
  margin-left: 0.45rem;
  margin-right: 0.45rem;
}
.setting-center-item{
  height: 0.9rem;
  line-height: 0.9rem;
  border-bottom: 1px solid #ddd; 
  color: #000;
}
.goto-icon{
  height: 0.2rem;
  width: 0.1rem;
  float: right;
  margin-top: 0.35rem;
}
.setting-center-item span{
  color: #989ea8;
  font-size: 0.26rem;
  line-height: 0.95rem;
  float: right;
  margin-right: 0.26rem;
}
.setting-center-item select{
  border: none;
  outline: none;
  width: 100%;
  height: 40px;
  line-height: 40px;
  appearance: none;
  background-color: transparent;
  color: #989ea8;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-left: 60px;
}
</style>
