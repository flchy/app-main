import { uploadImageBase64 } from '@/api/upload'

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
    }
  }
}

export default upload
