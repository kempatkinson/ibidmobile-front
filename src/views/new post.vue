<template>
<div class="page" v-bind:style="backgroundStyle">
    <div class="row card topDetails">
        <p class="closed" v-show="(post.itStatus === 4)">CLOSED</p>
        <p class="idLabel">{{post.itCatalogNum}}</p>
        <br />
        <h3 id="name" ref="nameRow">{{post.itName}}</h3>
        <h3>Value: ${{post.itValue}}</h3>
        <h3 v-if="(post.CurrentBidder)" style="font-weight: bold">Bidder: {{post.CurrentBidder[0].guFirstName}} {{post.CurrentBidder[0].guLastName}} at ${{post.itMinBid}}</h3>

        <h3>Minimum Raise: ${{post.itMinRaise}}</h3>

        <div class="heart" v-bind:style="this.heartHeight" v-on:click="toggleFavorite(post.itID)" v-bind:class="{amactive: isActive}"></div>
    </div>
    <div>
        <router-link :to="{ name: 'Items', params: {TinyURL: backToEvent}}">
            <button type="button" class="btn btn-foot">Back to Event</button>
        </router-link>
    </div>
    <div class="Details">
        <img class="imgDetails" v-bind:src="getImage(sample)" />
        <p class="textDetails">{{post.itDescription}}</p>
        <p class="textDetails">Donated By: {{post.itDonor}}</p>

        <p class="textDetails">
            <countdown :time="timeUntil(post.itEndDate)">
                <div slot-scope="props">Bidding for this item closes in {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</div>
            </countdown>
        </p>
        <div class="row" id="bid-row">
            <div class="col d-flex justify-content-center">
                <div class="bidrow card-text">
                    <div class="row d-flex justify-content-center" id="postinfo">
                        <div class="col">
                            <p class="card-text">Value: {{post.itValue}}</p>
                            <p class="card-text">Current Bid: {{post.itMinBid}}</p>
                            <p class="card-text">Minmum raise: {{post.itMinRaise}}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col d-flex justify-content-center">
                            <form>
                                <a v-on:click.prevent="decrement">
                                    <svg class="bi bi-dash-circle" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd" />
                                        <path fill-rule="evenodd" d="M3.5 8a.5.5 0 01.5-.5h8a.5.5 0 010 1H4a.5.5 0 01-.5-.5z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                                <input id="bidinput" type="number" v-model="bid" />
                                <a v-on:click.prevent="increment">
                                    <svg class="bi bi-plus-circle" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd" />
                                        <path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd" />
                                        <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                            </form>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col d-flex justify-content-center">
                            <button id="submitButton" type="button" class="btn btn-primary" v-on:click.prevent="submit">Submit Bid</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col d-flex justify-content-center" v-if="(post.BuyItNowPrice > 0)">
                <button type="button" class="btn btn-primary" id="buyNow" v-on:click.prevent="buyNow">Buy Now for {{post.BuyItNowPrice}}</button>
            </div>
        </div>
    </div>

    <div id="bidHistory" class="row Details" v-if="post.BidHistory">
        <h3 id="historyLabel">Bid History</h3>

        <div class="table" id="bidTable">
            <thead>
                <th>Bidder</th>
                <th>Amount</th>
                <th>Timestamp</th>
            </thead>
            <tbody>
                <tr v-for="bidder in post.BidHistory" v-bind:key="bidder.BidTime">
                    <td v-if="(bidder.Bidder)">{{bidder.Bidder[0].guFirstName}} {{bidder.Bidder[0].guLastName}}</td>
                    <td v-if="!(bidder.Bidder)">Unlisted</td>
                    <td>{{bidder.BidAmount}}</td>
                    <td>{{returnDate(bidder.BidTime)}}</td>
                </tr>
            </tbody>
        </div>
    </div>
    <div class="footer">
        <div id="buttons">
            <div v-if="nextId">
                <router-link :to="{ name: 'post', params: {id: nextId}}">
                    <button type="button" class="btn btn-foot">Next item</button>
                </router-link>
            </div>
            <div v-if="prevId">
                <router-link :to="{ name: 'post', params: {id: prevId}}">
                    <button type="button" class="btn btn-foot">Previous item</button>
                </router-link>
            </div>
        </div>
    </div>
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
    beforeRouteUpdate(to, from, next) {
        this.$route.params.id = to.params.id;
        this.$store.dispatch("getItem", this.$route.params.id);
        this.post = this.$store.state.item;
        this.initFavorite(this.post.itID)

        this.index = this.$store.state.posts.findIndex(
            element => element.itID === this.$route.params.id
        );
        this.bid =
            this.post.itMinRaise +
            this.post.itMinBid;
        this.currUser = this.$store.state.user;
        // var cl = new cloudinary.Cloudinary({ cloud_name: "kemp", secure: true });
        // this.getImage(this.$store.getters.post(to.params.id).image);
        next({
            id: to.params.id
        });
    },
    name: "post",
    data() {
        return {

            cards: [],
            sample: "hello.jpg",
            isActive: false,
            heartHeight: {},
            image: "",
            windowWidth: window.innerWidth,
            isDesktop: window.innerWidth > 800,
            backgroundStyle: {},
            currEvent: {},
            currUser: {},
            post: {},
            bid: -1,
            index: -1,

        };
    },
    computed: {
        nextId() {
            if (this.cards[this.index + 1]) {
                return this.cards[this.index + 1].itID;
            } else return false;
        },
        prevId() {
            if (this.cards[this.index - 1]) {
                return this.cards[this.index - 1].itID;
            } else return false;
        },
        backToEvent() {
            var url = this.post.EventInfo[0].TinyID;
            return url;
        },
        ...mapState(["posts", "favorites", "user", "event", "item"])

    },
    mounted() {
        this.$store.dispatch("getItem", this.$route.params.id);
        this.post = this.$store.state.item
        this.initFavorite(this.post.itID)

        this.$store.dispatch("getFavorites", this.currUser.UserID);
        this.$store.dispatch("loadPosts", this.post.EventInfo[0].TinyID);
        this.$store.dispatch("getEvent", this.post.EventInfo[0].TinyID);
        this.currUser = this.$store.state.user;
        this.index = this.$store.state.posts.findIndex(
            element => element.itID === this.$route.params.id
        );
        this.bid = this.post.itMinBid + this.post.itMinRaise;
        this.currEvent = this.$store.state.event[0];

        this.getStyle();
        this.getCards();
        this.getRowHeight();
    },
    methods: {
        returnDate: function (datetime) {
            const format1 = "YYYY-MM-DD hh:mm a";
            return moment(datetime).format(format1);
        },
        getStyle: function () {
            Vue.set(
                this.backgroundStyle,
                "background-color",
                this.currEvent.EventSettings[0].eBackgroundColor
            );
            Vue.set(
                this.backgroundStyle,
                "color",
                this.currEvent.EventSettings[0].eFontColor
            );
        },
        buyNow() {
            var r = confirm("Are you sure you want to buy now?");

            if (r) {
                const url =
                    "https://-taiga-12401.herokuapp.com/api/biditems/" +
                    // "https://localhost:5001/api/BidItems/" +
                    this.post.itID;
                var newPost = this.post;
                newPost.sold = true;
                return axios
                    .put(url, newPost, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(response => {
                        console.log(response);
                        this.post = newPost;
                    })
                    .catch(error => {
                        alert(error);
                    });
            }
        },
        timeUntil: function (end) {
            const now = new Date();
            const then = new Date(end);
            const difference = then - now + 5 * 60 * 60 * 1000;
            return difference;
        },
        getImage: function (image) {
            if (this.isDesktop) {
                var cl = new cloudinary.Cloudinary({
                    cloud_name: "kemp",
                    secure: true
                });
                var tag = cl.url(image, {
                    height: 160,
                    width: 160,
                    crop: "fill"
                });
                return tag;
            } else if (!this.isDesktop) {
                var cl = new cloudinary.Cloudinary({
                    cloud_name: "kemp",
                    secure: true
                });
                var tag = cl.url(image, {
                    height: 100,
                    width: 100,
                    crop: "fill"
                });
                return tag;
            }
        },

        initFavorite: function (id) {
            if (this.$store.getters.findFavorite(id)) {
                this.isActive = true;
            } else this.isActive = false;
        },
        toggleFavorite: function (id) {

            this.$store.dispatch("loadPosts", this.$route.params.TinyURL);
            this.$store.dispatch("getFavorites", this.currUser.UserID);
            this.initFavorite(id)

            if (this.isActive === false) {
                //FAVORITE ITEM (POST)
                var favoritedItem = {
                    userID: this.$store.state.user.UserID,
                    itemID: id
                };
                $.ajax({
                    type: "POST",
                    async: true,
                    dataType: "json",
                    contentType: "application/json",
                    url: "https://localhost:5001/api/users/favorites",
                    data: JSON.stringify(favoritedItem),
                    success: function (data) {
                        console.log("added rows ↓");

                        console.log(data);
                    },
                    error: function (err) {
                        console.log(err.responseText);
                    }
                });
            } else if (this.isActive === true) {
                var favoritedItem = {
                    userID: this.$store.state.user.UserID,
                    itemID: id
                };
                $.ajax({
                    type: "DELETE",
                    async: true,
                    contentType: "application/json",
                    url: "https://localhost:5001/api/users/favorites",
                    data: JSON.stringify(favoritedItem),
                    success: function (data) {
                        console.log("deleted rows ↓");
                        console.log(data);
                    },
                    error: function (err) {
                        console.log(err.responseText);
                    }
                });
            }
            this.$store.dispatch("loadPosts", this.$route.params.TinyURL);
            this.$store.dispatch("getFavorites", this.currUser.UserID);
            this.initFavorite(id);

        },
        getRowHeight() {
            Vue.nextTick(() => {
                let target = this.$refs.nameRow.clientHeight;
                let factor = (2 * target) / 100;
                let string = "scale(" + factor + ")";
                Vue.set(this.heartHeight, "transform", string);
                Vue.set(this.heartHeight, "right", "-20px");

                Vue.set(this.heartHeight, "top", "40px");
                // const left = this.$refs.nameRow.getBoundingClientRect().left + "px";
                // const top = this.$refs.nameRow.getBoundingClientRect().top + "px";
                // Vue.set(this.heartHeight, "right", left);
                // Vue.set(this.heartHeight, "top", top);
            });
        },
        initBid() {
            this.bid = this.post.itMinBid + this.post.itMinRaise;
        },
        getCards() {
            this.cards = this.$store.state.posts;
            this.index = this.$store.state.posts.findIndex(
                x => x.itID === this.$route.params.id
            );
        },
        increment() {
            this.bid = parseInt($("#bidinput").val()) + this.post.itMinRaise;
        },
        decrement() {
            if (
                parseInt($("#bidinput").val()) - this.post.itMinRaise >=
                this.post.itMinBid + this.post.itMinRaise
            ) {
                this.bid = parseInt($("#bidinput").val()) - this.post.itMinRaise;
            } else alert("cant do that");
        },
        async submit() {
            this.bid = parseInt($("#bidinput").val());
            if (
                parseInt($("#bidinput").val()) >=
                this.post.itMinBid + this.post.itMinRaise
            ) {
                alert("all good");
                var newPost = this.post;
                newPost.itMinBid = this.bid;
                const url =
                    //"https://afternoon-taiga-12401.herokuapp.com/api/biditems/" +
                    "https://localhost:5001/api/BidItems/" + this.post.id;
                return axios
                    .put(url, newPost, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(response => {
                        this.post.itMinBid = this.bid;
                        this.initBid();
                    })
                    .catch(error => {
                        alert(error);
                    });
            } else {
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
    #description {
        font-size: 12px;
    }

    .page {
        padding-top: 80px;
        padding-left: 0px;
    }

    .btn {
        font-size: 10px;
        height: 30px;
    }

    #name {
        font-size: 1.5em;
    }

    #date-text {
        font-size: 1em;
    }

    #bid-row {
        font-size: 12px;
    }

    .h5 {
        font-size: 0.5em;
    }

    #bidinput {
        height: 60%;
    }

    .heart {
        top: 0%;
        right: 0%;
    }
}

