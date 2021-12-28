<template>
	<view class="invite">
		<view class="boxT">
			<text class="info infoO">我的邀请码为</text>
			<text class="info infoT">{{data.invitationCode}}</text>
			<text class="info infoTH" @click="a">复制邀请码</text>
		</view>
		<view class="boxB">
			<image src="https://s2.loli.net/2021/12/28/wIHVvBTtcxyNEJb.jpg" mode="widthFix" class="ewm"></image>
			<text class="save">长按保存图片</text>
		</view>
		<view class="boxBB">
			<image src="../../static/service/close.png" mode="widthFix" class="close" @click="closeMast"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: Object,
		},
		methods: {
			closeMast() {
				this.$emit('close', false)
			},
			a() {
				console.log('aaaaaaa')
				// #ifdef H5
				this.$copyText('aaaaaa').then(
					res => {
						uni.showToast({
							title: '复制成功'
						})
					}
				)
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: 'aaaaaa',
					success: () => {
						uni.showToast({
							title: '复制成功'
						})
					}
				})
				// #endif
			}
		}
	}
</script>

<style lang="less">
	.invite {
		width: 90%;
		height: 850rpx;
		position: fixed;
		top: 320rpx;
		margin-left: 5%;
		background: rgb(28, 40, 78);
		border-radius: 15rpx;
		z-index: 999999;

		.boxT {
			width: 100%;
			height: 30%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			border-bottom: 1px solid rgb(53, 73, 110);

			.info {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.infoO {
				color: #f2f2f2;
				font-size: 28rpx;
			}

			.infoT {
				width: 320rpx;
				height: 80rpx;
				border: 1px solid rgb(104, 80, 248);
				border-radius: 15rpx;
				color: #FFFFFF;
				font-size: 32rpx;
			}

			.infoTH {
				color: rgb(15, 120, 208);
				font-size: 25rpx;
			}
		}

		.boxB {
			width: 100%;
			height: 50%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.ewm {
				width: 300rpx;
				height: 300rpx;
			}

			.save {
				font-size: 28rpx;
				color: #F1F1F1;
				margin-top: 20rpx;
			}
		}

		.boxBB {
			width: 100%;
			height: 15%;
			display: flex;
			align-items: flex-end;
			justify-content: center;

			.close {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
</style>
