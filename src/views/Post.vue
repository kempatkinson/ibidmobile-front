<template>
  <div class="page">
    <div class="row card topDetails">
      <p class="closed" v-if="(post.itStatus === 4)">CLOSED</p>
      <p class="idLabel">1102</p>

      <h3 id="name" ref="nameRow">{{post.itName}}</h3>
      <h3>Value: {{post.itValue}}</h3>
      <h3>Current Bidder: {{post.CurrentBidder}} at ${{post.itMinBid}}</h3>
      <h3>Minimum Raise: ${{post.itMinRaise}}</h3>

      <div
        class="heart"
        v-bind:style="this.heartHeight"
        v-on:click="toggle"
        v-bind:class="{amactive: isActive}"
      ></div>
    </div>
    <div class="Details">
      <img class="imgDetails" v-bind:src="getImage(sample)" />
      <p class="textDetails">{{post.itDescription}}</p>
      <p class="textDetails">Donated By: {{post.itDonor}}</p>

      <!--  <div id="date-text" class="row card-text">
        <div class="col d-flex justify-content-center">
          <countdown
            v-if="(!post.sold) && (timeUntil(post.itEndDate) > 0)"
            :time="timeUntil(post.itEndDate)"
          >
            <div
              slot-scope="props"
              class="card-text"
            >Bidding closes in {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</div>
          </countdown>
        </div>
      </div>-->
      <div class="row" id="bid-row">
        <div class="col d-flex justify-content-center">
          <div class="bidrow card-text">
            <div class="row d-flex justify-content-center" id="postinfo">
              <div class="col">
                <p class="card-text">Value: {{post.itValue}}</p>
                <p class="card-text">Current Bid: {{post.itMinBid}}</p>
                <p class="card-text">Minmum raise: {{post.itMinRaise}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col d-flex justify-content-center">
                <form>
                  <a v-on:click.prevent="decrement">
                    <svg
                      class="bi bi-dash-circle"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M3.5 8a.5.5 0 01.5-.5h8a.5.5 0 010 1H4a.5.5 0 01-.5-.5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                  <input id="bidinput" type="number" v-model="bid" />
                  <a v-on:click.prevent="increment">
                    <svg
                      class="bi bi-plus-circle"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </form>
              </div>
            </div>

            <div class="row">
              <div class="col d-flex justify-content-center">
                <button type="button" class="btn btn-primary" v-on:click.prevent="submit">Submit Bid</button>
              </div>
            </div>
          </div>
        </div>

        <div class="col d-flex justify-content-center" v-if="post.itOwnNow">
          <button
            type="button"
            class="btn btn-primary"
            id="buyNow"
            v-on:click.prevent="buyNow"
          >Buy Now</button>
        </div>
      </div>
    </div>
    <div>
      <router-link :to="{ name: 'Items', params: {TinyURL: backToEvent}}">
        <button type="button" class="btn btn-foot">Back to Event</button>
      </router-link>
    </div>
    <div id="bidHistory" class="row Details">
      <div class="table">
        <thead>
          <th>Bidder</th>
          <th>Amount</th>
          <th>Timestamp</th>
        </thead>
        <tbody>
          <tr>
            <td>Geroge</td>
            <td>100</td>

            <td>8/1/2020</td>
          </tr>
          <tr>
            <td>Geroge</td>
            <td>100</td>

            <td>8/1/2020</td>
          </tr>
          <tr>
            <td>Geroge</td>
            <td>100</td>

            <td>8/1/2020</td>
          </tr>
          <tr>
            <td>Geroge</td>
            <td>100</td>

            <td>8/1/2020</td>
          </tr>
          <tr>
            <td>Geroge</td>
            <td>100</td>

            <td>8/1/2020</td>
          </tr>
        </tbody>
      </div>
    </div>
    <div class="footer">
      <div id="buttons">
        <div v-if="nextId">
          <router-link :to="{ name: 'post', params: {id: nextId}}">
            <button type="button" class="btn btn-foot">Next item</button>
          </router-link>
        </div>
        <div v-if="prevId">
          <router-link :to="{ name: 'post', params: {id: prevId}}">
            <button type="button" class="btn btn-foot">Previous item</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Vue from "vue";
import cloudinary from "cloudinary-core";

export default {
  beforeRouteUpdate(to, from, next) {
    this.$route.params.id = to.params.id;
    this.post = this.$store.getters.post(to.params.id);
    this.bid =
      parseInt(this.$store.getters.post(to.params.id).itMinBid) +
      parseInt(this.$store.getters.post(to.params.id).itMinRaise);
    this.index = this.$store.state.posts.findIndex(
      element => element.itID === to.params.id
    );
    this.isActive = this.$store.getters.findFavorite(to.params.id);
    // var cl = new cloudinary.Cloudinary({ cloud_name: "kemp", secure: true });
    // this.getImage(this.$store.getters.post(to.params.id).image);
    next();
  },
  name: "post",
  data() {
    return {
      post: this.$store.getters.post(this.$route.params.id),
      bid:
        parseInt(this.$store.getters.post(this.$route.params.id).itMinBid) +
        parseInt(this.$store.getters.post(this.$route.params.id).itMinRaise),
      index: this.$store.state.posts.findIndex(
        element => element.itID === this.$route.params.id
      ),
      event: {},
      cards: [],
      sample: "hello.jpg",
      isActive: false,
      rowHeight: 0,
      heartHeight: {},
      image: "",
      windowWidth: window.innerWidth,
      isDesktop: window.innerWidth > 800
    };
  },
  computed: {
    nextId() {
      if (this.cards[this.index + 1]) {
        return this.cards[this.index + 1].itID;
      } else return false;
    },
    prevId() {
      if (this.cards[this.index - 1]) {
        return this.cards[this.index - 1].itID;
      } else return false;
    },
    backToEvent() {
      var url = this.event.TinyID;
      return url;
    }
  },
  mounted() {
    // this.$store.dispatch("loadPosts", this.$route.params.TinyURL);
    this.event = this.$store.state.event[0];

    this.getCards();
    this.getRowHeight();
    this.initFavorite();
  },
  methods: {
    buyNow() {
      var r = confirm("Are you sure you want to buy now?");

      if (r) {
        const url =
          "https://afternoon-taiga-12401.herokuapp.com/api/biditems/" +
          // "https://localhost:5001/api/BidItems/" +
          this.post.itID;
        var newPost = this.post;
        newPost.sold = true;
        return axios
          .put(url, newPost, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            console.log(response);
            this.post = newPost;
          })
          .catch(error => {
            alert(error);
          });
      }
    },
    timeUntil: function(end) {
      const now = new Date();
      const then = new Date(end);
      const difference = then - now + 5 * 60 * 60 * 1000;
      return difference;
    },
    getImage: function(image) {
      if (this.isDesktop) {
        var cl = new cloudinary.Cloudinary({
          cloud_name: "kemp",
          secure: true
        });
        var tag = cl.url(image, { height: 160, width: 160, crop: "fill" });
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

    initFavorite() {
      if (this.$store.getters.findFavorite(this.post.id)) {
        this.isActive = true;
      }
    },
    toggle() {
      this.isActive = !this.isActive;

      if (this.isActive) {
        this.$store.dispatch("setFavorite", { n: this.post.id });
      }
      if (!this.isActive) {
        this.$store.dispatch("removeFavorite", { n: this.post.id });
      }
      // some code to filter users
    },
    getRowHeight() {
      Vue.nextTick(() => {
        let target = this.$refs.nameRow.clientHeight;
        let factor = (2 * target) / 100;
        let string = "scale(" + factor + ")";
        Vue.set(this.heartHeight, "transform", string);
        Vue.set(this.heartHeight, "right", "-20px");

        Vue.set(this.heartHeight, "top", "40px");
        // const left = this.$refs.nameRow.getBoundingClientRect().left + "px";
        // const top = this.$refs.nameRow.getBoundingClientRect().top + "px";
        // Vue.set(this.heartHeight, "right", left);
        // Vue.set(this.heartHeight, "top", top);
      });
    },
    initBid() {
      this.bid = this.post.itMinBid + this.post.itMinRaise;
    },
    getCards() {
      this.cards = this.$store.state.posts;
      this.index = this.$store.state.posts.findIndex(
        x => x.itID === this.$route.params.id
      );
    },
    increment() {
      this.bid = parseInt($("#bidinput").val()) + this.post.itMinRaise;
    },
    decrement() {
      if (
        parseInt($("#bidinput").val()) - this.post.itMinRaise >=
        this.post.itMinBid + this.post.itMinRaise
      ) {
        this.bid = parseInt($("#bidinput").val()) - this.post.itMinRaise;
      } else alert("cant do that");
    },
    async submit() {
      this.bid = parseInt($("#bidinput").val());
      if (
        parseInt($("#bidinput").val()) >=
        this.post.itMinBid + this.post.itMinRaise
      ) {
        alert("all good");
        var newPost = this.post;
        newPost.itMinBid = this.bid;
        const url =
          "https://afternoon-taiga-12401.herokuapp.com/api/biditems/" +
          // "https://localhost:5001/api/BidItems/" +
          this.post.id;
        return axios
          .put(url, newPost, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            this.post.itMinBid = this.bid;
            this.initBid();
          })
          .catch(error => {
            alert(error);
          });
      } else {
        console.log(this.bid);
        alert("your bid is not high enough");
        this.initBid();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@media (max-height: 600px) {
  // #gap {
  //   background-color: red;
  // }
  #description {
    font-size: 12px;
  }
  .page {
    padding-top: 80px;
    padding-left: 0px;
  }

  .btn {
    font-size: 10px;
    height: 30px;
  }
  #name {
    font-size: 1.5em;
  }
  #date-text {
    font-size: 1em;
  }

  #bid-row {
    font-size: 12px;
  }
  .h5 {
    font-size: 0.5em;
  }
  #bidinput {
    height: 60%;
  }
  .heart {
    top: 0%;
    right: 0%;
  }
}

@media (min-height: 600px) {
  // #gap {
  //   background-color: blue;
  // }
  #name {
    font-size: 24px;
  }
  .page {
    padding-top: 80px;
    padding-left: 0px;
  }
  #description {
    font-size: 14px;
  }

  .card-text {
    font-size: 14px;
  }

  .btn {
    font-size: 14px;
  }
  .heart {
    top: 9%;
    right: 0%;
  }
}
@media (min-height: 700px) {
  // #gap {
  //   background-color: purple;
  // }

  .page {
    padding-top: 100px;
    padding-left: 0px;
  }

  .fixed {
    position: absolute;
    &--center {
      left: calc(var(--vw, 1vw) * 50);
      top: calc(var(--vh, 1vh) * 47.5);
      transform: translate(-50%, -50%);
    }
  }
  .heart {
    top: 0%;
    right: 0%;
  }
}
@media (min-height: 900px) {
  // #gap {
  //   background-color: black;
  // }
  .btn {
    font-size: 30px;
  }

  .page {
    padding-top: 160px;
    padding-left: 0px;
    width: 100%;
  }

  .img {
    margin: auto;
  }

  #description {
    font-size: 24px;
  }
  .card-text {
    font-size: 24px;
  }
  .btn {
    font-size: 20px;
  }
  #name {
    font-size: 36px;
  }
  .heart {
    top: -5%;
    right: 0%;
  }
}
#name {
  position: relative;
  width: 100%;
  align-content: center;
  padding: 0em;
  margin: 0;
}

