<!-- 首页 -->
<template>
  <div class="Index-main">
    
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
    }
  },
  mounted: function(){
    // this.$router.replace({ path: "/main" }) 
    // var that = this;
    // setTimeout(function(){
    //    that.$router.replace({ path: "/main" }) 
    // },1000);
    
  },
   beforeCreate: function() {
    this.$router.replace({ path: "/main" }) 
    this.$store.commit('showNav',false);
  },
}
</script>

<style>
.Index-main{
  height: 100%;
  width: 100%;

}
.Index-main img{
  height: 100%;
  width: 100%;
}
</style>
