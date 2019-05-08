import request from '@/utils/request'
import qs from 'qs'
/**
 * 查询用户分页
 * @param {*} params
 */
export function appUserPage(params) {
  return request({
    url: '/admin/user/page',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 * 修改用户状态
 * @param {*} params
 */
export function editAppUserStatus(params) {
  return request({
    url: '/admin/user/editStatus',
    method: 'post',
    data: qs.stringify(params)
  })
}
