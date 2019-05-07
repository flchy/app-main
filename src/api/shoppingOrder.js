import request from '@/utils/request'
// import requestDownload from '@/utils/requestDownload'
import qs from 'qs'
/**
 * 获取订单分页
 * @param {*} params
 */
export function shoppingOrderPage(params) {
  return request({
    url: '/admin/shoppingOrder/page',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 *审核
 * @param {*} params
 */
export function shoppingOrderConfirm(params) {
  return request({
    url: '/admin/shoppingOrder/deliver',
    method: 'post',
    data: qs.stringify(params)
  })
}
