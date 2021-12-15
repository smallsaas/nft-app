import Vue from 'vue'
import App from './App'
import Vant from 'vant'
import 'vant/lib/index.less';
import DynamicPage from './components/dynamic-page/index.vue'
import DynamicForm from './components/dynamic-form/index.vue'
import DynamicList from './components/dynamic-list/index.vue'
import card from './components/other/Card.vue'
import {globalConfig} from '@/config.js'
import {api} from './common/api.js'
import {timeCache,cache,reload} from '@/utils/tools.js'

Vue.config.productionTip = false
Vue.use(Vant)

Vue.prototype.$config = globalConfig
Vue.prototype.$api = api
// 永久缓存
Vue.prototype.$cache = cache
// 临时缓存
Vue.prototype.$timeCache = timeCache
Vue.prototype.$reload = reload

Vue.component("dynamic-page",DynamicPage)
Vue.component("dynamic-form",DynamicForm)
Vue.component("dynamic-list",DynamicList)
Vue.component("card",card)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
