<template>
<div id="list" v-bind:style="this.backgroundStyle">
    <div class="b-container">
        <b-row id="filter">
            <b-col md="8">
                <div class="selection" id="gap">
                    <select v-model="selected" id="dropdown" @change="scrollPage()">
                        <option ref="option" v-for="option in categories" v-bind:key="option.category" v-bind:value="option.name">{{ option.name.toUpperCase()}}</option>
                    </select>
                </div>
            </b-col>

            <b-col>
                <b-input type="text" name="search" id="searchInput" v-model="term" placeholder="Search" />
            </b-col>
        </b-row>
        <b-row id="EventHeader">
            <b-col>
                <h1 v-bind:style="{'background-color': categoryColor}">Welcome to the {{event.EventInfo[0].Name}}</h1>

            </b-col>
        </b-row>

        <div v-if="!searchBar">
            <b-row class="allData" v-for="category in categories" :key="category.category">
                <b-col>
                    <b-row>
                        <div class="col-12">
                            <h2 v-bind:style="{'background-color': categoryColor}" class="catAnchor" v-bind:id="'anchor-'+category.name">{{category.name.toUpperCase()}}</h2>
                        </div>
                    </b-row>

                    <b-row>
                        <b-col>
                            <b-row class="cardData allData" v-for="(chunk,index) in chunks(category.ids)" :data-count="(chunk.length)" :key="index">
                                <div class="single" v-for="data in chunk" :key="data.itID">
                                    <div class="card" v-bind:style="containerStyle">
                                        <p class="closedTag" v-if="(data.itStatus === 4)">CLOSED</p>
                                        <p class="idDesktop">{{data.itCatalogNum}}</p>

                                        <div v-on:click="toggler(data.itID)">
                                            <b-row v-on:click="select($event)" :id="data.itID">
                                                <b-col>
                                                    <div class="imgContainer">
                                                        <img class="imgDesktop" v-bind:src="getImage(sample)" />
                                                    </div>

                                                    <div class="card-title" style="position: relative">
                                                        <router-link :to="{ name: 'post', params: {id: data.itID}}">
                                                            <h3 class="name" v-on:click="toggler(data.itID)" ref="desktopItems">{{data.itName.toUpperCase()}}</h3>
                                                        </router-link>
                                                        <div id="heartPos"></div>
                                                    </div>
                                                    <div style="position: relative;">
                                                        <div class="heart" v-on:click="toggle(data.itID)" v-bind:key=" 'heart: ' + data.itID" v-bind:style="heartHeightDesktop" v-bind:class="{amactive: activeKeys[activeKeys.findIndex((element) => element.id === data.itID)].active}"></div>
                                                    </div>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col>
                                                    <div v-if="!(data.itStatus === 4)" id="priceCol">
                                                        <label for="price" class="date-text">Current Bid:</label>
                                                        <span id="price" class="date-text">${{data.itMinBid}}</span>
                                                    </div>
                                                    <div v-if="(data.itStatus === 4)" id="priceCol">
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
                </b-col>
            </b-row>
        </div>

        <div v-if="searchBar">
            <b-row>
                <b-col>
                    <h2 id="searchResults">Search Results</h2>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-row class="cardData allData" v-for="(chunk,index) in chunks(activeCards)" :data-count="(chunk.length)" :key="index">
                        <div class="single" v-for="data in chunk" :key="data.itID">
                            <div class="card" v-bind:style="containerStyle">
                                <p class="closedTag" v-if="(data.itStatus === 4)">CLOSED</p>
                                <p class="idDesktop">{{data.itCatalogNum}}</p>

                                <div v-on:click="toggler(data.itID)">
                                    <b-row v-on:click="select($event)" :id="data.itID">
                                        <b-col>
                                            <div class="imgContainer">
                                                <img class="imgDesktop" v-bind:src="getImage(sample)" />
                                            </div>

                                            <div class="card-title" style="position: relative">
                                                <router-link :to="{ name: 'post', params: {id: data.itID}}">
                                                    <h3 class="name" v-on:click="toggler(data.itID)" ref="desktopItems">{{data.itName}}</h3>
                                                </router-link>
                                            </div>
                                            <div class="heart" v-on:click="toggle(data.itID)" v-bind:key=" 'heart: ' + data.itID" v-bind:style="heartHeightDesktop" v-bind:class="{amactive: activeKeys[activeKeys.findIndex((element) => element.id === data.itID)].active}"></div>
                                        </b-col>
                                    </b-row>
                                    <b-row>
                                        <b-col>
                                            <div v-if="!(data.itStatus === 4)">
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
        </div>

        <div class="row">
            <div class="col-9"></div>
            <div class="col-3">
                <b-sidebar :id="'sidebar-' + data.itID" right v-for="data in this.deck" :key="data.itID">
                    <b-container>
                        <b-row id="gap">
                            <b-col class="justify-content-center">
                                <p class="closedSidebar" v-if="(data.itStatus === 4)">CLOSED</p>
                                <p class="idDesktopSidebar">{{data.itCatalogNum}}</p>
                                <h3 class="name" id="nameSidebar" ref="sidebarName">{{data.itName}}</h3>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col class="d-flex justify-content-center">
                                <img class="imgDesktop" v-bind:src="getImageSidebar(sample)" />
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
                                    <div class="heart" v-on:click="toggle(data.itID)" v-bind:key=" 'heart: ' + data.itID" v-bind:style="heartHeightDesktopSidebar" v-bind:class="{amactive: activeKeys[activeKeys.findIndex((element) => element.id === data.itID)].active}"></div>
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
import cloudinary from "cloudinary-core";
import lodash from "lodash";
import jquery from "jquery";
import moment from "moment";

