import { createApp } from 'vue';
import App from './app.vue';
import router from './router'; // Importa el router

// import '@fortawesome/fontawesome-free/css/all.css';
// import Vue from 'vue';
// import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css';

// Vue.use(Vuetify);
// export default new Vuetify({
//   icons: {
//     iconfont: 'fa',
//   },
// });

const app = createApp(App);

app.use(router); // Usa el router en la aplicación

app.mount('#app');
