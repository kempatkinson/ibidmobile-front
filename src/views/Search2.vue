<template>
  <div id="search" class="container">
    <div class="row" v-if="(commonTerm.length<1)&&this.term!='_'">
      <h1>Nothing was found with the term "{{this.term}}"</h1>
    </div>
    <div class="row" v-if="this.term === '_'">
      <h1>You must enter a search term!</h1>
    </div>
    <div class="row" v-for="(chunk,index) in chunks" :key="index">
      <div class="single offset-md-1" v-for="data in chunk" :key="data.id">
        <div class="card" :id="data.id">
          <router-link :to="{ name: 'post', params: {id: data.id}}">
            <h3 ref="items" class="card-title">{{data.name}}</h3>
          </router-link>

          <div
            class="heart"
            v-on:click="toggle(data.id)"
            v-bind:key=" 'heart: ' + data.id"
            v-bind:style="heartHeight"
            v-bind:class="{amactive: activeKeys[activeKeys.findIndex((element) => element.id === data.id)].active}"
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
      term: this.$route.params.term,
      heartHeight: {},
      isDesktop: window.innerWidth > 800
    };
  },
  mounted() {
    this.$store.dispatch("loadPosts");
    this.getRowHeight();
  },
  computed: {
    commonTerm() {
      var found = [];
      var reg = new RegExp(this.term, "i");
      console.log(reg);
      for (let i = 0; i < this.$store.state.posts.length; i++) {
        if (
          this.$store.state.posts[i].name.match(reg) ||
          this.$store.state.posts[i].description.match(reg)
        ) {
          found.push(this.$store.state.posts[i]);
        }
      }
      return found;
    },
    activeKeys() {
      var array = [];
      for (let i = 0; i < this.$store.state.posts.length; i++) {
        array.push({
          id: this.$store.state.posts[i].id,
          active: this.$store.getters.findFavorite(
            this.$store.state.posts[i].id
          )
        });
      }
      return array;
    },
    ...mapState(["posts"])
  },
  methods: {
    toggle: function(id) {
      if (this.activeKeys.length > 0) {
        var index = this.activeKeys.findIndex(element => element.id === id);
        if (this.activeKeys[index].active === false) {
          this.activeKeys[index].active = true;
          this.$store.dispatch("setFavorite", { n: id });
        } else if (this.activeKeys[index].active === true) {
          this.activeKeys[index].active = false;
          this.$store.dispatch("removeFavorite", { n: id });
        }
      }
    },
    getImage: function(image) {
      if (!this.isDesktop) {
        var cl = new cloudinary.Cloudinary({
          cloud_name: "kemp",
          secure: true
        });
        var int = Math.round(this.windowWidth * 0.6);
        var tag = cl.url(image, { height: int, width: int, crop: "fill" });
        return tag;
      }
      if (this.isDesktop) {
        var cl = new cloudinary.Cloudinary({
          cloud_name: "kemp",
          secure: true
        });
        var int = Math.round(this.windowWidth * 0.4);
        var tag = cl.url(image, { height: int, width: int });
        return tag;
      }
    },

    getRowHeight() {
      this.$nextTick(() => {
        if (this.$refs.items) {
          let target = this.$refs.items[0].clientHeight;
          let factor = target / 100;
          let string = "scale(" + 2 * factor + ")";
          Vue.set(this.heartHeight, "transform", string);
          Vue.set(this.heartHeight, "position", "absolute");
          Vue.set(this.heartHeight, "top", "-6.5%");
        }
      });
    },
    empty() {
      this.$store.commit("clear");
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