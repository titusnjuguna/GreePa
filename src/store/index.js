import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app"
import "firebase/auth"
import db from "../firebase/firebaseInit"

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
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstname;
      state.profileLastName = doc.data().lastname;
      state.profileUserName = doc.data().username;
      console.log(state.profileId)

    },
    setProfileInitials(state) {
      state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("")
    }
  },
  actions: {
    async getCurrentUser({ commit }) {
      const database = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResult = await database.get();
      commit("setProfileInfo", dbResult);
      commit("setProfileInitials");
    },

  },
  modules: {
  }
});
