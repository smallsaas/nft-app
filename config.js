import _ from 'lodash'
import {cache} from '@/utils/tools.js'

const globalConfigStorage = cache.get('globalConfigStorage')

const iconList = cache.get("iconList")

// 配置统一
export const globalConfig = {
	cachePolicy: 1, //页面缓存的时间 默认缓存一天 以天为单位 为0不缓存
	clearPageCache: true,//重启时是否清除页面缓存
	formHost: "/form",
  dataHost: "/data",
  endpoint: "",
  tokenStorageKey:"token",
	iconList:iconList
}