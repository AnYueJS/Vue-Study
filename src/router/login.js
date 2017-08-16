/**
 * Created by zhiqiang on 2017/5/5.
 */
export default [
  {
    path: '/login',
    name: 'Login',
    meta: {
      header: {
        require: false,
        title: '登录',
      }
    },
    component: (resolve) => require(['../components/common/Login.vue'], resolve)
  }
]
