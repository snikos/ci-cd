<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/tiger.png">
    <HelloWorld msg="Welcome kindman!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
