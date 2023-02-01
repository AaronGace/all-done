import { createApp } from 'vue'
import './css/style.css'
// Aqui importamos el router
import router from "./router/router.js"
import App from './App.vue'
import { createPinia } from "pinia";

const pinia = createPinia();

// Y aquí se añade .use(router) para añadirlo en la aplicación (creo que es sintaxis antigua pese a que funciona igualmente)
createApp(App).use(router).use(pinia).mount('#app')
