import { request, upLoad } from './request'
import { globalConfig } from '@/config.js'


// 获取全局配置
export const api = {
	getGlobalConfig(params){
		const url = `${globalConfig.dataHost}?id=9999998`
		return request('GET', url, params)
	},
	getIcon(params){
	const url = `${globalConfig.dataHost}?id=9999999`
	return request('GET',url,params)
	},
	getspiritMarket(params){
	const url = `${globalConfig.endPoint}/api/crud/oms/wisp/wisps/market`
	return request('GET',url,params)
	},
}