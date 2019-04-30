import request from '@/utils/request'
import requestDownload from '@/utils/requestDownload'
import qs from 'qs'
/**
 * 获取订单分页
 * @param {*} params
 */
export function orderPage(params) {
  return request({
    url: '/assemble/admin/order/orderPage',
    method: 'post',
    data: params
  })
}
/**
 * 开始配送订单
 * @param {*} params
 */
export function deliver(params) {
  return request({
    url: '/assemble/admin/order/deliver',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 * 配货完成订单
 * @param {*} params
 */
export function distribution(params) {
  return request({
    url: '/assemble/admin/order/distribution',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 * 获取订单详情
 * @param {*} params
 */
export function orderInfo(params) {
  return request({
    url: '/assemble/admin/order/orderInfo',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 * 订单统计
 * @param {*} params
 */
export function orderStatistics(params) {
  return request({
    url: '/assemble/admin/order/orderStatistics',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 * 导出
 * @param {*} params
 */
export function orderPrinting(params) {
  return requestDownload({
    url: '/assemble/admin/order/orderPrinting',
    method: 'post',
    data: params,
    responseType: 'blob'
  })
}
