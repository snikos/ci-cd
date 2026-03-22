<template>
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
  <div v-else>List Companies is empty!</div>
  <div class="d-flex justify-content-center">
    <ul class="pagination pagination-sm">
      <li
        class="page-item"
        :class="{'disabled': btnPagiCheckerPrev}">
        <a class="page-link" href="#" @click.prevent.stop="navPagiExtremePrev()">start</a>
      </li>
      <li
        class="page-item"
        :class="{'disabled': btnPagiCheckerPrev}">
        <a
          class="page-link"
          href="#"
          @click.prevent.stop="navPagiPrev()"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">prev</span>
        </a>
      </li>
      <li
        v-for="n in listButton"
        :key="n"
        class="page-item"
        :class="{'active': n===curPagiPageActive}"
      >
        <a class="page-link" href="#" @click.prevent.stop="navPagination(n)">{{n}}</a>
      </li>
      <li
        class="page-item"
        :class="{'disabled': btnPagiCheckerNext}">
        <a
          class="page-link"
          href="#"
          @click.prevent.stop="navPagiNext()"
        >
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">next</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{'disabled': btnPagiCheckerNext}">
        <a class="page-link" href="#" @click.prevent.stop="navPagiExtremeNext()">finish</a>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapState } from "pinia";
  import SlotApiCompany from '@/components/SlotApiCompany.vue';
  import { useUserStore } from '@/store/users.js';
  import { useCountStore } from "@/store/count.js";

  const isObjEmpty = (o) => Object.keys(o).length === 0;
  const customChunk = (arr, size) => {
    const res = [];
    for (let i=0; i<arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  }

  export default {
    name: 'ApiWorkOld',
    components: {
      SlotApiCompany,
    },
    data() {
      return {
        localStorageUser: JSON.parse(localStorage.getItem('companies')),
        store: useUserStore(),
        storeCount: useCountStore(),
        totalCompanies: 50,
        limitCompany: 4,
        limitPagi: 3,
        curPagiPage: 1,
        curPagiPageActive: 1,
        curCompaniesArray: [],
        listCompany: [],
        listButton: [],
        btnPagiCheckerPrev: false,
        btnPagiCheckerNext: false,
        dinamicSlots: ['id', 'name', 'country'],
        loading: false,
      }
    },
    mounted() {
      this.loading = true;
      this.curCompaniesArray = this.arrayPagiButtons[0];
      this.listButton = this.listPagiButton[0];
      this.btnPagiCheckerPrev = true;
      console.log('listButton: ', this.listButton);
      console.log('listPagiButton: ', this.listPagiButton);

      if ( this.myOwnCount === null ) {
        this.navPagination(1);
      } else {
        this.navPagination( this.myOwnCount );
        this.navPagiAll()
      }
      //console.log('Mount: ', this.curCompaniesArray[1]);
      //console.log('this.listCompany: ', this.listCompany, this.curCompaniesArray);
    },
    watch: {
      'store.userStore'(n, o){
        if(n !== o) {
          this.loading = false;
        }
      },
      // 'btnPagiCheckerPrev'(n, o){
      //   console.log('btnPagiCheckerPrev: ', o, n);
      // },
      // 'btnPagiCheckerNext'(n, o){
      //   console.log('btnPagiCheckerNext: ', o, n);
      // },
      'curPagiPage'(n,o){
        console.log('curPagiPage: ', o, n);
      }
    },
    methods: {
      navPagination(id) {
        this.curPagiPageActive = id;
        // this.curCompaniesArray = this.arrayPagiButtons[+id-1];
        let curArr = this.arrayPagiButtons[id-1];
        //console.log('curArr: ', curArr, this.arrayPagiButtons);
        this.listCompany = [...this.getUsers].filter((el) => {
          //return el.id > this.limitCompany*id-(this.limitCompany) && el.id <= this.limitCompany*id;
          // return Number(el.id) >= Number(this.curCompaniesArray[0]) && Number(el.id) <= Number(this.curCompaniesArray[this.curCompaniesArray.length-1]);
          //console.log('curArr: ', curArr, el.id);
          return curArr.includes(el.id);
        });
        //console.log('Method this.listCompany: ', this.listCompany);
      },
      navPagiAll() {
        let idx = [...this.listPagiButton].findIndex((arr) => arr.includes(this.myOwnCount));
        //this.listButton = [...this.listPagiButton].find((arr) => arr.includes(this.myOwnCount));
        this.listButton = this.listPagiButton[idx];
        this.curPagiPage = idx+1;
        this.btnPagiCheckerPrev = false;
        this.btnPagiCheckerNext = false;
        //console.log('this.listButton: ', this.listButton);
        //console.log('this.listPagiButton: ', this.listPagiButton);
      },
      navPagiPrev(){
        //console.log('Click prev');
        this.btnPagiCheckerNext = false;
        if ( this.curPagiPage <= 1 ) { 
          this.curPagiPage = 1;
          this.btnPagiCheckerPrev = true;
        } else {
          this.curPagiPage -= 1;
          //this.btnPagiCheckerPrev = false;
        }

        if ( this.curPagiPage === 1 ) {
          this.btnPagiCheckerPrev = true;
        }

        this.listButton = this.listPagiButton[this.curPagiPage - 1];
        //console.log('Prev listButton: ', this.listButton, this.curPagiPage);

        //console.log('prev: ', String(this.listButton) === String(this.listPagiButton[0]));

        this.curCompaniesArray = this.arrayPagiButtons[this.curPagiPage - 1];
        //this.navPagination(this.curPagiPage);
      },
      navPagiNext(){
        //console.log('Click next');
        this.btnPagiCheckerPrev = false;
        if ( this.curPagiPage >= this.listPagiButton.length-1 ) {
          this.curPagiPage = this.listPagiButton.length;
          this.btnPagiCheckerNext = true;
        } else {
          this.curPagiPage += 1;
          //this.btnPagiCheckerNext = false;
        }
        //console.log('Next: ', this.curPagiPage, this.listPagiButton.length);

        this.listButton = this.listPagiButton[this.curPagiPage - 1];

        this.curCompaniesArray = this.arrayPagiButtons[this.curPagiPage - 1];
        //this.navPagination(this.curPagiPage);
      },
      navPagiExtremePrev() {
        //let num = 0;
        //this.curPagiPageActive = num;
        this.curPagiPage = 1;
        //this.navPagination(num+1);
        this.listButton = this.listPagiButton[0];
        this.btnPagiCheckerNext = false;
        this.btnPagiCheckerPrev = true;
      },
      navPagiExtremeNext() {
        //let num = this.finishLimit;
        let lx = this.listPagiButton.length-1;
        this.curPagiPage = lx+1;
        //this.curPagiPageActive = num;
        //this.navPagination(num);
        this.listButton = this.listPagiButton[lx];
        this.btnPagiCheckerNext = true;
        this.btnPagiCheckerPrev = false;
      }
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
        const arrayPagi = customChunk(arrayRaw, this.limitCompany); // /this.limitPagi
        //console.log('arrayPagiButtons: ', arrayPagi);
        return arrayPagi;
      },
      finishLimit() {
        const limit = Math.ceil(this.totalCompanies / this.limitCompany); // 28/3
        //console.log('finishLimit: ', limit);
        return limit;
      },
      listPagiButton() {
        const x = Math.ceil(this.totalCompanies / this.limitCompany); // /this.limitCompany
        const arrayRaw = Array.from(Array(x), (el, index) => {
          return index+1
        });
        const listButton = customChunk(arrayRaw, this.limitPagi);
        //console.log('list buttons: ', listButton);
        return listButton;
      },
      ...mapState(useCountStore, {
          myOwnCount: 'count',
          //double: (store) => store.increment(),
      }),
    },
    beforeUnmount() {
      console.log( 'Active: ', this.curPagiPageActive );
      this.storeCount.increment( this.curPagiPageActive );
    }
  }
</script>