<template>
	<view class="tabs">
		<view class="item" @click="goTo">
			<image class="tabImgOne" src="../../static/service/book.png" mode="widthFix"></image>
			<text class="tabTitleOne">我的记录</text>
		</view>
		<view class="item items" @click="goToTeam">
			<image class="tabImgOne" src="../../static/service/team.png" mode="widthFix"></image>
			<text class="tabTitleOne">我的团队</text>
		</view>
		<!-- <view class="item" @click="goTo">
			<view class="tabBox"><image class="tabImg" src="../../static/service/book.png" mode="widthFix"></image></view>
			<text class="tabTitle">我的记录</text>
		</view>
		<view class="item">
			<view class="tabBox"><image class="tabImg" src="../../static/service/team.png" mode="widthFix"></image></view>
			<text class="tabTitle" @click="goToTeam">我的团队</text>
		</view> -->
	</view>
</template>

<script>
	export default{
		methods:{
			goTo(){
				uni.navigateTo({
					url:"/pages/defaultPage/page?id=" + 999666
				})
			},
			goToTeam(){
				uni.navigateTo({
					url:"/pages/defaultPage/tabbarPage?id=" + 666999
				})
			}
		}
	}
</script>

<style lang="less">
	.tabs{
		    margin-top: 20rpx;
			width: 100%;
			height: 128rpx;
			position: relative;
			.item{
				width: 166px;
				height: 64px;
				background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
				border-top: 2rpx solid rgb(50, 71, 137);
				border-left: 2rpx solid rgb(50, 71, 137);
				border-radius: 8px 8px 8px 8px;
				opacity: 1;
				position: absolute;
				left: 32rpx;
				.tabImgOne{
					position: absolute;
					left: 32rpx;
					top: 15rpx;
					width: 120rpx !important;
					height: 120rpx !important;
				}
				.tabTitleOne{
					width: 64px;
					height: 22px;
					font-size: 16px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					position: absolute;
					left: 146rpx;
					top: 42rpx;
				}
			}
			.items{
				position: absolute;
				left: 386rpx;
			}
	}
</style>
