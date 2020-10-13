import Vue from "vue";
import VueRouter from "vue-router";
import Items from "../views/Items.vue";
import Post from "../views/Post.vue";
import Stack from "../views/Stack.vue";
import Welcome from "../views/Welcome.vue"
import Favorites from "../views/Favorites.vue"
import Profile from "../views/Profile.vue"
import LogIn from "../views/LogIn.vue"
import LogIn2 from "../views/LogIn2.vue"





Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  history: true,

  routes: [
    {
      path: "/",
      name: "Welcome",
      component: Welcome
    },
    {
      path: "/v/:TinyURL",
      name: "Items",
      component: Items
    },
    {
      path: "/myprofile",
      name: "profile",
      component: Profile
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
      path: "/posts/:id",
      name: "post",
      component: Post
    },
    {
      path: "/stack/:TinyURL",
      name: "stack",
      component: Stack
    },
    {
      path: "/favorites",
      name: "favorite",
      component: Favorites
    },
    {
      path: "/login/",
      name: "login",
      component: LogIn
    },
    {
      path: "/login2/",
      name: "login2",
      component: LogIn2
    }
  ]
});


export default router;  
