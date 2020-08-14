<template>
  <nav-bar>
      <div slot="left" class="back" @click="backClick">
          <img src="@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
         <span v-for="(item,index) in titles" :key="item" 
         :class="{active: index === currentIndex}" @click="itemClick(index)"
         class="title-item">{{item}}</span>
      </div>
      </nav-bar>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

export default {
    name:'DetailNavBar',
    components:{
        NavBar
    },
    data(){
        return {
            titles:['商品','参数','评论','推荐'],
            currentIndex: 0
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index
            this.$emit('titleClick',index)
        },
        backClick(){
            this.$router.back()
        }
    }
}
</script>

<style>

.title {
    display: flex;
    font-size: 14px;
}

.title-item {
    flex: 1;
}

.active {
    color: var(--color-high-text);
}

.back {
    margin-top: 5px;
}
</style>