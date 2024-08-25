<template>
  <ul class="row">
    <li v-for="(item, idx) in keyRun"
      :key="item[idx]+'_'+idx"
      class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 list-group-item">
      <table class="table table-sm table-striped table-bordered">
        <thead>
          <tr>
            <th colspan="2">{{ item['title'] }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(el, i) in item['arrCodes']"
          :key="el['code']+'_'+i">
            <td :class="`list-group-item-${classes[idx]}`">{{ el['code'] }}</td>
            <td>{{ el['status'] }}</td>
          </tr>
        </tbody>
      </table>
    </li>
  </ul>
</template>
<script>
  export default {
    name: "ListHttpCodes",
    props: {
      codes: {
        type: Object,
        required: true,
      },
      classes: {
        type: Array,
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