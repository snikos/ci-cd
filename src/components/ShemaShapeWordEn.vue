<template>
  <div class="table-responsive">
    <table class="table table-bordered">
      <tr v-for="(item, i) in shemaword"
        :key="'keyid_' + i">
        <td v-if="i===0" rowspan="2">
          <h5 class="float-left text-capitalize">{{ getTitle(item, 0) }}</h5>
        </td>
        <td v-if="i>1" colspan="2">
          <h5 class="float-left text-capitalize">{{ getTitle(item, 0) }}</h5>
        </td>
        <td v-if="i<2">
          <h6 class="float-left text-capitalize">{{ getTitle(item, 1) }}</h6>
        </td>
        <td v-for="(el, k, idx) in item"
          :key="k + '_' + idx">
          <span v-for="(w, i) in el.split(',')"
            :key="'key_' + i"
            :class="['badge', {
              'badge-primary': w.includes('/'),
              'badge-success': w.includes('-e')
            }]"
            class="float-left font-weight-normal">
            {{ w }}
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "ShemaShapeWordEn",
    props: {
      shemaword: {
        type: Array,
        required: true,
      }
    },
    methods: {
      getTitle(item, num) {
        return String(Object.keys(item)).split("_")[num]
      }
    },
  }
</script>

<style scoped></style>