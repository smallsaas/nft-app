<template>
	<view class="history">
		<view class="item">
			<view class="o"><image src="../../../static/spirit/coin.png" mode="widthFix" class="avator"></image></view>
			<view class="t">
				<text class="i io">轉讓GuGu令-王小二</text>
				<text class="i it">2012-10-12 12:00:00</text>
			</view>
			<view class="h">
				<text class="ip">-300</text>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less">
	.history{
		width: 100%;
		height: 100%;
		padding-top: 30rpx;
		background: rgb(5,14,23);
		.item{
			width: 90%;
			height: 140rpx;
			margin-left: 5%;
			border-radius: 10rpx;
			background: rgb(17,24,30);
			display: flex;
			flex-direction: row;
			.o{
				width: 25%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.avator{
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}
			}
			.t{
				width: 50%;
				height: 100%;
				display: flex;
				align-items: flex-start;
				justify-content: center;
				flex-direction: column;
				.i{
					font-size: 30rpx;
					color: #FFFFFF;
				}
				.io{
					margin-bottom: 20rpx;
				}
				.it{
					color: grey;
					font-size: 25rpx;
				}
			}
			.h{
				width: 25%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.ip{
					color: #FFFFFF;
					font-weight: bold;
					font-size: 45rpx;
				}
			}
		}
	}
</style>
