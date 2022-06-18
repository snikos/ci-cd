import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {capitalize, isObject} from '@/filters/helpers'
import directives from '@/directives'
//import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from './plugins/font-awesome'

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
    .use(store)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
