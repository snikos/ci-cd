<template>
  <div class="row text-left">
    <div class="col">
      <h5 class="text-center m-4">
        <router-link :to="{name: 'ApiWork'}">Back</router-link>
      </h5>
    </div>
    <div class="w-100"></div>
    <div class="col-4 col-sm-4 col-md-3 col-lg-2">
      <img
        class="float-left mr-3"
        style="max-width: 120px; width: 100%;"
        src="https://picsum.photos/240"
        :alt="getCompany.name" />
    </div>
    <div class="col-8 col-sm-8 col-md-9 col-lg-10">
      <p class="m-0"><strong class="compTitles">Company:</strong>{{ getCompany.name }}</p>
      <p class="m-0"><strong class="compTitles">Country:</strong>{{ getCompany.country }}</p>
      <p class="m-0"><strong class="compTitles">Email:</strong>{{ getCompany.email }}</p>
      <p class="m-0"><strong class="compTitles">Vat:</strong>{{ getCompany.vat }}</p>
      <p class="m-0"><strong class="compTitles">Phone:</strong>{{ getCompany.phone }}</p>
    </div>
    <div class="w-100"></div>
    <address
      class="col-12 col-sm-6 col-md-6 col-lg-4 mb-2"
      v-for="(item) in getAddresses"
      :key="(item.street).split(' ').join('_')"
    >
      <p class="m-0" v-for="(el, val, idx) in item" :key="idx+val">
        <small v-if="!['id','zipcode','latitude','longitude'].includes(val)">
          <strong>{{val}}</strong> - {{el}}
        </small>
      </p>
    </address>
    <div class="w-100"></div>
    <div class="col-12 justify-content-center">
      <button
        @click="addToFavorite(getCompany.name)"
        class="btn btn-success"
        :class="{
          'active': favorActive
        }">{{ favorActive ? 'Remove to Favorite' : 'Add to Favorite' }}</button>
    </div>
    <div class="w-100">-</div>
  </div>
</template>
<script>
  //import { mapState } from "pinia";
  //import { useCountStore } from "@/store/count.js";
  export default {
    name: 'ShowCompany',
    data() {
      return {
        localStorageUser: JSON.parse(localStorage.getItem('companies')),
        localStorageFavor: JSON.parse(localStorage.getItem('favorites')),
        favorActive: false,
      }
    },
    mounted(){
      if (JSON.parse(localStorage.getItem('favorites')) === null) {
        localStorage.setItem('favorites', JSON.stringify([]));
      }
      let page = this.$route.params.id;
      let curItem = this.localStorageUser.filter((item) => Number(item.vat) === Number(page))[0]['name'];
      let curName = String(curItem).split(' ').join('_');
      let isLocal = JSON.parse(localStorage.getItem('favorites'));
      let isCompany = isLocal.some((item) => String(item).split(' ').join('_') === curName);
      this.favorActive = isCompany;
    },
    methods: {
      addToFavorite(companyName) {
        companyName = companyName.split(' ').join('_');
        console.log('Favor name:', companyName);
        if (JSON.parse(localStorage.getItem('favorites')) === null) {
          localStorage.setItem('favorites', JSON.stringify([companyName]));
          this.favorActive = true;
          console.log('1 Favor localStorage: ', this.localStorageFavor);
          return;
        }

        let isLocal = JSON.parse(localStorage.getItem('favorites'));
        console.log( isLocal );
        let isCompany = isLocal.some((item) => String(item).split(' ').join('_') === companyName);
        if ( isCompany ) {
          let oldFavor = isLocal.filter((item) => String(item).split(' ').join('_') !== companyName);
          localStorage.setItem('favorites', JSON.stringify([...oldFavor]));
          oldFavor.length = 0;
          this.favorActive = false;
          console.log('remove: ', companyName);
        } else {
          let newFavor = [];
          newFavor.push(companyName);
          localStorage.setItem('favorites', JSON.stringify([...isLocal, ...newFavor]));
          newFavor.length = 0;
          this.favorActive = true;
          console.log('add: ', companyName);
        }
        console.log('Finish: ', JSON.parse(localStorage.getItem('favorites')));
      }
    },
    computed: {
      getCompany() {
        let page = this.$route.params.id;
        return this.localStorageUser.filter((item) => Number(item.vat) === Number(page))[0]
      },
      getNameCompany(name) {
        return this.getCompany[name];
      },
      getAddresses() {
        return this.getCompany.addresses;
      },
      // ...mapState(useCountStore, {
      //     myOwnCount: 'count',
      //     double: store => store.increment(4),
      // }),
    }
  }
</script>
<style scoped>
  .compTitles {
    display:inline-block;
    width:80px;
  }
</style>