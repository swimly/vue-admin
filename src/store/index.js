import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  loading: false,
  articleContent: '',
  articleCategory: [],
  userCategory: [],
  groupCategory: [],
  userInfo: {
    face: '',
    name: '',
    sex: 0,
    birthday: '',
    phone: '',
    email: '',
    QQ: '',
    domicile: '',
    birthplace: ''
  }
}
const getters = {
  loading (state) {
    return state.loading
  },
  userInfo (state) {
    return state.userInfo
  },
  article (state) {
    return state.articleContent
  },
  articleCategory (state) {
    return state.articleCategory
  },
  userCategory (state) {
    return state.userCategory
  },
  groupCategory (state) {
    return state.groupCategory
  }
}
const mutations = {
  updateLoadingStatus (state, param) {
    state.loading = param
  },
  updateUserInfo (state, param) {
    for (var item in param) {
      // console.log(param[item])
      state.userInfo[item] = param[item]
    }
  },
  updateArticle (state, param) {
    state.articleContent = param
  },
  updateArticleCategory (state, param) {
    state.articleCategory = param
  },
  updateUserCategory (state, param) {
    state.userCategory = param
  },
  updateGroupCategory (state, param) {
    state.groupCategory = param
  }
}
const actions = {}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
