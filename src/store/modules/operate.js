import { couponPage, saveCoupon, deleteCoupon } from '@/api/operate'

const operate = {
  actions: {
    // 获取优惠卷分页
    CouponPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        couponPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 添加优惠卷
    SaveCoupon({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        saveCoupon(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除优惠卷
    DeleteCoupon({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        deleteCoupon(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default operate
