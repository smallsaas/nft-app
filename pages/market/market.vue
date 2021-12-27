<template>
	<view class="navBox">
		<view class="nav">
			<view>精灵市场</view>
			<view @click="goTo">签到抽盒</view>
		</view>
		<dynamic-page :API="api"></dynamic-page>
		<bottomtabbar></bottomtabbar>
	</view>
</template>

<script>
	import {globalConfig} from '@/config.js'
	import dynamicPage from '@/components/dynamic-page/index.vue'
	import bottomtabbar from '@/components/bottomtabbar.vue'
	export default {
		components:{
			dynamicPage,
			bottomtabbar
		},
		data() {
			return {
				api:`${globalConfig.formHost}?id=990327`,
			}
		},
		methods: {
			goTo(){
				uni.navigateTo({
					url:'/pages/defaultPage/page?id=990327'
				})
			}
		},
	}
</script>

<style lang="less">
.navBox{
	.nav{
		width: 100%;
		height: 80rpx;
		border: 1px solid red;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
}
</style>
