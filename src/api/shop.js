/**
 *一帮垃圾
 * @param {*} params
 */
import request from '@/utils/request'
import qs from 'qs'

/**
 * 查询拼团店铺分页
 * @param {*} params
 */
export function merchantPage(params) {
  return request({
    url: '/assemble/admin/merchant/merchantPage',
    method: 'post',
    data: params
  })
}
/**
 * 添加拼团店铺
 * @param {*} params
 */
export function saveMerchant(params) {
  return request({
    url: '/assemble/admin/merchant/save',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 * 修改拼团店铺
 * @param {*} params
 */
export function updateMerchant(params) {
  return request({
    url: '/assemble/admin/merchant/updateMerchant',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 * 获取拼团店铺信息
 * @param {*} params
 */
export function merchantInfo(params) {
  return request({
    url: '/assemble/admin/merchant/merchantInfo',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 * 删除拼团店铺
 * @param {*} params
 */
export function deleteMerchant(params) {
  return request({
    url: '/assemble/admin/merchant/deleteMerchant',
    method: 'post',
    data: qs.stringify(params)
  })
}
