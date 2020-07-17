import Vue from "vue";
import VueRouter from "vue-router";
import Items from "../views/Items.vue";
import Post from "../views/Post.vue";
import Stack from "../views/Stack.vue";
import Welcome from "../views/Welcome.vue"
import Favorites from "../views/Favorites.vue"
import Search from "../views/Search.vue"
import Test from "../views/Test.vue"

import LogIn from "../views/LogIn.vue"




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
      path: "/test",
      name: "Test",
      component: Test
    },
    {
      path: "/v/:TinyURL",
      name: "Items",
      component: Items
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
      path: "/search/:term",
      name: "search",
      component: Search
    },
    {
      path: "/login/",
      name: "login",
      component: LogIn
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.query.search) {
    next("/search/" + to.query.search)
  } else if (to.query.search === "") {
    next("/search/" + "_")

  } next()
})

export default router;  
