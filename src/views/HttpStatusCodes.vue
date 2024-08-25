<template>
  <div class="raw">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
      <div class="list-group">
        <ul class="pagination pagination-sm justify-content-center flex-wrap">
          <li type="button" class="page-item">
            <span class="page-link">1XX</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-12">
      <ListHttpCodes :codes="loadCodes" />
    </div>
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
