<template>
  <div id="list">
    <div class="b-container" v-if="!(isDesktop)">
      <div id="filter">
        <b-row>
          <b-col>
            <div class="selection" id="gap">
              <select v-model="selected" id="dropdown" @change="scrollPage()">
                <option v-for="option in categories" v-bind:key="option.category">{{ option.name }}</option>
              </select>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <a class="search-form-trigger btn btn-success" data-toggle="search-form" id="toggler">
              <i id="opener" class="fa fa-search" aria-hidden="true"></i>
              <i id="closer" class="fa fa-window-close" style="display: none"></i>
            </a>
            <div class="search-form-wrapper">
              <b-form class="search-form" method="post">
                <div class="input-group">
                  <b-input type="text" name="search" id="searchInput" v-model="term" />
                  <button class="input-group-addon btn-primary" id="basic-addon2">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </button>
                </div>
              </b-form>
            </div>
          </b-col>
        </b-row>
      </div>
      <b-row id="EventHeader">
        <b-col>
          <h1>Welcome to the {{event.Name}}</h1>
          <h2>{{event.Description}}</h2>

          <countdown :time="timeUntil(event.EndDate)">
            <div slot-scope="props">
              <h2>Event Closes in: {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</h2>
            </div>
          </countdown>
        </b-col>
      </b-row>

      <div v-if="!searchBar">
        <b-row class="allData" v-for="category in categories" :key="category.category">
          <b-col>
            <b-row>
              <b-col>
                <h2 class="catAnchor" v-bind:id="'anchor-'+category.name">{{category.name}}</h2>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-row
                  class="cardData"
                  v-for="(chunk,index) in chunks(category.ids)"
                  :data-count="(chunk.length)"
                  :key="index"
                >
                  <div class="single" v-for="data in chunk" :key="data.itID">
                    <div class="card" v-bind:style="containerStyle">
                      <b-row>
                        <b-col>
                          <p class="idMobile">1101</p>
                          <p class="closedMobile" v-if="(data.itStatus === 4)">CLOSED</p>
                        </b-col>
                      </b-row>
                      <div class="card-body" v-on:click="toggler(data.itID)">
                        <b-row v-on:click="select($event)" :id="data.itID">
                          <b-col>
                            <img class="card-image imgMobile" v-bind:src="getImage(sample)" />
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <div class="card-title" style="position: relative">
                              <router-link :to="{ name: 'post', params: {id: data.itID}}">
                                <h3 ref="items" v-on:click="toggler(data.itID)">{{data.itName}}</h3>
                              </router-link>
                            </div>
                            <p class="card-text">Current Bid : {{data.itMinBid}}</p>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <!--  <div
                              class="heart"
                              v-on:click="toggle(data.itID)"
                              v-bind:key=" 'heart: ' + data.itID"
                              v-bind:style="heartHeight"
                              v-bind:class="{amactive: activeKeys[activeKeys.findIndex((element) => element.id === data.itID)].active}"
                            ></div>-->
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </div>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>

      <div v-if="searchBar">
        <b-row>
          <b-col>
            <h2 id="searchResults">Search Results</h2>
          </b-col>
        </b-row>
        <b-row class="allData">
          <b-col>
            <b-row>
              <b-col>
                <b-row
                  class="cardData"
                  v-for="(chunk,index) in chunks(activeCards)"
                  :data-count="(chunk.length)"
                  :key="index"
                >
                  <div class="single" v-for="data in chunk" :key="data.itID">
                    <div class="card" v-bind:style="containerStyle">
                      <p class="idMobile">1101</p>
                      <p class="closedMobile" v-if="(data.itStatus === 4)">CLOSED</p>

                      <div class="card-body" v-on:click="toggler(data.itID)">
                        <b-row v-on:click="select($event)" :id="data.itID">
                          <b-col>
                            <img class="card-image imgMobile" v-bind:src="getImage(sample)" />
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <div class="card-title" style="position: relative">
                              <router-link :to="{ name: 'post', params: {id: data.itID}}">
                                <h3 ref="items" v-on:click="toggler(data.itID)">{{data.itName}}</h3>
                              </router-link>
                            </div>
                            <p class="card-text">Current Bid : {{data.itMinBid}}</p>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <!--  <div
                              class="heart"
                              v-on:click="toggle(data.itID)"
                              v-bind:key=" 'heart: ' + data.itID"
                              v-bind:style="heartHeight"
                              v-bind:class="{amactive: activeKeys[activeKeys.findIndex((element) => element.id === data.itID)].active}"
                            ></div>-->
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </div>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <b-row id="element">
        <div class="card" ref="targetCard" style="visibility:hidden">
          <div class="card-header" ref="header">
            <div class="card-title" style="position: relative">
              <h3>HiddenHidden</h3>
              <h3>HiddenHidden</h3>
            </div>
          </div>
          <div class="card-body row d-flex align-items-center">
            <img class="card-image imgMobile" v-bind:src="getImage(sample)" />
          </div>
          <div>
            <div>
              <p class="card-text">Live!</p>
              <p class="card-text">Acitve!</p>
            </div>
          </div>
        </div>
      </b-row>
    </div>
    <div class="b-container" v-if="(isDesktop)">
      <b-row id="filter">
        <b-col>
          <div class="selection" id="gap">
            <select v-model="selected" id="dropdown" @change="scrollPage()">
              <option v-for="option in categories" v-bind:key="option.category">{{ option.name }}</option>
            </select>
          </div>
        </b-col>

        <b-col>
          <a class="search-form-trigger btn btn-success" data-toggle="search-form" id="toggler">
            <i id="opener" class="fa fa-search" aria-hidden="true"></i>
            <i id="closer" class="fa fa-window-close" style="display: none"></i>
          </a>
          <div class="search-form-wrapper">
            <b-form class="search-form" method="post">
              <div class="input-group">
                <b-input type="text" name="search" id="searchInput" v-model="term" />
                <button class="input-group-addon btn-primary" id="basic-addon2">
                  <i class="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
            </b-form>
          </div>
        </b-col>
      </b-row>
      <b-row id="EventHeader">
        <b-col>
          <h1>Welcome to the {{event.Name}}</h1>
          <h2>{{event.Description}}</h2>

          <countdown :time="timeUntil(event.EndDate)">
            <div slot-scope="props">
              <h2>Event Closes in: {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</h2>
            </div>
          </countdown>
        </b-col>
      </b-row>

      <div v-if="!searchBar">
        <b-row class="allData" v-for="category in categories" :key="category.category">
          <b-col>
            <b-row>
              <div class="col-12">
                <h2 class="catAnchor" v-bind:id="'anchor-'+category.name">{{category.name}}</h2>
              </div>
            </b-row>

            <b-row>
              <b-col>
                <b-row
                  class="cardData"
                  v-for="(chunk,index) in chunks(category.ids)"
                  :data-count="(chunk.length)"
                  :key="index"
                >
                  <div class="single" ref="desktopCards" v-for="data in chunk" :key="data.itID">
                    <div class="card" v-bind:style="containerStyle">
                      <p class="closed" v-if="(data.itStatus === 4)">CLOSED</p>
                      <p class="idDesktop">1102</p>
                      <!-- <div
                            class="heart"
                            v-on:click="toggle(data.itID)"
                            v-bind:key=" 'heart: ' + data.itID"
                            v-bind:style="heartHeightDesktop"
                            v-bind:class="{amactive: activeKeys[activeKeys.findIndex((element) => element.id === data.itID)].active}"
                      ></div>-->

                      <div class="card-body" v-on:click="toggler(data.itID)">
                        <b-row v-on:click="select($event)" :id="data.itID">
                          <b-col>
                            <img class="card-image imgDesktop" v-bind:src="getImage(sample)" />
                            <div class="card-title" ref="desktopItems" style="position: relative">
                              <router-link :to="{ name: 'post', params: {id: data.itID}}">
                                <h3 v-on:click="toggler(data.itID)">{{data.itName}}</h3>
                              </router-link>
                            </div>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col>
                            <div v-if="!(data.itStatus === 4)">
                              <p class="date-text">Current Bid : {{data.itMinBid}}</p>
                            </div>
                            <div v-if="(data.itStatus === 4)">
                              <p class="date-text">Sold for : {{data.itMinBid}}</p>
                            </div>
                          </b-col>
                        </b-row>
                      </div>
                      <!-- <div class="card-footer" v-if="(timeUntil(data.itEndDate) > 0)">
                        <countdown
                          :time="timeUntil(data.itEndDate)"
                          v-if="(timeUntil(data.itEndDate) > 0)"
                        >
                          <div
                            slot-scope="props"
                            class="date-text"
                          >Bidding closes in {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</div>
                        </countdown>
                        <div class="date-text" v-if="(timeUntil(data.itEndDate) <= 0)">Auction Over!</div>
                      </div>-->
                    </div>
                  </div>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>

      <div v-if="searchBar">
        <b-row>
          <b-col>
            <h2 id="searchResults">Search Results</h2>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-row
              class="cardData"
              v-for="(chunk,index) in chunks(activeCards)"
              :data-count="(chunk.length)"
              :key="index"
            >
              <div class="single" ref="desktopCards" v-for="data in chunk" :key="data.itID">
                <div class="card" v-bind:style="containerStyle">
                  <p class="closed" v-if="(data.itStatus === 4)">CLOSED</p>
                  <p class="idDesktop">1102</p>
                  <!-- <div
                            class="heart"
                            v-on:click="toggle(data.itID)"
                            v-bind:key=" 'heart: ' + data.itID"
                            v-bind:style="heartHeightDesktop"
                            v-bind:class="{amactive: activeKeys[activeKeys.findIndex((element) => element.id === data.itID)].active}"
                  ></div>-->

                  <div class="card-body" v-on:click="toggler(data.itID)">
                    <b-row v-on:click="select($event)" :id="data.itID">
                      <b-col>
                        <img class="card-image imgDesktop" v-bind:src="getImage(sample)" />
                        <div class="card-title" ref="desktopItems" style="position: relative">
                          <router-link :to="{ name: 'post', params: {id: data.itID}}">
                            <h3 v-on:click="toggler(data.itID)">{{data.itName}}</h3>
                          </router-link>
                        </div>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <div v-if="!(data.itStatus === 4)">
                          <p class="card-text">Current Bid : {{data.itMinBid}}</p>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                  <!-- <div class="card-footer" v-if="(timeUntil(data.itEndDate) > 0)">
                    <countdown
                      :time="timeUntil(data.itEndDate)"
                      v-if="(timeUntil(data.itEndDate) > 0)"
                    >
                      <div
                        slot-scope="props"
                        class="date-text"
                      >Bidding closes in {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</div>
                    </countdown>
                    <div class="date-text" v-if="(timeUntil(data.itEndDate) <= 0)">Auction Over!</div>
                  </div>-->
                </div>
              </div>
            </b-row>
          </b-col>
        </b-row>
      </div>

      <b-row id="element">
        <b-col class="card" ref="targetCard" style="visibility:hidden">
          <div class="card-header" ref="header">
            <div class="card-title" style="position: relative">
              <h3>Hidden</h3>
            </div>
          </div>
          <div class="card-body row">
            <img class="card-image imgDesktop" v-bind:src="getImage(sample)" />
            <p class="card-text">Value :100</p>
          </div>
        </b-col>
      </b-row>
      <div class="row">
        <div class="col-9"></div>
        <div class="col-3">
          <b-sidebar
            :id="'sidebar-' + data.itID"
            right
            shadow
            v-for="data in this.deck"
            :key="data.itID"
          >
            <b-container>
              <b-row id="gap">
                <b-col class="d-flex justify-content-center">
                  <h3 id="name" ref="sidebarName">{{data.itName}}</h3>
                  <div
                    class="heart"
                    v-on:click="toggle(data.itID)"
                    v-bind:key=" 'heart: ' + data.itID"
                    v-bind:style="heartHeightDesktopSidebar"
                    v-bind:class="{amactive: activeKeys[activeKeys.findIndex((element) => element.id === data.itID)].active}"
                  ></div>
                </b-col>
              </b-row>

              <b-row>
                <b-col class="d-flex justify-content-center">
                  <img class="imgDesktop" v-bind:src="getImageSidebar(sample)" />
                </b-col>
              </b-row>

              <b-row>
                <b-col class="d-flex justify-content-center">
                  <div>
                    <p class="bar-text" id="description">{{data.itDescription}}</p>
                    <p class="bar-text">Value: {{data.itValue}}</p>
                    <p
                      v-if="!(data.itStatus === 4)"
                      class="date-text"
                    >Current Bid : {{data.itMinBid}}</p>

                    <p v-if="(data.itStatus === 4)" class="date-text">Sold for : {{data.itMinBid}}</p>
                    <p class="bar-text">Minmum raise: {{data.itMinRaise}}</p>
                  </div>
                </b-col>
              </b-row>
              <b-row class="justify-content-center">
                <router-link :to="{ name: 'post', params: {id: data.itID}}">
                  <button class="btn btn-primary bar-button">Bid Now!</button>
                </router-link>
              </b-row>
              <b-row id="date-text">
                <b-col class="d-flex justify-content-center">
                  <div class="bar-text" v-if="(data.itStatus === 4)">Sold out!</div>
                  <div class="bar-text" v-if="(timeUntil(data.itEndDate) <= 0)">Auction Over!</div>

                  <countdown>
                    <div
                      slot-scope="props"
                      class="bar-text"
                    >Bidding closes in {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</div>
                  </countdown>
                </b-col>
              </b-row>
            </b-container>
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
      // options: [
      //   { text: "All Items", value: "1" },
      //   { text: "Live Items", value: "2" },
      //   { text: "Unsold Items", value: "3" },
      //   { text: "Items with no bids", value: "4" }
      // ],
      times: [],
      heartHeight: {},
      anchor: {},
      heartHeightDesktop: {},
      heartHeightDesktopSidebar: {},
      cardWidth: 274,
      deck: [],
      event: {},
      containerStyle: {},
      isDesktop: window.innerWidth > 800,
      sample: "hello.jpg",
      sidebarPost: {},
      sidebar: {},
      searchBarBool: false,
      windowWidth: window.innerWidth,

      id: "",
      url: "",
      term: ""
    };
  },
  mounted() {
    this.$store.dispatch("loadPosts", this.$route.params.TinyURL);

    for (let i = 0; i < this.$store.state.posts.length; i++) {
      if (this.$store.getters.findFavorite(this.$store.state.posts[i].itID)) {
        this.deck.push(this.$store.state.posts[i]);
      }
    }

    this.$store.dispatch("getEvent", this.$route.params.TinyURL);
    this.event = this.$store.state.event[0];
    this.getRowHeight();
    this.getRowHeightDesktop();
    this.getHeight();
    this.sidebar = { status: false, current: "" };
    this.clickToggler();
    window.addEventListener("resize", this.myEventHandler);
    $("#toggler").on("click", evt => {
      this.searchBarBool = !this.searchBarBool;
      console.log(this.searchBarBool);
      $(".search-form-wrapper").toggleClass("open");
      $(".search-form-wrapper .search").focus();
      $("html").toggleClass("search-form-open");
      if (this.searchBarBool) {
        $("#opener").css("display", "none");
        $("#closer").removeAttr("style");
        $("#toggler").removeClass("btn-success");
        $("#toggler").addClass("btn-danger");
      } else if (!this.searchBarBool) {
        $("#closer").css("display", "none");
        $("#opener").removeAttr("style");

        $("#toggler").addClass("btn-success");
        $("#toggler").removeClass("btn-danger");
        $("#searchInput").val("");
        this.term = "";
      }
      this.$nextTick(() => {
        this.spacing(
          Math.floor(this.windowWidth / this.$refs.targetCard.clientWidth),
          this.$refs.targetCard.clientWidth
        );
        this.cardWidth = this.$refs.targetCard.clientWidth;
      });
      //
    });
  },
  computed: {
    searchBar() {
      if (this.term.length > 0) {
        return true;
      } else return false;
      this.getRowHeightDesktop();
      this.getRowHeight();
    },
    activeCards() {
      var found = [];
      var reg = new RegExp(this.term, "gi");
      for (let i = 0; i < this.deck.length; i++) {
        var description = false;

        if (this.deck[i].itDescription) {
          description = true;
        }
        if (description) {
          if (
            this.deck[i].itName.match(reg) ||
            this.deck[i].itDescription.match(reg)
          ) {
            found.push(this.deck[i]);
          }
        } else if (!description) {
          if (this.deck[i].itName.match(reg)) {
            found.push(this.deck[i]);
          }
        }
      }
      this.$nextTick(() => {
        this.spacing(
          Math.floor(this.windowWidth / this.$refs.targetCard.clientWidth),
          this.$refs.targetCard.clientWidth
        );
        this.cardWidth = this.$refs.targetCard.clientWidth;
      });
      return found;
    },
    activeKeys() {
      var array = [];
      for (let i = 0; i < this.$store.state.posts.length; i++) {
        array.push({
          id: this.$store.state.posts[i].itID,
          active: this.$store.getters.findFavorite(
            this.$store.state.posts[i].itID
          )
        });
      }
      return array;
    },

    categories() {
      var categories = [];
      for (var i = 0; i < this.deck.length; i++) {
        var seen = false;
        for (var j = 0; j < categories.length; j++) {
          if (categories[j].category === this.deck[i].itCategory) {
            seen = true;
            categories[j].ids.push(this.deck[i]);
            break;
          }
        }
        if (!seen) {
          categories.push({
            name: this.deck[i].icTitle,
            category: this.deck[i].itCategory,
            ids: [this.deck[i]]
          });
        }
      }
      return categories;
    },

    ...mapState(["posts"])
  },
  methods: {
    scrollPage: function() {
      this.scrollTo("#" + this.selected);
    },

    myEventHandler(e) {
      this.windowWidth = e.srcElement.window.innerWidth;
      if (this.windowWidth > 800) {
        this.isDesktop = true;
        this.getHeight();
      }
      this.getRowHeightDesktop();
    },
    chunks: function(array) {
      if (this.isDesktop) {
        return _.chunk(
          Object.values(array),
          Math.floor(this.windowWidth / this.cardWidth)
        );
      }
      if (!this.isDesktop) {
        return _.chunk(Object.values(array), 2);
      }
    },
    spacing: function(maxCards, cardWidth) {
      this.$nextTick(() => {
        var window = this.windowWidth;

        $(".cardData").each(function() {
          $(this).css("marginLeft", function() {
            if ($(this).attr("data-count") === "1") {
              return (window - $(this)[0].children[0].clientWidth) / 2 + "px";
            }
            if ($(this).attr("data-count") === "2") {
              return (
                (window - 2 * $(this)[0].children[0].clientWidth) / 2 + "px"
              );
            }
            if ($(this).attr("data-count") === "3") {
              return (
                (window - 3 * $(this)[0].children[0].clientWidth) / 2 + "px"
              );
            }
            if ($(this).attr("data-count") === "4") {
              return (
                (window - 4 * $(this)[0].children[0].clientWidth) / 2 + "px"
              );
            }
            if ($(this).attr("data-count") === "5") {
              return (
                (window - 5 * $(this)[0].children[0].clientWidth) / 2 + "px"
              );
            }
          });
        });
      });
    },
    scrollTo(element) {
      // console.log($("#anchor-" + element.substring(1)));
      this.$scrollTo("#anchor-" + element.substring(1), 500, {
        onStart: this.myMethod,
        offset: -135
      });
    },

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
      // sidebar is on
      // on and id matches
      if (this.sidebar.status === true && this.sidebar.current === id) {
        this.sidebar.status = false;
        this.sidebar.current = "";
        $("#sidebar-" + id).css("display", "none");
      }
      //on but id does not match
      else if (this.sidebar.status === true && this.sidebar.current !== id) {
        $("#sidebar-" + this.sidebar.current).css("display", "none");
        this.sidebar.status = true;
        this.sidebar.current = id;
        $("#sidebar-" + id).removeAttr("style");
      }
      //side bar is off
      else if (this.sidebar.status === false) {
        $("#sidebar-" + id).removeAttr("style");
        this.sidebar.current = id;
        this.sidebar.status = true;
      }
    },
    getHeight() {
      this.$nextTick(() => {
        let height = this.$refs.targetCard.clientHeight;
        height += "px";
        Vue.set(this.containerStyle, "height", height);
        let width = this.$refs.targetCard.clientWidth;
        width += "px";
        Vue.set(this.containerStyle, "width", width);
      });
    },
    getRowHeight() {
      if (!this.isDesktop) {
        this.$nextTick(() => {
          //sizing
          let target = this.$refs.items[0].clientHeight;
          let factor = target / 100;
          let string = "scale(" + 2 * factor + ")";
          Vue.set(this.heartHeight, "transform", string);
          Vue.set(this.heartHeight, "margin", "0 auto");
          Vue.set(this.heartHeight, "padding-bottom", "40px");

          this.$nextTick(() => {
            this.spacing(
              Math.floor(this.windowWidth / this.$refs.targetCard.clientWidth),
              this.$refs.targetCard.clientWidth
            );
            this.cardWidth = this.$refs.targetCard.clientWidth;
          });
        });
      }
    },
    getRowHeightDesktop() {
      if (this.isDesktop) {
        this.$nextTick(() => {
          //sizing

          let target = this.$refs.desktopItems[0].clientHeight;
          let factor = target / 100;
          let string = "scale(" + factor + ")";
          Vue.set(this.heartHeightDesktop, "transform", string);

          let target2 = this.$refs.sidebarName[0].clientHeight;
          let factor2 = target / 100;
          let string2 = "scale(" + 2.5 * factor + ")";
          Vue.set(this.heartHeightDesktopSidebar, "transform", string2);
          Vue.set(this.heartHeightDesktopSidebar, "top", "-5px");
          Vue.set(this.heartHeightDesktopSidebar, "position", "absolute");
          this.$nextTick(() => {
            this.spacing(
              Math.floor(this.windowWidth / this.$refs.targetCard.clientWidth),
              this.$refs.targetCard.clientWidth
            );
            this.cardWidth = this.$refs.targetCard.clientWidth;
          });
        });
      }
    },
    getImage: function(image) {
      if (this.isDesktop) {
        var cl = new cloudinary.Cloudinary({
          cloud_name: "kemp",
          secure: true
        });
        var tag = cl.url(image, { height: 198, width: 198, crop: "fill" });
        return tag;
      } else if (!this.isDesktop) {
        var cl = new cloudinary.Cloudinary({
          cloud_name: "kemp",
          secure: true
        });
        var tag = cl.url(image, { height: 100, width: 100, crop: "fill" });
        return tag;
      }
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
      if (end) {
        const now = new Date();
        const then = new Date(end);
        const difference = then - now + 5 * 60 * 60 * 1000;
        return difference;
      }
    }
  }
};
</script>

<style scoped  lang="scss">
@media (max-height: 600px) {
  #gap {
    background-color: none;
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

  .card-title {
    font-size: 18px;
  }
  h3 {
    font-size: 20px;
  }
}
@media (min-height: 700px) {
  #gap {
    background-color: none;
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

  .selection {
    font-size: 24px;
  }
  h3 {
    font-size: 30px;
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

#element {
  position: absolute;
  bottom: 200px;
}
#list {
  background-color: blue;
}
h1 {
  margin-bottom: 0%;
}
#searchResults {
  color: white;
}

