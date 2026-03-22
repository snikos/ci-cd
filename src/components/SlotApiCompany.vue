<template v-if="showUsers">
  <div v-if="listCompany" class="row">
    <div
      v-for="(user, index) in listCompany"
      :key="Math.random() + index"
      class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-2 alert alert-success mb-md-1"
    >
      <div class="text-left p-2 m-2">
        <div class="float-left" style="height: 64px;">
          <img
            class="mr-3"
            style="width: 64px;"
            :src="`https://picsum.photos/240`"
            :alt="user.id" />
        </div>
        <div class="text-right">
          <span v-show="showFavor(user.name)" class="badge badge-pill badge-primary float-right ml-2">In Favorites</span>
          <template v-for="(item, idx) in objUser" :key="idx + '_' + item">
            <p class="mb-0 ml-5 small"><slot name="item">{{ user[item] }}</slot></p>
          </template>
        </div>
      </div>
      <div class="w-100"></div>
      <div class="justify-content-right pt-2">
        <router-link
          :to="`/api-work/${user.vat}`"
          class="btn btn-success"
        >Details</router-link>
      </div>
    </div>
  </div>
  <div v-else class="d-flex justify-content-center m-3">
    <div v-show="loading" class="spinner-grow text-success">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SlotApiCompany',
    inheritAttrs: false,
    props: {
      getUsers: {
        type: Array,
        required: true,
        default: () => [],
        validator: (v) => typeof v === 'object',
      },
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
      },
      loading: {
        type: Boolean
      }
    },
    methods: {
      getObj(obj, path) {
        return path.split('.').reduce((o, key) => o[key], obj);
      },
      imageLoadError(event) {
        // Fatal error: unlimited load pics in @error="imageLoadError"
        event.target.src = '../assets/img/ui.png';
      },
      showFavor(compName) {
        if (JSON.parse(localStorage.getItem('favorites')) === null) {
          return false;
        }
        const favors = JSON.parse(localStorage.getItem('favorites'));
        const isFavor = favors.includes(String(compName).split(' ').join('_'));
        // let isCompany = isLocal.some((item) => String(item).split(' ').join('_') === curName);
        return isFavor;
      }
    },
    computed: {
      showUsers() {
        return this.$slots.name
      }
    },
  }
</script>