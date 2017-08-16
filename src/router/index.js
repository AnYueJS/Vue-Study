import Vue from 'vue'
import Router from 'vue-router'
import Login from './login'
import Nav from './nav'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    ...Login,
    ...Nav,
  ]
});
export default router;
