import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('dataUsers', () => {
  const userStore = ref([]);
  const userError = ref('');

  if (JSON.parse(localStorage.getItem('companies')) === null) {
    localStorage.setItem('companies', JSON.stringify([]));
  }

  async function getData(quant) {
    //await fetch('https://fakerapi.it/api/v2/users?_quantity=3&_gender=male')
    // https://fakerapi.it/api/v2/persons?_locale=en_EN
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
        localStorage.setItem('companies', JSON.stringify(j.data));
        //console.log(j.data);
        userStore.value = j.data;
      })
      .catch((err) => {
        userError.value = err;
      });
  }

  return {
    userStore,
    userError,
    getData,
  }
});