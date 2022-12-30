import { createApp } from 'vue'
import App from './App.vue'
import VueFeather from 'vue-feather';
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'


const pinia = createPinia()

createApp(App).component(VueFeather.name, VueFeather).use(pinia).use(Notifications).mount('#app')
