<template>
<div class="myprofile" v-bind:style="this.backgroundStyle">
    <div class="DetailContent">
        <br />
        <table width="100%">
            <tbody>
                <tr>
                    <td>Bidder:</td>
                    <td>{{this.user.FirstName}} {{this.user.LastName}}</td>
                </tr>
                <tr>
                    <td>Bidder #:</td>
                    <td v-if="!this.user.BidderNumber"> N/A</td>
                </tr>
                <tr>
                    <td>Table #:</td>
                    <td v-if="!this.user.Table"> N/A</td>

                </tr>
                <tr>
                    <td>Card #:</td>
                    <td v-if="!this.user.Card"> N/A</td>
                </tr>
            </tbody>
        </table>
        <br />

    </div>
    <br />
    <router-link :to="{ name: 'Items', params: {TinyURL: backToEvent}}">
        <button type="button" class="btn btn-primary">Back to Event</button>
    </router-link>
</div>
</template>

<script>
import axios from "axios";
import {
    mapState
} from "vuex";
import Vue from "vue";
import cloudinary from "cloudinary-core";
import moment from "moment";

export default {
    name: "profile",
    data() {
        return {
            user: this.$store.state.user,
            backgroundStyle: {},
            event: this.$store.state.event[0]

        };
    },
    computed: {
        ...mapState(["event"])

    },
    mounted() {
        Vue.set(
            this.backgroundStyle,
            "background-color",
            this.event.EventSettings[0].eBackgroundColor
        );
        Vue.set(
            this.backgroundStyle,
            "color",
            this.event.EventSettings[0].eFontColor
        );

    },
    methods: {

    }
};
</script>

<style lang="scss" scoped>
.DetailContent {
    margin: 0 auto;
    width: 90%;
    max-width: 700px;
    min-width: 300px;
    padding: 10px;
    background: #eee;
    color: #333;
    -webkit-border-radius: 5px;
    border-radius: 5px;
}

.myprofile {
    padding-top: 130px;
    padding-bottom: 100%;
}

table {
    text-align: left;
    border-spacing: 2px;

}

body,
* {
    font-family: 'Verdana', 'Calibri', 'Trebuchet MS', 'Helvetica Neue', 'Arial', sans-serif !important;
    font-size: 24px;

}
</style>
