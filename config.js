import _ from 'lodash'
import {cache} from '@/utils/tools.js'

const globalConfigStorage = cache.get('globalConfigStorage')

const iconList = cache.get("iconList")

// 是否是开发环境
// 开发环境中的api需要在manifest.json中的源码视图>h5>devServer>proxy中添加路径即可
const isDev = true
export const globalConfig = isDev?{
	formHost: "http://localhost:8080/form",
	dataHost: "http://localhost:8080/data",
	endpoint: "http://localhost:8080",
	tokenStorageKey:"token",
	iconList:iconList
}:{
	formHost: _.get(globalConfigStorage,"formHost","https://api.mock.smallsaas.cn/form"),
  dataHost: _.get(globalConfigStorage, 'dataHost', 'https://api.mock.smallsaas.cn/data'),
  endpoint: _.get(globalConfigStorage, 'endpoint', 'http://repo.dev.smallsaas.cn:8084'),
  tokenStorageKey:"token",
	iconList:iconList
}