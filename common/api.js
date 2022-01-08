import { request, upLoad } from './request'
import { globalConfig } from '@/config.js'


// 獲取全局配置
export const api = {
	// 后台字段配置
	getFieldConfig(params){
		const url = `${globalConfig.endpoint}/api/u/config/fields`
		return request('GET',url,params)
	},
	// 解冻
	unlock(params){
		const url = `${globalConfig.endpoint}/api/u/player/unlock`
		return request('POST',url,params)
	},
	// 主頁配置
	homePage(params){
		const url = `${globalConfig.dataHost}?id=1000000`
		return request('GET',url,params)
	},
	// 個人資料獲取
	getAccountData(id,params){
		const url = `${globalConfig.endpoint}/api/crud/oms/player/players/${id}`
		console.log(id)
		return request('GET',url,params)
	},
	// 用戶個人信息編輯(修改手機号)
	editUserData(params){
		const url = `${globalConfig.endpoint}/api/u/player`
		return request('PUT',url,params)
	},
	// 個人資料編輯(修改副手機号，修改支付密碼)
	editAccountData(id,params){
		const url = `${globalConfig.endpoint}/api/crud/oms/player/players/${id}`
		return request('PUT',url,params)
	},
	// tabbar 頁配置
	tabbar(id,params){
		const url = `${globalConfig.dataHost}?id=${id}`
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
	//注冊
	regist(params){
	const url = `${globalConfig.endpoint}/api/app/oauth/player/register`
	return request('POST',url,params)
	},
	//登錄
	login(params){
	const url = `${globalConfig.endpoint}/api/app/oauth/player/login`
	return request('POST',url,params)
	},
	//預約精靈
	bookSpirit(params){
	const url = `${globalConfig.endpoint}/api/u/wisp/${params.wispId}/book`
	return request('POST',url,params)
	},
	//購買能力晶石
	buyCompanySpirit(params){
	const url = `${globalConfig.endpoint}/api/u/companionWisp/${params.companionWispId}/buy`
	return request('POST',url,params)
	},
	//購買土地
	buyLand(params){
	const url = `${globalConfig.endpoint}/api/u/land/${params.landId}/buy`
	return request('POST',url,params)
	},
	
	//轉讓精靈令
	transferCoin(params){
	const url = `${globalConfig.endpoint}/api/u/player/transferCoins`
	return request('POST',url,params)
	},
	
	//重新獲取錢包
	getUserWallet(params){
		const url = `${globalConfig.endpoint}/api/u/player/wallet`
		return request("GET",url,params)
	},
	
	searchTeam(params){
		const url = `${globalConfig.endpoint}/api/u/player/getChildrenByUserId/${params.userId}`
		return request('POST',url,params)
	},
	
	//新獲取用戶個人詳情信息
	getInformationNew(params){
		const url = `${globalConfig.endpoint}/api/u/player`
		return request("GET",url,params)
	},
	
	
	//玩家付款
	userPay(params){
		const url = `${globalConfig.endpoint}/api/u/order/wisp/57/confirmPayment?pictureUrl=`
		return request("POST",url,params)
	},
	
	//獲取個人詳情信息
	getInformation(params,id){
		const url = `${globalConfig.endpoint}/api/crud/oms/player/players/${id}`
		return request("GET",url,params)
	},
	//修改個人詳情信息
	updateInformation(params,id){
		const url = `${globalConfig.endpoint}/api/crud/oms/player/players/${id}`
		return request("PUT",url,params)
	},
	getspiritMarket(params){
	const url = `${globalConfig.endpoint}/api/crud/oms/wisp/wisps/market`
	return request('GET',url,params)
	},
}