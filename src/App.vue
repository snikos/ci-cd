<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background-color: #e3f2fd;">
      <button 
        class="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav"
        aria-expanded="false" 
        aria-label="Toggle navigation"
        @click.prevent.stop="toggleNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div 
        class="collapse navbar-collapse" 
        id="navbarNav"
        :class="[toggling ? 'show' : '']">
        <ul class="navbar-nav mr-auto">
          <li class="navbar-item">
            <router-link class="nav-link" to="/">Homer</router-link>
          </li>
          <li class="navbar-item">
            <router-link class="nav-link" to="/http">Http Codes</router-link>
          </li>
          <li class="navbar-item">
            <router-link class="nav-link" to="/start">CI/CD</router-link>
          </li>
          <li class="navbar-item">
            <router-link class="nav-link" to="/vueuse">Vueuse</router-link>
          </li>
          <li class="navbar-item">
            <router-link class="nav-link" to="/local-json">Json</router-link>
          </li>
          <li class="navbar-item">
            <router-link class="nav-link" to="/git-bash">Git</router-link>
          </li>
          <li class="navbar-item">
            <router-link class="nav-link" to="/nvm">Nvm</router-link>
          </li>
          <li class="navbar-item">
            <router-link class="nav-link" to="/migration-job">Migration Job</router-link>
          </li>
          <li class="navbar-item">
            <router-link class="nav-link" to="/irr-verbs">Irregular verbs (En)</router-link>
          </li>
          <li class="navbar-item">
            <router-link class="nav-link" to="/shape-word">Shape words (En)</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
  <div id="modals"></div>
</template>
<script>
  export default {
    data() {
      return {
        toggling: false,
      }
    },
    methods: {
      toggleNav() {
        this.toggling = !this.toggling;
      }
    }
  }
</script>
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
      background-color: lightgreen;
      color: #42b983;
    }
  }
}

.goon{
  position: relative;
  top: -7px;
}

</style>
