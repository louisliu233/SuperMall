<template>
  <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

      <tab-control class="tab-control"
           :titles="['流行','新款','精选']"
            @tabClick='tabClick'
            ref="tabcontrol1" v-show='isTabShow'/>

      <scroll class="content" ref="scroll" 
      :probe-type='3' 
      @scroll="contentScroll" 
      :pull-up-load='true' @pullingUp='loadMore'>
      <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad' />
      <recommend-view :recommends='recommends'/>
      <feature-view/>
      <tab-control class="tab-control"
           :titles="['流行','新款','精选']"
            @tabClick='tabClick'
            ref="tabcontrol2"/>
      <goods-list :goods="showGoods" />
      </scroll>
      <back-top @click.native="backclick"  v-show="isShow"/>

      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from '@/views/home/childComps/RecommendView'

import FeatureView from '@/views/home/childComps/FeatureView'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'


import {getHomeMultidata,getHomeGoods} from '../../network/home'



export default {
    name:'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page: 0, list: []},
          'new':{page: 0, list: []},
          'sell':{page: 0, list: []},
        },
        currentType: 'pop',
        isShow: false,
        tabOffsetTop:0,
        isTabShow:false,
        saveY: 0
      
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')

    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated(){
      this.saveY =  this.$refs.scroll.getScrollY()
    },
    mounted(){
      // const refresh = this.debounce(this.$refs.scroll.refresh(),200)
        this.$bus.$on('itemImageLoad',() => {
        this.$refs.scroll.refresh()
     })
    },
    methods:{
      // 事件监听相关的方法

      //**函数防抖**//
      // debounce(func,delay){
      //   let timer = null
      //   return function(...args){
      //     if(timer) clearTimeout(timer)
      //     timer = setTimeout(() => {
      //       func.apply(this,args)
      //     },delay)
      //   }
      // },
     

      tabClick(index){
        switch (index) {
          case 0:
            this.currentType= 'pop'
            break
          case 1:
            this.currentType= 'new'
            break
          case 2:
            this.currentType= 'sell'
            break
        }
        this.$refs.tabcontrol1.currentIndex = index;
        this.$refs.tabcontrol2.currentIndex = index;
      },
      backclick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position){
        this.isShow= (-position.y) > 1000

        this.isTabShow = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
      },

      //网络请求相关的方法
      getHomeMultidata(){
         getHomeMultidata().then(res => {
         this.banners = res.data.banner.list;
         this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
        })
      }
    
    }
}
</script>

<style scoped>

#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;

}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
  
  text-align: center;
}

.content {
  overflow: hidden; 

  position: absolute;
  top: 44px;
  bottom: 49px;

}

/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
</style>