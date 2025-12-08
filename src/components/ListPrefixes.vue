<template>
  <div class="table-responsive">
    <table class="table table-sm table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col" :class="`table-${classes[7]}`">prefix</th>
          <th scope="col" :class="`table-${classes[7]}`">example</th>
          <th scope="col" :class="`table-${classes[7]}`">value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in prefs"
            :key="item['prefix'] + '_' + index">
          <td>{{ item["prefix"] }}</td>
          <td>
            <ul v-for="(exam, idx) in item['examples']"
                :key="exam + '_' + idx">
              <li>{{ exam }}</li>
            </ul>
          </td>
          <td>
            <ul v-for="(el, i) in item['value']"
                :key="el + '_' + i">
              <li>{{ el }}</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default{
    name: "ListPrefixes",
    props: {
      prefs: {
        type: Array,
        require: true
      },
      classes: {
        type: Array,
      }
    }
  }
</script>