<!-- 目的地 -->
<template>
  <div class="main">
    <div class="destination-header">
      <p class="destination-header-title">{{$t('pages.chooseCity')}}</p>
    </div>
    <div class="overseas">
      <!-- 国家列表 -->
     
      <!-- 城市列表 -->
      <div class="overseas_right">
       <div class="classname">
          <div class="right_pos">
            <div class="box"></div>
            广州
            <p class="text">11个目的地</p>
          </div>
          <div class="right_item">
            <span v-for="(item, index) of area" :key="index">
              <div class="item_pos" :id="index" @click="handleCityClick(item.name)">
                <img :src="item.image"></img>
                <span>{{item.name}}</span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
 
</template>
<script>
export default {
  name: 'Destination',
  data () {
    return {
    chooseCity: 0,
    area: [
      {  "type": 1, "id": 0, "image": require('../../assets/images/citys/all.png'), "name": "全部", "match": "全部" },
      { "type": 1, "id": 1, "image": require('../../assets/images/citys/yx.jpg'), "name": "越秀区", "match": "香港特别行政区" },
      { "type": 1, "id": 2, "image": require('../../assets/images/citys/lw.png'), "name": "荔湾区", "match": "澳门特别行政区" }, 
      { "type": 0, "id": 118, "image": require('../../assets/images/citys/hz.jpg'), "name": "海珠区", "match": "" }, 
      { "type": 0, "id": 26, "image": require('../../assets/images/citys/th.png'), "name": "天河区", "match": "Sabah" }, 
      { "type": 0, "id": 20, "image": require('../../assets/images/citys/by.jpg'), "name": "白云区", "match": "" }, 
      { "type": 0, "id": 29, "image": require('../../assets/images/citys/hp.png'), "name": "黄埔区", "match": "" },
       { "type": 1, "id": 1, "image": require('../../assets/images/citys/py.png'), "name": "番禺区", "match": "香港特别行政区" },
      { "type": 1, "id": 2, "image": require('../../assets/images/citys/hd.jpg'), "name": "花都区", "match": "澳门特别行政区" }, 
      { "type": 0, "id": 118, "image": require('../../assets/images/citys/ns.png'), "name": "南沙区", "match": "" }, 
      { "type": 0, "id": 26, "image": require('../../assets/images/citys/zc.png'), "name": "增城区", "match": "Sabah" }, 
      { "type": 0, "id": 20, "image": require('../../assets/images/citys/ch.png'), "name": "从化区", "match": "" },
      ],
    }
  },
  methods: {
    chooseCountry: function(index) {
      this.chooseCity = index;
    },
    // 选择城市
    handleCityClick: function(city) {
      // this.$store.dispatch('changeCity',city);
       this.$store.commit('changeCity',city);
       // 跳转到搜索页面
       this.$router.push('/seach/all');
    }
  },
  computed: {
    
  },
  beforeCreate: function(){
    this.$store.commit('changeNavIndex',1);
    this.$store.commit('showNav',true);
  },
}
</script>
<style scoped>
.main{
  display: flex;
  flex-direction: column; 
  margin-bottom: 0.9rem;
  background-color: #fff;
}
.destination-header{
  /* margin-top: 0.3rem; */
  position: fixed;
  width: 100%;
  background-color: #fff;
  height: 0.9rem;
  z-index: 201;
  line-height: 1rem;
  text-align: center;
}
.destination-header-title{
  font-size: 0.35rem;
}

.touchClass {
  color: #146aff;
}

.showSlectedLetter {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -50px;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  font-size: 26px;
  z-index: 1;
}

.selection {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.item_letter {
  display: flex;
  background-color: #eeeeee;
  height: 30px;
  padding-left: 10px;
  align-items: center;
  color: #898989;
}

.item_city {
  background-color: #ffffff;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid #f8f8f8;
}

.currentPosition {
  height: 80px;
  line-height: 80px;
  margin-left: 20px;
}

.history {
  background: #fff;
  margin: 20px 0 20px 30px;
  height: 60px;
  line-height: 60px;
  font-size: 32px;
  text-align: center;
  border-radius: 5px;
  width: 25%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}



.overseas{
  margin-top: 0.9rem;
  width: 100%;
  height: auto;
  display: flex;
  padding-bottom: 0.9rem;
}

.overseas_left{
  width: 30%;
  height: auto;
  overflow: hidden;
  background: #eeeeee;
}

.overseas_right{
  width: 100%;
  height: auto;
  overflow: hidden;
}

.left_item{
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 13px; 
  font-weight: bold;
  color: 1A1A1A;
  padding-left: 14px; 
}

.right_pos{
  display: flex;
  padding: 0.15rem ;
  font-size: 13px;
  font-weight: bold;
  line-height: 22px;
}

.box{
  width: 5px;
  height: 20px;
  background: #3399CC;
  margin-right: 5px;
  border-radius: 10px; 
}

.btn{
  height: 60px;
  font-size: 26px;
  font-weight: bold;
  color: #1A1A1A;
  margin: 20px 20px 20px 28px;
}
.right_item{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.item_pos{
  margin: 0.2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 0.06rem;
  color: #ffffff;
  /* background: #3399CC;  */
  position: relative;
  float: left;
}

.item_pos img{
  width: 100%;
  height: 100%;
  border-radius: 3px;
}
.item_pos span{
  position: absolute;
  bottom: 0.3rem;
  left: 1.15rem;
}
.choosedestination{
  color: #3399cc;
  background-color: #fff;
}

.text{
  color: #666666;
  font-size: 10px;
  margin-left: 10px;
  line-height: 24px;
}

</style>