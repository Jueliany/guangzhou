<!-- 联系我们 -->
<template>
  <div class="main">
    <div class="header">
      <div class="blackto" @click="goBack()">
        <img class="icon-black" src="../../assets/images/My/sp_icon_back.png">
      </div>
      <p class="header-title">{{$t('pages.contactUs')}}</p>
    </div>
    <!-- 客服电话 -->
    <div class="contact-tel">
      <p>{{$t('title.fwdh')}}：</p>
      <a href="tel:4009005690">4009005690</a>
    </div>
    <!-- 客服邮箱 -->
    <div class="contact-mail">
      <p>{{$t('title.kfyx')}}：</p>
      <a href="mailto:panhanmin@quhappy.com">panhanmin@quhappy.com</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  methods:{
    goBack: function () {
      this.$router.go(-1);
    }
  },
  beforeCreate: function(){
     this.$store.commit('showNav',false);
  },
}
</script>

<style>
.main{
  display: flex;
  flex-direction: column;
}
.header{
  position: fixed;
  width: 100%;
  z-index: 201;
  /* margin-top: 0.3rem; */
  background: #fff;
  height: 0.9rem;
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
.contact-tel{
  margin-top: 1rem;
  background-color: #fff;
  line-height: 0.9rem;
  padding-left: 0.3rem;
  border-bottom: 0.01rem solid #ddd;
  display: flex;
  flex-direction: row;
}
.contact-tel p{
  width: 25%;
}
.contact-mail{
  margin-top: 0rem;
  background-color: #fff;
  line-height: 0.9rem;
  padding-left: 0.3rem;
  border-bottom: 0.01rem solid #ddd;
  display: flex;
  flex-direction: row;
}
.contact-mail p{
  width: 25%;
}
.contact-mail a{

}
</style>
