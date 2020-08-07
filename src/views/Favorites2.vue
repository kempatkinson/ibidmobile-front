<template>
  <div id="list">
    <div class="b-container" v-show="!(isDesktop)">
      <div class="row" v-for="data in filteredPosts" :key="data.id">
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
            v-for="data in filteredPosts"
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
// Make a request for a user with a given ID
import datetime from "datetime";
import { mapState } from "vuex";
import Vue from "vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import cloudinary from "cloudinary-core";
import lodash from "lodash";
import jquery from "jquery";

Vue.component(VueCountdown.name, VueCountdown);
export default {
  name: "Home",
  data() {
    return {
      selected: "All Items",
      options: [
        { text: "All Items", value: "1" },
        { text: "Live Items", value: "2" },
        { text: "Unsold Items", value: "3" },
        { text: "Items with no bids", value: "4" }
      ],
      times: [],
      heartHeight: {},
      heartHeightDesktop: {},
      heartHeightDesktopSidebar: {},

      containerStyle: {},
      isDesktop: window.innerWidth > 800,
      sample: "sample.jpg",
      sidebarPost: {},
      sidebar: {}
    };
  },
  mounted() {
    this.$store.dispatch("loadPosts");
    this.getRowHeight();
    this.getRowHeightDesktop();
    this.getHeight();
    this.sidebar = { status: false, current: "" };
    this.clickToggler();
  },
  computed: {
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
    filteredPosts() {
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
    clickToggler() {
      this.$nextTick(() => {
        $(".close").click(function() {
          {
            let sidebar = $(this.offsetParent).attr("id");
            let id = sidebar.substr(8, sidebar.length - 1);
            $("#sidebar-" + id).css("display", "none");
            this.sidebar = { status: false, current: "" };
          }
        });
      });
    },
    toggler: function(id) {
      if (this.sidebar.status === true && this.sidebar.current === id) {
        this.sidebar.status = false;
        this.sidebar.current = "";
        $("#sidebar-" + id).css("display", "none");
      } else if (this.sidebar.current !== id) {
        $("#sidebar-" + id).removeAttr("style");
        for (let i = 0; i < this.filteredPosts.length; i++) {
          if (!(id === this.filteredPosts[i].id)) {
            $("#sidebar-" + this.filteredPosts[i].id).css("display", "none");
          }
          if (id === this.filteredPosts[i].id) {
            $("#sidebar-" + id).removeAttr("style");
          }
        }
        this.sidebar.current = id;
        this.sidebar.status = true;
      }
    },
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
    getRowHeight() {
      this.$nextTick(() => {
        //sizing
        let target = this.$refs.items[0].clientHeight;
        let factor = target / 100;
        let string = "scale(" + 2.5 * factor + ")";
        Vue.set(this.heartHeight, "transform", string);
      });
    },
    getRowHeightDesktop() {
      this.$nextTick(() => {
        //sizing
        let target = this.$refs.desktopItems[0].clientHeight;
        let factor = target / 100;
        let string = "scale(" + 2.5 * factor + ")";
        Vue.set(this.heartHeightDesktop, "transform", string);

        let target2 = this.$refs.sidebarName[0].clientHeight;
        let factor2 = target / 100;
        let string2 = "scale(" + 2.5 * factor + ")";
        Vue.set(this.heartHeightDesktopSidebar, "transform", string2);
        Vue.set(this.heartHeightDesktopSidebar, "top", "-5px");
        Vue.set(this.heartHeightDesktopSidebar, "position", "absolute");
      });
    },
    getImage: function(image) {
      var cl = new cloudinary.Cloudinary({ cloud_name: "kemp", secure: true });
      var tag = cl.url(image, { height: 200, width: 200, crop: "fill" });
      return tag;
    },
    getImageSidebar: function(image) {
      var cl = new cloudinary.Cloudinary({ cloud_name: "kemp", secure: true });
      var int = Math.round(window.innerWidth * 0.2);
      var tag = cl.url(image, { height: int, width: int });

      return tag;
    },
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
    timeUntil: function(end) {
      const now = new Date();
      const then = new Date(end);
      const difference = then - now + 5 * 60 * 60 * 1000;
      return difference;
    }
  }
};
</script>

<style scoped  lang="scss">
@media (max-height: 600px) {
  #gap {
    background-color: none;
  }
  .b-container {
    position: absolute;
    top: 100px;
  }
  .card-text {
    font-size: 14px;
  }
  .date-text {
    font-size: 14px;
    margin: 0 5% 0 5%;
  }
  h3 {
    font-size: 18px;
  }
  .heart {
    left: 75%;
    top: 25%;
  }
}

