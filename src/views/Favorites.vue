<template>
<div id="favorites" v-bind:style="this.backgroundStyle">
    <div class="b-container" v-if="this.deck.length === 0 && isLoggedIn && loaded" id="warning">
        <h1> Go back to the event to favorite some items! </h1>
        <div>
            <router-link :to="{ name: 'Items', params: {TinyURL: backToEvent}}">
                <button class="btn btn-primary back-btn">Back to Event</button>
            </router-link>
        </div>
    </div>
    <div class="b-container" v-if="!isLoggedIn && loaded" id="warning">
        <h1> Log in and go back to the event to favorite some items! </h1>

        <div>
            <router-link :to="{ name: 'Items', params: {TinyURL: backToEvent}}">
                <button class="btn btn-primary back-btn">Back to Event</button>
            </router-link>
        </div>

    </div>

    <div class="b-container">
        <b-row id="filter">
            <b-col>
                <b-input type="text" name="search" id="searchInput" v-model="term" placeholder="Search" />
            </b-col>
        </b-row>

        <div>

            <b-container :key="reRender" v-if="this.deck.length > 0">
                <b-row>
                    <b-col>
                        <router-link :to="{ name: 'Items', params: {TinyURL: backToEvent}}">
                            <button class="btn btn-primary back-btn">Back to Event</button>
                        </router-link>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b-row class="cardData allData" v-for="(chunk,index) in chunks(activeCards)" :data-count="(chunk.length)" :key="index">
                            <div class="single" v-for="data in chunk" :key="data.itID">
                                <div class="card" v-bind:style="containerStyle">
                                    <p class="closedTag" v-if="(data.itStatus === 4)">CLOSED</p>
                                    <p class="idDesktop">{{data.itCatalogNum}}</p>

                                    <div>
                                        <b-row :id="data.itID">
                                            <b-col>
                                                <div class="imgContainer" v-on:click="toggler(data.itID)">
                                                    <img class="imgDesktop" v-if="(getImage(data.itImageURL))" v-bind:src="getImage(data.itImageURL)" />
                                                </div>

                                                <div class="card-title" style="position: relative">
                                                    <router-link :to="{ name: 'post', params: {id: data.itID}}">
                                                        <h3 class="name" ref="desktopItems">{{data.itName.toUpperCase()}}</h3>
                                                    </router-link>
                                                    <div class="heartPos"></div>

                                                </div>
                                                <div style=" position: relative;">
                                                    <div class="heart" v-on:click="toggleFavorite(data.itID)" v-bind:key=" 'heart: ' + data.itID" v-bind:style="heartHeightDesktop" v-bind:class="{amactive: activeKeys[activeKeys.findIndex((element) => element.id === data.itID)].active}"></div>
                                                </div>
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col>
                                                <div v-if="!(data.itStatus === 4)" id="priceCol">
                                                    <label for="price" class="date-text">Current Bid:</label>
                                                    <span id="price" class="date-text">${{data.itMinBid}}</span>
                                                </div>
                                                <div v-if="(data.itStatus === 4)">
                                                    <label for="price" class="date-text">Sold:</label>
                                                    <span id="price" class="date-text">${{data.itMinBid}}</span>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </div>
                            </div>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </div>

        <div class="row">
            <div class="col-9"></div>
            <div class="col-3">
                <b-sidebar :id="'sidebar-' + data.itID" right v-for="data in this.deck" :key="'sidebarKey' + data.itID">
                    <b-container>
                        <b-row id="gap">
                            <b-col class="justify-content-center">
                                <p class="closedSidebar" v-if="(data.itStatus === 4)">CLOSED</p>
                                <p class="idDesktopSidebar">{{data.itCatalogNum}}</p>
                                <h3 class="name" id="nameSidebar" ref="sidebarName">{{data.itName.toUpperCase()}}</h3>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col class="d-flex justify-content-center">
                                <img class="imgDesktop" v-if="(getImage(data.itImageURL))" v-bind:src="getImage(data.itImageURL)" />
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col class="d-flex justify-content-center">
                                <div>
                                    <p class="bar-text">Donated By: {{data.itDonor}}</p>

                                    <p class="bar-text">{{data.itDescription}}</p>
                                    <p class="bar-text">Value: {{data.itValue}}</p>
                                    <p v-if="!(data.itStatus === 4)" class="bar-text">Current Bid : {{data.itMinBid}}</p>

                                    <p v-if="(data.itStatus === 4)" class="bar-text">Sold for : {{data.itMinBid}}</p>
                                    <p class="bar-text">Minmum raise: {{data.itMinRaise}}</p>
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="justify-content-center">
                            <router-link :to="{ name: 'post', params: {id: data.itID}}">
                                <button class="btn btn-primary bar-button" id="bidButton">Bid Now!</button>
                            </router-link>
                        </b-row>
                        <b-row>
                            <b-col class="justify-content-center">
                                <div class="bar-text" v-if="(timeUntil(data.itEndDate) <= 0)">Auction Over!</div>

                                <countdown :time="timeUntil(data.itEndDate)">
                                    <div slot-scope="props" class="bar-text">Bidding closes in {{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes!</div>
                                </countdown>
                                <div style="position: relative; width: 0; height: 0">
                                    <div class="heart sidebarHeart" v-on:click="toggleFavorite(data.itID)" v-bind:key=" 'heart: ' + data.itID" v-bind:style="heartHeightDesktopSidebar" v-bind:class="{amactive: activeKeys[activeKeys.findIndex((element) => element.id === data.itID)].active}"></div>
                                </div>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-sidebar>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// Make a request for a user with a given ID
import datetime from "datetime";
import {
    mapState
} from "vuex";
import Vue from "vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import lodash from "lodash";
import jquery from "jquery";
import moment from "moment";

Vue.component(VueCountdown.name, VueCountdown);
export default {

    name: "favorites",
    data() {
        return {
            selected: "",
            times: [],
            heartHeightDesktop: {},
            heartHeightDesktopSidebar: {},
            cardWidth: 274,
            deck: [],
            containerStyle: {},
            sidebar: {},
            categoryStyle: {},
            backgroundStyle: {},
            searchBarBool: false,
            windowWidth: window.innerWidth,
            id: "",
            url: "",
            term: "",
            currEvent: {},
            currUser: {},
            currFavorites: [],
            reRender: 0,
            isLoggedIn: this.$store.state.user.UserID !== undefined,
            loaded: false,

        };
    },
    mounted() {

        this.currEvent = this.$store.state.event[0];
        this.currUser = this.$store.state.user;

        this.$store.dispatch("getFavorites", this.currUser.UserID).then((res) => {
            this.currFavorites = this.$store.state.favorites;

            this.deck = this.currFavorites.map(i => i.I[0])
            this.deck = this.deck.filter(e => (e.EventID == this.currEvent.EventInfo[0].EventID));
            this.$nextTick(() => {
                this.windowWidth = window.innerWidth;
                this.getRowHeight();
                this.loaded = true;
            })

        });
        this.getStyle();

        this.sidebar = {
            status: false,
            current: ""
        };

        //listeners
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
            this.getRowHeight();
        });

        this.$nextTick(() => {
            $(".close").on("click", evt => {
                {
                    let sidebar = $(evt.target)
                        .parent()
                        .parent()
                        .parent()
                        .attr("id");
                    let id = sidebar.substr(8, sidebar.length - 1);
                    $("#sidebar-" + id).css("display", "none");
                    this.sidebar = {
                        status: false,
                        current: ""
                    };
                }
            });
        });
    },

    computed: {
        backToEvent() {
            this.currEvent = this.$store.state.event[0];

            var url = this.currEvent.EventInfo[0].TinyID;
            return url;
        },
        categoryColor() {
            return this.currEvent.EventSettings[0].eCategoryColor;
        },
        isDesktop() {
            return this.windowWidth > 800;
        },
        searchBar() {
            if (this.term.length > 0) {
                return true;
            } else return false;
            this.getRowHeight();
        },
        activeCards() {

            var found = [];
            var reg = new RegExp(this.term, "gi");
            for (let i = 0; i < this.deck.length; i++) {
                var description = false;

                if (this.deck[i].itDescription) {
                    description = true;
                }
                if (description) {
                    if (
                        this.deck[i].itName.match(reg) ||
                        this.deck[i].itDescription.match(reg)
                    ) {
                        found.push(this.deck[i]);
                    }
                } else if (!description) {
                    if (this.deck[i].itName.match(reg)) {
                        found.push(this.deck[i]);
                    }
                }
            }
            return found;
        },
        activeKeys() {
            var array = [];

            for (let i = 0; i < this.$store.state.posts.length; i++) {
                array.push({
                    id: this.$store.state.posts[i].itID,
                    active: this.$store.getters.findFavorite(
                        this.$store.state.posts[i].itID
                    )
                });
            }
            return array;
        },

        ...mapState(["posts", "favorites", "user", "event"])
    },
    methods: {
        returnDate: function (datetime) {
            const format1 = "LLLL";
            return moment(datetime).format(format1);
        },
        getStyle: function () {
            Vue.set(
                this.categoryStyle,
                "background-color",
                this.currEvent.EventSettings[0].eCategoryColor
            );
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
        scrollPage: function () {
            this.scrollTo("#" + this.selected);
        },

        myEventHandler(e) {
            this.windowWidth = e.srcElement.window.innerWidth;
            this.isDesktop;
            //  this.getRowHeight();
        },
        chunks: function (array) {

            if (this.isDesktop) {
                return _.chunk(
                    Object.values(array),
                    Math.floor(this.windowWidth / this.cardWidth) - 1
                );

            }
            if (!this.isDesktop) {
                return _.chunk(Object.values(array), 2);
            }
        },

        toggler: function (id) {
            // sidebar is on
            // on and id matches
            if (this.isDesktop) {
                if (this.sidebar.status === true && this.sidebar.current === id) {
                    this.sidebar.status = false;
                    this.sidebar.current = "";
                    $("#sidebar-" + id).css("display", "none");
                }
                //on but id does not match
                else if (this.sidebar.status === true && this.sidebar.current !== id) {
                    $("#sidebar-" + this.sidebar.current).css("display", "none");
                    this.sidebar.status = true;
                    this.sidebar.current = id;
                    $("#sidebar-" + id).removeAttr("style");
                }
                //side bar is off
                else if (this.sidebar.status === false) {
                    $("#sidebar-" + id).removeAttr("style");
                    this.sidebar.current = id;
                    this.sidebar.status = true;
                }
            }
        },

        getRowHeight() {
            this.reRender++
            if (this.deck.length > 0) {

                let target = this.$refs.desktopItems[0].clientHeight;
                let factor = target / 100;
                let string = "scale(" + 1 * factor + ")";
                Vue.set(this.heartHeightDesktop, "transform", string);

                var parentOffset = $(".heartPos").parent().offset()
                var offset = $(".heartPos").offset()

                Vue.set(this.heartHeightDesktop, "top", parentOffset.top - offset.top + 'px')

                if (this.isDesktop) {
                    // sidebar heart sizing
                    let target2 = this.$refs.sidebarName[0].clientHeight;
                    let factor2 = target / 100;
                    let string2 = "scale(" + 1 * factor + ")";

                    Vue.set(this.heartHeightDesktopSidebar, "transform", string2);
                    Vue.set(this.heartHeightDesktopSidebar, "top", parentOffset.top + 'px')

                    //  Vue.set(this.heartHeightDesktopSidebar, "left", +"px");
                    //  Vue.set(this.heartHeightDesktopSidebar, "bottom", $("#bidButton").offset().bottom - $("#bidButton").offset().bottom + "px");
                }

            }
        },
        getImage: function (image) {

            if (image == undefined) {

                return false
            } else return image;

        },
        toggleFavorite: function (id) {
            this.$store.dispatch("getFavorites", this.currUser.UserID);
            this.currFavorites = this.$store.state.favorites;
            var index = this.activeKeys.findIndex(element => element.id === id);

            // if (this.activeKeys[index].active === true) {
            //     var favoritedItem = {
            //         userID: this.$store.state.user.UserID,
            //         itemID: id
            //     };
            //     //   console.log(favoritedItem)
            //     $.ajax({
            //         type: "DELETE",
            //         async: true,
            //         contentType: "application/json",
            //         url: "https://localhost:5001/api/users/favorites",
            //         data: JSON.stringify(favoritedItem),
            //         success: function (data) {
            //             // console.log("deleted rows ↓");
            //             // console.log(data);
            //         },
            //         error: function (err) {
            //             console.log(err.responseText);
            //         }
            //     });
            // }
            this.$store.dispatch("removeFavorite", id)
            this.$store.dispatch("getFavorites", this.currUser.UserID).then((res) => {
                this.currFavorites = this.$store.state.favorites;
                this.deck = this.currFavorites.map(i => i.I[0])
                this.deck = this.deck.filter(e => (e.EventID == this.currEvent.EventInfo[0].EventID));
            })

        },

        timeUntil: function (end) {
            if (end) {
                const now = new Date();
                const then = new Date(end);
                const difference = then - now + 5 * 60 * 60 * 1000;
                return difference;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@media (max-width: 400px) {
    #gap {
        background-color: none;
    }

    .single {
        width: 146px;
    }

}

@media (min-width: 400px) {
    #gap {
        background-color: none;
    }

    .single {
        width: 190px;
    }

}

@media (min-width: 600px) {
    #gap {
        background-color: none;
    }

    .single {
        width: 280px;
    }

}

#warning {
    height: 60vh;
}

#favorites {
    padding-top: 130px;
}

