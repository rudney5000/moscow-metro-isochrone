import { createApp } from 'vue'
import App from './App.vue'
import '../app/styles/global.module.scss'
import {createPinia} from "pinia";

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
