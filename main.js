import Vue from 'vue'
import App from './App'
import 'vant/lib/index.less';
import DynamicPage from './components/dynamic-page/index.vue'
import DynamicForm from './components/dynamic-form/index.vue'
import DynamicList from './components/dynamic-list/index.vue'
import card from './components/other/Card.vue'
import {globalConfig} from '@/config.js'
import {api} from './common/api.js'
import {timeCache,cache,reload,upload,frozen} from '@/utils/tools.js'
import mask from './components/mask/index.vue'
import prettyButton from './components/prettyButton.vue'
import store from './store/common.js'

// import './other.less'
let transformTools= require('./utils/CNTWtransformTools.js')
Vue.config.productionTip = false
// #ifdef H5
import Vant from 'vant'
Vue.use(Vant)
// #endif
// #ifdef APP-PLUS
import vanactionsheet from './wxcomponents/vant/action-sheet/index.vue'
Vue.component("van-action-sheet",vanactionsheet)
import vanarea from './wxcomponents/vant/area/index.vue'
Vue.component("van-area",vanarea)
import vanbutton from './wxcomponents/vant/button/index.vue'
Vue.component("van-button",vanbutton)
import vancard from './wxcomponents/vant/card/index.vue'
Vue.component("van-card",vancard)
import vancell from './wxcomponents/vant/cell/index.vue'
Vue.component("van-cell",vancell)
import vancellgroup from './wxcomponents/vant/cell-group/index.vue'
Vue.component("van-cell-group",vancellgroup)
import vancheckbox from './wxcomponents/vant/checkbox/index.vue'
Vue.component("van-checkbox",vancheckbox)
import vancheckboxgroup from './wxcomponents/vant/checkbox-group/index.vue'
Vue.component("van-checkbox-group",vancheckboxgroup)
import vancol from './wxcomponents/vant/col/index.vue'
Vue.component("van-col",vancol)
import vandialog from './wxcomponents/vant/dialog/index.vue'
Vue.component("van-dialog",vandialog)
import vanfield from './wxcomponents/vant/field/index.vue'
Vue.component("van-field",vanfield)
import vangoodsaction from './wxcomponents/vant/goods-action/index.vue'
Vue.component("van-goods-action",vangoodsaction)
import vangoodsactionicon from './wxcomponents/vant/goods-action-icon/index.vue'
Vue.component("van-goods-action-icon",vangoodsactionicon)
import vangoodsactionbutton from './wxcomponents/vant/goods-action-button/index.vue'
Vue.component("van-goods-action-button",vangoodsactionbutton)
import vanicon from './wxcomponents/vant/icon/index.vue'
Vue.component("van-icon",vanicon)
import vanimage from './wxcomponents/vant/image/index.vue'
Vue.component("van-image",vanimage)
import vanloading from './wxcomponents/vant/loading/index.vue'
Vue.component("van-loading",vanloading)
import vannoticebar from './wxcomponents/vant/notice-bar/index.vue'
Vue.component("van-notice-bar",vannoticebar)
import vannotify from './wxcomponents/vant/notify/index.vue'
Vue.component("van-notify",vannotify)
import vanpanel from './wxcomponents/vant/panel/index.vue'
Vue.component("van-panel",vanpanel)
import vanpopup from './wxcomponents/vant/popup/index.vue'
Vue.component("van-popup",vanpopup)
import vanprogress from './wxcomponents/vant/progress/index.vue'
Vue.component("van-progress",vanprogress)
import vanradio from './wxcomponents/vant/radio/index.vue'
Vue.component("van-radio",vanradio)
import vanradiogroup from './wxcomponents/vant/radio-group/index.vue'
Vue.component("van-radio-group",vanradiogroup)
import vanrow from './wxcomponents/vant/row/index.vue'
Vue.component("van-row",vanrow)
import vansearch from './wxcomponents/vant/search/index.vue'
Vue.component("van-search",vansearch)
import vanslider from './wxcomponents/vant/slider/index.vue'
Vue.component("van-slider",vanslider)
import vanstepper from './wxcomponents/vant/stepper/index.vue'
Vue.component("van-stepper",vanstepper)
import vansteps from './wxcomponents/vant/steps/index.vue'
Vue.component("van-steps",vansteps)
import vansubmitbar from './wxcomponents/vant/submit-bar/index.vue'
Vue.component("van-submit-bar",vansubmitbar)
import vanswipecell from './wxcomponents/vant/swipe-cell/index.vue'
Vue.component("van-swipe-cell",vanswipecell)
import vanswitch from './wxcomponents/vant/switch/index.vue'
Vue.component("van-switch",vanswitch)
import vannavbar from './wxcomponents/vant/nav-bar/index.vue'
Vue.component("van-nav-bar",vannavbar)
import vantab from './wxcomponents/vant/tab/index.vue'
Vue.component("van-tab",vantab)
import vantabs from './wxcomponents/vant/tabs/index.vue'
Vue.component("van-tabs",vantabs)
import vantabbar from './wxcomponents/vant/tabbar/index.vue'
Vue.component("van-tabbar",vantabbar)
import vantabbaritem from './wxcomponents/vant/tabbar-item/index.vue'
Vue.component("van-tabbar-item",vantabbaritem)
import vantag from './wxcomponents/vant/tag/index.vue'
Vue.component("van-tag",vantag)
import vantoast from './wxcomponents/vant/toast/index.vue'
Vue.component("van-toast",vantoast)
import vantransition from './wxcomponents/vant/transition/index.vue'
Vue.component("van-transition",vantransition)
import vantreeselect from './wxcomponents/vant/tree-select/index.vue'
Vue.component("van-tree-select",vantreeselect)
import vandatetimepicker from './wxcomponents/vant/datetime-picker/index.vue'
Vue.component("van-datetime-picker",vandatetimepicker)
import vanrate from './wxcomponents/vant/rate/index.vue'
Vue.component("van-rate",vanrate)
import vancollapse from './wxcomponents/vant/collapse/index.vue'
Vue.component("van-collapse",vancollapse)
import vancollapseitem from './wxcomponents/vant/collapse-item/index.vue'
Vue.component("van-collapse-item",vancollapseitem)
import vanpicker from './wxcomponents/vant/picker/index.vue'
Vue.component("van-picker",vanpicker)
import vandropdownmenu from './wxcomponents/vant/dropdown-menu/index.vue'
Vue.component("van-dropdown-menu",vandropdownmenu)
import vandropdownitem from './wxcomponents/vant/dropdown-item/index.vue'
Vue.component("van-dropdown-item",vandropdownitem)
import vanuploader from './wxcomponents/vant/uploader/index.vue'
Vue.component("van-uploader",vanuploader)
import vanoverlay from './wxcomponents/vant/overlay/index.vue'
Vue.component("van-overlay",vanoverlay)
import vancircle from './wxcomponents/vant/circle/index.vue'
Vue.component("van-circle",vancircle)
import vancountdown from './wxcomponents/vant/count-down/index.vue'
Vue.component("van-count-down",vancountdown)
import vandivider from './wxcomponents/vant/divider/index.vue'
Vue.component("van-divider",vandivider)
import vangrid from './wxcomponents/vant/grid/index.vue'
Vue.component("van-grid",vangrid)
import vangriditem from './wxcomponents/vant/grid-item/index.vue'
Vue.component("van-grid-item",vangriditem)
import vanskeleton from './wxcomponents/vant/skeleton/index.vue'
Vue.component("van-skeleton",vanskeleton)
import vansticky from './wxcomponents/vant/sticky/index.vue'
Vue.component("van-sticky",vansticky)
import vanindexbar from './wxcomponents/vant/index-bar/index.vue'
Vue.component("van-index-bar",vanindexbar)
import vanindexanchor from './wxcomponents/vant/index-anchor/index.vue'
Vue.component("van-index-anchor",vanindexanchor)
import vansidebar from './wxcomponents/vant/sidebar/index.vue'
Vue.component("van-sidebar",vansidebar)
import vansidebaritem from './wxcomponents/vant/sidebar-item/index.vue'
Vue.component("van-sidebar-item",vansidebaritem)
import vancalendar from './wxcomponents/vant/calendar/index.vue'
Vue.component("van-calendar",vancalendar)
import vansharesheet from './wxcomponents/vant/share-sheet/index.vue'
Vue.component("van-share-sheet",vansharesheet)
import vanempty from './wxcomponents/vant/empty/index.vue'
Vue.component("van-empty",vanempty)

// #endif
Vue.prototype.$config = globalConfig
Vue.prototype.$api = api
// 永久緩存
Vue.prototype.$cache = cache
// 臨時緩存
Vue.prototype.$timeCache = timeCache
Vue.prototype.$reload = reload
Vue.prototype.$upload = upload
// 簡繁體轉換
Vue.prototype.$zh_tw = transformTools.transformToTW
Vue.prototype.$zh_cn = transformTools.transformToCN
Vue.prototype.$JSONTW = transformTools.JSONTW
Vue.prototype.$JSONCN = transformTools.JSONCN
// 是否解凍
Vue.prototype.$frozen = frozen
//組件聲明
Vue.component("dynamic-page",DynamicPage)
Vue.component("dynamic-form",DynamicForm)
Vue.component("dynamic-list",DynamicList)
Vue.component("card",card)
Vue.component("gMask",mask)
Vue.component("pretty-button",prettyButton)


App.mpType = 'app'


const type = new Vue()

Vue.prototype.$type = type

const app = new Vue({
    ...App,
    store
})
app.$mount()