.allData {
  background-color: blue;
}
#toggler {
  margin-bottom: 10px;
}
.catAnchor {
  background-color: orange;
  text-align: left;
  padding: 5px 10px 5px;
  color: white;
}

#EventHeader {
  h1 {
    background-color: orange;
    text-align: left;
    padding-left: 10%;
    padding-top: 150px;
  }
  h2 {
    margin-bottom: 0%;
  }
  background-color: blue;
  color: white;
  font-size: 24px;
}
// DROPDOWN/ SEARCH BAR
.selection {
  padding: 5px 0px;
}

#dropdown {
  margin: 10px 0px;
}
#filter {
  background-color: white;
  width: 100%;
  margin: 0 auto;
  position: fixed;
  z-index: 100;
  top: 50px;
  border-bottom: black solid 2px;
}
#searchInput {
  width: 40%;
}
#basic-addon2 {
  width: 20%;
}

//CARDS
.card-header {
  padding: 1%;
  width: 100%;
  margin-bottom: 5%;
}
.card-body {
  width: 100%;
  margin: 0;
  padding: 0px;
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
  border: black 0.5px solid;
  border-radius: 4px;
  background-color: white;
}

h3 {
  font-size: 16px;
  margin-bottom: 0em;
  color: black;
}

p {
  color: black;
  font-size: 12px;
  margin-bottom: 0em;
}
.imgDesktop {
  height: 198px;
  margin: 3px 30px 5px;
}

