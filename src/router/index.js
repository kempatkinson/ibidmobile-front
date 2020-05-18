import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Post from "../views/Post.vue";
import Stack from "../views/Stack.vue"
import Favorites from "../views/Favorites.vue"


Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  history: true,
    routes: [
    {
      path: "/",
      name: "Home",
      component: Home
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
      path: "/stack/:id",
      name: "stack",
      component: Stack
    },
    {
      path: "/favorites",
      name: "favorite",
      component: Favorites
    },
  ]
});

export default router;
