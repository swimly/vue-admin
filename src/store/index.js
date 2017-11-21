import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  loading: false,
  articleContent: '',
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
  }
}
const actions = {}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
