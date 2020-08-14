import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        cartlist: []
    },
    mutations: {
        addCounter(state,payload){
            payload.count++
        },
        addToCart(state,payload){
            state.cartlist.push(payload)
        }
    },
    actions: {
        addCat(context,payload) {
            let oldProduct = context.state.cartlist.find(item => item.iid === payload.iid)
            

                if(oldProduct) {
                    // oldProduct.count +=1
                    context.commit('addCounter',oldProduct)
                }else {
                    payload.count = 1
                    // state.cartlist.push(payload)
                    context.commit('addToCart',payload)
                }
            }
        },
       
        
    })


export default store