<template>
  <div id="list" class="container">
    <div class="row" v-for="data in posts" :key="data.id">
      <div class="col d-flex justify-content-center">
        <router-link :to="{ name: 'stack', params: {id: data.id}}">
          <div class="card" style="width: 18rem;" v-on:click="select($event)" :id="data.id">
            <br />
            <h3 class="card-title">{{data.name}}</h3>

            <img class="card-image-top" src="../assets/sample.jpg" />
            <div class="card-body">
              <p class="card-text">Current Bid : {{data.price}}</p>

              <button class="btn btn-primary">Bid Now!</button>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// Make a request for a user with a given ID
import { mapState } from "vuex";
export default {
  name: "Home",
  mounted() {
    this.$store.dispatch("loadPosts");
  },
  computed: mapState(["posts"])
};
</script>

<style scoped>
.card {
  margin-bottom: 10%;
  border: black 0.5px solid;
  align-content: center;
  background-color: #bfdbf7;
}
h3,
p {
  color: black;
}
img {
  margin: 5%;
}
p {
  margin-bottom: 5%;
}

button {
  width: 40%;
}

.btn-primary {
  background-color: #1f7a8c;
  border-color: #343a40;
  color: white;
  margin: 5px;
  
}
</style>