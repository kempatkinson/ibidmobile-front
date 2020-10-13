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
    user: {},
    event: {},
    item: {}
  },

  actions: {
    loadPosts({ commit }, id) {
      // console.log(id)
    //  return axios.get(
    //     //"https://afternoon-taiga-12401.herokuapp.com/api/items/" + id
    //      "https://localhost:5001/api/items/event/" + id
    //   )
    //     .then(response => 
    //       response.data)
    //     .then(posts => {
    //       commit("GET_POSTS", posts)
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
      commit("GET_POSTS", deck)
    },
    getEvent({ commit }, id) {
      // return axios.get(
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
    logInUser({ commit }, user) {
      commit("SET_USER", user)
    },
    getFavorites({commit},id){
      // return axios.get(
      //   // "https://afternoon-taiga-12401.herokuapp.com/api/items/" + id
      //   "https://localhost:5001/api/users/favorites/" + id
      // )
      //   .then(response => {
      //     response.data,
      //       commit("GET_FAVORITES", response.data)
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });

    },

    getItem({ commit }, id) {
      // console.log(id)
      axios.get(
        //"https://afternoon-taiga-12401.herokuapp.com/api/items/" + id
         "https://localhost:5001/api/items/itID/" + id
      )
        .then(response => 
          response.data)
        .then(item => {
          commit("GET_ITEM", item[0])
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
    clearFavorites({ commit }, i) {
      commit("clear", i)
    },

  },
  mutations: {
    GET_POSTS(state, posts) {
      state.posts = posts;
    },
    GET_FAVORITES(state, favorites) {
      state.favorites = favorites
    },
    GET_ITEM(state, item) {
      state.item = item;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
    SET_USER(state, user) {
      state.user = user;
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
        if (state.favorites[i].ItemID === id) {
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
