import _ from 'lodash'
import {cache} from '@/utils/tools.js'

const globalConfigStorage = cache.get('globalConfigStorage')

const iconList = cache.get("iconList")

// 是否爲開發環境 雙配置 兼容生産及開發環境
const isDev = false
// #ifdef APP-PLUS
export const globalConfig = isDev?{
	cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "http://api.dev.smallsaas.cn:8087/form",
  dataHost: "http://api.dev.smallsaas.cn:8087/data",
  endpoint: "http://api.dev.smallsaas.cn:8087",
  imageEndpoint: "http://api.dev.smallsaas.cn:8087",
  tokenStorageKey:"token",
	iconList:iconList
}:{
	cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "https://www.metagugu.net/form",
	dataHost: "https://www.metagugu.net/data",
	endpoint: "https://www.metagugu.net",
	imageEndpoint: "https://www.metagugu.net",
	tokenStorageKey:"token",
	iconList:iconList
}
// #endif
// #ifdef H5
export const globalConfig = isDev?{
	cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "/form",
  dataHost: "/data",
  endpoint: "http://api.dev.smallsaas.cn:8087",
  imageEndpoint: "http://api.dev.smallsaas.cn:8087",
  tokenStorageKey:"token",
	iconList:iconList
}:{
	cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "https://www.metagugu.net/form",
	dataHost: "https://www.metagugu.net/data",
	endpoint: "https://www.metagugu.net",
	imageEndpoint: "https://www.metagugu.net",
	tokenStorageKey:"token",
	iconList:iconList
}
// #endif