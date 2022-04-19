import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Login from "../views/Login.vue";
import Admin from "../views/Admin.vue";
import Profile from "../views/Profile.vue";
import CreatePost from "../views/CreatePost.vue";


Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      title:"Home",
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta:{
      title:"Blogs"
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register"
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login"
    },
  },
  {
    path: "/forgot-password ",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Change Password",
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin"
    },
  },
  {
    path: "/Create-Post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "Create Post"
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile"
    },
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to,from,next) => {
  document.title = `${to.meta.title}| GreePa`;
  next();
});

export default router;
