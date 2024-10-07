import { createRouter, createWebHistory } from 'vue-router';
import ChangePassword from '../components/ChangePassword.vue'; // Tu componente de recuperación de contraseña
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
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
