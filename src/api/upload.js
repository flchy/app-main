import request from '@/utils/uploadRequest'
import qs from 'qs'
/**
 *Base64上传文件
 * @param {*} params
 */
export function uploadImageBase64(params) {
  return request({
    url: '/operation/merchant/uploadImageBase64',
    method: 'post',
    data: qs.stringify(params)
  })
}
