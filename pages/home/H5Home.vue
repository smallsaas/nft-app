<template>
	<view class="h5_container">
		<view class="h5_top_container">
			<image class="h5_top_background" src="../../static/H5home/topbar.png" mode="widthFix"></image>
			<image class="logo" src="../../static/H5home/logo.png" mode="aspectFit"></image>
			<image class="mult" src="../../static/H5home/menu.png" mode="aspectFit"></image>
		</view>
		<view class="h5_home_content">
			<view class="h5_button_group">
				<button class="start" @click="handleStart">開始遊戲</button>
				<button class="upload" @click="handleUpload">下載安卓APP</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			handleStart(){
				uni.redirectTo({
					url:"/pages/login_new/login_new"
				})
			},
			// 下載事件
			handleUpload(){
				
			}
		}
	}
</script>

<style>
	.h5_container{
		display: flex;
		flex-direction: column;
	}
	.h5_home_content{
		background: url(../../static/H5home/bg.png) 100% 100% no-repeat;
		background-size: cover;
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
	}
	.h5_top_container{
		background-size: 100% 100%;
		width: 100vw;
		/* height: 108rpx; */
		flex: 1;
		margin: 14rpx 0;
		position: relative;
		display: flex;
		align-items: center;
	}
	.logo{
		width: 216rpx;
		height: 72rpx;
		margin-left: 32rpx;
	}
	.mult{
		width: 48rpx;
		height: 48rpx;
		/* flex: 1; */
		position: absolute;
		right: 32rpx;
	}
	.h5_top_background{
		width: 100vw;
		height: 100%;
		position: absolute;
	}
	.h5_button_group{
		position: absolute;
		width: 100%;
		bottom: 5%;
		font-size: 36rpx;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.start,.upload{
		padding: 32rpx 0;
		width: 90%;
		border-radius: 16rpx;
	}
	.start{
		background: linear-gradient(to left,#9331F5,#0A95FF);
		margin-bottom: 48rpx;
	}
	.upload{
		background-color: #F163AF;
	}
</style>
