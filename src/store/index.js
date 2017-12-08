import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  loading: false,
  articleContent: '', // 文章内容
  mdContent: '', // markdown内容
  articleCategory: [], // 文章分类
  userCategory: [], // 用户分类
  groupCategory: [], // 组别分类
  theme: {
    color: '495060'
  },
  userInfo: {
    face: '',
    name: '',
    sex: 0,
    birthday: '',
    phone: '',
    email: '',
    QQ: '',
    domicile: '',
    birthplace: '',
    theme: ''
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
  markdown (state) {
    return state.mdContent
  },
  articleCategory (state) {
    return state.articleCategory
  },
  userCategory (state) {
    return state.userCategory
  },
  groupCategory (state) {
    return state.groupCategory
  },
  theme (state) {
    return state.theme
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
  updateMardown (state, param) {
    state.mdContent = param
  },
  updateArticleCategory (state, param) {
    state.articleCategory = param
  },
  updateUserCategory (state, param) {
    state.userCategory = param
  },
  updateGroupCategory (state, param) {
    state.groupCategory = param
  },
  updateTheme (state, param) {
    state.theme = param
  }
}
const actions = {}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
