import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import createPresistedState from "vuex-persistedstate";
import event from '../assets/events.json';
import deck from '../assets/items.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    favorites: [],
  },

  actions: {
    loadPosts({ commit }, id) {
      // console.log(id)
      // axios.get(
      //   //"https://afternoon-taiga-12401.herokuapp.com/api/items/" + id
      //    "https://localhost:5001/api/items/" + id
      // )
      //   .then(response => 
      //     response.data)
      //   .then(posts => {
      //     commit("GET_POSTS", posts)
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      commit("GET_POSTS", deck)
    },
    getEvent({ commit }, id) {
      // axios.get(
      //   // "https://afternoon-taiga-12401.herokuapp.com/api/items/" + id
      //   "https://localhost:5001/api/events/" + id
      // )
      //   .then(response => {
      //     response.data,
      //       commit("SET_EVENT", response.data)
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });

      commit("SET_EVENT", event)
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
    SET_EVENT(state, event) {
      state.event = event;
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
      return state.posts.find(p => p.itID === id)
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
