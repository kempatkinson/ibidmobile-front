<template>
<div id="app">
    <b-navbar id="nav" class="navbar-light header" fixed="top" fill="true">
        <b-navbar-brand id="logo">
            <img src="./assets/logo.png" />
        </b-navbar-brand>

        <b-navbar-nav class="nav nav-justified-start ml-auto" :key="this.isLoggedIn">
            <b-nav-item id="sign" v-if="!this.isLoggedIn">
                <a class="noHover">
                    <router-link to="/login">Sign In</router-link>
                </a>
            </b-nav-item>
            <b-nav-item id="sign" v-if="this.isLoggedIn">
                <a class="noHover" @click="logOut">Log Out</a>
            </b-nav-item>
            <b-nav-item v-if="this.isLoggedIn">
                <a class="noHover">
                    <router-link to="/favorites" class="noHover">Favorited Items</router-link>
                </a>
            </b-nav-item>
            <b-nav-item>
                <a v-b-toggle.sidebar-n class="link noHover">Menu</a>
            </b-nav-item>
        </b-navbar-nav>
    </b-navbar>
    <b-sidebar id="sidebar-n" class="title" title="Menu" shadow text-variant="light">
        <div class="px-4 py-2">
            <ul id="sidebarlist">
                <li class="nav-item">
                    <router-link to="/">Welcome</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/about">About this Auction</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/items">Browse Items as List</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ path: this.url }" exact>Browse Items as Cards</router-link>
                </li>

                <li class="nav-item">
                    <router-link to="/favorites">Favorited Items</router-link>
                </li>
            </ul>
        </div>
    </b-sidebar>
    <router-view v-bind:key="$route.fullPath"></router-view>
</div>
</template>

<script>
import jquery from "jquery";
import {
    mapState
} from "vuex";

export default {
    data() {
        return {
            url: "",
            user: this.$store.state.user,
        };
    },
    mounted() {
        if (this.isLoggedIn()) {
            console.log(this.$store.state.user);
        }
    },

    methods: {
        logOut() {
            this.$store.dispatch("logInUser", {});
            console.log("logging out");
        }
    },
    computed: {
        isLoggedIn() {
            if (this.$store.state.user.UserID !== undefined) {
                return true
            } else return false;
        },
        ...mapState['user']
    }
};
</script>

<style lang="scss">
.link {
    color: #bfdbf7;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#sidebar-n {
    width: 100% !important;
    background-color: white !important;
    color: #bfdbf7 !important;
    align-content: center;
    z-index: 2000;
}

#sidebarlist {
    list-style-type: none;
    list-style: none;
    padding: 0;
}

#nav {
    padding-left: 20px;
    background-color: white;
    position: fixed;
    z-index: 10;
    border-bottom: black 2px solid;

    a {
        font-weight: bold;
        color: black;
    }
}

@media (min-height: 900px) {
    #nav {
        font-size: 25px;
    }
}

.b-sidebar-header {
    font-size: 24px !important;
}

.noHover {
    font-size: 12px;
}

.nav-item {
    font-size: 16px;
}

#menu {
    padding-top: 30%;
    color: black;
}

img {
    height: 40px;
}

.input-group-addon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 12px;
}

.noHover:focus,
.noHover:hover {
    background-color: transparent !important;
}

.btn-success {
    background-color: #5cb85c !important;
    color: #053c5e !important;
}

.btn-danger {
    background-color: #dc3545 !important;
    color: #053c5e !important;
}
</style>