@media (min-height: 600px) {
  #gap {
    background-color: none;
  }
  .card-text {
    font-size: 14px;
  }
  .date-text {
    font-size: 14px;
  }
  .b-container {
    position: absolute;
    top: 100px;
  }
  .card-title {
    font-size: 18px;
  }
  h3 {
    font-size: 20px;
  }
  .heart {
    left: 75%;
    top: 57.5%;
  }
}
@media (min-height: 700px) {
  #gap {
    background-color: none;
  }
  .b-container {
    position: absolute;
    top: 100px;
  }
  .card-text {
    font-size: 14px;
  }
  .card-title {
    font-size: 24px;
  }
  .date-text {
    font-size: 14px;
  }
  .card-title {
    font-size: 20px;
  }
  h3 {
    font-size: 18px;
  }
  .heart {
    left: 75%;
    top: 60%;
  }
}
@media (min-height: 900px) {
  #gap {
    background-color: none;
  }
  .btn {
    font-size: 25px;
  }
  .card-title {
    font-size: 64px;
  }
  .card-text {
    font-size: 24px;
  }
  .date-text {
    font-size: 20px;
  }
  // .card {
  //   width: calc(var(--vh, 1vh) * 40);
  // }
  .b-container {
    position: absolute;
    top: 160px;
  }

  .selection {
    font-size: 24px;
  }
  h3 {
    font-size: 30px;
  }
  .heart {
    left: 85%;
    top: 130%;
  }
}

@media (min-width: 801px) {
  /* tablet, landscape iPad, lo-res laptops ands desktops */
  .b-container {
    width: 100%;
    justify-content: center;
    align-content: center;
  }

  .card {
    margin-right: 20%;
  }
  .btn {
    font-size: 16px;
  }
}

.card-header {
  padding: 1%;
  width: 100%;
  margin-bottom: 5%;
}
.card-body {
  width: 100%;
  margin: 0;
  padding: 2.5%;
}
.card-footer {
  padding: 0px;
  padding-bottom: 2.5%;
  margin-top: 5%;
  align-content: center;
  width: 100%;
}
.card-title {
  margin-top: 5%;
  margin: 0;
}
.card {
  margin-bottom: 10%;
  padding: 0;
  border: black 0.5px solid;
  background-color: #bfdbf7;
}
h3,
p {
  color: black;
  margin-bottom: 0.25em;
}
img {
  width: 100%;
}

button {
  width: 75%;
}

.btn-primary {
  background-color: #1f7a8c;
  border-color: #343a40;
  color: white;
  width: 75%;
  margin: 5px;
}

.selection {
  margin-bottom: 10%;
}

#dropdown {
  margin-bottom: 5%;
}

// TWITTER HEART
.heart {
  position: absolute;
  z-index: 2;
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

#name {
  margin: 0 auto;
  margin-bottom: 10px;
}

// BASIC
body {
  background: linear-gradient(135deg, #121721 0%, #000000 100%) fixed;
  color: #fff;
  font: 300 16px/1.5 "Open Sans", sans-serif;
}
#description {
  text-align: left;
  font-size: 14px;
  margin: 10px;
  margin-bottom: 10%;
}

.name-button {
  background-color: transparent;
  border: 0;
  &:hover {
    background-color: transparent;
    border: 0;
  }
}

.bar-button {
  width: 100%;
}
.bar-text {
  font-size: 14px;
  color: black;
  align-content: left;
}
</style>