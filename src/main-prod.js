import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
//导入全局样式表
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本对应的样式
// import 'quill/dist/quill.core.css' // import styles
// import 'quill/dist/quill.snow.css' // for snow theme
// import 'quill/dist/quill.bubble.css' // for bubble theme

// 导入NProgress包对应的JS和CSS
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

import axios from 'axios'


// 配置请求根路径
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
    // 在reques拦截器中展示进度条NProgress.start()
axios.interceptors.request.use((config) => {
        NProgress.start()
        config.headers.Authorization = window.sessionStorage.getItem('token')
            // 最后必须return config
        return config
    })
    // 在response拦截器中隐藏进度条NProgress.done()
axios.interceptors.response.use((config) => {
        NProgress.done()
        return config
    })
    // 把包挂载在vue的原型上
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
    // 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)

// 全局的时间过滤器
Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal * 1000)

    const y = dt.getFullYear()
        // padStart指要满足多少位，不足多少位用什么补
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDay() + '').padStart(2, '0')
    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
    router,
    render: (h) => h(App)
}).$mount('#app')