import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    meta: {
      title: 'Início',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Main.vue'),
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
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' | Bemyhelp Essencial';
  next();
});

router.afterEach(() => localStorage.removeItem('not_allowed'));

export default router;
