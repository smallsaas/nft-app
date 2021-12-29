<template>
	<view class="tab">
		<view class="item" @click="goTo">
			<view class="tabBox"><image class="tabImg" src="../../static/service/book.png" mode="widthFix"></image></view>
			<text class="tabTitle">我的记录</text>
		</view>
		<view class="item">
			<view class="tabBox"><image class="tabImg" src="../../static/service/team.png" mode="widthFix"></image></view>
			<text class="tabTitle" @click="goToTeam">我的团队</text>
		</view>
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
					url:"/pages/defaultPage/tabbarPage?id=" + 555888
				})
			}
		}
	}
</script>

<style lang="less">
	.tab{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: space-around;
		flex-direction: row;
		.item{
			width: 38%;
			height: 120rpx;
			background: rgb(24,38,67);
			border-radius: 15rpx;
			border: 1px solid rgb(44,67,125);
			display: flex;
			align-items: center;
			justify-content: center;
			.tabBox{
				width: 35%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				.tabImg{
					margin-top: 25rpx;
					width: 120rpx !important;
					height: 120rpx !important;
				}
			}
			.tabTitle{
				color: #f2f2f2;
			}
		}
	}
</style>
