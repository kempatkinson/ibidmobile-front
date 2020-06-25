<template>
  <div id="favorites" class="container">
    <div class="row">
      <div class="col d-flex justify-content-center">
        <button v-on:click="empty">empty favorites</button>
      </div>
    </div>
    <br />
    <div class="b-container" v-show="!(isDesktop)">
      <div class="row" v-for="data in favorites" :key="data.id">
        <div class="col-1"></div>
        <div class="card col-10">
          <div class="card-header" ref="header">
            <div class="card-title" style="position: relative">
              <router-link :to="{ name: 'post', params: {id: data.id}}">
                <h3 ref="items">{{data.name}}</h3>
              </router-link>
              <div
                class="heart"
                v-on:click="toggle(data.id)"
                v-bind:key="data.id"
                v-bind:style="heartHeight"
                v-bind:class="{amactive: activeKeys[activeKeys.findIndex((element) => element.id === data.id)].active}"
              ></div>
            </div>
          </div>
          <div class="card-body row" v-on:click="select($event)" :id="data.id">
            <div class="col-5 d-flex align-items-center">
              <img class="card-image" v-bind:src="getImage(data.image)" />
            </div>
            <div class="col-7">
              <p v-if="data.sold" class="card-text">Sold Out!</p>
              <div v-if="(!data.sold) && (timeUntil(data.end) > 0)">
                <p v-if="(timeUntil(data.end) > 0 )" class="card-text">Live!</p>
                <p class="card-text">Current Bid : {{data.price}}</p>
                <p class="card-text">Value : {{data.value}}</p>
                <router-link :to="{ name: 'post', params: {id: data.id}}">
                  <button class="btn btn-primary">Bid Now!</button>
                </router-link>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <countdown :time="timeUntil(data.end)" v-if="(timeUntil(data.end) > 0)">
              <div
                slot-scope="props"
                class="date-text"
              >Bidding closes in {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</div>
            </countdown>
            <div class="date-text" v-if="(timeUntil(data.end) <= 0)">Auction Over!</div>
          </div>
        </div>
        <div class="col-1"></div>
      </div>
    </div>

    <div class="b-container" v-show="(isDesktop)">
      <div class="row">
        <div class="col-9">
          <div class="row" v-for="(chunk,index) in chunks" :key="index">
            <div class="single offset-md-1" v-for="data in chunk" :key="data.id">
              <div class="card" v-bind:style="containerStyle">
                <div class="card-header" ref="header">
                  <div class="card-title" ref="desktopItems" style="position: relative">
                    <h3 v-on:click="toggler(data.id)">{{data.name}}</h3>
                    <div
                      class="heart"
                      v-on:click="toggle(data.id)"
                      v-bind:key=" 'heart: ' + data.id"
                      v-bind:style="heartHeightDesktop"
                      v-bind:class="{amactive: activeKeys[activeKeys.findIndex((element) => element.id === data.id)].active}"
                    ></div>
                  </div>
                </div>
                <div class="card-body" v-on:click="toggler(data.id)">
                  <div class="row" v-on:click="select($event)" :id="data.id">
                    <div class="col-5">
                      <img class="card-image" v-bind:src="getImage(data.image)" />
                    </div>
                    <div class="col-7">
                      <p v-if="data.sold" class="card-text">Sold Out!</p>
                      <div v-if="(!data.sold) && (timeUntil(data.end) > 0)">
                        <p v-if="(timeUntil(data.end) > 0 )" class="card-text">Live!</p>
                        <p class="card-text">Current Bid : {{data.price}}</p>
                        <p class="card-text">Value : {{data.value}}</p>
                        <router-link :to="{ name: 'post', params: {id: data.id}}">
                          <button class="btn btn-primary">Bid Now!</button>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <countdown :time="timeUntil(data.end)" v-if="(timeUntil(data.end) > 0)">
                    <div
                      slot-scope="props"
                      class="date-text"
                    >Bidding closes in {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</div>
                  </countdown>
                  <div class="date-text" v-if="(timeUntil(data.end) <= 0)">Auction Over!</div>
                </div>
              </div>
            </div>
          </div>

          <!-- hidden -->
          <div class="card col-4" ref="targetCard" style="visibility: hidden">
            <div class="card-header" ref="header">
              <div class="card-title" style="position: relative">
                <h3>Hidden</h3>
                <div class="heart" v-bind:style="heartHeight"></div>
              </div>
            </div>
            <div class="card-body row">
              <div class="col-5 d-flex align-items-center">
                <img class="card-image" v-bind:src="getImage(sample)" />
              </div>
              <div class="col-7">
                <div>
                  <p class="card-text">Live!</p>
                  <p class="card-text">Current Bid : 100</p>
                  <p class="card-text">Value :100</p>
                  <button class="btn btn-primary">Bid Now!</button>
                </div>
              </div>
            </div>

            <div class="card-footer">
              <countdown :time="100">
                <div
                  slot-scope="props"
                  class="date-text"
                >Bidding closes in {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</div>
              </countdown>
            </div>
          </div>
          <!-- hidden -->
        </div>

        <div class="col-3">
          <b-sidebar
            :id="'sidebar-' + data.id"
            right
            shadow
            v-for="data in favorites"
            :key="data.id"
          >
            <div class="px-3 py-2">
              <div class="container">
                <div class="row" id="gap">
                  <h3 id="name" ref="sidebarName">{{data.name}}</h3>
                  <div
                    class="heart"
                    v-on:click="toggle(data.id)"
                    v-bind:key=" 'heart: ' + data.id"
                    v-bind:style="heartHeightDesktopSidebar"
                    v-bind:class="{amactive: activeKeys[activeKeys.findIndex((element) => element.id === data.id)].active}"
                  ></div>
                </div>

                <div class="row image-row">
                  <div class="col d-flex justify-content-center">
                    <img class="card-image-top" v-bind:src="getImageSidebar(data.image)" />
                  </div>
                </div>

                <div class="row">
                  <div class="col d-flex justify-content-center">
                    <div>
                      <p class="bar-text" id="description">{{data.description}}</p>
                    </div>
                  </div>
                </div>

                <div class="row" id="date-text">
                  <div class="col d-flex justify-content-center">
                    <div class="bar-text" v-if="(data.sold)">Sold out!</div>
                    <div class="bar-text" v-if="(timeUntil(data.end) <= 0)">Auction Over!</div>
                    <countdown
                      v-if="(!data.sold) && (timeUntil(data.end) > 0)"
                      :time="timeUntil(data.end)"
                    >
                      <div
                        slot-scope="props"
                        class="bar-text"
                      >Bidding closes in {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</div>
                    </countdown>
                  </div>
                </div>
                <div class="row" id="bid-row" v-if="(!data.sold) && timeUntil(data.end)>0">
                  <div class="col d-flex justify-content-center">
                    <div class="bidrow card-text">
                      <div class="row d-flex justify-content-center" id="postinfo">
                        <div class="col">
                          <p class="bar-text">Value: {{data.value}}</p>
                          <p class="bar-text">Current Bid: {{data.price}}</p>
                          <p class="bar-text">Minmum raise: {{data.raise}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="row justify-content-center"
                  v-if="(!data.sold) && timeUntil(data.end)>0"
                >
                  <router-link :to="{ name: 'post', params: {id: data.id}}">
                    <button class="btn btn-primary bar-button">Bid Now!</button>
                  </router-link>
                </div>
              </div>
            </div>
          </b-sidebar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import datetime from "datetime";
import { mapState } from "vuex";
import Vue from "vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import cloudinary from "cloudinary-core";
import lodash from "lodash";
import jquery from "jquery";


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
    this.getHeight();
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
    chunks() {
      return _.chunk(Object.values(this.filteredPosts), 2);
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
    getHeight() {
      Vue.nextTick(() => {
        let height = this.$refs.targetCard.clientHeight;
        height += "px";
        Vue.set(this.containerStyle, "height", height);
        let width = this.$refs.targetCard.clientWidth;
        width += "px";
        Vue.set(this.containerStyle, "width", width);
      });
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
        Vue;
        var cl = new cloudinary.Cloudinary({
          cloud_name: "kemp",
          secure: true
        });
        var int = Math.round(this.windowWidth * 0.25);
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