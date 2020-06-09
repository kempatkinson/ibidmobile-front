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
        <router-link :to="{ name: 'post', params: {id: current.id}}">
          <h3 id="name" class="card-title">{{current.name}}</h3>

          <img class="card-image" src="../assets/sample.jpg" />
        </router-link>
        <div class="card-body">
          <h5>Current Bid: {{current.price}}</h5>
          <h5>Minimum raise: {{current.raise}}</h5>
          <h5>Value: {{current.value}}</h5>

          <router-link :to="{ name: 'post', params: {id: current.id}}">
            <button class="btn btn-primary">Bid Now!</button>
          </router-link>
        </div>
      </Vue2InteractDraggable>
    </div>
    <div v-if="next" class="rounded-borders card card--two fixed fixed--center" style="z-index: 2">
      <h2 class="card-title text">{{next.name}}</h2>
      <img class="card-image" src="../assets/sample.jpg" />

      <div class="card-body">
        <h5>Current Bid: {{next.price}}</h5>
        <h5>Minmum raise: {{next.raise}}</h5>
        <h5>Value: {{next.value}}</h5>

        <button class="btn btn-primary">Bid Now!</button>
      </div>
    </div>

    <div
      v-if="index + 2 < cards.length"
      class="rounded-borders card card--three fixed fixed--center"
      style="z-index: 1"
    >
      <h2 class="card-title text">{{nextNext.name}}</h2>
      <img class="card-image" src="../assets/sample.jpg" />

      <div class="card-body">
        <h5>Current Bid: {{nextNext.price}}</h5>
        <h5>Minmum raise: {{nextNext.raise}}</h5>
        <h5>Value: {{nextNext.value}}</h5>

        <button class="btn btn-primary">Bid Now!</button>
      </div>
    </div>
    <div class="footer">
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
        if (!this.$store.getters.findFavorite(this.current.id)) {
          this.$store.dispatch("setFavorite", {
            n: this.cards[
              this.cards.findIndex(element => element.id === this.current.id)
            ].id
          });
        }
      }
      if (event == "reject") {
        this.$store.dispatch("removeFavorite", {
          n: this.cards[
            this.cards.findIndex(element => element.id === this.current.id)
          ].id
        });
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
    }
  }
};
</script>

<style lang="scss" scoped>
.fixed {
  position: absolute;
  &--center {
    left: calc(var(--vw, 1vw) * 50);
    top: calc(var(--vh, 1vh) * 50);
    transform: translate(-50%, -50%);
  }
}
@media (max-height: 600px) {
  // #gap {
  //   background-color: red;
  // }
  .btn {
    font-size: 15px;
  }
  .card-title {
    font-size: 20px;
  }
  .cardtext {
    font-size: 1em;
  }
  .h5 {
    font-size: 0.5em;
  }
}
@media (min-height: 600px) {
  // #gap {
  //   background-color: blue;
  // }
}
@media (min-height: 700px) {
  // #gap {
  //   background-color: purple;
  // }
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
    font-size: 1.5em;
  }
  .cardtext,
  .h5 {
    font-size: 15px;
  }
}
.btn-primary {
  background-color: #1f7a8c;
  border-color: #343a40;
  color: white;
  margin: 5px;
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
#name {
  color: black;
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

.footer {
  position: fixed;
  bottom: 0px;
  background-color: lightgrey;
  border: grey 0.5px solid;

  width: 100%;
  .btn {
    border-color: #343a40;
    background-color: #bfdbf7;
    color: black;
    margin: 10px;
  }
}
</style>