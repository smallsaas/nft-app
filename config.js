import _ from 'lodash'
import {cache} from '@/utils/tools.js'

const globalConfigStorage = cache.get('globalConfigStorage')

const iconList = cache.get("iconList")

// 是否爲開發環境 雙配置 兼容生産及開發環境
const isDev = false
<<<<<<< HEAD
const serverName = 'de' //生产环境: net、me
=======
const serverName = 'me' //生产环境: net、me

>>>>>>> 9a61f1d0be208e0625a95109b023da8f8a3e1e35
// #ifdef APP-PLUS 
export const globalConfig = isDev?{
	cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "http://49.119.119.7:8082/form",
  dataHost: "http://49.119.119.7:8082/data",
  endpoint: "http://49.119.119.7:8082",
  imageEndpoint: "http://49.119.119.7:8082",
  tokenStorageKey:"token",
	iconList:iconList
}: serverName === 'net' ? {
	cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "https://www.metagugu.net/form",
	dataHost: "https://www.metagugu.net/data",
	endpoint: "https://www.metagugu.net",
	imageEndpoint: "https://www.metagugu.net",
	tokenStorageKey:"token", 
	iconList:iconList
}: serverName === 'de' ? {
	cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "https://www.metagugu.de/form",
	dataHost: "https://www.metagugu.de/data",
	endpoint: "https://www.metagugu.de",
	imageEndpoint: "https://www.metagugu.de",
	tokenStorageKey:"token", 
	iconList:iconList
}:{
	cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "https://www.metagugu.me/form",
	dataHost: "https://www.metagugu.me/data",
	endpoint: "https://www.metagugu.me",
	imageEndpoint: "https://www.metagugu.me",
	tokenStorageKey:"token",
	iconList:iconList
}
// #endif
// #ifdef H5
export const globalConfig = isDev?{
	cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "http://49.119.119.7:8082/form",
  dataHost: "http://49.119.119.7:8082/data",
  endpoint: "http://49.119.119.7:8082",
  imageEndpoint: "http://49.119.119.7:8082",
  tokenStorageKey:"token",
	iconList:iconList
}: serverName === 'net' ? {
	cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "https://www.metagugu.net/form",
	dataHost: "https://www.metagugu.net/data",
	endpoint: "https://www.metagugu.net",
	imageEndpoint: "https://www.metagugu.net",
	tokenStorageKey:"token",
	iconList:iconList
}: serverName === 'de' ? {
	cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "https://www.metagugu.de/form",
	dataHost: "https://www.metagugu.de/data",
	endpoint: "https://www.metagugu.de",
	imageEndpoint: "https://www.metagugu.de",
	tokenStorageKey:"token", 
	iconList:iconList
}
:{cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "https://www.metagugu.me/form",
	dataHost: "https://www.metagugu.me/data",
	endpoint: "https://www.metagugu.me",
	imageEndpoint: "https://www.metagugu.me",
	tokenStorageKey:"token",
	iconList:iconList
}
// #endif