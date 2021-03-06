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
        v-bind:style="containerStyle"
      >
        <router-link :to="{ name: 'post', params: {id: current.itID}}">
          <h3 ref="nameRow" id="name" class="card-title">{{current.itName}}</h3>
          <div class="frame">
            <img v-bind:src="getImage(current.image)" />
          </div>
          <div
            class="heart"
            v-bind:style="this.heartHeight"
            v-bind:class="{amactive: favorited(current.itID)}"
          ></div>
        </router-link>
        <div class="card-body">
          <div class="sell-wrapper" v-if="(!current.sold) && (timeUntil(current.itEndDate) > 0)">
            <h5>Current Bid: {{current.itMinBid}}</h5>
            <h5>Value: {{current.itValue}}</h5>

            <router-link
              :to="{ name: 'post', params: {id: current.itID}}"
              v-if="(!current.sold) && (timeUntil(current.itEndDate) > 0)"
            >
              <button class="btn btn-primary">Bid Now!</button>
            </router-link>
          </div>
          <div class="cardtext" v-if="(current.sold)">Sold out!</div>
        </div>
        <div class="card-footer">
          <div class="cardtext" v-if="(timeUntil(current.itEndDate) <= 0)">Auction Over!</div>

          <countdown v-if="(timeUntil(current.itEndDate) > 0)" :time="timeUntil(current.itEndDate)">
            <div
              slot-scope="props"
              class="card-text"
            >Bidding closes in {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</div>
          </countdown>
        </div>
      </Vue2InteractDraggable>
    </div>

    <div
      v-if="index + 1 <= cards.length-1"
      class="rounded-borders card card--two fixed fixed--center"
      style="z-index: 2"
      v-bind:style="containerStyle"
    >
      <div>
        <h3 id="name" class="card-title">{{next.itName}}</h3>
        <div
          class="heart"
          v-bind:style="this.heartHeight"
          v-bind:class="{amactive: favorited(next.itID)}"
        ></div>

        <img v-bind:src="getImage(next.image)" />
      </div>
      <div class="card-body">
        <div class="sell-wrapper" v-if="(!next.sold) && (timeUntil(next.itEndDate) > 0)">
          <h5>Current Bid: {{next.itMinBid}}</h5>
          <h5>Value: {{next.itValue}}</h5>

          <div v-if="(!next.sold) && (timeUntil(next.itEndDate) > 0)">
            <button class="btn btn-primary">Bid Now!</button>
          </div>
        </div>
        <div class="cardtext" v-if="(next.sold)">Sold out!</div>
      </div>
      <div class="card-footer">
        <div class="cardtext" v-if="(timeUntil(next.itEndDate) <= 0)">Auction Over!</div>

        <countdown v-if="(timeUntil(next.itEndDate) > 0)" :time="timeUntil(next.itEndDate)">
          <div
            slot-scope="props"
            class="card-text"
          >Bidding closes in {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</div>
        </countdown>
      </div>
    </div>
    <div
      v-if="index + 2 <= cards.length-1"
      class="rounded-borders card card--three fixed fixed--center"
      style="z-index: 1"
      v-bind:style="containerStyle"
    >
      <div>
        <h3 id="name" class="card-title">{{nextNext.itName}}</h3>
        <div
          class="heart"
          v-bind:style="this.heartHeight"
          v-bind:class="{amactive: favorited(nextNext.itID)}"
        ></div>

        <img v-bind:src="getImage(nextNext.image)" />
      </div>
      <div class="card-body">
        <div class="sell-wrapper" v-if="(!nextNext.sold) && (timeUntil(nextNext.itEndDate) > 0)">
          <h5>Current Bid: {{nextNext.itMinBid}}</h5>
          <h5>Value: {{nextNext.itValue}}</h5>

          <div v-if="(!next.sold) && (timeUntil(next.itEndDate) > 0)">
            <button class="btn btn-primary">Bid Now!</button>
          </div>
        </div>
        <div class="cardtext" v-if="(nextNext.sold)">Sold out!</div>
        <div class="cardtext" v-if="(timeUntil(nextNext.itEndDate) <= 0)">Auction Over!</div>
      </div>
      <div class="card-footer">
        <div class="cardtext" v-if="(timeUntil(nextNext.itEndDate) <= 0)">Auction Over!</div>

        <countdown v-if="(timeUntil(nextNext.itEndDate) > 0)" :time="timeUntil(nextNext.itEndDate)">
          <div
            slot-scope="props"
            class="card-text"
          >Bidding closes in {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</div>
        </countdown>
      </div>
    </div>

    <!-- hidden -->
    <div class="rounded-borders card card--one" style="visibility: hidden" ref="targetCard">
      <div>
        <h3 id="name" class="card-title">Hidden Card</h3>

        <img v-bind:src="getImage(sample)" />
      </div>
      <div class="card-body">
        <div class="sell-wrapper">
          <h5>Current Bid: 0</h5>
          <h5>Value: 0</h5>

          <div>
            <button class="btn btn-primary">Bid Now!</button>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <countdown :time="1000">
          <div
            slot-scope="props"
            class="card-text"
          >Bidding closes in {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</div>
        </countdown>
      </div>
    </div>
    <!-- hidden -->

    <div class="footer">
      <div class="row">
        <div class="col d-flex justify-content-center">
          <button
            type="button"
            class="btn btn-foot"
            v-if="(this.index<this.cards.length-1)"
            v-on:click="skip"
          >Next item</button>
          <button class="btn btn-foot" v-on:click="back" v-if="(this.index>0)">Previous item</button>
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
import cloudinary from "cloudinary-core";

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
      index: 0,
      isVisible: true,
      interactEventBus: {
        draggedRight: EVENTS.MATCH,
        draggedLeft: EVENTS.REJECT,
        draggedUp: EVENTS.SKIP
      },
      cards: [],
      bid: 0,
      nextBid: 0,
      containerStyle: {},
      heartHeight: {},
      sample: "sample.jpg",
      windowWidth: window.innerWidth,
      isDesktop: window.innerWidth > 800
    };
  },
  mounted() {
    this.$store.dispatch("loadPosts", this.$route.params.TinyURL);
    this.getCards();
    this.initBid();
    this.getHeight();
    this.getRowHeight();
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
      if (this.index + 2 <= this.cards.length - 1) {
        return this.cards[this.index + 2];
      }
      return false;
    },
    ...mapState(["posts"])
  },

  methods: {
    favorited: function(id) {
      return this.$store.getters.findFavorite(id);
    },
    getRowHeight() {
      Vue.nextTick(() => {
        let target = this.$refs.nameRow.clientHeight;
        let factor = (2 * target) / 100;
        let string = "scale(" + factor + ")";
        Vue.set(this.heartHeight, "transform", string);
      });
    },
    timeUntil: function(end) {
      const now = new Date();
      const then = new Date(end);
      const difference = then - now + 5 * 60 * 60 * 1000;
      return difference;
    },
    getImage: function(image) {
      if (!this.isDesktop) {
        var cl = new cloudinary.Cloudinary({
          cloud_name: "kemp",
          secure: true
        });
        var int = Math.round(this.windowWidth * 0.5)
        var tag = cl.url(image, { width: int });
        return tag;
      }
      if (this.isDesktop) {
        var cl = new cloudinary.Cloudinary({
          cloud_name: "kemp",
          secure: true
        });
        var int = Math.round(this.windowWidth * 0.1)
        var tag = cl.url(image, { width: int });
        return tag;
        // console.log(tag);
      }
    },
    initBid() {
      if (this.current) {
        this.bid = this.current.itMinBid + this.current.itMinRaise;
      }
      if (this.cards[this.index + 1]) {
        this.nextBid =
          this.cards[this.index + 1].itMinBid + this.cards[this.index + 1].itMinRaise;
      }
    },
    getHeight() {
      Vue.nextTick(() => {
        let height = this.$refs.targetCard.clientHeight;
        height += "px";
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
        if (!this.$store.getters.findFavorite(this.current.itID)) {
          this.$store.dispatch("setFavorite", {
            n: this.current.itID
          });
        }
      }
      if (event == "reject") {
        this.$store.dispatch("removeFavorite", {
          n: this.cards[
            this.cards.findIndex(element => element.itID === this.current.itID)
          ].itID
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
      this.index = 0
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

  h5,
  .btn {
    font-size: 12px;
  }
  .heart {
    top: -8%;
    right: -2.5%;
  }
}
@media (min-height: 600px) {
  // #gap {
  //   background-color: blue;
  .heart {
    top: -6%;
    right: -2.5%;
  }

  // }
}
@media (min-height: 700px) {
  // #gap {
  //   background-color: purple;
  // }
  .heart {
    top: -6%;
    right: -2.5%;
  }
}
@media (min-height: 900px) {
  // #gap {
  //   background-color: black;
  // }
  .btn {
    font-size: 20px;
  }
  .card-title {
    font-size: 40px;
  }
  .bidrow {
    font-size: 1.5em;
  }
  .cardtext,
  h5 {
    font-size: 20px;
  }
  .heart {
    top: -1%;
    right: -2%;
  }
}
.btn-primary {
  background-color: #1f7a8c;
  border-color: #343a40;
  color: white;
  margin: 5px;
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
@media (max-width: 700px) {
  .card {
    width: calc(var(--vw, 1vw) * 80);
  }
}
@media (min-width: 700px) {
  .card {
    width: calc(var(--vw, 1vw) * 35);
  }
}
.card {
  border: black 0.5px solid;
  border-top-right-radius: 12px;
  background-color: #bfdbf7;
  background-clip: padding-box;
  border-top-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  color: black;
  img {
    padding: 2%;
    width: 100%;
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

h2,
.card-title {
  padding: 2.5% 0% 0% 0%;
  margin: 0px;
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

// TWITTER HEART
.heart {
  z-index: 5;
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
.sell-wrapper {
  margin-bottom: 8%;
}
</style>