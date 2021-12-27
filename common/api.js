import { request, upLoad } from './request'
import { globalConfig } from '@/config.js'


// 获取全局配置
export const api = {
	// 主页配置
	homePage(params){
		const url = `${globalConfig.dataHost}?id=1000000`
		return request('GET',url,params)
	},
	getGlobalConfig(params){
		const url = `${globalConfig.dataHost}?id=9999998`
		return request('GET', url, params)
	},
	getIcon(params){
	const url = `${globalConfig.dataHost}?id=9999999`
	return request('GET',url,params)
	},
	//注册
	regist(params){
	const url = `${globalConfig.endpoint}/api/app/oauth/player/register`
	return request('POST',url,params)
	},
	//登录
	login(params){
	const url = `${globalConfig.endpoint}/api/app/oauth/player/login`
	return request('POST',url,params)
	},
	//获取用户个人信息
	getUserInfo(params){
	const url = `${globalConfig.endpoint}/api/u/player`
	return request('GET',url,params)
	},
	//预约精灵
	bookSpirit(params){
	const url = `${globalConfig.endpoint}/api/crud/oms/wispBookingRecord/wispBookingRecords`
	return request('POST',url,params)
	},
	//购买陪伴精灵
	buyCompanySpirit(params){
	const url = `${globalConfig.endpoint}/api/crud/oms/companionWispOrder/companionWispOrders/generate`
	return request('POST',url,params)
	},
	//购买土地
	buyLand(params){
	const url = `${globalConfig.endpoint}/api/crud/oms/landContract/landContracts`
	return request('POST',url,params)
	},
	//获取个人详情信息
	getInformation(params,id){
		const url = `${globalConfig.endpoint}/api/crud/oms/player/players/${id}`
		return request("GET",url,params)
	},
	//修改个人详情信息
	updateInformation(params,id){
		const url = `${globalConfig.endpoint}/api/crud/oms/player/players/${id}`
		return request("PUT",url,params)
	},
	getspiritMarket(params){
	const url = `${globalConfig.endpoint}/api/crud/oms/wisp/wisps/market`
	return request('GET',url,params)
	},
}