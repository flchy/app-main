import request from '@/utils/request'
// import requestDownload from '@/utils/requestDownload'
import qs from 'qs'
/**
 * 获取订单分页
 * @param {*} params
 */
export function userEncashmentPage(params) {
  return request({
    url: '/admin/userEncashment/page',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 *审核
 * @param {*} params
 */
export function userEncashmentConfirm(params) {
  return request({
    url: '/admin/userEncashment/confirm',
    method: 'post',
    data: qs.stringify(params)
  })
}
