<template>
  <div id="favorites" class="container">
    <div class="row" v-for="data in favs" :key="data.id">
      <div class="col d-flex justify-content-center">
        <router-link :to="{ name: 'post', params: {id: data.id}}">
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
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      favs: []
    }
  },
  mounted() {
    this.$store.dispatch("loadPosts");
    this.getFavs()
  },
  methods: {

    getFavs(){
      for (let i=0;i<this.$store.state.favorites.length;i++) {
        this.favs.push(this.$store.state.posts[this.$store.state.favorites[i].n])
      };
    }

  },
  computed: {
    ...mapState(["posts"])
  }
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
.container {
  position: absolute;
  top: 100px;
}
</style>