@media (min-height: 600px) {

    // #gap {
    //   background-color: blue;
    // }
    #name {
        font-size: 24px;
    }

    .page {
        padding-top: 80px;
        padding-left: 0px;
    }

    #description {
        font-size: 14px;
    }

    .card-text {
        font-size: 14px;
    }

    .btn {
        font-size: 14px;
    }

    .heart {
        top: 9%;
        right: 0%;
    }
}

@media (min-height: 700px) {
    // #gap {
    //   background-color: purple;
    // }

    .page {
        padding-top: 100px;
        padding-left: 0px;
    }

    .fixed {
        position: absolute;

        &--center {
            left: calc(var(--vw, 1vw) * 50);
            top: calc(var(--vh, 1vh) * 47.5);
            transform: translate(-50%, -50%);
        }
    }

    .heart {
        top: 0%;
        right: 0%;
    }
}

@media (min-height: 900px) {

    // #gap {
    //   background-color: black;
    // }
    .btn {
        font-size: 30px;
    }

    .page {
        padding-top: 160px;
        padding-left: 0px;
        width: 100%;
    }

    .img {
        margin: auto;
    }

    #description {
        font-size: 24px;
    }

    .card-text {
        font-size: 24px;
    }

    .btn {
        font-size: 20px;
    }

    #name {
        font-size: 36px;
    }

    .heart {
        top: -5%;
        right: 0%;
    }
}

