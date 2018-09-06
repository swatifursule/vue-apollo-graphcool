import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { createProvider, apolloProvider } from './vue-apollo';
import 'tachyons'
import { GC_USER_ID } from './constants/settings';

Vue.config.productionTip = false;
const userId = localStorage.getItem(GC_USER_ID);

new Vue({
  router,
  // store,
  provide: apolloProvider.provide(),
  data: {
    userId,
  },
  render: (h) => h(App),
}).$mount('#app');
