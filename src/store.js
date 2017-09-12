import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    system: {user: null},
    count: 0,
    cat: {},
    currentArticle: {},
    articleList: []
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data
      state.token = data
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token')
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data
    },
    [types.CHANGE_CAT]: (state, data) => {
      state.cat = data
    },
    [types.UPDATE_LIST]: (state, data) => {
      state.articleList = data
    },
    [types.CHANGE_ARTICLE]: (state, data) => {
      state.currentArticle = data
    }
  }
})

export default store
