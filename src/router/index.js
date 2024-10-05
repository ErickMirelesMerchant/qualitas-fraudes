import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue'; // Tu componente de login
import RecoverPassword from '../components/RecoverPassword.vue'; // Tu componente de recuperación de contraseña

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginForm
  },
  {
    path: '/recover-password',
    name: 'RecoverPassword',
    component: RecoverPassword
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
