import Vue from 'vue'
import VueRouter from 'vue-router'

const Home=()=> import('views/home/Home')
const Category=()=> import('views/category/Category')
const Cart=()=> import('views/cart/Cart')
const Porfile=()=> import('views/profile/Profile')

Vue.use(VueRouter)


const routes =[
      {
        path:'',
        redirect:'/home'
      },
      {
        path:'/home',
        component:Home
      },
      {
        path:'/cart',
        component:Cart
      },
      {
        path:'/category',
        component:Category
      },
      {
        path:'/profile',
        component:Porfile
      },
]

const router = new VueRouter({
    routes,
    mote:'history'
})


export default router