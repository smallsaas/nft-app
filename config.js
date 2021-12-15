import _ from 'lodash'
import {cache} from '@/utils/tools.js'

const globalConfigStorage = cache.get('globalConfigStorage')

export const globalConfig = {
	formHost: _.get(globalConfigStorage,"formHost","https://api.mock.smallsaas.cn/form"),
  dataHost: _.get(globalConfigStorage, 'dataHost', 'https://api.mock.smallsaas.cn/data'),
  endpoint: _.get(globalConfigStorage, 'endpoint', 'https://api.mock.smallsaas.cn'),
}