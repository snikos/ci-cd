<template>
  <div class="row text-left">
    <div class="col justify-content-center text-center m-4">
      <router-link :to="{name: 'ApiWork'}" class="btn btn-warning">Back</router-link>
      <button
        @click="addToFavorite(getCompany.name)"
        class="btn btn-success ml-2"
        :class="{
          'active': favorActive
        }">{{ favorActive ? 'Remove to Favorite' : 'Add to Favorite' }}</button>
    </div>
    <div class="w-100"></div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6">
      <h5 class="text-center mt-3">Company</h5>
      <img
        class="float-left mr-3"
        style="max-width: 76px; width: 100%;"
        src="../assets/company.png"
        :alt="getCompany.name" />
      <ul class="list-group">
        <li class="list-group-item m-0"
          v-for="item in listCompanyAttr"
          :key="item + Math.random()">
          <strong class="compTitles">{{ item }}:</strong>{{ getCompany[item] }}
        </li>
      </ul>
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6">
      <h5 class="text-center mt-3">Contact</h5>
      <img
        v-if="getContact.gender === 'male'"
        class="float-left mr-3"
        style="max-width: 76px; width: 100%;"
        src="../assets/male.jpg"
        :alt="getCompany.gender" />
      <img
        v-if="getContact.gender === 'female'"
        class="float-left mr-3"
        style="max-width: 76px; width: 100%;"
        src="../assets/female.jpg"
        :alt="getCompany.gender" />
      <img
        v-if="getContact.gender === 'other'"
        class="float-left mr-3"
        style="max-width: 76px; width: 100%;"
        src="../assets/other.jpg"
        :alt="getCompany.gender" />
      <ul class="list-group">
        <li class="list-group-item text-left m-0">
          <mark>FName:</mark>{{ getContact['firstname'] }}</li>
        <li class="list-group-item text-left m-0">
          <mark>LName:</mark>{{ getContact['lastname'] }}</li>
        <li class="list-group-item text-left m-0">
          <mark>Birthday:</mark> {{ getContact['birthday'] }}</li>
        <li class="list-group-item text-left m-0">
          <mark>Email:</mark> {{ getContact['email'] }}</li>
        <li class="list-group-item text-left m-0">
          <mark>Phone:</mark> {{ getContact['phone'] }}</li>
        <li class="list-group-item text-left m-0">
          <mark>FGen:</mark>{{ getContact['gender'] }}</li>
      </ul>
    </div>
    <div class="w-100"></div>
  </div>
  <div class="w-100 mt-3"></div>
  <div class="row justify-content-end">
    <div class="col-12">
      <h5 class="text-center">Addresses</h5>
    </div>
    <div class="col-3 col-sm-4 col-md-3 col-lg-3 overflow-hidden">
      <div
        class="nav flex-column nav-pills"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical">
        <a
          v-for="(el, i) in getTest"
          :key="(el.street).split(' ').join('_')"
          class="text-left nav-link"
          :class="{'active': i===0}"
          :id="`v-pills-${el.zipcode}-tab`"
          data-toggle="pill"
          :href="`#v-pills-${el.zipcode}`"
          role="tab"
          :aria-controls="`v-pills-${el.zipcode}`"
        >
          <small class="d-inline-block text-truncate" style="max-width:50%;">{{ i+1 }} {{ el.city }}</small>
          <i class="fa-solid fa-computer-classic float-right"></i>
        </a>
      </div>
    </div>
    <div class="col-9 col-sm-8 col-md-7 col-lg-6">
      <div
        class="tab-content"
        id="v-pills-tabContent">
        <address
          v-for="(item, idx) in getTest"
          :key="idx + '_' +Math.random()"
          class="tab-pane fade"
          :class="{'show active': idx===0}"
          :id="`v-pills-${item.zipcode}`"
          role="tabpanel"
          :aria-labelledby="`v-pills-${item.zipcode}-tab`">
          <p class="fl m-2"
            v-for="(key, val, i) in item"
            :key="i+val">
              <strong>{{val}}</strong> - {{key}}
            </p>
        </address>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ShowCompany',
    data() {
      return {
        localStorageUserNew: JSON.parse(localStorage.getItem('companiesNew')),
        localStorageFavor: JSON.parse(localStorage.getItem('favorites')),
        favorActive: false,
        listCompanyAttr: ['name','country','email','vat','phone'],
      }
    },
    mounted(){
      if (JSON.parse(localStorage.getItem('favorites')) === null) {
        localStorage.setItem('favorites', JSON.stringify([]));
      }
      let page = this.$route.params.id;
      let curItem = this.localStorageUserNew.filter((item) => Number(item.vat) === Number(page))[0]['name'];
      let curName = String(curItem).split(' ').join('_');
      let isLocal = JSON.parse(localStorage.getItem('favorites'));
      let isCompany = isLocal.some((item) => String(item).split(' ').join('_') === curName);
      this.favorActive = isCompany;
    },
    methods: {
      addToFavorite(companyName) {
        companyName = companyName.split(' ').join('_');
        if (JSON.parse(localStorage.getItem('favorites')) === null) {
          localStorage.setItem('favorites', JSON.stringify([companyName]));
          this.favorActive = true;
          return;
        }

        let isLocal = JSON.parse(localStorage.getItem('favorites'));
        let isCompany = isLocal.some((item) => String(item).split(' ').join('_') === companyName);
        if ( isCompany ) {
          let oldFavor = isLocal.filter((item) => String(item).split(' ').join('_') !== companyName);
          localStorage.setItem('favorites', JSON.stringify([...oldFavor]));
          oldFavor.length = 0;
          this.favorActive = false;
        } else {
          let newFavor = [];
          newFavor.push(companyName);
          localStorage.setItem('favorites', JSON.stringify([...isLocal, ...newFavor]));
          newFavor.length = 0;
          this.favorActive = true;
        }
      }
    },
    computed: {
      getTest() {
        let cloneArr = [];
        for (let item of [...this.getAddresses]){
          let cloneObj = {};
          for (const k of Object.entries(item)) {
            if (!['id','latitude','longitude'].includes( k[0] )) {
              cloneObj[k[0]] = k[1]
            }
          }
          cloneArr.push(cloneObj);
        }
        return cloneArr
      },
      getCompany() {
        let page = this.$route.params.id;
        return this.localStorageUserNew.filter((item) => Number(item.vat) === Number(page))[0]
      },
      getNameCompany(name) {
        return this.getCompany[name];
      },
      getAddresses() {
        return this.getCompany.addresses;
      },
      getContact() {
        return this.getCompany.contact;
      },
    }
  }
</script>
<style scoped>
  .compTitles {
    display:inline-block;
    text-transform: capitalize;
    width:80px;
  }
  .fl {
    line-height: 20px;
    text-align: left;
    text-transform: capitalize;
  }
/*.fl:first-letter {
  font-size: 18px;
}*/
</style>