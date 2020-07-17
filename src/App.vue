<template>
  <div id="app">
    <div id="nav" class="navbar-light">
      <ul class="nav nav-justified-start">
        <li>
          <a v-b-toggle.sidebar-n class="link noHover">Menu</a>
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
        </li>
        <li class="nav-item">
          <a class="search-form-tigger btn btn-success" data-toggle="search-form" id="toggler">
            <i id="opener" class="fa fa-search" aria-hidden="true"></i>
            <i id="closer" class="fa fa-window-close" style="display: none"></i>
          </a>
        </li>
        <li id="sign">
          <a class="noHover">
          
                  <router-link to="/login">Sign In</router-link>
          
          </a>
        </li>
      </ul>
      <div class="search-form-wrapper">
        <b-form class="search-form">
          <div class="input-group">
            <b-input type="text" name="search" v-model="term" />
            <button class="input-group-addon btn-primary" id="basic-addon2">
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </b-form>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import jquery from "jquery";
export default {
  data() {
    return {
      id: "",
      url: "",
      term: "",
      searchUrl: "",
      searchBar: false
    };
  },
  mounted() {
    // this.$store.dispatch("loadPosts");
    // this.buildId();
    // this.buildUrl();
    $(document).ready(function() {
      $("[data-toggle=search-form]").click(function() {
        $(".search-form-wrapper").toggleClass("open");
        $(".search-form-wrapper .search").focus();
        $("html").toggleClass("search-form-open");
        if (!this.searchBar) {
          $("#opener").css("display", "none");
          $("#closer").removeAttr("style");
          this.searchBar = true;
          $("#toggler").removeClass("btn-success");
          $("#toggler").addClass("btn-danger");
        } else if (this.searchBar) {
          $("#closer").css("display", "none");
          $("#opener").removeAttr("style");
          this.searchBar = false;
          $("#toggler").addClass("btn-success");
          $("#toggler").removeClass("btn-danger");
        }
      });
      $("[data-toggle=search-form-close]").click(function() {
        $(".search-form-wrapper").removeClass("open");
        $("html").removeClass("search-form-open");
      });
      $(".search-form-wrapper.search").keypress(function(event) {
        if ($(this).val() == "Search") $(this).val("");
        this.buildSearchUrl();
      });

      $(".search-close").click(function(event) {
        $(".search-form-wrapper").removeClass("open");
        $("html").removeClass("search-form-open");
      });
    });
  },
  methods: {
    buildUrl() {
      if (this.id && this.term) {
        this.url = "/stack/" + this.id;
        this.searchUrl = "/search/" + this.term;
      }
    },
    buildSearchUrl() {
      if (this.term) {
        this.searchUrl = "/search/" + this.term;
      }
    },
    buildId() {
      if (this.$store.state.posts[0].id) {
        this.id = this.$store.state.posts[0].id;
      }
    },
    
  },
  computed: {}
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
#sidebar-n {
  width: 100% !important;
  background-color: #053c5e !important;
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
#sign {
  position: absolute;
  right: 10px;
}

.search-form-wrapper {
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  padding: 20px 15px;
  background: #053c5e;
}
.search-form-wrapper.open {
  display: block;
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
