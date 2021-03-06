import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import colonel from './modules/colonel'
import city from './modules/city'
import shop from './modules/shop'
import goods from './modules/goods'
import appUser from './modules/appUser'
import order from './modules/order'
import operate from './modules/operate'
import member from './modules/member'
import slideshow from './modules/slideshow'
import systemconfig from './modules/systemconfig'
import payway from './modules/payway'
import topuporder from './modules/topuporder'
import financialProducts from './modules/financialProducts'
import financialProductsOrder from './modules/financialProductsOrder'
import userEncashment from './modules/userEncashment'
import shoppingOrder from './modules/shoppingOrder'
import homePageDetails from './modules/homePageDetails'
import notice from './modules/notice'
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
    order,
    operate,
    member,
    slideshow,
    systemconfig,
    payway,
    topuporder,
    financialProducts,
    financialProductsOrder,
    userEncashment,
    shoppingOrder,
    appUser,
    homePageDetails,
    notice
  },
  getters
})

export default store
