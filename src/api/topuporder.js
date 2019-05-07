import request from '@/utils/request'
// import requestDownload from '@/utils/requestDownload'
import qs from 'qs'
/**
 * 获取订单分页
 * @param {*} params
 */
export function listTopUpOrder(params) {
  return request({
    url: '/admin/topuporder/listTopUpOrder',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 *审核
 * @param {*} params
 */
export function listTopUpOrderConfirm(params) {
  return request({
    url: '/admin/topuporder/confirm',
    method: 'post',
    data: qs.stringify(params)
  })
}
