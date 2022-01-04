<template>
	<view class="usernew">
		<view class="imgBox">
			<image class="img" :src="data.avatar" mode="widthFix"></image>
		</view>
		<view class="names">
			<text class="name">{{data.name}}</text>
		</view>
		<text class="status"><text>账号状态：</text><text :class="{forzen:data.status !=='NORMAL'}">{{data.status=='NORMAL'?'正常':'冻结'}}</text></text>
		<image @click="getDetail" class="more" src="../../static/service/more.png" mode="widthFix"></image>
	<!-- 	<view class="left">
			<view class="LImg"><image class="img" src="../../static/spirit/coin.png" mode="widthFix"></image></view>
			<view class="Linfo">
				<view class="Ln"><text class="name">{{data.name}}</text></view>
				<view class="Ls"><text class="status">账号状态:  {{data.status=='NORMAL'?'正常':'冻结'}}</text></view>
			</view>
		</view>
		<view class="right">
			<image @click="getDetail" class="more" src="../../static/service/more.png" mode="widthFix"></image>
		</view> -->
	</view>
</template>

<script>
	export default{
		props: {
			data: Object,
		},
		created() {
			console.log(this.data,11111111111111111111111111)
		},
		methods:{
			getDetail(){
				uni.navigateTo({
					url:'/pages/infomation/infomation?id=' + this.data.userId
				})
			}
		}
	}
</script>

<style lang="less">
	.usernew{
		position: relative;
		width: 100%;
		height: 120rpx;
		// border: 1px solid red;
		.imgBox{
			width: 72px;
			height: 72px;
			position: absolute;
			top: 30rpx;
			left: 32rpx;
			.img{
				width: 72px;
				height: 72px !important;
				border-radius: 50%;
				border: 1px solid rgb(132,133,147);
			}
		}
		.names{
			position: absolute;
			top: 50rpx;
			left: 200rpx;
			width: 450rpx;
			height: 50rpx;
			.name{
				font-size: 18px;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
		.status{
			width: 98px;
			height: 20px;
			font-size: 14px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			position: absolute;
			top: 110rpx;
			left: 202rpx;
		}
		.forzen{
			color: red !important;
		}
		.more{
			width: 40rpx;
			height: 50rpx !important;
			position: absolute;
			right: 36rpx;
			top: 80rpx;
		}
	}
</style>