.imgDetails {
  width: 160px;
  height: auto;
  float: right;
  margin: 10px;
}
.textDetails {
  float: none;
}

.Details {
  max-width: 700px;
  min-width: 300px;
  width: 90%;
  padding: 10px;
  background: #eee;
  color: #333;
  margin: 10px auto;
  position: relative;
}

.topDetails {
  max-width: 700px;
  min-width: 300px;
  width: 90%;
  padding: 10px;
  background: #eee;
  color: #333;
  margin: 10px auto;
  position: relative;
  text-align: left;
}

.image-row {
  margin: 0 auto;
  width: 40%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
}
.svg {
  padding: 10px;
}
.idLabel {
  background-color: orange;
  right: 0%;
  top: 0%;
  font-size: 14px;
  position: absolute;
  z-index: 5;
  padding: 3px;
  border-top-left-radius: 4px;
  border-bottom-right-radius: 4px;
  z-index: 5;
  color: white;
  font-weight: bold;
}

.closed {
  background-color: black;
  width: auto;
  color: white;
  right: 0%;
  top: 21%;
  position: absolute;
  font-size: 14px;
  padding: 3px;
  border-top-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.flex {
  display: flex;
  &--center {
    align-items: center;
    justify-content: center;
  }
}

#page {
  background-color: blue($color: #000000);
}
.rounded-borders {
  border-radius: 12px;
}

.transition {
  animation: appear 200ms ease-in;
}

@keyframes appear {
  from {
    transform: translate(-48%, -48%);
  }
  to {
    transform: translate(-50%, -50%);
  }
}
#bidHistory {
  margin: auto;
  padding-bottom: 50px;
}
#bid-row {
  margin: 0 auto;
  width: 100%;
  bottom: 11%;
}
#bidinput {
  width: 40%;
  margin-left: calc(var(--vw, 1vw) * 5);
  margin-right: calc(var(--vw, 1vw) * 5);
}

#description {
  text-align: left;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
}
.card-text {
  margin: auto;
}
.h2 {
  padding: 2.5% 0% 0% 0%;
  margin: 0px;
}
.input {
  margin-bottom: 5px;
}

.submitrow {
  margin-bottom: 5%;
}

.btn-foot {
  border-color: #343a40;
  background-color: #bfdbf7;
  color: black;
  margin: 10px;
}

.btn-primary,
.btn-primary:hover {
  background-color: #1f7a8c;
  margin-top: 5%;
  border-color: #343a40;
  color: white;
}
html,
body {
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: lightgrey;
  border: grey 0.5px solid;
}

#buttons {
  text-align: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

#date-text {
  width: 100%;
  color: red;
}
// TWITTER HEART
.heart {
  position: absolute;
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

// BASIC
body {
  background: linear-gradient(135deg, #121721 0%, #000000 100%) fixed;
  color: #fff;
  font: 300 16px/1.5 "Open Sans", sans-serif;
}

#bid-row {
  margin-top: 5%;
}

#buyNow {
  position: fixed;
  bottom: 11%;
}
</style>