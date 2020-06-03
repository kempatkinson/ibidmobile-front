<template>
  <div id="list" class="container">
    <div class="selection" id="gap">
      <select v-model="selected" id="dropdown">
        <option v-for="option in options" v-bind:key="option.value">{{ option.text }}</option>
      </select>
      <br />
      <span v-if="selected">Selected: {{ selected }}</span>
    </div>

    <div class="row" v-for="data in filteredPosts" :key="data.id">
      <div class="col-1"></div>
      <div class="card col-10">
        <div class="card-header">
          <router-link :to="{ name: 'post', params: {id: data.id}}">
            <h3 class="card-title">{{data.name}}</h3>
          </router-link>
        </div>
        <div class="card-body row" v-on:click="select($event)" :id="data.id">
          <div class="col-4">
            <img class="card-image" src="../assets/sample.jpg" />
          </div>
          <div class="col-8">
            <p v-if="data.sold" class="card-text">Sold Out!</p>
            <div
              v-if="(!data.sold) && (times[times.findIndex((element)=> element.id === data.id)].date>0)"
            >
              <p
                v-if="(times[times.findIndex((element)=> element.id === data.id)].date > 0)"
                class="card-text"
              >Live!</p>
              <p class="card-text">Current Bid : {{data.price}}</p>
              <p class="card-text">Value : {{data.value}}</p>
              <router-link :to="{ name: 'post', params: {id: data.id}}">
                <button class="btn btn-primary">Bid Now!</button>
              </router-link>
            </div>
          </div>

          <div
            class="card-footer"
            v-if="(times[times.findIndex((element)=> element.id === data.id)].date > 0)"
          >
            <countdown :time="times[times.findIndex((element)=> element.id === data.id)].date">
              <div
                slot-scope="props"
                class="date-text"
              >Bidding closes inf {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</div>
            </countdown>
          </div>
          <div
            class="card-footer"
            v-if="(times[times.findIndex((element)=> element.id === data.id)].date <= 0)"
          >Auction Over!</div>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>

<script>
// Make a request for a user with a given ID
import datetime from "datetime";
import { mapState } from "vuex";
import Vue from "vue";
import VueCountdown from "@chenfengyuan/vue-countdown";

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
      times: []
    };
  },
  mounted() {
    this.$store.dispatch("loadPosts");
    this.timesUntil();
  },

  computed: {
    filteredPosts() {
      if (this.selected === "Live Items") {
        return this.$store.state.posts.filter(
          post =>
            this.times[this.times.findIndex(element => element.id === post.id)]
              .date >
              0 ===
            true
        );
      }
      if (this.selected === "Unsold Items") {
        return this.$store.state.posts.filter(
          post =>
            post.sold === false &&
            this.times[this.times.findIndex(element => element.id === post.id)]
              .date >
              0 ===
              true
        );
      }
      if (this.selected === "Items with no bids") {
        return this.$store.state.posts.filter(
          post =>
            post.price === post.startingPrice &&
            this.times[this.times.findIndex(element => element.id === post.id)]
              .date > 0
        );
      } else return this.$store.state.posts;
    },

    ...mapState(["posts"])
  },
  methods: {
    timesUntil() {
      for (const i in this.$store.state.posts) {
        const now = new Date();
        const then = new Date(this.$store.state.posts[i].end);
        const difference = then - now + 5 * 60 * 60 * 1000;
        console.log(difference);

        this.times.push({
          id: this.$store.state.posts[i].id,
          date: difference
        });
      }
    }
  }
};
</script>

<style scoped>
@media (max-height: 600px) {
  #gap {
    background-color: red;
  }
}

@media (min-height: 600px) {
  #gap {
    background-color: blue;
  }
  .card-text {
    font-size: 14px;
  }
  .date-text {
    font-size: 12px;
  }

  .card-header {
    padding: 2.5%;
  }
  .card-image {
    width: 100%;
    position: absolute;
    top: 20%;
    left: 20%;
  }
  .card-header {
    width: 100%;
    margin-bottom: 5%;
  }
}
@media (min-height: 700px) {
  #gap {
    background-color: purple;
  }
}
@media (min-height: 900px) {
  .btn {
    font-size: 25px;
  }
  .card-title {
    font-size: 40px;
  }
  #card-body {
    font-size: 2em;
  }
  .card {
    width: calc(var(--vh, 1vh) * 40);
  }
}
.card-body {
  width: 100%;
  margin: 0;
  padding: 0;
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
  font-size: 20px;
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
  object-fit: cover;
  width: 100%;
  display: block;
  margin: auto;
}

button {
  width: 60%;
}

.btn-primary {
  background-color: #1f7a8c;
  border-color: #343a40;
  color: white;
  margin: 5px;
}

.selection {
  margin-bottom: 10%;
}

#dropdown {
  margin-bottom: 5%;
}

.container {
  position: absolute;
  top: 100px;
}
</style>