<template>
  <div class="container">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/start">CI/CD</router-link> |
      <router-link to="/admin">Admin</router-link> |
      <router-link to="/local-json">Json</router-link> |
      <router-link to="/git-bash">Bash</router-link> |
      <router-link to="/migration-job">Migration Job</router-link> |
      <router-link to="/irr-verbs">Irregular verbs</router-link>
    </nav>
    <router-view/>
  </div>
  <div id="modals"></div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $color-blue;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.goon{
  position: relative;
  top: -7px;
}
</style>
