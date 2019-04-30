import request from '@/utils/request'
/**
 * 查询拼团用户分页
 * @param {*} params
 */
export function wechatUserPage(params) {
  return request({
    url: '/assemble/admin/user/list',
    method: 'post',
    data: params
  })
}
