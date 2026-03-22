<template>
  <div class="alert alert-warning" v-show="store.userError">This is Errorizzm!</div>
  <SlotApiCompany
    v-if="getUsers"
    :getUsers="getUsers"
    :listCompany="listCompany"
    :objUser="tempUser"
    :loading="loading"
    >
    <template
      v-for="(item, i) in dinamicSlots"
      :key="i + '_' + Math.random()"
      #[item]></template>
  </SlotApiCompany>
  <SlotApiPagination
    v-if="!store.userError"
    :totalCompanies="totalCompanies"
    :limitCompany="limitCompany"
    :limitPagi="limitPagi"
    @navPagination="navPagination"></SlotApiPagination>
</template>
<script>
  import SlotApiCompany from '@/components/SlotApiCompany.vue';
  import SlotApiPagination from '@/components/SlotApiPagination.vue';
  import { useUserStore } from '@/store/users.js';

  const isObjEmpty = (o) => Object.keys(o).length === 0;
  const customChunk = (arr, size) => {
    const res = [];
    for (let i=0; i<arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  }

  export default {
    name: 'ApiWork',
    components: {
      SlotApiCompany,
      SlotApiPagination,
    },
    data() {
      return {
        localStorageUser: JSON.parse(localStorage.getItem('companies')),
        store: useUserStore(),
        totalCompanies: 59,
        limitCompany: 7,
        limitPagi: 3,
        listCompany: [],
        dinamicSlots: ['id', 'name', 'country'],
        loading: false,
      }
    },
    mounted() {
      this.loading = true;
    },
    watch: {
      'store.userStore'(n, o){
        if(n !== o) {
          this.loading = false;
        }
      },
    },
    methods: {
      navPagination(id) {
        let curArr = this.arrayPagiButtons[id-1];

        this.listCompany = [...this.getUsers].filter((el) => {
          return curArr.includes(el.id);
        });
        //console.log('Method this.listCompany: ', this.listCompany);
      },
    },
    computed: {
      getUsers() {
        if (isObjEmpty(this.store.userStore)) {
          this.store.getData(this.totalCompanies);
        }
        return isObjEmpty(this.store.userStore) ? this.localStorageUser : this.store.userStore;
      },
      tempUser() {
        return ['id', 'name', 'country']
      },
      arrayPagiButtons() {
        const arrayRaw = Array.from(Array(this.totalCompanies), (el, index) => {
          return index+1
        });
        const arrayPagi = customChunk(arrayRaw, this.limitCompany);
        return arrayPagi;
      },
    }
  }
</script>