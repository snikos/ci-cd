<template>
  <div class="row">
    <div class="col-12">
      <h3>Nvm (Node Version Manager)</h3>
    </div>
    <div class="col-12">
      <div class="list-group list-group-horizontal">
        <a 
          class="list-group-item list-group-item-action list-group-item-primary" 
          href="https://github.com/coreybutler/nvm-windows&client=webapp">
            nvm-windows Download and Install
        </a>
        <a 
        class="list-group-item list-group-item-action list-group-item-success" 
        href="https://coderlessons.com/articles/veb-razrabotka-articles/ustanovka-neskolkikh-versii-node-js-s-pomoshchiu-nvm">
          Instruction
        </a>
        <a 
          class="list-group-item list-group-item-action list-group-item-dark" 
          href="https://ask-dev.ru/info/56493/how-to-completely-remove-nodejs-from-windows">
            Delete All Nodejs. Clean up System
        </a>
      </div>
    </div>
  </div>
  <div class="row">
    <template v-for="(item, idx) in formatRules" 
      :key="Math.random + '_' + idx">
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
        <div class="list-group">
          <div v-for="({ text, comd }, i) in item" 
            class="list-group-item text-left fx-bg" 
            :key="Math.random + '_' + i">
            <p class="mb-1">{{ text }}</p>
            <kbd>{{comd}}</kbd>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  //import { ref } from 'vue';
  import nvmRules from '@/json/nvm.json';
  export default {
    name: 'NvmWindows',
    myJson: nvmRules,
    methods: {
      chunkArray(array, size) {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
          result.push(array.slice(i, i + size));
        }
        return result;
      }
    },
    computed: {
      getRules() {
        return this.$options.myJson["nvm"]
      },
      formatRules() {
        return this.chunkArray(this.getRules, 3)
      }
    },
    setup() {

      return {
        
      }
    }
  }
</script>

<style scoped>
  .fx-bg {
    background-color: #fcfcfc;
    color: black;
    border-left: 1px dashed #ccc;
    background: repeating-linear-gradient(to bottom, transparent, transparent 10px, #f4f4f4 10px, #f4f4f4 11px), repeating-linear-gradient(to right, transparent, transparent 10px, #f4f4f4 10px, #f4f4f4 11px);
    background-clip: padding-box;
  }
</style>