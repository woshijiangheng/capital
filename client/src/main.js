import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element
import ElementUI from 'element-ui'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
    // 配置loading加载
import { Loading } from 'element-ui';
let loading

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中',
        background: 'rgba(0,0,0,0,7)'
    });
}

function endLoading() {
    loading.close()
}
// 引入asixo
const axios = require('axios')
    //配置axios 
axios.defaults.baseURL = '/'
    // 配置axios
    // 请求拦截
axios.interceptors.request.use(config => {
        startLoading()
        config.headers.Authorization = sessionStorage.token
        return config
    }, error => {
        return Promise.reject(error)
    })
    // 响应拦截
axios.interceptors.response.use(response => {
    endLoading()
    return response;
}, error => {
    // Do something with response error
    return Promise.reject(error);
});
Vue.prototype.$axios = axios
Vue.config.productionTip = false
    //定义一个全局过滤器实现日期格式化
Vue.filter('datrfmt', function(input, fmtstring) { //当input为时间戳时，需转为Number类型
    // 使用momentjs这个日期格式化类库实现日期的格式化功能
    return moment(input).format(fmtstring);
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')