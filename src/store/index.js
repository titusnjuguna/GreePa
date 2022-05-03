import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app"
import "firebase/auth"
import db from "../firebase/firebaseInit"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
    blogPosts: [],
    postLoaded: null,
    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null
  },
  getters:{
    blogPostsFeed(state){
      return state.blogPosts.slice(0,2);
    },
    blogPostsCards(state){
      return state.blogPosts.slice(2,6);
    }

  },
  mutations: {
    updateBlogTitle(state,payload){
      state.blogTitle= payload;
    },
    setblogState(state,payload){
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL =payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;

    },
    newBlogPost(state,payload){
      state.blogHTML = payload;
    },
    fileNameChange(state,payload){
      state.blogPhotoName = payload;
    },
    createFileURL(state,payload){
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state){
      state.blogPhotoPreview = !state.blogPhotoPreview ;
    },


    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    filterblogPost(state,payload){
      state.blogPosts = state.blogPosts.filter((post) => post.blogID !== payload);
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstname;
      state.profileLastName = doc.data().lastname;
      state.profileUserName = doc.data().username;
      console.log(state.profileId);

    },
    
    updateUser(state,payload){
      state.user = payload;
    },

    setProfileInitials(state) {
      state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("")
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
  },
  actions: {
    async getPost({state}){
      const database = await db.collection('blogPosts').orderBy('date','desc');
      const dbResults = await database.get();
      dbResults.forEach( (doc) => {
        if(!state.blogPosts.some(post => post.blogID === doc.id)){
          const data={
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
          }
          state.blogPosts.push(data);

        }
        
        
      }
      );
      state.postLoaded=true;
    },
   
    async  deletePost({ commit },payload){
      const getPost = await db.collection("blogPosts").doc(payload);
      await getPost.delete();
      commit("filterblogPost",payload);
    },
    async updateblog({commit,dispatch},payload){
      commit("filterblogPost", payload);
      await dispatch("getPost")

    },
    async getCurrentUser({ commit }) {
      const database = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResult = await database.get();
      commit("setProfileInfo", dbResult);
      commit("setProfileInitials");
    },
    async updateUserSettings({commit,state}){
      const database = await db.collection("users").doc(state.profileId);
      await database.update({
        firstname: state.profileFirstName,
        lastname: state.profileLastName,
        username: state.profileUserName,

      });
      commit("setProfileInitials")

    }

  },
  modules: {
  }
});
