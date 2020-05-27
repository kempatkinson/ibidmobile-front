<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
          <br />
          <h3 class="card-title">{{post.name}}</h3>
          <img class="card-image-top" src="../assets/sample.jpg" />
          <div class="card-body">
            <h4 class="card-title">Current Bid: {{post.price}}</h4>
            <h5>Minmum raise: {{post.raise}}</h5>
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
                <input id="bid" type="number" v-model="bid" />
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
            <br />
            <button
              type="button"
              class="btn btn-outline-dark"
              v-on:click.prevent="submit"
            >Submit Bid</button>
          </div>
        </div>
      </div>
    </div>
    <br />

    <div class="row">
      <div class="col d-flex justify-content-center">
        <button v-if="nextIndex" @click="moveNextIndex">
          <p>Next item</p>
        </button>
        <button v-if="prevIndex" @click="movePrevIndex">
          <p>Previous item</p>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <button>
          <router-link to="/">Back to All</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.getNextIndex(), this.getPrevIndex();
  },

  name: "post",
  data() {
    return {
      post: this.$store.getters.post(this.$route.params.id),
      bid:
        this.$store.getters.post(this.$route.params.id).price +
        this.$store.getters.post(this.$route.params.id).raise,
      nextIndex: true,
      prevIndex: true
    };
  },
  methods: {
    increment() {
      this.bid =
        parseInt(this.bid) +
        this.$store.getters.post(this.$route.params.id).raise;
    },
    decrement() {
      if (
        this.bid >
        parseInt(this.$store.getters.post(this.$route.params.id).price) +
          this.$store.getters.post(this.$route.params.id).raise
      ) {
        this.bid =
          this.bid - this.$store.getters.post(this.$route.params.id).raise;
      }
    },
    async submit() {
      if (
        this.bid >=
        parseInt(this.$store.getters.post(this.$route.params.id).price) +
          this.$store.getters.post(this.$route.params.id).raise
      ) {
        alert("all good");
        var newPost = {
          Id: this.$store.getters.post(this.$route.params.id).id,
          Name: this.$store.getters.post(this.$route.params.id).name,
          Image: this.$store.getters.post(this.$route.params.id).image,
          Price: parseInt(this.bid),
          Raise: parseInt(this.$store.getters.post(this.$route.params.id).raise)
        };
        const url =
          "https://localhost:5000/api/BidItems/" + this.$route.params.id;
        return axios
          .put(url, newPost, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            console.log(response);
            this.post.price = this.bid;
          })
          .catch(error => {
            console.log(error.response);
          });
      } else {
        alert("your bid is not high enough");
      }
    },
    getNextIndex() {
      if (
        this.$store.state.posts.findIndex(x => x.id === this.$route.params.id) <
        this.$store.state.posts.length
      ) {
        this.nextIndex = true;
      } else this.nextIndex = false;
    },
    moveNextIndex() {
      this.$router.push(
        this.$store.state.posts[
          this.$store.state.posts.findIndex(
            x => x.id === this.$route.params.id
          ) + 1
        ].id
      );
      // check beforeRouteUpdate
      this.post = this.$store.getters.post(this.$route.params.id);
      (this.bid =
        this.$store.getters.post(this.$route.params.id).price +
        this.$store.getters.post(this.$route.params.id).raise),
        this.getNextIndex();
      this.getPrevIndex();
    },
    getPrevIndex() {
      if (
        this.$store.state.posts.findIndex(
          x => x.id === this.$route.params.id
        ) >= 1
      ) {
        this.prevIndex = true;
      } else this.prevIndex = false;
    },
    movePrevIndex() {
      this.$router.push(
        this.$store.state.posts[
          this.$store.state.posts.findIndex(
            x => x.id === this.$route.params.id
          ) - 1
        ].id
      );
      // // check beforeRouteUpdate
      this.post = this.$store.getters.post(this.$route.params.id);
      (this.bid =
        this.$store.getters.post(this.$route.params.id).price +
        this.$store.getters.post(this.$route.params.id).raise),
        this.getNextIndex();
      this.getPrevIndex();
    }
  }
};
</script>

<style scoped>
input {
  margin-left: 5%;
  margin-right: 5%;
  width: 60%;
  background-color: lightgray;
}
img {
  margin: 5%;
}
</style>