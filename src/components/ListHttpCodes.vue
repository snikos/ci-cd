<template>
  <div class="table-responsive">
    <ul>
      <li v-for="(item, idx) in keyRun"
        :key="item[idx]+'_'+idx">
        <p>{{ item['title'] }}</p>
        <table class="table table-sm table-striped table-bordered">
          <thead>
            <tr>
              <th>1xx</th>
              <th>2xx</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(el, i) in item['arrCodes']"
            :key="el['code']+'_'+i">
              <td>{{ el['code'] }}</td>
              <td>{{ el['status'] }}</td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "ListHttpCodes",
    props: {
      codes: {
        type: Object,
        required: true,
      }
    },
    methods: {

    },
    computed: {
      keyRun() {
        let x = Object.entries(this.codes).map(x => x[1]);
        //console.log( x )
        return x
      }
    },
  }
</script>