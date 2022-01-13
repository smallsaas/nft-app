<template>
	<view class="invite-container">
		<view class="invite-mask"></view>
		<view class="invite">
			<!-- <view class="cs">
				<canvas canvas-id="codeimg" style="width: 200px;height: 200px;border: 1px solid red;"></canvas>
			</view> -->
			<view class="boxT">
				<text class="info infoO">我的邀請碼爲</text>
				<view class="border-invite">
					<text class="info infoT">{{data.invitationCode}}</text>
				</view>
				<text class="info infoTH" @click="copyText">複制邀請碼</text>
			</view>
			<view class="boxB">
				<view class="boxB-round1"></view>
				<view class="boxB-round2"></view>
				<view class="QRcode-container">
					<!-- <image src="https://s2.loli.net/2021/12/28/wIHVvBTtcxyNEJb.jpg" mode="widthFix" class="ewm"></image> -->
					<canvas canvas-id="codeimg" style="width: 150px;height: 150px;"></canvas>
				</view>
				<text class="save"> 掃我加入 metagugu 的世界 </text>
			</view>
			<view class="boxBB">
				<image src="../../static/service/close.png" mode="widthFix" class="close" @click="closeMast"></image>
			</view>
		</view>
	</view>

</template>

<script>
	const qrCode = require('../../utils/weapp-qrcode')
	export default {
		props: {
			data: Object,
		},
		mounted() {
			console.log('this',this.$config)
			console.log('asfafasfsafmounted')
			this.shengcheng()
		},
		methods: {
			shengcheng(){
				new qrCode('codeimg',{
					// text:`${this.$config.endPoint}/#/pages/regist_new/regist_new?inviteCode=` + this.data.invitationCode,
					text:`${this.$config.endpoint}/#/pages/regist_new/regist_new?inviteCode=` + this.data.invitationCode,
					width:150,
					height:150,
					colorDark:"#333333"
					// correctLevel:qrCode.correctLevel.H
				})
			},
			closeMast() {
				this.$emit('close', false)
			},
			copyText() {
				uni.setClipboardData({
					data: this.data.invitationCode,
					success: () => {
						uni.showToast({
							title: '複制成功'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.border-invite{
		background: linear-gradient(to left,#7131C9,#126DBE);
		border-radius: 10rpx;
		padding: 4rpx;
	}
	.invite-mask{
		background-color: #000;
		opacity: .8;
		width: 100vw;
		// height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		// z-index: 501;
	}
	.invite-container{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999999;
	}
	.invite {
		width: 90%;
		// height: 850rpx;
		position: fixed;
		// top: 320rpx;
		background: rgb(28, 40, 78);
		border-radius: 15rpx;
		display: flex;
		flex-direction: column;
		.boxT {
			width: 100%;
			height: 30%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 50rpx;
			flex-direction: column;
			.info {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.infoO {
				color: #f2f2f2;
				font-size: 28rpx;
				margin-bottom: 10rpx;
			}
			.infoT {
				width: 320rpx;
				height: 80rpx;
				background-color: #1C284E;
				border-radius: 10rpx;
				color: #FFFFFF;
				font-size: 52rpx;
			}

			.infoTH {
				color: rgb(15, 120, 208);
				font-size: 25rpx;
				padding: 20rpx 0;
			}
		}

		.boxB {
			width: 100%;
			height: 50%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding-top: 52rpx;
			border-top: 1px solid rgb(53, 73, 110);
			border-image: linear-gradient(to left,#1C284E,#35496e,#1C284E) 20% 0% 20%;
			position: relative;
			.QRcode-container{
				background-color: #FFFFFF;
				padding: 20rpx;
				width: 150px;
				height: 150px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.ewm {
				width: 300rpx;
				height: 300rpx;
			}

			.save {
				font-size: 28rpx;
				color: #FFFFFF;
				margin-top: 20rpx;
				margin-bottom: 84rpx;
				font-weight: bolder;
			}
			.boxB-round1,.boxB-round2{
				position: absolute;
				background-color: #030508;
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
			}
			.boxB-round1{
				top: -20rpx;
				left:-20rpx
			}
			.boxB-round2{
				top: -20rpx;
				right:-20rpx
			}
		}

		.boxBB {
			width: 90%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			bottom: 180rpx;
			.close {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
</style>
