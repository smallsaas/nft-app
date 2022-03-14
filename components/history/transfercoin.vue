<template>
	<view class="transfers">
		<text class="t">
			轉化GuGu令
		</text>
		<text class="tt">
			轉化數量
		</text>
		<input class="ttt" type="number" placeholder="最多可轉化100" v-model="transferWispCoind" />
		<view class="line"></view>
		<view class="btnBox">
			<button class="btn ccc" @click="cancel">取消</button>
			<button class="btn" @click="sureTransfer">确定</button>
		</view>
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
			},
			type:{
				type:Number
			}
		},
		created() {
			// console.log(this.data==undefined ,this.dataTwo,111)
			// console.log(this.type,'=--------------=0-safsakjfkfhasjkf')
		},
		data() {
			return {
				transferWispCoind: '',
				loading: false
			}
		},
		methods: {
			cancel() {
				this.$emit('closeCoin')
			},
			async sureTransfer() {
				// console.log(this.type)
				if(this.loading){
					return
				}
				
				if(this.type == 1){
					// console.log('do1')
					this.loading = true
					const data = {
						incomeType:'recommendCoinCredit',
						number:this.transferWispCoind
					}
					const res = await this.$api.tuijianforgugu(data)
					// console.log('res',res,'-----------------------')
					if(res.code == 200){
						uni.showToast({
							icon:'success',
							duration:1000,
							title:'轉化成功'
						})
						this.$emit('closeCoin','update')
						
					}else{
						uni.showToast({
							icon:'none',
							duration:1000,
							title:res.message
						})
					}
					this.loading = false
					// if()
				}else if(this.type == 2){
					// console.log('do2')
					
					this.loading = true
					const data = {
						incomeType:'teamCoinCredit',
						number:this.transferWispCoind
					}
					const res = await this.$api.banhuiforgugu(data)
					// console.log('res',res,'-----------------------')
					if(res.code == 200){
						uni.showToast({
							icon:'success',
							duration:1000,
							title:'轉化成功'
						})
						this.$emit('closeCoin','update')
					}else{
						uni.showToast({
							icon:'none',
							duration:1000,
							title:res.message
						})
					}
					this.loading = false
				}else{
					// console.log('do3')
					this.loading = true
					const data = {
						incomeType:'transferCoinCredit',
						number:this.transferWispCoind
					}
					const res = await this.$api.zhuancunforgugu(data)
					// console.log('res',res,'-----------------------')
					if(res.code == 200){
						uni.showToast({
							icon:'success',
							duration:1000,
							title:'轉化成功'
						})
						this.$emit('closeCoin','update')
					}else{
						uni.showToast({
							icon:'none',
							duration:1000,
							title:res.message
						})
					}
					this.loading = false
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
			width: 150px;
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
