import request from '@/utils/request'
import qs from 'qs'
/**
 * 获取优惠卷分页
 * @param {*} params
 */
export function couponPage(params) {
  return request({
    url: '/assemble/admin/coupon/couponPage',
    method: 'post',
    data: params
  })
}
/**
 * 添加优惠卷
 * @param {*} params
 */
export function saveCoupon(params) {
  return request({
    url: '/assemble/admin/coupon/save',
    method: 'post',
    data: qs.stringify(params)
  })
}
/**
 * 删除优惠卷
 * @param {*} params
 */
export function deleteCoupon(params) {
  return request({
    url: '/assemble/admin/coupon/deleteCoupon',
    method: 'post',
    data: qs.stringify(params)
  })
}
