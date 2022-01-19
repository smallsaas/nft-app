import { request, upLoad } from './request'
import { globalConfig } from '@/config.js'


// 獲取全局配置
export const api = {
	//根据转存收益转化GUGU令
	zhuancunforgugu(params){
		const url = `${globalConfig.endpoint}/api/u/player/signInSettlement`
		return request('POST',url,params)
	},
	//根据帮会收益转化GUGU令
	banhuiforgugu(params){
		const url = `${globalConfig.endpoint}/api/u/player/signInSettlement`
		return request('POST',url,params)
	},
	//根据推荐收益转化GUGU令
	tuijianforgugu(params){
		const url = `${globalConfig.endpoint}/api/u/player/signInSettlement`
		return request('POST',url,params)
	},
	//提取簽到收益
	tiquqiandaoshouyi(params){
		const url = `${globalConfig.endpoint}/api/u/player/signInSettlement`
		return request('POST',url,params)
	},
	//轉化轉存收益
	zhuanhuaTypeThree(params){
		const url = `${globalConfig.endpoint}/api/u/player/getRedepositBallance`
		return request('GET',url,params)
	},
	//轉化幫會收益
	zhuanhuaTypeTwo(params){
		const url = `${globalConfig.endpoint}/api/u/player/signInSettlement/teamBenefits`
		return request('GET',url,params)
	},
	//轉化推薦收益
	zhuanhuaType(params){
		const url = `${globalConfig.endpoint}/api/u/player/signInSettlement/levelOneShare`
		return request('GET',url,params)
	},
	// 找回密碼
	findPassword(params){
		const url = `${globalConfig.endpoint}/api/app/oauth/account/findPassword`
		return request("POST",url,params)
	},
	//短信
	message(params){
		const url = `${globalConfig.endpoint}/api/sms/v1/captcha`
		return request('POST',url,params)
	},
	//查看轉讓記錄
	checkHistory(params){
		const url = `${globalConfig.endpoint}/api/u/player/getUserGUGURecord`
		return request('GET',url,params)
	},
	//查看推薦收益明細
	checkT(params){
		const url = `${globalConfig.endpoint}/api/u/player/profitDetailed/levelOneShare`
		return request('GET',url,params)
	},
	//查看幫會收益明細
	checkB(params){
		const url = `${globalConfig.endpoint}/api/u/player/profitDetailed/teamBenefits`
		return request('GET',url,params)
	},
	//獲取用戶簽到記錄
	loadUserSignHistory(data,params){
		const url = `${globalConfig.endpoint}/api/u/sign?month=${data.month}&year=${data.year}`
		return request('GET',url,params)
	},
	//獲取申述記錄
	loadUserComplainHistory(params){
		const url = `${globalConfig.endpoint}/api/u/order/wisp/complains`
		return request('GET',url,params)
	},
	//用戶注冊協議
	getUserRegistInfo(params){
		const url = `${globalConfig.endpoint}/api/pub/cms/term/config?type=MEMBER_RULE`
		return request('GET',url,params)
	},
	// 獲取簽到記錄
	getSignMes(params){
		const url = `${globalConfig.endpoint}/api/u/sign`
		return request('GET',url,params)
	},
	// 簽名
	sign(params){
		const url = `${globalConfig.endpoint}/api/u/sign`
		return request('POST',url,params)
	},
	// 補簽事件
	repleinishSign(params){
		const url = `${globalConfig.endpoint}/api/u/sign/replenish`
		return request('POST',url,params)
	},
	//确認收款
	getUserOrderInfo(params){
		const url = `${globalConfig.endpoint}/api/u/wisp/selling`
		return request('GET',url,params)
	},
	// //賣家确認收款信息
	// getUserOrderInfo(params){
	// 	const url = `${globalConfig.endpoint}/api/u/order/wisp/${params.wispOrderId}/confirmReceived`
	// 	return request('POST',url,params)
	// },
	//提交訂單申述
	orderCpmplain(params){
		const url = `${globalConfig.endpoint}/api/u/order/wisp/complain`
		return request('POST',url,params)
	},
	//查看申述記錄
	checkOrderCpmplain(data,params){
		const url = `${globalConfig.endpoint}/api/u/order/wisp/complains`
		return request('GET',url,params)
	},
	// 後台字段配置
	getFieldConfig(params){
		const url = `${globalConfig.endpoint}/api/u/config/fields`
		return request('GET',url,params)
	},
	// 修改密碼
	changePassword(params){
		let param={...params}
		const url = `${globalConfig.endpoint}/api/u/player/paymentPassword/change`
		return request('POST',url,param)
	},
	// 解凍
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
	// editUserData(params){
	// 	const url = `${globalConfig.endpoint}/api/u/player`
	// 	return request('PUT',url,params)
	// },
	// // 個人資料編輯(修改副手機号，修改支付密碼)
	// editAccountData(id,params){
	// 	const url = `${globalConfig.endpoint}/api/crud/oms/player/players/${id}`
	// 	return request('PUT',url,params)
	// },
	
	// // 新版用戶個人信息編輯(修改手機号)
	// editUserData(params){
	// 	let param={...params,"verifyCode":"123456"}
	// 	const url = `${globalConfig.endpoint}/api/u/player/backupMobilePhone/change`
	// 	return request('POST',url,param)
	// },
	
	// 新版用戶個人信息編輯(修改手機号)
	editUserData(params){
		let param={...params}
		const url = `${globalConfig.endpoint}/api/u/player/backupMobilePhone/change`
		return request('POST',url,param)
	},
	
	// 新版個人資料編輯(修改副手機号，修改支付密碼)
	editAccountData(params){
		const url = `${globalConfig.endpoint}/api/u/player/phone/change`
		return request('POST',url,params)
	},
	//新版修改副手機号
	editBackUpPhone(params){
		const url = `${globalConfig.endpoint}/api/u/player/phone/change`
		return request('POST',url,params)
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
	
	//獲取直推查詢列表
	getStrightTeam(params){
		const url = `${globalConfig.endpoint}/api/u/player/getChildrenById`
		return request("GET",url,params)
	},
	
	//獲取付款信息
	getOrderInfo(data,params){
		const url = `${globalConfig.endpoint}/api/u/order/wisp/${data.wispOrderId}/queryByBuyer`
		return request("GET",url,params)
	},
	
	// //收款信息
	// getOrderBuyerInfo(data,params){
	// 	const url = `${globalConfig.endpoint}/api/u/order/wisp/${data.wispOrderId}/confirmReceived`
	// 	return request("POST",url,params)
	// },
	
	//success賣家收款
	successGetMoneyForSeller(data,params){
			const url = `${globalConfig.endpoint}/api/u/order/wisp/${data.wispOrderId}/confirmReceived`
			return request("POST",url,params)
	},
	
	//獲取精靈訂單信息
	getSpiritOrderInfo(params){
		const url = `${globalConfig.endpoint}/api/u/order/wisp`
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
		const url = `${globalConfig.endpoint}/api/u/order/wisp/confirmPayment`
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
	
	//更新玩家信息
	updateUserAvatar(params){
	const url = `${globalConfig.endpoint}/api/u/player/Avatar/change`
	return request('POST',url,params)
	},
}