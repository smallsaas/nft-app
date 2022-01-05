<template>
	<view class="spirit">
		<view class="item">
			<text>姓名:{{item.name}}</text>
			<text>主手機号碼:{{item.mobilePhone}}</text>
			<text>副手機号碼:{{item.secondMobilePhone}}</text>
			<text>賬号狀态:{{item.status}}</text>
			<text>移動賬号:{{item.wechatAccount}}</text>
			<text>支付二維碼:<image src="https://s2.loli.net/2021/12/20/WPKatHfhmSsdQuF.jpg" mode="widthFix"></image></text>
			<text>銀行卡号:{{item.bankAccountNumber}}</text>
			<text>戶名:{{item.bankAccountName}}</text>
			<text>支付密碼:{{item.paymentPassword}}</text>
		</view>
	</view>
</template>

<script>
	import {globalConfig} from '@/config.js'
	import {api} from '@/common/api.js'
	export default {
		name:'spirit',
		props: {
			item: Object,
			ext: Object
		},
	}
</script>

<style lang="less">
	.spirit{
		width: 100%;
		height: 100%;
		.item{
			width: 100%;
			height: auto;
			border: 2px solid red;
		}
}
</style>
