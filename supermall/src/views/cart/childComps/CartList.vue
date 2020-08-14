<template>
  <div class="cart-list">
      <scroll class="content">
          <!-- <li v-for="item in cartList" :key="item">{{item}}</li> -->
      </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll'



export default {
    name:"CartList",
    components: {
        Scroll
    },
    computed: {
      
    }
}
</script>

<style>
.cast-list {
    height: 100vh;
}

.content {
    height: calc(100% - 44px - 49px);
}
</style>