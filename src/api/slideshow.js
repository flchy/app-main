import request from '@/utils/request'
import qs from 'qs'

/**
 * 查询轮播图分页
 * @param {*} params
 */
export function slideshowPage(params) {
  return request({
    url: '/assemble/admin/slideshow/slideshowPage',
    method: 'post',
    data: params
  })
}
/**
 * 添加修改轮播图
 * @param {*} params
 */
export function slideshowAddOrEdit(params) {
  return request({
    url: '/assemble/admin/slideshow/create',
    method: 'post',
    data: params
  })
}
/**
 * 删除轮播图
 * @param {*} params
 */
export function deleteSlideshow(params) {
  return request({
    url: '/assemble/admin/slideshow/deleteSlideshow',
    method: 'post',
    data: qs.stringify(params)
  })
}

/**
 * 停用轮播图
 * @param {*} params
 */
export function prohibitSlideshow(params) {
  return request({
    url: '/assemble/admin/slideshow/prohibitSlideshow',
    method: 'post',
    data: qs.stringify(params)
  })
}

/**
 * 启用轮播图
 * @param {*} params
 */
export function enableSlideshow(params) {
  return request({
    url: '/assemble/admin/slideshow/enableSlideshow',
    method: 'post',
    data: qs.stringify(params)
  })
}
