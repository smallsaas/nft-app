<template>
	<view class="transfers">
		<text class="t">
			轉化GuGu令
		</text>
		<text class="tt">
			轉化數量
		</text>
		<input class="ttt" type="number" placeholder="最多可轉化2000" v-model="transferWispCoind" />
		<view class="line"></view>
		<view class="btnBox">
			<button class="btn ccc" @click="cancel">取消</button>
			<button class="btn" @click="sureTransfer">确定</button>
		</view>
		<!-- <view class="title"><text class="info">轉化GuGu令</text></view>
		<view class="opView">
			<view class="item">
				<text class="ti">轉化數量</text>
				<input class="in" type="number" placeholder="輸入數量,最多可轉化2000" />
			</view>
		</view>
		<view class="btnBox">
			<button class="btn cancel" @click="cancel">取消</button>
			<button class="btn add">确定</button>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object
			},
			dataTwo: {
				type: Object
			}
		},
		created() {
			console.log(this.data==undefined ,this.dataTwo,111)
		},
		data() {
			return {
				transferWispCoind: ''
			}
		},
		methods: {
			cancel() {
				this.$emit('closeCoin')
			},
			sureTransfer() {
				if(this.dataTwo==undefined){
					if (this.data.marketPoints < 200000000) {
						const data = {
							message: '收益未達到2000暫不可轉化爲GuGu令',
						}
						this.$emit('forParentMessage', data)
					} else {
						return
					}
				}else if(this.data == undefined){
					if (this.dataTwo.depositPoints < 200000000) {
						const data = {
							message: '收益未達到2000暫不可轉化爲GuGu令',
						}
						this.$emit('forParentMessageTwo', data)
					} else {
						return
					}
				}
			}
		}
	}
</script>

<style lang="less">
	.transfers {
		width: 320px;
		height: 238px;
		background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
		border-radius: 8px 8px 8px 8px;
		opacity: 1;
		position: fixed;
		top: 560rpx;
		left: 56rpx;
		z-index: 99999;
		border-top: 2rpx solid rgb(50, 71, 137);
		border-left: 2rpx solid rgb(50, 71, 137);

		.t {
			width: 90px;
			height: 25px;
			font-size: 18px;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			position: absolute;
			top: 56rpx;
			left: 230rpx;
		}

		.tt {
			width: 48px;
			height: 17px;
			font-size: 12px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			position: absolute;
			top: 122rpx;
			left: 48rpx;
		}

		.ttt {
			width: 282px;
			height: 40px;
			background: #131D33;
			border-radius: 8px 8px 8px 8px;
			opacity: 1;
			border: 1px solid #363F4D;
			padding-left: 10rpx;
			position: absolute;
			top: 172rpx;
			left: 38rpx;
		}

		.line {
			width: 320px;
			height: 1px;
			background: linear-gradient(270deg, #182641 0%, #3F547D 49%, #182641 100%);
			border-radius: 0px 0px 0px 0px;
			opacity: 1;
			position: absolute;
			top: 300rpx;
		}

		.btnBox {
			width: 320px;
			height: 84px;
			position: absolute;
			bottom: 0rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.btn {
				width: 132px;
				height: 40px;
				background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%);
				border-radius: 4px 4px 4px 4px;
				opacity: 1;
				font-size: 16px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.ccc {
				background: #1D294D;
				border: 1px solid #FFFFFF;
			}
		}
	}

	.transfer {
		width: 95%;
		height: 400rpx;
		position: fixed;
		top: 350rpx;
		margin-left: 2.5%;
		background: rgb(25, 38, 68);
		border-radius: 30rpx;
		border: 1px solid rgb(50, 71, 137);
		z-index: 99999;

		.title {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.info {
				color: #FFFFFF;
				font-size: 40rpx;
				letter-spacing: 5rpx;
			}
		}

		.opView {
			width: 100%;
			height: 150rpx;

			.item {
				width: 100%;
				height: 165rpx;

				.ti {
					font-size: 28rpx;
					margin-left: 25rpx;
				}

				.in {
					background: rgb(19, 29, 51);
					border-radius: 30rpx;
					border: 1px solid rgb(54, 63, 76);
					padding: 10rpx;
					width: 80%;
					height: 60rpx;
					margin-left: 20rpx;
					margin-top: 10rpx;
				}
			}
		}

		.btnBox {
			width: 100%;
			height: 150rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			border-top: 1px solid rgb(59, 80, 119);

			.btn {
				width: 220rpx;
				height: 80rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.cancel {
				background: rgb(29, 41, 77);
				color: rgb(142, 148, 168);
				border: 1px solid rgb(142, 148, 168);
			}

			.add {
				background: linear-gradient(to right, rgb(135, 57, 245) 0%, rgb(70, 104, 253), rgb(25, 137, 253));
			}
		}
	}
</style>
