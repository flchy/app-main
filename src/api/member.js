import request from '@/utils/request'
import qs from 'qs'
/**
 *  查询拼团会员套餐分页
 * @param {*} params
 */
export function memberPage(params) {
  return request({
    url: '/assemble/admin/member/memberPage',
    method: 'post',
    data: params
  })
}
/**
 *  添加会员套餐
 * @param {*} params
 */
export function saveMember(params) {
  return request({
    url: '/assemble/admin/member/save',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 *  修改会员套餐
 * @param {*} params
 */
export function updateMember(params) {
  return request({
    url: '/assemble/admin/member/updateMember',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 *  删除会员套餐
 * @param {*} params
 */
export function deleteMember(params) {
  return request({
    url: '/assemble/admin/member/deleteMember',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 *  拼团用户购买会员套餐记录
 * @param {*} params
 */
export function memberRecordPage(params) {
  return request({
    url: '/assemble/admin/memberRecord/merchantPage',
    method: 'post',
    data: params
  })
}
