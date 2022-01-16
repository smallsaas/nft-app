<template>
	<view class="transfers">
		<text class="t">
			轉讓GuGu令
		</text>
		<text class="tt">
			對方手機号碼
		</text>
		<input v-model="data.targetPlayerMobilePhone" class="ttt" placeholder="輸入手機号" type="number" />
		<text class="error" v-if="showError">手機号碼格式(長度)錯誤</text>
		<text class="tt tttt">
			轉讓數量
		</text>
		<text class="errors" v-if="showErrorTwo">轉讓最低數量最低爲200</text>
		<input v-model="data.number" class="ttt ttttt" placeholder="輸入數量,最低200起" type="number" />
		<text class="tt tttttt">
			支付密碼
		</text>
		<input v-model="data.paymentPassword " class="ttt ttttttt" placeholder="輸入支付密碼" type="number" :password="true" />
		<view class="line"></view>
		<view class="btnBox">
			<button class="btn ccc" @click="cancel">取消</button>
			<button class="btn" @click="successTransfer">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					// 13692842253
					// 123456
					targetPlayerMobilePhone: '',
					number: "",
					paymentPassword: '',
				},
				showError:false,
				showErrorTwo:false
			}
		},
		methods: {
			cancel() {
				this.$emit('close')
			},
			 async successTransfer() {
				console.log(this.showError)
				
				if(this.data.number < 200){
					this.showErrorTwo = true
					return
				}
					
				if(this.data.targetPlayerMobilePhone.length<6 || this.data.targetPlayerMobilePhone.length>11){
					this.showError = true
					return
				}else{
					this.data.number = parseInt(this.data.number)
					console.log(this.data)
					const res = await this.$api.transferCoin(this.data)
					console.log(res)
					if (res.code == 200) {
						uni.showToast({
							title: '轉讓成功',
							icon: "success",
							duration: 1000
						})
						this.$emit('close')
						this.$emit('tellFather',true)
					} else {
						uni.showToast({
							title: res.message,
							icon: "error",
							duration: 1000
						})
						this.$emit('close')
					}
				}
			}
		}
	}
</script>

<style lang="less">
	.transfers {
		width: 320px;
		height: 400px;
		background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
		border-radius: 8px 8px 8px 8px;
		opacity: 1;
		position: fixed;
		top: 358rpx;
		left: 56rpx;
		z-index: 99999;
		border-top: 2rpx solid rgb(50, 71, 137);
		border-left: 2rpx solid rgb(50, 71, 137);

		.t {
			width: 200px;
			height: 25px;
			font-size: 18px;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			position: absolute;
			top: 45rpx;
			left: 230rpx;
		}

		.tt {
			width: 72px;
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
			position: absolute;
			top: 172rpx;
			left: 38rpx;
			padding-left: 10rpx;
		}
		
		.errors{
			color: red;
			position: absolute;
			top: 420rpx;
			left: 40rpx;
			font-size: 12px;
		}
		.error{
			color: red;
			position: absolute;
			top: 255rpx;
			left: 40rpx;
			font-size: 12px;
		}

		.tttt {
			top: 284rpx;
		}

		.ttttt {
			top: 334rpx;
		}

		.tttttt {
			top: 446rpx;
		}

		.ttttttt {
			top: 496rpx;
		}

		.line {
			width: 320px;
			height: 1px;
			background: linear-gradient(270deg, #182641 0%, #3F547D 49%, #182641 100%);
			border-radius: 0px 0px 0px 0px;
			opacity: 1;
			position: absolute;
			top: 624rpx;
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
</style>
