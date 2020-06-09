<template>
  <div class="container">
    <div class="row" id="gap">
      <h3 id="name" ref="nameRow">{{post.name}}</h3>
      <div
        class="heart"
        v-bind:style="this.heartHeight"
        v-on:click="toggle"
        v-bind:class="{amactive: isActive}"
      ></div>
    </div>

    <div class="row image-row">
      <div class="col d-flex justify-content-center">
        <img class="card-image-top" src="../assets/sample.jpg" />
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <div>
          <p class="card-text" id="description">{{post.description}}</p>
        </div>
      </div>
    </div>

    <div class="bidrow">
      <div class="row d-flex justify-content-center" id="postinfo">
        <div class="col">
          <p class="card-text">Value: {{post.value}}</p>
          <p class="card-text">Current Bid: {{post.price}}</p>
          <p class="card-text">Minmum raise: {{post.raise}}</p>
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

export default {
  beforeRouteUpdate(to, from, next) {
    this.post = this.$store.getters.post(to.params.id);
    this.bid =
      this.$store.getters.post(to.params.id).price +
      this.$store.getters.post(to.params.id).raise;
    this.index = this.$store.state.posts.findIndex(
      element => element.id === to.params.id
    );
    this.isActive = this.$store.getters.findFavorite(to.params.id);
  },
  name: "post",
  data() {
    return {
      post: this.$store.getters.post(this.$route.params.id),
      bid:
        this.$store.getters.post(this.$route.params.id).price +
        this.$store.getters.post(this.$route.params.id).raise,
      index: this.$store.state.posts.findIndex(
        element => element.id === this.$route.params.id
      ),
      cards: [],
      isActive: false,
      rowHeight: 0,
      heartHeight: {}
    };
  },
  computed: {
    nextId() {
      if (this.index + 1 <= this.cards.length-1) {
        return this.index+1;
      } else return false;
    },
    prevId() {
      if (this.index - 1 >= 0) {
        return this.index-1;
      } else return false;
    }
  },
  mounted() {
    this.$store.dispatch("loadPosts");
    this.getCards();
    this.getRowHeight();
    this.initFavorite();
  },
  methods: {
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
        let factor = (2.5 * target) / 100;
        let string = "scale(" + factor + ")";
        Vue.set(this.heartHeight, "transform", string);

        // const left = this.$refs.nameRow.getBoundingClientRect().left + "px";
        // const top = this.$refs.nameRow.getBoundingClientRect().top + "px";
        // Vue.set(this.heartHeight, "right", left);
        // Vue.set(this.heartHeight, "top", top);
      });
    },
    initBid() {
      this.bid = this.post.price + this.post.raise;
    },
    getCards() {
      this.cards = this.$store.state.posts;
      this.index = this.$store.state.posts.findIndex(
        x => x.id === this.$route.params.id
      );
    },
    increment() {
      this.bid = parseInt($("#bidinput").val()) + this.post.raise;
    },
    decrement() {
      if (
        parseInt($("#bidinput").val()) - this.post.raise >=
        this.post.price + this.post.raise
      ) {
        this.bid = parseInt($("#bidinput").val()) - this.post.raise;
      } else alert("cant do that");
    },
    async submit() {
      this.bid = parseInt($("#bidinput").val());
      if (parseInt($("#bidinput").val()) >= this.post.price + this.post.raise) {
        alert("all good");
        var newPost = this.post;
        newPost.price = this.bid;
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
            this.post.price = this.bid;
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
  .container {
    position: absolute;
    top: 80px;
    padding: 0px;
  }

  .btn {
    font-size: 15px;
  }

  .h5 {
    font-size: 0.5em;
  }
  #bidinput {
    height: 60%;
  }
}

@media (min-height: 600px) {
  // #gap {
  //   background-color: blue;
  // }
  #name {
    font-size: 24px;
  }
  .container {
    position: absolute;
    top: 80px;
    padding: 0px;
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
}
@media (min-height: 700px) {
  // #gap {
  //   background-color: purple;
  // }

  .container {
    position: absolute;
    top: 100px;
    padding: 0px;
  }

  .fixed {
    position: absolute;
    &--center {
      left: calc(var(--vw, 1vw) * 50);
      top: calc(var(--vh, 1vh) * 47.5);
      transform: translate(-50%, -50%);
    }
  }
}
@media (min-height: 900px) {
  // #gap {
  //   background-color: black;
  // }
  .btn {
    font-size: 30px;
  }

  .container {
    position: absolute;
    top: 160px;
    max-width: 100vw;
    margin-left: auto;
    margin-right: auto;
    padding: 0px;
  }

  .frame {
    padding: auto;
    width: 80%;
    height: 80%;
    margin: auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
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
}
#postinfo {
  margin-bottom: 5%;
}
#name {
  position: relative;
  width: 100%;
  align-content: center;
  padding: 0em;
  margin: 0;
}

.card-image-top {
  width: 100%;
  height: 100%;
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

.flex {
  display: flex;
  &--center {
    align-items: center;
    justify-content: center;
  }
}

.rounded-borders {
  border-radius: 12px;
}
.card {
  width: 90%;
  border: black 0.5px solid;
  border-top-right-radius: 12px;
  background-color: #bfdbf7;
  background-clip: padding-box;
  border-top-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  color: black;

  .text {
    position: relative;
    width: 100%;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
    span {
      font-weight: normal;
    }
  }
}
.card-body {
  position: relative;
  padding: 2.5% 0% 2.5% 0%;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  span {
    font-weight: normal;
  }
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

.bidrow {
  position: fixed;
  width: 100%;
  bottom: 11%;
}
#bidinput {
  width: 50%;
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
  margin: 0 20px;
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

.btn-primary {
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

// TWITTER HEART
.heart {
  position: absolute;
  top: -16%;
  right: 0%;
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
</style>