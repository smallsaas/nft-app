<template>
	<view class="more">
		<view class="item">
			<view class="status"><text class="title">申述原因:</text><text class="info">对方没付款</text></view>
			<view class="status"><text class="title">备注信息:</text><text class="info">还差我100</text></view>
			<view class="status"><text class="title">申述状态:</text><text class="info">处理中</text></view>
			<view class="status"><text class="title">申述反馈:</text><text class="info">已沟通</text></view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less">
	.more{
		width: 100%;
		padding-top: 50rpx;
		background: rgb(5,14,23);
		.item{
			width: 90%;
			height: auto;
			margin-left: 2.5%;
			background: rgb(17,24,30);
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			padding: 20rpx;
			.status{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-around;
				margin-top: 10rpx;
				.title{
					width: 140rpx;
					font-size: 30rpx;
				}
				.info{
					width: 70%;
					height: auto;
					font-size: 30rpx;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
