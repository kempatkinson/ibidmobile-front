<template>
  <div id="app">
    <div id="nav" class="navbar-light">
      <ul class="nav nav-justified-start">
        <li>
          <a v-b-toggle.sidebar-1 class="link">Menu</a>
            <b-sidebar
              id="sidebar-1"
              class="title"
              title="Menu"
              shadow
              text-variant="light"
            >
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
        </li>
        <li class="nav-item" id="sign">
          <a class="link">Sign In</a>
        </li>
      </ul>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$store.state.posts[0].id,
      url: ""
    };
  },
  mounted() {
    this.$store.dispatch("loadPosts");
    this.buildUrl();
  },
  methods: {
    buildUrl() {
      this.url = "/stack/" + this.id;
    }
  }
};
</script>


<style lang="scss">
.link {
  color: #bfdbf7;
}
body {
  height: 90%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#sidebar-1 {
  width: 100% !important;
  background-color: #053c5e !important;
  color: #bfdbf7 !important;
}
#sidebarlist {
  list-style-type: none;
  list-style: none;
}

#nav {
  padding-top: calc(var(--vh, 1vh) * 3);
  padding-bottom: calc(var(--vh, 1vh) * 3);

  padding-left: 20px;
  height: calc(var(--vh, 1vh) * 10);
  background-color: #053c5e;
  position: fixed;
  z-index: 4;
  width: 100%;

  a {
    font-weight: bold;
    color: #bfdbf7;

    &.router-link-exact-active {
      color: #1f7a8c;
    }
  }
}

@media (min-height: 900px) {
  #nav {
    font-size: 25px;
  }
}

#sign {
  position: absolute;
  right: 10px;
}
</style>
