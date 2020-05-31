<template>
  <div id="list" class="container">
    <select v-model="selected">
      <option v-for="option in options" v-bind:key="option.value">{{ option.text }}</option>
    </select>
    <span v-if="selected">Selected: {{ selected }}</span>

    <div class="row" v-for="data in filteredPosts" :key="data.id">
      <div class="col-1"></div>
      <div class="card col-10">
        <div class="card-header">
          <router-link :to="{ name: 'stack', params: {id: data.id}}">
            <h3 class="card-title">{{data.name}}</h3>
          </router-link>
        </div>
        <div class="card-body row" v-on:click="select($event)" :id="data.id">
          <div class="col-6">
            <img class="card-image" src="../assets/sample.jpg" />
          </div>
          <div class="col-6">
            <p v-if="data.sold" class="card-text">Sold Out!</p>
            <div v-if="!data.sold">
              <p v-if="data.live" class="card-text">Live!</p>
              <p class="card-text">Current Bid : {{data.price}}</p>
              <p class="card-text">Value : {{data.value}}</p>
              <router-link :to="{ name: 'stack', params: {id: data.id}}">
                <button class="btn btn-primary">Bid Now!</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>

<script>
// Make a request for a user with a given ID
import { mapState } from "vuex";
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

      ]
    };
  },
  mounted() {
    this.$store.dispatch("loadPosts");
  },
  computed: {
    filteredPosts() {
      if (this.selected === "Live Items") {
        return this.$store.state.posts.filter(post => post.live === true);
      } if (this.selected === "Unsold Items") {
        return this.$store.state.posts.filter(post => post.sold === false);
      } if (this.selected ===  "Items with no bids") {
        return this.$store.state.posts.filter(
          post => post.price === post.startingPrice);
      } else return this.$store.state.posts;
    },
    ...mapState(["posts"])
  }
};
</script>

<style scoped>
.card-header {
  width: 100%;
  margin: 0;
}
.card-title {
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
}
img {
  object-fit: cover;
  width: 100%;
}

button {
  width: 90%;
}

.btn-primary {
  background-color: #1f7a8c;
  border-color: #343a40;
  color: white;
  margin: 5px;
}

@media (min-height: 900px) {
  .btn {
    font-size: 25px;
  }
  .card-title {
    font-size: 40px;
  }
  .h5,
  .card-body {
    font-size: 2em !important;
  }
  .card {
    width: calc(var(--vh, 1vh) * 40);
  }
}
</style>