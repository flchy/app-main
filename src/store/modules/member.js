import { memberPage, saveMember, updateMember, deleteMember, memberRecordPage } from '@/api/member'

const member = {
  actions: {
    //  查询拼团会员套餐分页
    MemberPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        memberPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //  添加会员套餐
    SaveMember({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        saveMember(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //  修改会员套餐
    UpdateMember({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        updateMember(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //  修改会员套餐
    DeleteMember({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        deleteMember(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //  拼团用户购买会员套餐记录
    MemberRecordPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        memberRecordPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default member
