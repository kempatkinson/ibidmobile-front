<template>
  <div id="favorites" class="container">
    <div class="row">
      <div class="col d-flex justify-content-center">
        <button v-on:click="empty">empty favorites</button>
      </div>
    </div>
    <br />
    <div class="row" v-for="data in favorites" :key="data.id">
      <div class="col d-flex justify-content-center">
        <div class="card" :id="data.id">
          <router-link :to="{ name: 'post', params: {id: data.id}}">
            <h3 ref="items" class="card-title">{{data.name}}</h3>
          </router-link>

          <div
            class="heart"
            v-on:click="toggle(data.id)"
            v-bind:key="data.id"
            v-bind:style="heartHeight"
            v-bind:class="{amactive: amIFavorited(data.id)}"
          ></div>
          <img class="card-image-top" v-bind:src="getImage(data.image)" />
          <div class="card-body">
            <h5>Current Bid: {{data.price}}</h5>
            <h5>Minmum raise: {{data.raise}}</h5>
            <h5>Value: {{data.value}}</h5>
            <router-link :to="{ name: 'post', params: {id: data.id}}">
              <button class="btn btn-primary">Bid Now!</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";
import cloudinary from "cloudinary-core";

export default {
  name: "Home",
  data() {
    return {
      heartHeight: {},
      isDesktop: window.innerWidth > 800,
      windowWidth: window.innerWidth,
      tags: []
    };
  },
  mounted() {
    this.$store.dispatch("loadPosts");
    this.getRowHeight();
  },
  computed: {
    favorites() {
      var favs = [];
      for (let i = 0; i < this.$store.state.posts.length; i++) {
        if (this.$store.getters.findFavorite(this.$store.state.posts[i].id)) {
          favs.push(this.$store.state.posts[i]);
        }
      }
      return favs;
    },
    ...mapState(["posts"])
  },
  methods: {
    getImage: function(image) {
      if (!this.isDesktop) {
        var cl = new cloudinary.Cloudinary({
          cloud_name: "kemp",
          secure: true
        });
        var int = Math.round(this.windowWidth * .6);
        var tag = cl.url(image, { height: int, width: int, crop: "fill" });
        return tag;
      }
      if (this.isDesktop) {
        Vue;
        var cl = new cloudinary.Cloudinary({
          cloud_name: "kemp",
          secure: true
        });
        var int = Math.round(this.windowWidth * .25);
        var tag = cl.url(image, { width: int, height: int, crop: "fill" });
        return tag;
      }
    },
    amIFavorited: function(id) {
      if (this.favorites.length > 0) {
        if (this.favorites.findIndex(element => element.id === id) != -1) {
          return true;
        } else return false;
      }
    },
    getRowHeight() {
      this.$nextTick(() => {
        if (this.$refs.items) {
          let target = this.$refs.items[0].clientHeight;
          let factor = target / 100;
          let string = "scale(" + 2 * factor + ")";
          Vue.set(this.heartHeight, "transform", string);
        }
      });
    },
    toggle: function(id) {
      this.$store.dispatch("removeFavorite", { n: id });
    },

    empty() {
      this.$store.commit("clear");
      console.log(this.$store.state.favorites);
    }
  }
};
</script>

<style lang="scss" scoped>
#favorites {
  align-content: center;
}
.card {
  margin-bottom: 10%;
  border: black 0.5px solid;
  align-content: center;
  background-color: #bfdbf7;
}
h3,
h5,
p {
  color: black;
}
img {
  margin: 5%;
}
p {
  margin-bottom: 5%;
}

button {
  width: 40%;
}
.card-title {
  margin-top: 5%;
}

.btn-primary {
  background-color: #1f7a8c;
  border-color: #343a40;
  color: white;
  margin: 5px;
}
.container {
  padding-top: 100px;
  width: 100%;
  position: static;
  top: 15vh;
}

.heart {
  position: absolute;
  top: -4%;
  right: -10%;
  width: 100px;
  height: 100px;
  background: url("https://cssanimation.rocks/images/posts/steps/heart.png")
    no-repeat;
  background-position: 0 0;
  cursor: pointer;
  transition: background-position 1s steps(28);
  transition-duration: 0s;

  &.amactive {
    transition-duration: 1s;
    background-position: -2800px 0;
  }
}
</style>