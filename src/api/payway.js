import request from '@/utils/request'
import qs from 'qs'
/**
 * 获取支付方式配置
 * @param {*} params
 */
export function selectPayWay() {
  return request({
    url: '/admin/payWay',
    method: 'get'
  })
}
/**
 * 修改支付方式配置
 * @param {*} params
 */
export function putPayWay(param) {
  return request({
    url: '/admin/payWay',
    method: 'put',
    data: qs.stringify(param)
  })
}
