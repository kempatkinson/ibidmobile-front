<template>
<div id="welcome">
    <h1>Events Page</h1>

    <!--  <table class="table">
      <thead>
        <tr>
          <th>Name of Event</th>
          <th>End Date</th>
        </tr>
      </thead>

   <tr v-for="event in events" v-bind:key="event.EventID">
        <th>
          <router-link :to="{ name: 'Items', params: {TinyURL: event.TinyID}}">{{event.Name}}</router-link>
        </th>
        <th>{{event.EndDate}}</th>
      </tr>
    </table>-->
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "welcome",
    data() {
        return {
            events: []
        };
    },
    mounted() {
        // this.getEvents();
    },
    methods: {
        // // async getEvents() {
        // //   const url = "https://localhost:5001/api/events/";
        // //   await axios
        // //     .get(url)
        // //     .then(response => (this.currEvents = response.data))
        // //     .catch(error => {
        // //       console.log(error);
        // //     });

        // //   for (var i = 0; i < this.currEvents.length; i++) {
        // //     var posts = [];
        // //     let url = "https://localhost:5001/api/events/" + this.currEvents[i].TinyID;
        // //     console.log(url);
        // //     axios
        // //       .get(url)
        // //       // "https://afternoon-taiga-12401.herokuapp.com/api/biditems"
        // //       .then(response => (
        // //         posts = response.data),
        // //         console.log(response.data))

        // //       .catch(error => {
        // //         console.log("Hello");
        // //       });

        // //     // if ((posts.length = 0)) {
        // //     //   this.currEvents.splice(i, 1);
        // //     // }
        // //   }
        // }
    }
};
</script>

<style scoped>
#welcome {
    position: absolute;
    top: 100px;
    margin-left: 10%;
    margin-right: 10%;
}
</style>
