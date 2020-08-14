<template>
  <div class="recommend">
      <div class="recommend-item" v-for="item in recommends" :key="item.index">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name:"RecommentView",
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
.recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 13px;
   

    padding: 10px 0 15px;
    border-bottom: 8px solid #eee;
}

.recommend-item {
    flex: 1;
   
}

.recommend-item img {
    width: 90%;   
    margin-bottom: 10px;
}
</style>