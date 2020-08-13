<template>
  <div class="detail" name="detail">
      <detail-nav-bar class="detail-nav"/>

      <scroll class="content" ref="scroll">
      <detail-swiper :top-images='topImages'/>
      <detail-base-info :goods='goods'/>
      <detail-shop-info :shop='shop'/>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'/>
      </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'

import Scroll from '@/components/common/scroll/Scroll'


import {getDetail,Goods,Shop} from '@/network/detail'

export default {
    name:'Detail', 
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        Scroll,
       
        
    },   
    data(){
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {}
        }
    },
    created(){
        //1.保存转入的iid
        this.iid = this.$route.params.iid
        //2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
           
            const data = res.result;
           this.topImages = data.itemInfo.topImages
        // 2.3.获取商品信息 
           this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 2.4.获取店铺信息
           this.shop = new Shop(data.shopInfo)
           // 2.5.获取商品信息
           this.detailInfo = data.detailInfo
        })
    },
    methods:{
        imageLoad() {
            this.$refs.scroll.refresh()
        }
    }
}
</script>

<style scoped>
.detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
}

.detail-nav {
    position: relative;
    z-index: 10;
    background-color: #fff;
}

.content {
    height: calc(100% - 44px);
}
</style>