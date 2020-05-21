<template>
  <div id="app">
    <div id="nav" class="navbar-light">
      <ul class="nav nav-justified-start">
        <li class="nav-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about">About</router-link>
        </li>
         <li class="nav-item">
          <router-link to="/favorites">Favorites</router-link>
        </li>
      </ul>
    </div>
    
    <router-view />
  </div>
</template>

<script>

</script>


<style lang="scss">
body {
  height : 90%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  margin-bottom: calc(var(--vh, 1vh) * 2);
  padding-top: calc(var(--vh, 1vh) * 3);
  padding-bottom: calc(var(--vh, 1vh) * 3);

  padding-left: 20px;
  height: calc(var(--vh, 1vh) * 10);
  background-color: #053C5E;

  a {
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color:#1F7A8C;
    }
  }
  .nav-item {
    margin-right: 20px
  }
}

</style>
