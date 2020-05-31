<template>
  <div id="stack">
    <div
      v-if="current"
      class="fixed fixed--center"
      style="z-index: 3"
      :class="{ 'transition': isVisible }"
    >
      <Vue2InteractDraggable
        v-if="isVisible"
        :interact-out-of-sight-x-coordinate="200"
        :interact-max-rotation="45"
        :interact-x-threshold="200"
        :interact-y-threshold="200"
        :interact-event-bus-events="interactEventBus"
        interact-block-drag-down
        @draggedRight="emitAndNext('match')"
        @draggedLeft="emitAndNext('reject')"
        @draggedUp="emitAndNext('skip')"
        class="rounded-borders card card--one"
        ref="targetCard"
      >
        <h2 class="card-title text">{{current.name}}</h2>
        <img class="card-image" src="../assets/sample.jpg" />

        <div class="card-body">
          <h5>Current Bid: {{current.price}}</h5>
          <h5>Minmum raise: {{current.raise}}</h5>

          <div class="row justify-content-center bidrow">
            <a @touchstart="decrement">
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
            <a @touchstart="increment">
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
          </div>
          <button type="button" class="btn btn-foot" @touchstart="submit">Submit Bid</button>
          <div class="row">
            <div class="col d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-foot"
                v-if="(this.index<this.cards.length-1)"
                @touchstart="skip"
              >Next item</button>
              <button class="btn btn-foot" v-if="(this.index>0)" @touchstart="back">Previous item</button>
            </div>
          </div>
        </div>
      </Vue2InteractDraggable>
    </div>
    <div
      v-if="next"
      class="rounded-borders card card--two fixed fixed--center"
      style="z-index: 2"
      v-bind:style="containerStyle"
    >
      <h2 class="card-title text">{{next.name}}</h2>
      <img class="card-image" src="../assets/sample.jpg" />

      <div class="card-body">
        <h5>Current Bid: {{next.price}}</h5>
        <h5>Minmum raise: {{next.raise}}</h5>

        <div class="row justify-content-center bidrow">
          <a @touchstart="decrement">
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
          <input type="number" v-model="nextBid" />
          <a @touchstart="increment">
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
        </div>
        <button type="button" class="btn btn-foot" @touchstart="submit">Submit Bid</button>

        <div class="row">
          <div class="col d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-foot"
              v-if="(this.index+1<this.cards.length-1)"
              @touchstart="skip"
            >Next item</button>
            <button class="btn btn-foot" v-if="(this.index+1>0)" @touchstart="back">Previous item</button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="index + 2 < cards.length"
      class="rounded-borders card card--three fixed fixed--center"
      style="z-index: 1"
      v-bind:style="containerStyle"
    >
      <h2 class="card-title text">{{nextNext.name}}</h2>
      <img class="card-image" src="../assets/sample.jpg" />

      <div class="card-body">
        <h5>Current Bid: {{nextNext.price}}</h5>
        <h5>Minmum raise: {{nextNext.raise}}</h5>

        <div class="row justify-content-center">
          <a @touchstart="decrement">
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
          <input type="number" v-model="bid" />
          <a @touchstart="increment">
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
        </div>
        <button type="button" class="btn btn-foot" @touchstart="submit">Submit Bid</button>
        <div class="row">
          <div class="col d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-foot"
              v-if="(this.index+2<this.cards.length-1)"
              @touchstart="skip"
            >Next item</button>
            <button class="btn btn-foot" v-if="(this.index+2>0)" @touchstart="back">Previous item</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Vue2InteractDraggable, InteractEventBus } from "vue2-interact";
import { mapState } from "vuex";
import Vue from "vue";
import $ from "jquery";
import axios from "axios";

const EVENTS = {
  MATCH: "match",
  SKIP: "skip",
  REJECT: "reject"
};
export default {
  name: "SwipeableCards",
  components: { Vue2InteractDraggable },

  data() {
    return {
      index: this.$store.state.posts.findIndex(
        x => x.id === this.$route.params.id
      ),
      isVisible: true,
      interactEventBus: {
        draggedRight: EVENTS.MATCH,
        draggedLeft: EVENTS.REJECT,
        draggedUp: EVENTS.SKIP
      },
      cards: [],
      bid: 0,
      nextBid: 0,
      containerStyle: {}
    };
  },
  mounted() {
    this.$store.dispatch("loadPosts");
    this.getCards();
    this.initBid();
    this.getHeight();
  },

  computed: {
    current() {
      return this.cards[this.index];
    },
    favorites() {
      return this.$store.state.favorites;
    },
    next() {
      return this.cards[this.index + 1];
    },
    nextNext() {
      return this.cards[this.index + 2];
    },
    ...mapState(["posts"])
  },

  methods: {
    initBid() {
      this.bid = this.current.price + this.current.raise;
      if (this.cards[this.index + 1]) {
        this.nextBid =
          this.cards[this.index + 1].price + this.cards[this.index + 1].raise;
      }
    },
    getHeight() {
      Vue.nextTick(() => {
        let height = this.$refs.targetCard.$el.clientHeight + "px";
        console.log(height);
        Vue.set(this.containerStyle, "height", height);
      });
    },
    back() {
      this.index--;
    },
    match() {
      InteractEventBus.$emit(EVENTS.MATCH);
    },
    reject() {
      InteractEventBus.$emit(EVENTS.REJECT);
    },
    skip() {
      InteractEventBus.$emit(EVENTS.SKIP);
    },
    emitAndNext(event) {
      if (event == "match") {
        let seen = false;
        for (let i = 0; i < this.$store.state.favorites.length; i++) {
          if (this.$store.state.favorites[i].n === this.index) {
            seen = true;
          }
        }
        if (!seen) {
          this.$store.dispatch("setFavorite", { n: this.index });
        }
      }
      if (event == "reject") {
        this.$store.dispatch("removeFavorite", { n: this.index });
      }

      this.$emit(event, this.index);
      setTimeout(() => (this.isVisible = false), 200);
      setTimeout(() => {
        this.index++;
        this.initBid();

        this.isVisible = true;
      }, 200);
    },
    getCards() {
      this.cards = this.$store.state.posts;
      this.index = this.$store.state.posts.findIndex(
        x => x.id === this.$route.params.id
      );
    },
    increment() {
      this.bid = parseInt($("#bidinput").val()) + this.current.raise;
    },
    decrement() {
      if (
        parseInt($("#bidinput").val()) - this.current.raise >=
        this.current.price + this.current.raise
      ) {
        this.bid = parseInt($("#bidinput").val()) - this.current.raise;
      } else alert("cant do that");
    },
    async submit() {
      this.bid = parseInt($("#bidinput").val());
      if (
        parseInt($("#bidinput").val()) >=
        this.current.price + this.current.raise
      ) {
        alert("all good");
        var newPost = {
          Id: this.current.id,
          Name: this.current.name,
          Image: this.current.image,
          Price: this.bid,
          Raise: this.current.raise
        };
        const url =
          // "https://afternoon-taiga-12401.herokuapp.com/api/biditems/" +
          "https://localhost:5001/api/BidItems/" +
          this.current.id;
        return axios
          .put(url, newPost, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            this.current.price = this.bid;
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
@media (min-height: 600px) {
  // #gap {
  //   background-color: blue;
  // }
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
  // #gap {
  //   background-color: black;
  // }
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
  &:active {
    transform: translateY(4px);
  }
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
  margin-bottom: calc(var(--vh, 1vh) * 3);
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

</style>