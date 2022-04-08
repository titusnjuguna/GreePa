import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleblogCards: [
      { blogTitle: "The secod comig of Jesus", blogCoverPhoto: "stock-1", blogDate: "July 2,2021" },
      { blogTitle: "Jesus is Alive", blogCoverPhoto: "stock-2", blogDate: "Aug 23,2022" },
      { blogTitle: "Faith for Christ", blogCoverPhoto: "stock-3", blogDate: "March 29,2022" },
      { blogTitle: "Life after Death", blogCoverPhoto: "stock-4", blogDate: "March 29,2022" },

    ],
    editPost: null,
  },
  mutations: {
    toggleEditPost(state,payload){
      state.editPost = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
