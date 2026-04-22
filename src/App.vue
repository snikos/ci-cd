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
        <ul class="navbar-nav m-auto">
          <li class="navbar-item" v-for="({title, to}, i) in routeLevelZero" :key="Math.random() + '_' + i">
            <router-link class="nav-link" :to="to">{{title}}</router-link>
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
        routeLevelZero: [
          {title: 'Homer', to: '/'},
          {title: 'Http Codes', to: '/http'},
          {title: 'CI/CD', to: '/start'},
          {title: 'Vueuse', to: '/vueuse'},
          {title: 'Json', to: '/local-json'},
          {title: 'Git', to: '/git-bash'},
          {title: 'Nvm', to: '/nvm'},
          {title: 'Migration Job', to: '/migration-job'},
          {title: 'Irregular verbs (En)', to: '/irr-verbs'},
          {title: 'Shape words (EN)', to: '/shape-word'},
          {title: 'Api Work', to: '/api-work'},
        ],
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
