import _ from 'lodash'
import {cache} from '@/utils/tools.js'

const globalConfigStorage = cache.get('globalConfigStorage')

const iconList = cache.get("iconList")
// #ifdef APP-PLUS
export const globalConfig = {
	cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "http://repo.dev.smallsaas.cn:8087/form",
  dataHost: "http://repo.dev.smallsaas.cn:8087/data",
  endpoint: "http://repo.dev.smallsaas.cn:8087",
  tokenStorageKey:"token",
	iconList:iconList
}
// #endif
// #ifdef H5
// 配置統一
export const globalConfig = {
	cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "/form",
  dataHost: "/data",
  endpoint: "",
  tokenStorageKey:"token",
	iconList:iconList
}
// #endif