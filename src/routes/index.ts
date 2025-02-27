import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/Login.vue'; 
import Home from '@/pages/Home.vue'; 
import SignUp from '@/pages/SignUp.vue';
import index from '@/pages/index.vue';

const routes = [
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/sign-up', name: 'SignUp', component: SignUp }, 
  { path: '/home', name: 'Home', component: Home },
  { path: '/', name: 'Index', component: index },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;