import axios from 'axios'
import setting from './util_dev.js'
import router from '../router/index.js'
import Auth from './auth.js'


// axios 配置
axios.customization_channel_id = setting.customization_channel_id;
axios.uploadHost = setting.uploadHost;
axios.defaults.timeout = 5000;
axios.defaults.baseURL = setting.APIHost;


// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (Auth.authenticated()) {
          let mx_token = Auth.getToken();
          let mx_secret = Auth.getSecret();
          // config.headers.common["Authorization"] = `Bearer ${token}`;
            config.headers.common["mx_token"] = mx_token;
            config.headers.common["mx_secret"] = mx_secret;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.msg=='auth failed') {
            Auth.logout()
            router.replace({
                path:'/login',
                query: { way: 'login' },
            })
        }
        return response ;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    Auth.logout()
                    router.replace({
                        path:'/login',
                        query: { way: 'login' },
                    })
            }
        }
        console.log(error);//console : Error: Request failed with status code 402
        return Promise.reject(error)
});
export default axios;
