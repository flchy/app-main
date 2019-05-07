import request from '@/utils/request'
import qs from 'qs'
/**
 * 查询商品分页
 * @param {*} params
 */
export function financialProductsPage(params) {
  return request({
    url: '/admin/financialProducts/page',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 * 添加or修改商品
 * @param {*} params
 */
export function createOrEditFinancialProducts(param) {
  return request({
    url: '/admin/financialProducts/addOrUpdate',
    method: 'post',
    data: qs.stringify(param)
  })
}
/**
 * 查询商品详情
 * @param {*} params
 */
export function financialProductstail(param) {
  return request({
    url: '/admin/financialProducts/detail',
    method: 'post',
    data: qs.stringify(param)
  })
}
/**
 * 删除商品
 * @param {*} params
 */
export function delFinancialProducts(param) {
  return request({
    url: '/admin/financialProducts/del',
    method: 'post',
    data: qs.stringify(param)
  })
}
