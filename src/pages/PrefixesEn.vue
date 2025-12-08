<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <h3 class="pb-4">English prefixes</h3>
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-8">
      <ListPrefixes :prefs="checkPrefs" :classes="classes"/>
    </div>
  </div>
</template>
<script>
  import prefixJson from '@/json/prefix.json';
  import ListPrefixes from '@/components/ListPrefixes';
  export default {
    name: 'Prefixes',
    components: {
      ListPrefixes,
    },
    data() {
      return {
        loadPrefixes: [],
        checkPrefs: [],
        classes: ['primary','secondary','success','danger','warning','info','light','dark','active'],
      }
    },
    mounted() {
      this.fetchPrefs();
    },
    methods: {
      async fetchPrefs() {
        try {
          const res = await prefixJson;
          this.loadPrefixes = res["prefixes"];
          this.checkPrefs = res["prefixes"];
        }
        catch (e) {
          console.log(`Error load json prefies: ${e}`)
        }
      },
    },
    computed: {},
  }
</script>

<style scoped>

</style>