#element {
    position: absolute;
    bottom: 200px;
}

h1 {
    margin-bottom: 0%;
}

#toggler {
    margin-bottom: 10px;
}

// DROPDOWN/ SEARCH BAR
.selection {
    padding: 5px 0px;
    font-size: 14px;
    color: black;
}

.date-text {
    font-size: 80%;
    color: black;
}

#descriptionCountdown {
    text-align: center;
    color: white !important;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 14px;
    line-height: 1.428571429;
}

#dropdown {
    font-size: 1em;
    background-color: #fff;
    /* background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAGCAYAAADOic7aAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTZBOTk1RjMxRjZCMTFFMUFDRjA5NUJCNzg2QTA1OEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTZBOTk1RjQxRjZCMTFFMUFDRjA5NUJCNzg2QTA1OEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNkE5OTVGMTFGNkIxMUUxQUNGMDk1QkI3ODZBMDU4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxNkE5OTVGMjFGNkIxMUUxQUNGMDk1QkI3ODZBMDU4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtOZMNcAAABeSURBVHjaYmBgYJgGxP8J4JkMIMb//zgxCDAD8XY8hhwAYjZiDAIBfiC+hMWQh0AsClNEjEEgIA3ET5AM+QbEusgKiDWIAarxM9SgEHRJUgwCAT8grsMmgc8ggAADAGY/m1aWUowGAAAAAElFTkSuQmCC) no-repeat 95% 50%; */
    box-sizing: border-box;
    border: 1px solid darkGrey;
    padding: 0.25em 0.6em;
    height: 2.2em;
    width: 90%;
    border-radius: 5px;
    margin: 0px;
}

