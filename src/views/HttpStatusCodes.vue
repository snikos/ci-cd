<template>
  <div>
    <ListHttpCodes :codes="loadCodes" :classes="classes" />
  </div>
</template>

<script>
  import httpCodes from "@/json/http-status-codes.json";
  import ListHttpCodes from "@/components/ListHttpCodes"
  export default {
    name: "HttpStatusCodes",
    components: {
      ListHttpCodes,
    },
    data(){
      return {
        loadCodes: [],
        classes: ['primary','secondary','success','danger','warning','info','light','dark','active'],
      }
    },
    mounted(){
      this.fetchCodes();
    },
    methods: {
      async fetchCodes(){
        try {
          const res = await httpCodes;
          this.loadCodes = res["codes"];
        }
        catch (e){
          console.log("Error load fetch json http codes" + e)
        }
      },
    },
    computed: {},
  }
</script>
