import request from '@/utils/request'
import qs from 'qs'
/**
 * 查询商品分页
 * @param {*} params
 */
export function goodsPage(params) {
  return request({
    url: '/assemble/admin/goods/selectPage',
    method: 'post',
    data: params
  })
}
/**
 * 查询商品分类
 * @param {*} params
 */
export function classifyGetAll() {
  return request({
    url: '/assemble/admin/goods/classify/getAll',
    method: 'post'
  })
}
/**
 * 添加或者修改商品分类
 * @param {*} params
 */
export function classifyAddOrUpdate(param) {
  return request({
    url: '/assemble/admin/goods/classify/addOrUpdate',
    method: 'post',
    data: param
  })
}

/**
 * 删除商品分类
 * @param {*} params
 */
export function classifyDelete(param) {
  return request({
    url: '/assemble/admin/goods/classify/delete',
    method: 'post',
    data: qs.stringify(param)
  })
}
/**
 * 查询标签分类
 * @param {*} params
 */
export function tagList() {
  return request({
    url: '/assemble/admin/Tag/tagList',
    method: 'post'
  })
}
/**
 * 添加或者修改商品标签
 * @param {*} params
 */
export function tagAddOrUpdate(param) {
  return request({
    url: '/assemble/admin/Tag/save',
    method: 'post',
    data: param
  })
}
/**
 * 删除商品规格
 * @param {*} params
 */
export function deleteTag(param) {
  return request({
    url: '/assemble/admin/Tag/deleteTag',
    method: 'post',
    data: qs.stringify(param)
  })
}
/**
 * 添加or修改商品
 * @param {*} params
 */
export function createOrEditGoods(param) {
  return request({
    url: '/assemble/admin/goods/create',
    method: 'post',
    data: param
  })
}
/**
 * 查询商品详情
 * @param {*} params
 */
export function doodsdetail(param) {
  return request({
    url: '/assemble/admin/goods/detail',
    method: 'post',
    data: qs.stringify(param)
  })
}
/**
 * 删除商品
 * @param {*} params
 */
export function doodsgoods(param) {
  return request({
    url: '/assemble/admin/goods/delete',
    method: 'post',
    data: qs.stringify(param)
  })
}
/**
 * 设置商品是否为今推荐
 * @param {*} params
 */
export function goodsRecommend(param) {
  return request({
    url: '/assemble/admin/goods/recommend',
    method: 'post',
    data: qs.stringify(param)
  })
}
