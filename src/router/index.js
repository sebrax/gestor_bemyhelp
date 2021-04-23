import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login';
import Main from '../views/Main';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Entrar',
    meta: {
      title: 'Entrar',
    },
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('sid')) {
        router.push('inicio');
      }
      next();
    },
  },
  {
    path: '/inicio',
    name: 'Início',
    component: Main,
    meta: {
      title: 'Início',
    },
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('sid')) {
        router.push('/');
        localStorage.setItem('not_allowed', false);
      }
      next();
    },
  },
];
/* const routes = [
  {
    path: '/',
    name: 'Main',
    meta: {
      title: 'Início',
    },
    component: () =>
      import('../views/Main.vue'),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('sid')) {
        router.push('entrar');
        localStorage.setItem('not_allowed', false);
      }
      next();
    },
  },
  {
    path: '/entrar',
    name: 'Entrar',
    component: Login,
    meta: {
      title: 'Entrar',
    },
  },
]; */

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' | Bemyhelp Essencial';
  next();
});

router.afterEach(to => {
  localStorage.removeItem('not_allowed');
  if (to.path != '/' && !localStorage.getItem('sid')) {
    router.push('/');
  }
});

export default router;
