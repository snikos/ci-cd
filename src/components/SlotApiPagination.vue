<template>
  <div class="d-flex justify-content-center">
    <ul class="pagination pagination-sm">
      <li
        class="page-item"
        :class="{'disabled': btnPagiCheckerPrevNew}">
        <a
          class="page-link"
          href="#"
          @click.prevent.stop="testExtremePrev()"
          title="begin">1</a>
      </li>
      <li
        class="page-item"
        :class="{'disabled': btnPagiCheckerPrevNew}">
        <a
          class="page-link"
          href="#"
          @click.prevent.stop="testPrevNew()"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">prev</span>
        </a>
      </li>
      <li
        v-for="n in listButtonNew"
        :key="n"
        class="page-item"
        :class="{'active': n===curPagiPageActiveNew}"
      >
        <a class="page-link" href="#" @click.prevent.stop="navPaginationNew(n)">{{n}}</a>
      </li>
      <li
        class="page-item"
        :class="{'disabled': btnPagiCheckerNextNew}">
        <a
          class="page-link"
          href="#"
          @click.prevent.stop="testNextNew()"
        >
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">next</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{'disabled': btnPagiCheckerNextNew}">
        <a
          class="page-link"
          href="#"
          @click.prevent.stop="testExtremeNext()"
          title="End">{{getFinish}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapState } from "pinia";
  import { useCountStore } from "@/store/count.js";
  const customChunk = (arr, size) => {
    const res = [];
    for (let i=0; i<arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  }
  export default {
    name: 'SlotApiPagination',
    data() {
      return {
        storeCount: useCountStore(),
        listButtonNew: [],
        curCompaniesArrayNew: [],
        curPagiPageNew: 1,
        curPagiPageActiveNew: 1,
        btnPagiCheckerPrevNew: false,
        btnPagiCheckerNextNew: false,
      }
    },
    props: {
      totalCompanies: {
        type: [Number, String],
        default: 25,
      },
      limitCompany: {
        type: [Number, String],
        default: 4,
      },
      limitPagi: {
        type: [Number, String],
        default: 3,
      },
    },
    mounted() {
      this.curCompaniesArrayNew = this.arrayPagiButtonsNew[0];
      this.listButtonNew = this.listPagiButtonNew[0];
      this.btnPagiCheckerPrevNew = true;

      if ( this.myOwnCount === null ) {
        this.$emit('navPagination', 1)
      } else {
        this.$emit('navPagination', this.myOwnCount);
        this.navPagiAllNew( this.myOwnCount );
      }
    },
    methods: {
      navPaginationNew(id) {
        this.$emit('navPagination', Number(id));
        this.curPagiPageActiveNew = Number(id);
      },
      navPagiAllNew(id) {
        let idx = [...this.listPagiButtonNew].findIndex((arr) => arr.includes(this.myOwnCount));
        this.listButtonNew = this.listPagiButtonNew[idx];
        this.curPagiPageNew = idx+1;
        this.btnPagiCheckerPrevNew = false;
        this.btnPagiCheckerNextNew = false;
        this.curPagiPageActiveNew = id;

        const curArr = this.listPagiButtonNew.length;
        if ( idx+1 === curArr ) {
          this.btnPagiCheckerNextNew = true;
          this.btnPagiCheckerPrevNew = false;
        }
        if (idx+1 === 1) {
          this.btnPagiCheckerNextNew = false;
          this.btnPagiCheckerPrevNew = true;
        }
      },
      testPrevNew() {
        this.btnPagiCheckerNextNew = false;
        if ( this.curPagiPageNew <= 1 ) { 
          this.curPagiPageNew = 1;
          this.btnPagiCheckerPrevNew = true;
        } else {
          this.curPagiPageNew -= 1;
        }

        if ( this.curPagiPageNew === 1 ) {
          this.btnPagiCheckerPrevNew = true;
        }

        this.listButtonNew = this.listPagiButtonNew[this.curPagiPageNew - 1];

        this.curCompaniesArrayNew = this.arrayPagiButtonsNew[this.curPagiPageNew - 1];
      },
      testNextNew() {
        this.btnPagiCheckerPrevNew = false;
        if ( this.curPagiPageNew >= this.listPagiButtonNew.length-1 ) {
          this.curPagiPageNew = this.listPagiButtonNew.length;
          this.btnPagiCheckerNextNew = true;
        } else {
          this.curPagiPageNew += 1;
        }

        this.listButtonNew = this.listPagiButtonNew[this.curPagiPageNew - 1];

        this.curCompaniesArrayNew = this.arrayPagiButtonsNew[this.curPagiPageNew - 1];
      },
      testExtremePrev() {
        this.curPagiPageNew = 1;
        this.listButtonNew = this.listPagiButtonNew[0];
        this.btnPagiCheckerNextNew = false;
        this.btnPagiCheckerPrevNew = true;
      },
      testExtremeNext() {
        let lx = this.listPagiButtonNew.length-1;
        this.curPagiPageNew = lx+1;
        this.listButtonNew = this.listPagiButtonNew[lx];
        this.btnPagiCheckerNextNew = true;
        this.btnPagiCheckerPrevNew = false;
      },
    },
    computed: {
      getFinish() {
        const limit = Math.ceil(this.totalCompanies / this.limitCompany);
        return limit;
      },
      arrayPagiButtonsNew() {
        const arrayRaw = Array.from(Array(this.totalCompanies), (el, index) => {
          return index+1
        });
        const arrayPagi = customChunk(arrayRaw, this.limitCompany);
        return arrayPagi;
      },
      listPagiButtonNew() {
        //const x = Math.ceil(this.totalCompanies / this.limitCompany);
        //const x = this.getFinish;
        const arrayRaw = Array.from(Array(this.getFinish), (el, index) => {
          return index+1
        });
        return customChunk(arrayRaw, this.limitPagi);
      },
      ...mapState(useCountStore, {
          myOwnCount: 'count',
      }),
    },
    beforeUnmount() {
      this.storeCount.increment( this.curPagiPageActiveNew );
    }
  }
</script>