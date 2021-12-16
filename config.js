import _ from 'lodash'
import {cache} from '@/utils/tools.js'

const globalConfigStorage = cache.get('globalConfigStorage')

// 是否是开发环境
// 开发环境中的api需要在manifest.json中的源码视图>h5>devServer>proxy中添加路径即可
const isDev = true
export const globalConfig = isDev?{
	formHost: "/form",
	dataHost: "/data",
	endpoint: "/"
}:{
	formHost: _.get(globalConfigStorage,"formHost","https://api.mock.smallsaas.cn/form"),
  dataHost: _.get(globalConfigStorage, 'dataHost', 'https://api.mock.smallsaas.cn/data'),
  endpoint: _.get(globalConfigStorage, 'endpoint', 'https://api.mock.smallsaas.cn'),
}