<template>
  <div v-if="getUsersNew">
    <SlotApiCompany
      :getUsers="getUsersNew"
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
      :totalCompanies="totalCompanies"
      :limitCompany="limitCompany"
      :limitPagi="limitPagi"
      @navPagination="navPagination"></SlotApiPagination>
  </div>
</template>
<script>
  import SlotApiCompany from '@/components/SlotApiCompany.vue';
  import SlotApiPagination from '@/components/SlotApiPagination.vue';
  import { useUserStore } from '@/store/users.js';

  //const isObjEmpty = (o) => Object.keys(o).length === 0;
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
        localStorageUserNew: JSON.parse(localStorage.getItem('companiesNew')),
        store: useUserStore(),
        storeNew: [],
        totalCompanies: 59,
        limitCompany: 7,
        limitPagi: 3,
        listCompany: [],
        dinamicSlots: ['id', 'name', 'country'],
        loading: false,
      }
    },
    beforeMount() {
      if (JSON.parse(localStorage.getItem('companiesNew')) === null) {
        localStorage.setItem('companiesNew', JSON.stringify([]));
      }
    },
    mounted() {
      //this.loading = true;
      this.fetchListCompany( this.totalCompanies );
    },
    watch: {
      // 'store.userStore'(n, o){
      //   if(n !== o) {
      //     this.loading = false;
      //   }
      // },
    },
    methods: {
      async fetchListCompany(quant) {
        this.loading = true;
        const url = 'https://fakerapi.it/api/v2/companies?';
        const params = new URLSearchParams({
          _quantity: quant,
          _locale: 'en_EN',
          _seed: 123,
        }).toString();

        await fetch(`${url}${params}`)
          .then((res) => {
            return res.json()
          })
          .then(j => {
            localStorage.setItem('companiesNew', JSON.stringify(j.data));
            this.storeNew = j.data;
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      navPagination(id) {
        let curArr = this.arrayPagiButtons[id-1];

        this.listCompany = [...this.getUsersNew].filter((el) => { // [...this.getUsers]]
          return curArr.includes(el.id);
        });
        //console.log('Method this.listCompany: ', this.listCompany);
      }
    },
    computed: {
      getUsersNew() {
        return this.storeNew.length > 0 ? this.storeNew : this.localStorageUserNew;
      },
      // getUsers() {
      //   if (isObjEmpty(this.store.userStore)) {
      //     this.store.getData(this.totalCompanies);
      //   }
      //   return isObjEmpty(this.store.userStore) ? this.localStorageUser : this.store.userStore;
      // },
      tempUser() {
        return ['name', 'country']
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