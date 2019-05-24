import request from '@/utils/request'
import qs from 'qs'
/**
 * 获取公告
 * @param {*} params
 */
export function getNotice(params) {
  return request({
    url: '/admin/notice',
    method: 'get'
  })
}
/**
 * 修改公告
 * @param {*} params
 */
export function editNotice(params) {
  return request({
    url: '/admin/notice',
    method: 'post',
    data: qs.stringify(params)
  })
}
