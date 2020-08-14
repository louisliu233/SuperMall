<template>
  <div class="detail" name="detail">
      <detail-nav-bar class="detail-nav" ref="nav"
       @titleClick='titleClick' 
      :current-index="currentIndex"/>

      <scroll class="content" ref="scroll" :probe-type='3' @scroll='contentScroll'>
      <detail-swiper :top-images='topImages'/>
      <detail-base-info :goods='goodsInfo'/>
      <detail-shop-info :shop='shopInfo'/>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'/>
      <detail-param-info  ref='param' :param-info='paramInfo'/>
      <detail-comment-info  ref="comment" :comment-info='commentInfo'/>
      </scroll>
        <back-top @click.native="backclick"  v-show="isShow"/>
      <detail-bottom @addCart='addCart'/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottom from './childComps/DetailBottom'


import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'




import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '@/network/detail'

export default {
    name:'Detail', 
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottom,
        BackTop,
        Scroll,
       
        
    },   
    data(){
        return {
            iid: null,
            topImages: [],
            goodsInfo: {},
            shopInfo: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            themeTopYs: [],
            currentIndex: 0,
            isShow: false,
            
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
           this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          
           // 2.4.获取店铺信息
           this.shopInfo = new Shop(data.shopInfo)
           
           // 2.5.获取商品信息
           this.detailInfo = data.detailInfo
           
           // 2.6.保存参数信息
           this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

           // 2.7获取评论信息
           if(data.rate.cRate !== 0) {
               this.commentInfo = data.rate.list[0]
           }
        })
        
        //3.请求推荐数据
        getRecommend().then(res => {
            // console.log(res);
            this.recommendsList = res.data.list
        })

      
    },
    updated(){
          this.getThemeTopy()
    },
    
    methods:{
    //     debounce(func,delay){
    //     let timer = null
    //     return function(...args){
    //       if(timer) clearTimeout(timer)
    //       timer = setTimeout(() => {
    //         func.apply(this,args)
    //       },delay)
    //     }
    //   },
        getThemeTopy() {
            
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.param.$el.offsetTop )
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            // console.log(this.themeTopYs);
        },
        backclick(){
        this.$refs.scroll.scrollTo(0,0)
        },

        imageLoad() {
            this.$refs.scroll.refresh()
        },
        titleClick(index){
            // console.log(index);
            this.$refs.scroll.scrollTo( 0,44-this.themeTopYs[index], 300)
            
        },
        contentScroll(position) {
            this.isShow= (-position.y) > 1000
            
            const positionY = -position.y
            let length = this.themeTopYs.length
            for(let i=0;i<length;i++) {
                if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
                   if (this.currentIndex !== i) {
                        this.currentIndex = i;
                        this.$refs.nav.currentIndex = this.currentIndex
                    }
                    break;
                   
                }
            }
        },
        addCart(){
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goodsInfo.title
            product.desc = this.goodsInfo.desc
            product.price = this.goodsInfo.highNowPrice
            product.iid = this.iid

            this.$store.dispatch('addCat',product)
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