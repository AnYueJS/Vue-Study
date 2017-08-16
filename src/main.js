// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import iView from 'iview'
import http from './config/http'
import filter from './config/filters'
import 'iview/dist/styles/iview.css'
import vueResource from 'vue-resource'
import Auth from './config/auth.js'

Vue.use(vueResource);
Vue.use(iView);
Vue.config.productionTip = false;
filter(Vue);

Vue.prototype.$https = http;
Vue.prototype.customization_channel_id = http.customization_channel_id;
Vue.prototype.uploadHost = http.uploadHost;

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !Auth.authenticated())
  {
    next( {name: 'Login'});
    query: { redirect: to.fullPath };
  }
  else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});


