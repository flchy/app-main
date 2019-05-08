import request from '@/utils/request'
import qs from 'qs'
export function login(userName, password) {
  return request({
    url: '/admin/login/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin/login/hasLogin',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/login/logout',
    method: 'post'
  })
}

export function changePassword(params) {
  return request({
    url: '/admin/login/changePassword',
    method: 'post',
    data: qs.stringify(params)
  })
}