.imgMobile {
  width: 98px;
  height: 98px;
  margin: 3px 30px 5px;
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

.closed {
  background-color: black;
  width: auto;
  right: 0%;
  position: absolute;
  font-size: 14px;
}

.closedMobile {
  background-color: black;
  width: auto;
  right: 8%;
  font-size: 8px;
}
.idMobile {
  background-color: orange;
  width: auto;
  float: left;
  font-size: 8px;
}
.idDesktop {
  background-color: orange;
  width: 20%;
  float: left;
  font-size: 14px;
}

.closed,
.closedMobile,
.idDesktop,
.idMobile {
  position: absolute;
  z-index: 5;
  padding: 3px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  z-index: 5;
  color: white;
  font-weight: bold;
}
//SIDEBAR

.bar-button {
  width: 100%;
}
.bar-text {
  font-size: 14px;
  color: black;
  align-content: left;
}

#description {
  font-size: 14px;
  margin: 10px;
  margin-bottom: 10%;
}

// TWITTER HEART
.heart {
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
// SEARCH BAR

.search-form-wrapper {
  display: none;

  padding: 10px 10px;
  background: white;
  border: 2px black solid;
}
.search-form-wrapper.open {
  display: block;
}

// BASIC
// body {
//   background: linear-gradient(135deg, #121721 0%, #000000 100%) fixed;
//   color: inherit;
//   font: 300 16px/1.5 "Open Sans", sans-serif;
// }
</style>