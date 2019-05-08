import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard/index',
    name: '首页',
    // hidden: true,
    children: [{
      path: '/dashboard/index',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'example' }
    }]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods',
    meta: { title: '商品管理', icon: 'example' },
    name: '商品管理',
    children: [
      {
        path: 'list',
        name: '商品管理',
        component: () => import('@/views/goods/list'),
        meta: { title: '商品管理', icon: 'form' }
      },
      {
        path: 'type',
        name: '商品分类管理',
        hidden: true,
        component: () => import('@/views/goods/type'),
        meta: { title: '商品分类管理', icon: 'form' }
      },
      {
        path: 'label',
        name: '商品标签管理',
        hidden: true,
        component: () => import('@/views/goods/label'),
        meta: { title: '商品标签管理', icon: 'form' }
      },
      {
        path: 'add/:id',
        name: '商品操作',
        hidden: true,
        component: () => import('@/views/goods/add'),
        meta: { title: '商品操作', icon: 'form' }
      }
    ]
  },
  {
    path: '/financialProducts',
    component: Layout,
    redirect: '/financialProducts',
    meta: { title: '抢单商品管理', icon: 'example' },
    name: '抢单商品管理',
    children: [
      {
        path: 'list',
        name: '抢单商品管理',
        component: () => import('@/views/financialProducts/list'),
        meta: { title: '抢单商品管理', icon: 'form' }
      },
      {
        path: 'add/:id',
        name: '抢单商品操作',
        hidden: true,
        component: () => import('@/views/financialProducts/add'),
        meta: { title: '抢单商品操作', icon: 'form' }
      }
    ]
  },
  {
    path: '/systemconfig',
    component: Layout,
    redirect: '/systemconfig',
    meta: { title: '系统配置', icon: 'example' },
    name: '系统配置',
    children: [
      {
        path: 'list',
        name: '系统配置',
        component: () => import('@/views/systemconfig/list'),
        meta: { title: '系统配置', icon: 'form' }
      }
    ]
  },
  {
    path: '/payway',
    component: Layout,
    redirect: '/payway',
    meta: { title: '支付方式配置', icon: 'example' },
    name: '支付方式配置',
    children: [
      {
        path: 'list',
        name: '支付方式配置',
        component: () => import('@/views/payway/list'),
        meta: { title: '支付方式配置', icon: 'form' }
      }
    ]
  },
  {
    path: '/topuporder',
    component: Layout,
    redirect: '/topuporder',
    meta: { title: '充值订单管理', icon: 'example' },
    name: '充值订单管理',
    children: [
      {
        path: 'list',
        name: '充值订单管理',
        component: () => import('@/views/topuporder/list'),
        meta: { title: '充值订单管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/financialProductsOrder',
    component: Layout,
    redirect: '/financialProductsOrder',
    meta: { title: '抢单订单管理', icon: 'example' },
    name: '抢单订单管理',
    children: [
      {
        path: 'list',
        name: '抢单订单管理',
        component: () => import('@/views/financialProductsOrder/list'),
        meta: { title: '抢单订单管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/userEncashment',
    component: Layout,
    redirect: '/userEncashment',
    meta: { title: '提现管理', icon: 'example' },
    name: '提现管理',
    children: [
      {
        path: 'list',
        name: '提现管理',
        component: () => import('@/views/userEncashment/list'),
        meta: { title: '提现管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/shoppingOrder',
    component: Layout,
    redirect: '/shoppingOrder',
    meta: { title: '购物订单管理', icon: 'example' },
    name: '购物订单管理',
    children: [
      {
        path: 'list',
        name: '购物订单管理',
        component: () => import('@/views/shoppingOrder/list'),
        meta: { title: '购物订单管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/appUser',
    component: Layout,
    redirect: '/appUser',
    meta: { title: '用户管理', icon: 'example' },
    name: '用户管理',
    children: [
      {
        path: 'list',
        name: '用户管理',
        component: () => import('@/views/user/list'),
        meta: { title: '用户管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/homePageDetails',
    component: Layout,
    redirect: '/homePageDetails',
    meta: { title: '首页介绍管理', icon: 'example' },
    name: '首页介绍管理',
    children: [
      {
        path: 'index',
        name: '首页介绍管理',
        component: () => import('@/views/homePageDetails/index'),
        meta: { title: '首页介绍管理', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
