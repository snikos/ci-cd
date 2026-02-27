import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import {capitalize, isObject} from '@/filters/helpers';
import directives from '@/directives';
//import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome';

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$filters = {
    capitalize(value) {
        return capitalize(value)
    },
    isObject(value) {
        return isObject(value)
    }
}

directives.forEach( dir => {
    app.directive(dir.name, dir)
});

app
    .use(pinia)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
