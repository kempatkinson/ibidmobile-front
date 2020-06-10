import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import createPresistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    favorites: [],
  },

  actions: {
    loadPosts({ commit }) {
      axios.get(
        "https://afternoon-taiga-12401.herokuapp.com/api/biditems"
        // "https://localhost:5001/api/BidItems/"
      )
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
    },
    removeFavorite({ commit }, n) {
      commit("unfavorite", n);
    },
    findFavorite({ commit }, i) {
      commit("findfavorite", i)
    }
  },
  mutations: {
    GET_POSTS(state, posts) {
      state.posts = posts;
    },
    favorite(state, n) {
      state.favorites.push(n);
    },
    unfavorite(state, i) {
      state.favorites.splice(state.favorites.findIndex((element) => element.n === i.n), 1)

    },
    clear(state) {
      state.favorites = [];
    }
  },
  getters: {
    post: (state) => (id) => {
      return state.posts.find(p => p.id === id)
    },
    findFavorite: (state) => (id) => {
      let seen = false;
      for (let i = 0; i < state.favorites.length; i++) {
        if (state.favorites[i].n === id) {
          return true;
        }
      }
      if (!seen) {
        return false
      }
    }
  },
  plugins: [createPresistedState()],
});
