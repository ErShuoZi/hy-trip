import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/css/index.scss'
import router from '@/router/index'
import pinia from './stores/index'

 const app = createApp(App)
 app.use(router)
 app.use(pinia)
 app.mount('#app')
