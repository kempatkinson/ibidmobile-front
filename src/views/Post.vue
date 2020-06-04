<template>
  <div class="container">
    <div class="row d-flex justify-content-center" id="gap">
      <div class="col d-flex justify-content-center">
        <div class="card">
          <h3 class="card-header card-title" id="name">{{post.name}}</h3>
          <div class="frame" style="text-align: center">
            <img class="card-image-top" src="../assets/sample.jpg" />
          </div>
          <div class="card-body cardtext">
            <p class="card-text">{{post.description}}</p>
            <p class="card-text">Value: {{post.value}}</p>
            <p class="card-text">Current Bid: {{post.price}}</p>
            <p class="card-text">Minmum raise: {{post.raise}}</p>
            <div class="row justify-content-center">
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
          <div class="card-footer">
            <button type="button" class="btn btn-primary" v-on:click.prevent="submit">Submit Bid</button>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="col d-flex justify-content-center">
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
    next();
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
      cards: []
    };
  },
  computed: {
    nextId() {
      if (this.index + 1 < this.cards.length) {
        return this.cards[this.index + 1].id;
      } else return false;
    },
    prevId() {
      if (this.index - 1 >= 0) {
        return this.cards[this.index - 1].id;
      } else return false;
    }
  },
  mounted() {
    this.$store.dispatch("loadPosts");
    this.getCards();
  },
  methods: {
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
  .container {
    position: absolute;
    top: 80px;
    padding: 0px;
  }
  .frame {
    padding: auto;
    width: 60%;
    height: 40%;
    margin: auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .img {
    margin: auto;
  }
  .btn {
    font-size: 15px;
  }
  .card-title {
    font-size: 20px;
  }
  .card-text {
    font-size: 0.75em;
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
  .container {
    position: absolute;
    top: 80px;
    padding: 0px;
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
  .card-footer {
    margin-top: 5%;
  }
}
@media (min-height: 900px) {
  // #gap {
  //   background-color: black;
  // }
  .btn {
    font-size: 30px;
  }
  .card-title {
    font-size: 40px;
  }
  .bidrow {
    font-size: 1.5em;
  }
  .card-body {
    font-size: 24px;
  }

  .container {
    position: absolute;
    top: 200px;
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
  .card-footer {
    margin-top: 10%;
  }
}

.card-image-top {
  height: 100%;
  padding-top: 5%;
  padding-left: 2%;
  padding-right: 2%;
}
#name {
  padding: 0em;
  margin: 0;
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
#bidinput {
  width: 50%;
  margin-top: 5%;
  margin-left: calc(var(--vw, 1vw) * 5);
  margin-right: calc(var(--vw, 1vw) * 5);
}
.card-text {
  margin: 0px;
}
.h2,
.card-title {
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
  bottom: 0px;
  background-color: lightgrey;
  border: grey 0.5px solid;

  width: 100%;
}
</style>