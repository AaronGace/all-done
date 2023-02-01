// Aqui copiamos y pegamos todo el codigo del router (en este caso lo he cogido de la explicación de ironhack)

import { createRouter, createWebHistory } from 'vue-router';
// Acuerdate que se pone dos puntos
import Login from '../main-components/Login.vue' 
import Home from '../main-components/Home.vue' 

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
