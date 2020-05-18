import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    favorites: [],
  },
  actions: {
    loadPosts({ commit }) {
      axios.get('/api/BidItems')
        .then(response => response.data)
        .then(posts => {
          commit("GET_POSTS", posts)
        })
        .catch(error => {
          console.log(error);
        });
    },
    setFavorite({ commit }, n) {
      commit("favorite", n);
      console.log('action hit');
    },
  },
  mutations: {
    GET_POSTS(state, posts) {
      state.posts = posts;
    },
    favorite(state, n) {
      state.favorites.push(n);
      console.log("favorites:   ", state.favorites)
    }
  },
  getters: {
    post: (state) => (id) => {
      return state.posts.find(p => p.id === id)
    }
  }
});
