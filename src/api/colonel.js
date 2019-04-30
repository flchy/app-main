import request from '@/utils/request'
import qs from 'qs'
/**
 * 查询拼团团长分页
 * @param {*} params
 */
export function colonelPage(params) {
  return request({
    url: '/assemble/admin/colonel/colonelPage',
    method: 'post',
    data: params
  })
}
/**
 * 查询拼团团长未绑定分页
 * @param {*} params
 */
export function noMerchantColonelPage(params) {
  return request({
    url: '/assemble/admin/colonel/noMerchantColonelPage',
    method: 'post',
    data: params
  })
}
/**
 * 添加拼团团长
 * @param {*} params
 */
export function colonelSave(params) {
  return request({
    url: '/assemble/admin/colonel/save',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 * 获取拼团团长信息
 * @param {*} params
 */
export function colonelinfo(params) {
  return request({
    url: '/assemble/admin/colonel/colonelInfo',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 * 修改拼团团长
 * @param {*} params
 */
export function updateColonel(params) {
  return request({
    url: '/assemble/admin/colonel/updateColonel',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 * 删除拼团团长
 * @param {*} params
 */
export function deleteColonel(params) {
  return request({
    url: '/assemble/admin/colonel/deleteColonel',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 * 获取拼团团长申请
 * @param {*} params
 */
export function colonelApplyPage(params) {
  return request({
    url: '/assemble/admin/colonelApply/colonelPage',
    method: 'post',
    data: params
  })
}
/**
 *  根据团长名查询拼团团长
 * @param {*} params
 */
export function selectMerchantColonel(params) {
  return request({
    url: '/assemble/admin/colonel/selectMerchantColonel',
    method: 'post',
    data: qs.stringify(params)
  })
}
