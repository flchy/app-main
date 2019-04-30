import { goodsPage, classifyGetAll, classifyAddOrUpdate, classifyDelete, tagList, tagAddOrUpdate, deleteTag,
  createOrEditGoods, doodsdetail, doodsgoods,
  goodsRecommend } from '@/api/goods'

const goods = {
  actions: {
    // 获取商品分页
    GoodsPage({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        goodsPage(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询所有商品分类
    ClassifyGetAll({ commit, state }) {
      return new Promise((resolve, reject) => {
        classifyGetAll().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 添加或者修改商品分类
    ClassifyAddOrUpdate({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        classifyAddOrUpdate(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除商品分类
    ClassifyDelete({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        classifyDelete(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询拼团商品标签
    TagList({ commit, state }) {
      return new Promise((resolve, reject) => {
        tagList().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 添加或者修改商品标签
    TagAddOrUpdate({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        tagAddOrUpdate(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除商品规格
    DeleteTag({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        deleteTag(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 添加or修改商品
    CreateOrEditGoods({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        createOrEditGoods(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询商品详情
    Doodsdetail({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        doodsdetail(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除商品
    Doodsgoods({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        doodsgoods(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 设置商品是否为今推荐
    GoodsRecommend({ commit, state }, paream) {
      return new Promise((resolve, reject) => {
        goodsRecommend(paream).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default goods