.page {
    padding-bottom: 100px;
}

#name {
    font-weight: bold;
    position: relative;
    width: 100%;
    align-content: center;
    padding: 0em;
    margin: 0;
}

#historyLabel {
    font-weight: bold;
    margin: 0 auto;
    padding-bottom: 10px;
}

.imgDetails {
    width: 160px;
    height: auto;
    float: right;
    margin: 10px;
}

.textDetails {
    float: none;
    text-align: left;
    font-size: 12px;
}

.Details {
    width: 90%;
    max-width: 700px;
    min-width: 300px;
    padding: 10px;
    background: #eee;
    color: #333;
    margin: 10px auto;
    -webkit-border-radius: 5px;
    border-radius: 5px;
}

.topDetails {
    max-width: 700px;
    min-width: 300px;
    width: 90%;
    padding: 10px;
    background: #eee;
    color: #333;
    margin: 10px auto;
    position: relative;
    text-align: left;
    border-radius: 5px;
}

.image-row {
    margin: 0 auto;
    width: 40%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
}

.svg {
    padding: 10px;
}

.idLabel {
    font-size: 14px !important;
    top: 0px;
    left: 0px;
    padding: 2px;
    position: absolute;
    border-top-left-radius: 3px;
    border-bottom-right-radius: 3px;
    background: #fefefe;
    /* box-shadow: inset 0px 24px 20px -15px rgba(255, 255, 255, 0.1), inset 0px 0px 10px rgba(0,0,0,0.4), 0px 0px 30px rgba(255,255,255,0.4); */
    margin-bottom: 10px;
    color: #000;
}

