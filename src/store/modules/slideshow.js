import { slideshowPage, slideshowAddOrEdit, deleteSlideshow, prohibitSlideshow, enableSlideshow } from '@/api/slideshow'

const slideshow = {
  actions: {
    // 查询轮播图分页
    SlideshowPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        slideshowPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改或者添加轮播图
    SlideshowAddOrEdit({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        slideshowAddOrEdit(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除轮播图
    DeleteSlideshow({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        deleteSlideshow(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 停用轮播图
    ProhibitSlideshow({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        prohibitSlideshow(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 启用轮播图
    EnableSlideshow({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        enableSlideshow(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default slideshow