#filter {
    background-color: white;
    width: 100%;
    border-bottom: 1px black solid;
    margin: 0 auto;
    position: fixed;
    padding-bottom: 5px;
    z-index: 100;
    top: 50px;
}

#searchInput {
    background: #fff;
    background: rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    border: 1px solid darkGrey;
    /* border-radius: 5px; */
    padding: 0.25em 0.6em;
    /* float: left; */
    height: 2em;
    font-size: 16px;
    text-align: center;
}

#basic-addon2 {
    width: 20%;
}

.allData {
    display: block !important;
}

.single {
    display: inline-block;
    z-index: 5;
    height: auto;
    background-color: white;
    -moz-box-shadow: 0 1px 3px rgba(34, 25, 25, 0.4);
    -webkit-box-shadow: 0 1px 3px rgba(34, 25, 25, 0.4);
    box-shadow: 0 1px 3px rgba(34, 25, 25, 0.4);
    font-size: 14px;
    margin: 2px;
    padding: 2px;
    cursor: pointer;
    position: relative;
    border-radius: 4px;
    margin-bottom: 25px;
}

.name {
    color: black;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: inline-block;
    word-wrap: normal;
    margin: 0;
    height: 60px;
}

#heartPos {
    width: 1px;
    margin: 0 auto;
    height: 1px;
}

