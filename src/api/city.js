import request from '@/utils/request'
import qs from 'qs'
/**
 * 查询所有开通城市
 * @param {*} params
 */
export function selectCity() {
  return request({
    url: '/assemble/admin/city/selectCity',
    method: 'post'
  })
}
/**
 * 查询所有开通城市分页
 * @param {*} params
 */
export function cityPage(param) {
  return request({
    url: '/assemble/admin/city/cityPage',
    method: 'post',
    data: param
  })
}
/**
 * 查询区域
 * @param {*} params
 */
export function selectArea(param) {
  return request({
    url: '/assemble/admin/city/selectArea',
    method: 'post',
    data: qs.stringify(param)
  })
}
/**
 * 添加城市
 * @param {*} params
 */
export function saveArea(param) {
  return request({
    url: '/assemble/admin/city/save',
    method: 'post',
    data: qs.stringify(param)
  })
}
/**
 * 删除城市
 * @param {*} params
 */
export function deleteCity(param) {
  return request({
    url: '/assemble/admin/city/deleteCity',
    method: 'post',
    data: qs.stringify(param)
  })
}
