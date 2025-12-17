<template>
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col" :class="`table-${classes[7]}`" class="text-capitalize">pre(su)fix</th>
          <th scope="col" :class="`table-${classes[7]}`" class="text-capitalize">example</th>
          <th scope="col" :class="`table-${classes[7]}`" class="text-capitalize">value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in shapeword"
            :key="item['prefix'] + '_' + index">
          <td>
            <h5 class="text-left">
              <span class="badge badge-info">{{ item["prefix"] }}</span>
            </h5>
          </td>
          <td>
            <ul style="max-width: 700px" class="list-unstyled">
              <li v-for="(exam, idx) in item['examples']"
                  :key="exam + '_' + idx"
                  class="float-left">
                  <div v-if="exam.includes('|')">
                    <span 
                      v-for="ex in exam.split('|')"
                      :key="ex + '_'"
                      class="badge badge-primary text-nowrap"
                    >
                      {{ ex }}
                    </span>
                  </div>
                  <div v-else>
                    <span 
                      class="badge badge-success breakText"
                      style="max-width: 300px;"
                    >
                      {{exam}}
                    </span>
                  </div>
              </li>
            </ul>
          </td>
          <td>
            <ul v-for="(el, i) in item['value']"
                :key="el + '_' + i"
                class="list-unstyled">
              <li class="">
                <p class="breakText text-left">
                  <small>{{ el }}</small>
                </p>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default{
    name: "ListShapeWordEn",
    props: {
      shapeword: {
        type: Array,
        require: true
      },
      classes: {
        type: Array,
      }
    }
  }
</script>

<style scoped></style>