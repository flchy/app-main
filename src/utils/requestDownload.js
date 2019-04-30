import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000, // 请求超时时间
  withCredentials: true, // 携带session
  crossDomain: true, // 需要提交cookie的跨域请求，axios默认是禁止携带cookie的，需要添加以下两个参数，即可发送带cookie的请求
  responseType: 'blob'
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.responseType = 'blob'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

export default service
