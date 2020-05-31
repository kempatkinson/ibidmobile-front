<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex justify-content-center">
        <div class="card" style="width: 18rem;">
          <br />
          <h3 id="name">{{post.name}}</h3>
          <img class="card-image-top" src="../assets/sample.jpg" />
          <div class="card-body">
            <p>{{post.description}}</p>
            <p class="card-title">Current Bid: {{post.price}}</p>
            <p>Minmum raise: {{post.raise}}</p>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {},

  name: "post",
  data() {
    return {
      post: this.$store.getters.post(this.$route.params.id),
      bid:
        this.$store.getters.post(this.$route.params.id).price +
        this.$store.getters.post(this.$route.params.id).raise
    };
  },
  mounted() {
    this.$store.dispatch("loadPosts");
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
      this.bid = parseInt($("#bidinput").val());
      if (parseInt($("#bidinput").val()) >= this.post.price + this.post.raise) {
        alert("all good");
        var newPost = this.post;
        newPost.price = this.bid;
        const url =
          "https://afternoon-taiga-12401.herokuapp.com/api/biditems/" +
          // "https://localhost:5001/api/BidItems/" +
          this.current.id;
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
    }
  }
};
</script>

<style lang="scss" scoped>
@media (max-height: 600px) {
  #gap {
    background-color: red;
  }
  #foot {
    position: absolute;
    bottom: calc(var(--vh, 1vh) * 0.5);
    align-items: center;
    width: 100%;
  }
  .fixed {
    position: absolute;
    &--center {
      left: calc(var(--vw, 1vw) * 50);
      top: calc(var(--vh, 1vh) * 50);
      transform: translate(-50%, -50%);
    }
  }
  .btn {
    font-size: 15px;
  }
  .card-title {
    font-size: 20px;
  }
  .card-body {
    font-size: 1em !important;
  }
  .h5 {
    font-size: 0.5em !important;
  }
}
#name {
  padding: 0em;
  margin: 0;
}
@media (min-height: 600px) {
  #gap {
    background-color: blue;
  }
  #foot {
    position: relative;
    margin-top: calc(var(--vh, 1vh) * 5);
    align-items: center;
    width: 100%;
  }

  .fixed {
    position: absolute;
    &--center {
      left: calc(var(--vw, 1vw) * 50);
      top: calc(var(--vh, 1vh) * 50);
      transform: translate(-50%, -50%);
    }
  }
}
@media (min-height: 700px) {
  // #gap {
  //   background-color: purple;
  // }
  #foot {
    position: relative;
    margin-top: calc(var(--vh, 1vh) * 10);
    align-items: center;
    width: 100%;
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
  #gap {
    background-color: black;
  }
  .btn {
    font-size: 25px;
  }
  .card-title {
    font-size: 40px;
  }
  .bidrow {
    font-size: 1.5em !important;
  }
  .card-body,
  .h5 {
    font-size: 15px !important;
  }

  #foot {
    position: absolute;
    bottom: 2.5%;
    align-items: center;
    width: 100%;
  }
  .fixed {
    position: absolute;
    &--center {
      top: calc(var(--vh, 1vh) * 52.5);
      transform: translate(-50%, -50%);
    }
  }
}

.svg {
  padding: 10px;
}

.footer-btn {
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  // &:active {
  //   transform: translateY(4px);
  // }
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
  width: calc(var(--vw, 1vw) * 80);
  border: black 0.5px solid;
  border-top-right-radius: 12px;
  background-color: #bfdbf7;
  background-clip: padding-box;
  border-top-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  color: black;
  img {
    width: 100%;
    padding: 2%;
  }
  &--one {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14),
      0 2px 1px -1px rgba(0, 0, 0, 0.12);
  }
  &--two {
    transform: translate(-48%, -48%);
    box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2),
      0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12);
  }
  &--three {
    transform: translate(-46%, -46%);
    box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2),
      0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12);
  }
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
  margin-left: calc(var(--vw, 1vw) * 5);
  margin-right: calc(var(--vw, 1vw) * 5);
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
  background-color: #1f7a8c;
  border-color: #343a40;
  color: white;
  margin: 5px;
  a.router-link-active {
    color: white;
  }
}
html,
body {
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
}
.container {
  position: absolute;
  top: 100px;
}
</style>