<template v-if="showUsers">
  <div v-if="listCompany" class="row">
    <div
      v-for="(item, index) in listCompany"
      :key="Math.random() + index"
      class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-2 alert alert-success mb-md-1"
    >
      <div class="text-left p-2 m-2 clearfix">
        <div class="float-left" style="height: 64px;">
          <img
            class="mr-3"
            style="width: 64px;"
            src="../assets/company.png"
            :alt="item.id" />
        </div>
        <div class="text-right">
          <p class="mb-0 ml-5 small" v-if="showFavor(item.name)">
            <span class="badge badge-pill badge-primary ml-2">In Favorites</span>
          </p>
          <template v-for="(el, idx) in objUser" :key="idx + '_' + el">
            <p class="mb-0 ml-5 small"><slot name="el">{{ item[el] }}</slot></p>
          </template>
        </div>
      </div>
      <div class="w-100"></div>
      <div class="justify-content-right pt-2">
        <router-link
          :to="`/api-work/${item.vat}`"
          class="btn btn-success"
        >Details</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SlotApiCompany',
    inheritAttrs: false,
    props: {
      listCompany: {
        type: Array,
        required: true,
        default: () => [],
        validator: (v) => typeof v === 'object',
      },
      objUser: {
        type: Array,
        required: true,
        default: () => ['name'],
        validator: (v) => typeof v === 'object' && v.length > 0
      }
    },
    methods: {
      getObj(obj, path) {
        return path.split('.').reduce((o, key) => o[key], obj);
      },
      imageLoadError(event) {
        // Loop error: unlimited loading pics in @error="imageLoadError"
        event.target.src = '../assets/img/ui.png';
      },
      showFavor(compName) {
        if (JSON.parse(localStorage.getItem('favorites')) === null) {
          return false;
        }
        const favors = JSON.parse(localStorage.getItem('favorites'));
        const isFavor = favors.includes(String(compName).split(' ').join('_'));
        return isFavor;
      }
    },
    computed: {
      showUsers() {
        return this.$slots.name
      }
    }
  }
</script>