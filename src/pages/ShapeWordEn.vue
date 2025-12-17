<template>
  <div class="row">
    <div class="col-12 col-md-12">
      <h3 class="pb-4">English Shape words</h3>
    </div>
    <div class="col-12 col-md-12">
      <ShemaShapeWordEn :shemaword="shemaShapeWord"/>
    </div>
    <div class="col-12 col-md-12">
      <ListShapeWordEn :shapeword="checkShapeWord" :classes="classes"/>
    </div>
  </div>
</template>
<script>
  import shapewordJson from '@/json/shapeword.json';
  import ShemaShapeWordEn from '@/components/ShemaShapeWordEn';
  import ListShapeWordEn from '@/components/ListShapeWordEn';
  export default {
    name: 'ShapeWordEn',
    components: {
      ShemaShapeWordEn,
      ListShapeWordEn,
    },
    data() {
      return {
        shemaShapeWord: [],
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
          this.shemaShapeWord = res["shemaword"];
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