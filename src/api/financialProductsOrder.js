import request from '@/utils/request'
// import requestDownload from '@/utils/requestDownload'
import qs from 'qs'
/**
 * 获取订单分页
 * @param {*} params
 */
export function financialProductsOrderPage(params) {
  return request({
    url: '/admin/financialProductsOrder/page',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 *审核
 * @param {*} params
 */
export function financialProductsOrderConfirm(params) {
  return request({
    url: '/admin/financialProductsOrder/confirm',
    method: 'post',
    data: qs.stringify(params)
  })
}
