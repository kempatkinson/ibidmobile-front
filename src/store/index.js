import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    favorites: [],
  },
  plugins: [createPersistedState()],
  actions: {
    loadPosts({ commit }) {
      axios.get("https://afternoon-taiga-12401.herokuapp.com/api/biditems")
      // axios.get("http://localhost:5000/api/biditems")
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
