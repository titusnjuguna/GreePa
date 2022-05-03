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
import BlogPreview from "../views/BlogPreview.vue";
import Viewblog from "../views/Viewblog.vue";
import EditPost from "../views/EditPost.vue";
import firebase from "firebase/app";
import "firebase/auth";


Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      title:"Home",
      requiresAuth: false
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta:{
      title:"Blogs",
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password ",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Change Password",
      requiresAuth: false,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/Create-Post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "Create Post",
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile",
      requiresAuth: true,
      
    },
  },
  
  {
    path: "/Preview-Post",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title: "Blog-Preview",
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    path: "/Viewblog/:blogid",
    name: "Viewblog",
    component: Viewblog,
    meta: {
      title: "View-blog-Post",
      requiresAuth: false,
  },
},
  {
    path: "/EditPost/:blogid",
    name: "EditPost",
    component: EditPost,
    meta: {
      title: "Edit-blog-Post",
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
router.beforeEach((to,from,next) => {
  document.title = `${to.meta.title}| GreePa`;
  next();
});
router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser;
  let admin = null;
  if (user) {
    let token = await user.getIdTokenResult();
    admin = token.claims.admin;
  }
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (admin) {
          return next();
        }
        return next({ name: "Home" });
      }
      return next();
    }
    return next({ name: "Home" });
  }
  return next();
});

export default router;
