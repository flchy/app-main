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
    path: '/shop',
    component: Layout,
    redirect: '/shop',
    meta: { title: '店铺管理', icon: 'example' },
    name: '店铺管理',
    children: [
      {
        path: 'list',
        name: '店铺管理',
        component: () => import('@/views/shop/list'),
        meta: { title: '店铺管理', icon: 'example' }
      },
      {
        path: 'add/:id',
        name: '添加店铺',
        hidden: true,
        component: () => import('@/views/shop/add'),
        meta: { title: '添加店铺', icon: 'example' }
      },
      {
        path: 'details/:id',
        name: '店铺详情',
        hidden: true,
        component: () => import('@/views/shop/details'),
        meta: { title: '店铺详情', icon: 'example' }
      }
    ]
  },
  {
    path: '/colonel',
    component: Layout,
    redirect: '/colonel',
    meta: { title: '团长管理', icon: 'example' },
    name: '团长管理',
    children: [
      {
        path: 'list',
        name: '团长管理',
        component: () => import('@/views/colonel/list'),
        meta: { title: '团长管理', icon: 'form' }
      }, {
        path: 'add/:id',
        name: '添加团长',
        hidden: true,
        component: () => import('@/views/colonel/add'),
        meta: { title: '添加团长', icon: 'form' }
      },
      {
        path: 'applyList',
        name: '申请列表',
        hidden: true,
        component: () => import('@/views/colonel/applyList'),
        meta: { title: '申请列表', icon: 'form' }
      }
    ]
  },
  {
    path: '/wechatUser',
    component: Layout,
    redirect: '/wechatUser',
    meta: { title: '用户管理', icon: 'example' },
    name: '用户管理',
    children: [
      {
        path: 'list',
        name: '用户管理',
        component: () => import('@/views/wechatUser/list'),
        meta: { title: '用户管理', icon: 'form' }
      }
    ]
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
    path: '/order',
    component: Layout,
    redirect: '/order',
    meta: { title: '订单管理', icon: 'example' },
    name: '订单管理',
    children: [
      {
        path: 'list',
        name: '订单管理',
        component: () => import('@/views/order/list'),
        meta: { title: '订单管理', icon: 'form' }
      }
    ]
  },
  // {
  //   path: '/table',
  //   component: Layout,
  //   redirect: '/table',
  //   meta: { title: '配送管理', icon: 'example' },
  //   name: '配送管理',
  //   children: [
  //     {
  //       path: 'list',
  //       name: '配送管理',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: '配送管理', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/retreatOrder',
    component: Layout,
    redirect: '/retreatOrder',
    meta: { title: '退单管理', icon: 'example' },
    name: '退单管理',
    children: [
      {
        path: 'list',
        name: '退单管理',
        component: () => import('@/views/retreatOrder/list'),
        meta: { title: '退单管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/operate',
    component: Layout,
    redirect: '/operate',
    meta: { title: '运营管理', icon: 'example' },
    name: '运营管理',
    children: [
      {
        path: 'list',
        name: '运营管理',
        component: () => import('@/views/operate/list'),
        meta: { title: '运营管理', icon: 'form' }
      },
      {
        path: 'add',
        name: '添加优惠卷',
        hidden: true,
        component: () => import('@/views/operate/add'),
        meta: { title: '添加优惠卷', icon: 'form' }
      }
    ]
  },
  {
    path: '/city',
    component: Layout,
    redirect: '/city',
    meta: { title: '开通城市', icon: 'example' },
    name: '开通城市',
    children: [
      {
        path: 'list',
        name: '开通城市',
        component: () => import('@/views/city/list'),
        meta: { title: '开通城市', icon: 'form' }
      }
    ]
  },
  {
    path: '/slideshow',
    component: Layout,
    redirect: '/slideshow',
    meta: { title: '轮播图管理', icon: 'example' },
    name: '轮播图管理',
    children: [
      {
        path: 'list',
        name: '轮播图管理',
        component: () => import('@/views/slideshow/list'),
        meta: { title: '轮播图管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    redirect: '/member',
    meta: { title: '会员设置', icon: 'example' },
    name: '会员设置',
    children: [
      {
        path: 'list',
        name: '会员设置',
        component: () => import('@/views/member/list'),
        meta: { title: '会员设置', icon: 'form' }
      },
      {
        path: 'purchase',
        name: '购买记录',
        hidden: true,
        component: () => import('@/views/member/purchase'),
        meta: { title: '购买记录', icon: 'form' }
      }
    ]
  },
  // {
  //   path: '/table',
  //   component: Layout,
  //   redirect: '/table',
  //   meta: { title: '账号与权限', icon: 'example' },
  //   name: '账号与权限',
  //   children: [
  //     {
  //       path: 'list',
  //       name: '账号与权限',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: '账号与权限', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})