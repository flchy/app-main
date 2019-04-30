/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 小于1000大于0
 * @param {*} number
 */
export function numberIsSuccess(rule, value, callback) {
  if (value <= 0 || value >= 1000) {
    callback(new Error('请输入0-1000的数字'))
  } else {
    callback()
  }
}
