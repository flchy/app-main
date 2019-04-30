import request from '@/utils/request'

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
