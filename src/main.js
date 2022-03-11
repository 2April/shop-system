import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
//导入全局样式表
import './assets/css/global.css'

Vue.config.productionTip = false

import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
axios.interceptors.request.use(config => {
        config.headers.Authorization = window.sessionStorage.getItem('token')
            // 最后必须return config 
        return config
    })
    // 把包挂载在vue的原型上
Vue.prototype.$http = axios

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')