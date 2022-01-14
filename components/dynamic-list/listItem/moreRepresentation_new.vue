<template>
	<view class="more">
		<view class="item">
			<view class="status"><text class="title">申述原因:</text><text class="info">{{item.title}}</text></view>
			<view class="status"><text class="title">備注信息:</text><text class="info">{{item.content}}</text></view>
			<view class="status"><text class="title">申述狀态:</text><text class="info">{{item.status}}</text></view>
			<view class="status"><text class="title">申述反饋:</text><text class="info">已溝通</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			ext: Object
		},
		mounted() {
			console.log(this.item,'--------------')
		}
	}
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
