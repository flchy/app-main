import request from '@/utils/request'
import qs from 'qs'
/**
 * 查询首页介绍
 * @param {*} params
 */
export function gethomePageDetails(params) {
  return request({
    url: '/admin/homePageDetails',
    method: 'get',
    data: qs.stringify(params)
  })
}
/**
 * 修改首页介绍
 * @param {*} params
 */
export function editHomePageDetails(params) {
  return request({
    url: '/admin/homePageDetails',
    method: 'post',
    data: qs.stringify(params)
  })
}