.closed {
    top: 0px;
    font-size: 14px !important;
    background: #aa0000;
    padding: 1px 5px;
    position: absolute;
    font-family: Arial, sans-serif;
    height: auto;
    width: auto;
    color: #fff;
    text-decoration: none;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 4px;
    font-weight: bold;
    right: 0;
}

.flex {
    display: flex;

    &--center {
        align-items: center;
        justify-content: center;
    }
}

#page {
    background-color: blue($color: #000000);
}

.rounded-borders {
    border-radius: 12px;
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

#buyNow {
    margin: auto;
}

#bidHistory {
    margin: auto;
    padding-bottom: 100px;
    width: 90%;
    max-width: 700px;
    min-width: 300px;
    align-content: center;
}

#bidTable {
    margin-left: auto;
    display: inline-table;
}

#bid-row {
    margin: 0 auto;
    width: 100%;
    padding-top: 5%;
    padding-bottom: 10%;
}

#submitButton {
    margin: auto;
    margin-top: 10px;
}

#bidinput {
    width: 40%;
    margin-left: calc(var(--vw, 1vw) * 5);
    margin-right: calc(var(--vw, 1vw) * 5);
}

#description {
    text-align: left;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
}

.card-text {
    margin: auto;
}

.h2 {
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
    border-color: #343a40;
    background-color: #bfdbf7;
    color: black;
    margin: 10px;
}

.btn-primary,
.btn-primary:hover {
    background-color: #1f7a8c;
    margin-top: 5%;
    border-color: #343a40;
    color: white;
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
    bottom: 0;
    width: 100%;
    background-color: lightgrey;
    border: grey 0.5px solid;
}

#buttons {
    text-align: center;
    display: flex;
    justify-content: center;
    margin: 0 auto;
}

#date-text {
    width: 100%;
    color: red;
}

#HideName {
    opacity: 0;
}

// TWITTER HEART
.heart {
    position: absolute;
    width: 100px;
    height: 100px;
    background: url("https://cssanimation.rocks/images/posts/steps/heart.png") no-repeat;
    background-position: 0 0;
    cursor: pointer;
    transition: background-position 1s steps(28);
    transition-duration: 0s;

    &.amactive {
        transition-duration: 1s;
        background-position: -2800px 0;
    }
}

// BASIC
body {
    background: linear-gradient(135deg, #121721 0%, #000000 100%) fixed;
    color: #fff;
    font: 300 16px/1.5 "Open Sans", sans-serif;
}

#bid-row {
    margin-top: 5%;
}
</style>
