<template>
 <div class="cast">
   <!-- 导航栏 -->
   <nav-bar class="nav-bar">
     <div slot="center">购物车({{cartLength}})</div>
   </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
 </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import CartList from '@/views/cart/childComps/CartList'


export default {
    name:'Cart',
    components: {
      NavBar,
      CartList
    },
    computed: {
       cartLength() {
        // return this.$store.state.cartList.length
      }
    }

}
</script>

<style>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>