Vue.component(VueCountdown.name, VueCountdown);
export default {
    name: "Home",
    data() {
        return {
            selected: "",

            anchor: {},
            times: [],
            heartHeightDesktop: {},
            heartHeightDesktopSidebar: {},
            cardWidth: 274,
            deck: [],
            event: {},
            containerStyle: {},
            sample: "hello.jpg",
            sidebar: {},
            categoryStyle: {},
            backgroundStyle: {},
            searchBarBool: false,
            windowWidth: window.innerWidth,
            id: "",
            url: "",
            term: ""
        };
    },
    mounted() {
        this.$store.dispatch("loadPosts", this.$route.params.TinyURL);
        this.deck = this.$store.state.favorites;
        this.event = this.$store.state.event[0];
        this.getStyle();
        this.sidebar = {
            status: false,
            current: ""
        };
        this.selected = this.categories[0].name;

        this.$nextTick(() => {
            this.windowWidth = window.innerWidth;
            this.getRowHeight();
        });

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
        categoryColor() {
            return this.event.EventSettings[0].eCategoryColor;
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

        categories() {
            var categories = [];
            for (var i = 0; i < this.deck.length; i++) {
                var seen = false;
                for (var j = 0; j < categories.length; j++) {
                    if (categories[j].category === this.deck[i].itCategory) {
                        seen = true;
                        categories[j].ids.push(this.deck[i]);
                        break;
                    }
                }
                if (!seen) {
                    categories.push({
                        name: this.deck[i].icTitle,
                        category: this.deck[i].itCategory,
                        ids: [this.deck[i]]
                    });
                }
            }
            return categories;
        },

        ...mapState(["posts"])
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
                this.event.EventSettings[0].eCategoryColor
            );
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
        scrollPage: function () {
            this.scrollTo("#" + this.selected);
        },

        myEventHandler(e) {
            this.windowWidth = e.srcElement.window.innerWidth;
            this.isDesktop;
            this.getRowHeight();
        },
        chunks: function (array) {
            if (this.isDesktop) {
                return _.chunk(
                    Object.values(array),
                    Math.floor(this.windowWidth / this.cardWidth)
                );
            }
            if (!this.isDesktop) {
                return _.chunk(Object.values(array), 2);
            }
        },
        scrollTo(element) {
            this.$scrollTo("#anchor-" + element.substring(1), 500, {
                onStart: this.myMethod,
                offset: -135
            });
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
            let target = this.$refs.desktopItems[0].clientHeight;
            let factor = target / 100;
            let string = "scale(" + 1 * factor + ")";
            Vue.set(this.heartHeightDesktop, "transform", string);

            Vue.set(
                this.heartHeightDesktop,
                "top",
                $("#heartPos")
                .parent()
                .offset().top -
                $("#heartPos").offset().top +
                "px"
            );
            Vue.set(
                this.heartHeightDesktop,
                "left",
                $("#priceCol").offset().left +
                $("#priceCol").width() / 2 -
                $(".heart").offset().left -
                $(".heart").width() / 2 +
                "px"
            );

            if (this.isDesktop) {
                // sidebar heart sizing
                let target2 = this.$refs.sidebarName[0].clientHeight;
                let factor2 = target / 100;
                let string2 = "scale(" + 1 * factor + ")";
                Vue.set(this.heartHeightDesktopSidebar, "transform", string2);
                console.log($(".bar-button").position())
                //  Vue.set(this.heartHeightDesktopSidebar, "left", +"px");
                //  Vue.set(this.heartHeightDesktopSidebar, "bottom", $("#bidButton").offset().bottom - $("#bidButton").offset().bottom + "px");
            }
        },
        getImage: function (image) {
            var cl = new cloudinary.Cloudinary({
                cloud_name: "kemp",
                secure: true
            });
            var tag = cl.url(image, {
                height: 198,
                width: 198,
                crop: "fill"
            });
            return tag;
        },
        getImageSidebar: function (image) {
            var cl = new cloudinary.Cloudinary({
                cloud_name: "kemp",
                secure: true
            });
            var int = Math.round(window.innerWidth * 0.2);
            var tag = cl.url(image, {
                height: int,
                width: int
            });

            return tag;
        },
        toggle: function (id) {
            if (this.activeKeys.length > 0) {
                var index = this.activeKeys.findIndex(element => element.id === id);

                if (this.activeKeys[index].active === false) {
                    this.activeKeys[index].active = true;
                    this.$store.dispatch("setFavorite", {
                        n: id
                    });
                } else if (this.activeKeys[index].active === true) {
                    this.activeKeys[index].active = false;
                    this.$store.dispatch("removeFavorite", {
                        n: id
                    });
                }
            }
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

    #EventHeader {
        h1 {
            padding-top: 130px;
        }
    }
}

@media (min-width: 400px) {
    #gap {
        background-color: none;
    }

    .single {
        width: 190px;
    }

    #EventHeader {
        h1 {
            padding-top: 130px;
        }
    }
}

@media (min-width: 600px) {
    #gap {
        background-color: none;
    }

    .single {
        width: 280px;
    }

    #EventHeader {
        h1 {
            padding-top: 135px;
        }
    }
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

.catAnchor {
    min-height: 36px;
    vertical-align: middle;
    font-weight: bold;
    width: 100%;
    text-align: left;
    padding-top: 2px;
    padding-bottom: 2px;
}

#EventHeader {
    display: block !important;

    h1 {
        text-align: left;
    }

    h2 {
        margin-bottom: 0%;
    }

    font-size: 24px;
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

button {
    width: 75%;
}

.btn-primary {
    background-color: #1f7a8c;
    border-color: #343a40;
    color: white;
    width: 75%;
    margin: 5px;
}

.closedTag {
    right: 0;
    top: 0;
    font-size: 14px !important;
    padding: 3px;
    height: auto;
    z-index: 5;
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
    z-index: 2;
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

#list {
    padding-bottom: 100%;
}

// BASIC
// body {
//   background: linear-gradient(135deg, #121721 0%, #000000 100%) fixed;
//   color: inherit;
//   font: 300 16px/1.5 "Open Sans", sans-serif;
// }
</style>
