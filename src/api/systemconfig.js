import request from '@/utils/request'
import qs from 'qs'
/**
 * 获取系统配置
 * @param {*} params
 */
export function selectSystemConfig() {
  return request({
    url: '/admin/systemConfig',
    method: 'get'
  })
}
/**
 * 修改系统配置
 * @param {*} params
 */
export function putSystemConfig(param) {
  return request({
    url: '/admin/systemConfig',
    method: 'put',
    data: qs.stringify(param)
  })
}
/**
 * 修改下载系统配置
 * @param {*} params
 */
export function putDownloadUpdate(param) {
  return request({
    url: '/admin/systemConfig/downloadUpdate',
    method: 'post',
    data: qs.stringify(param)
  })
}