.imgDesktop {
    width: auto;
    height: auto;
    max-height: 100%;
    max-width: 100%;
    border: 1px solid darkGrey;
    margin: auto;
}

.imgContainer {
    overflow: hidden;
    height: 200px;
    vertical-align: middle;

    display: flex;
    align-items: center;
}

.back-btn {
    margin-top: 5%;
    margin-bottom: 5%;
    width: 25%
}

.closedTag {
    right: 0;
    top: 0;
    font-size: 14px !important;
    padding: 3px;
    height: auto;
    width: auto;
    text-decoration: none;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 4px;
    font-weight: bold;
    position: absolute;
    color: #ffffff;
    background-color: black;
    z-index: 5;
}

.idDesktop {
    width: auto;
    background-color: #e4450a;
    color: #ffffff;
    font-size: 14px !important;

    font-weight: bold;
    padding: 3px;
    position: absolute;
    border-top-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: inset 0px 24px 20px -15px rgba(255, 255, 255, 0.1),
        inset 0px 0px 10px rgba(0, 0, 0, 0.4), 0px 0px 30px rgba(255, 255, 255, 0.4);
    z-index: 5;
}

//SIDEBAR

.idDesktopSidebar,
.closedSidebar {
    width: auto;
    color: #ffffff;
    font-size: 14px !important;
    font-weight: bold;
    padding: 3px;
    position: absolute;
    border-top-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: inset 0px 24px 20px -15px rgba(255, 255, 255, 0.1),
        inset 0px 0px 10px rgba(0, 0, 0, 0.4), 0px 0px 30px rgba(255, 255, 255, 0.4);
    z-index: 5;
}

.idDesktopSidebar {
    background-color: #e4450a;
    margin-right: 250px;
}

.closedSidebar {
    background-color: black;
    margin-left: 250px;
}

.bar-button {
    width: auto;
}

.bar-text {
    font-size: 120%;
    color: black;
    align-content: left;
}

#description {
    font-size: 14px;
    margin: 10px;

    margin-bottom: 10%;
}

// TWITTER HEART
.heart {
    z-index: 999999;
    position: absolute;

    margin: 0 auto;
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

// SEARCH BAR

.search-form-wrapper {
    display: none;

    padding: 10px 10px;
    background: white;
    border: 2px black solid;
}

.search-form-wrapper.open {
    display: block;
}

* {
    font-family: "Verdana", "Calibri", "Trebuchet MS", "Helvetica Neue", "Arial",
        sans-serif !important;
}

// BASIC
// body {
//   background: linear-gradient(135deg, #121721 0%, #000000 100%) fixed;
//   color: inherit;
//   font: 300 16px/1.5 "Open Sans", sans-serif;
// }
</style>
