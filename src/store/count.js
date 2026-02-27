import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

//const isObjEmpty = (o) => Object.keys(o).length === 0;

export const useCountStore = defineStore('storeCount', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment }
  // const countStore = ref({});
  // const countError = ref('');

  // async function countLoad() {
  //   await fetch(url)
  //     .then((res) => res.json())
  //     .then(j => {
  //       localStorage.setItem('count', JSON.stringify(j.data));
  //       countStore.value = j.data;
  //     })
  //     .catch(err => {
  //       countError.value = err;
  //     });
  // }

  // return {
  //   countStore,
  //   countError,
  //   countLoad,
  // }
});
