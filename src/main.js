import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import {capitalize, isObject} from '@/filters/helpers';
import directives from '@/directives';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
//import { fab } from '@fortawesome/free-brands-svg-icons';
//import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas);
dom.watch();
//import { FontAwesomeIcon } from './plugins/font-awesome';

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
