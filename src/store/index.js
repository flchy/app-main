import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import colonel from './modules/colonel'
import city from './modules/city'
import shop from './modules/shop'
import goods from './modules/goods'
import wechatUser from './modules/wechatUser'
import order from './modules/order'
import operate from './modules/operate'
import member from './modules/member'
import slideshow from './modules/slideshow'
import upload from './modules/upload'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    colonel,
    upload,
    shop,
    city,
    goods,
    wechatUser,
    order,
    operate,
    member,
    slideshow
  },
  getters
})

export default store
