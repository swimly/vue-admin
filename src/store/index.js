import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  loading: false,
  articleContent: '',
  userInfo: {
    face: 'https://zhanziyang.github.io/vue-croppa/static/500.jpeg',
    name: '刘勇',
    sex: 0,
    birthday: '1990-12-25',
    tel: '18827078587',
    email: '979741120@qq.com',
    QQ: '979741120',
    live: '湖北省武汉市',
    birth: '湖北省咸宁市'
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
