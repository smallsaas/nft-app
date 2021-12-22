<template>
	<view class="spirit">
		<view class="item">
			<text>姓名:{{item.name}}</text>
			<text>主手机号码:{{item.mobilePhone}}</text>
			<text>副手机号码:{{item.secondMobilePhone}}</text>
			<text>账号状态:{{item.status}}</text>
			<text>移动账号:{{item.wechatAccount}}</text>
			<text>支付二维码:<image src="https://s2.loli.net/2021/12/20/WPKatHfhmSsdQuF.jpg" mode="widthFix"></image></text>
			<text>银行卡号:{{item.bankAccountNumber}}</text>
			<text>户名:{{item.bankAccountName}}</text>
			<text>支付密码:{{item.paymentPassword}}</text>
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
