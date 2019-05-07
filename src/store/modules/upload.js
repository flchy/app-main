import { uploadImageBase64, uploadImage } from '@/api/upload'

const upload = {
  actions: {
    // 获取拼团团长列表
    UploadImageBase64({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        uploadImageBase64(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 上传图片
    UploadImage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        uploadImage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default upload
