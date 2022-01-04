import Vue from 'vue'
import App from './App'
import 'vant/lib/index.less';
import DynamicPage from './components/dynamic-page/index.vue'
import DynamicForm from './components/dynamic-form/index.vue'
import DynamicList from './components/dynamic-list/index.vue'
import card from './components/other/Card.vue'
import {globalConfig} from '@/config.js'
import {api} from './common/api.js'
import {timeCache,cache,reload,upload} from '@/utils/tools.js'
import mask from './components/mask/index.vue'
import './other.less'


Vue.config.productionTip = false
// #ifdef H5
import Vant from 'vant'
Vue.use(Vant)
// #endif
// #ifdef APP-PLUS

// #endif
Vue.prototype.$config = globalConfig
Vue.prototype.$api = api
// 永久缓存
Vue.prototype.$cache = cache
// 临时缓存
Vue.prototype.$timeCache = timeCache
Vue.prototype.$reload = reload
Vue.prototype.$upload = upload

Vue.component("dynamic-page",DynamicPage)
Vue.component("dynamic-form",DynamicForm)
Vue.component("dynamic-list",DynamicList)
Vue.component("card",card)
Vue.component("mask",mask)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
