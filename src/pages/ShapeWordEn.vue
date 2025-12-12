<template>
  <div class="row">
    <div class="col-12 col-md-12">
      <h3 class="pb-4">English Shape words</h3>
    </div>
    <div class="col-12 col-md-12">
      <ListShapeWordEn :shapeword="checkShapeWord" :classes="classes"/>
    </div>
  </div>
</template>
<script>
  import shapewordJson from '@/json/shapeword.json';
  import ListShapeWordEn from '@/components/ListShapeWordEn';
  export default {
    name: 'ShapeWordEn',
    components: {
      ListShapeWordEn,
    },
    data() {
      return {
        loadShapeWord: [],
        checkShapeWord: [],
        classes: ['primary','secondary','success','danger','warning','info','light','dark','active'],
      }
    },
    mounted() {
      this.fetchShapeWord();
    },
    methods: {
      async fetchShapeWord() {
        try {
          const res = await shapewordJson;
          this.loadShapeWord = res["shapeword"];
          this.checkShapeWord = res["shapeword"];
        }
        catch (e) {
          console.log(`Error load json ShapeWord: ${e}`)
        }
      },
    },
    computed: {},
  }
</script>

<style scoped>

</style>