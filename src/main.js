import Vue from 'vue';
import App from './App.vue';
import router from './router';

require('./assets/styles.scss');
require('vue2-animate/dist/vue2-animate.min.css');

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
