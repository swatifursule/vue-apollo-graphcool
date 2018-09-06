import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AppLogin from './components/AppLogin.vue';
import CreateLink from './components/CreateLink.vue';
import LinkList from './components/LinkList.vue';
import Search from './components/Search';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'limbo',
      // component: Limbo,
      redirect: '/new/1',
    },
    {
      path: '/new/:page',
      component: LinkList,
    },
    {
      path: '/create',
      component: CreateLink,
    },
    {
      path: '/login',
      component: AppLogin,
    },
    {
      path: '/search',
      component: Search,
    },
    {
      path: '/top',
      component: LinkList
    },
  ],
});
