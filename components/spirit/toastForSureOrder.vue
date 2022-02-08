<template>
	<view class="toast">
		<view class="title">
			<text class="info">填寫支付密碼</text>
		</view>
		<view class="content">
			<!-- <text class="infoT">{{this.data}}</text> -->
			<input placeholder="請填寫支付密碼" v-model="paymentPassword" :password="isPassword" style="padding-right: 50rpx;" />
			<image @click="changeLook" class="image" :src="isOpenLook[isPassword ? 0 : 1]" mode="widthFix"></image>
		</view>
		<view class="btnBox">
			<button class="btn cancel" @click="cencel">取消</button>
			<button class="btn" @click="sure">确定</button>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			data:{
				type:String
			},
			orderId:{
				type:Number
			}
		},
		data() {
			return {
				paymentPassword: '',
				isPassword: true,
				isOpenLook:['../../static/login/eyeoff.png','../../static/login/eye.png']
			}
		},
		methods:{
			changeLook () {
				this.isPassword = !this.isPassword
			},
			cencel(){
				this.$emit('cancelToast',false)
			},
			async sure(){
				if (!this.paymentPassword) {
					uni.showToast({ title: '請填寫支付密碼', icon:'none' })
					return
				}
				let data = {
					wispOrderId:this.orderId
				}
				const res = await this.$api.successGetMoneyForSeller(data, {paymentPassword: this.paymentPassword })
				if(res.code == 200){
					uni.showToast({
						title:'确認收款成功',
						icon:"success",
						duration:1000
					})
					setTimeout(()=>{
						this.$emit('cancelToast',false)
						uni.navigateBack({
							delta:1
						})
					},2000)
				}else{
					uni.showToast({
						title:res.message,
						icon:"none",
						duration:1000
					})
					setTimeout(()=>{
						this.$emit('cancelToast',false)
						uni.navigateBack({
							delta:1
						})
					},2000)
				}
			}
		},
		created() {
			console.log(this.data,123132123132)
			console.log('resadsafasf',this.orderId,123132123132)
		}
	}
</script>

<style lang="less">
	.toast{
		width: 320px;
		height: 217px;
		border-top: 2rpx solid rgb(50, 71, 137);
		border-left: 2rpx solid rgb(50, 71, 137);
		background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
		border-radius: 8px 8px 8px 8px;
		opacity: 1;
		position: fixed;
		left: 7%;
		right: 0;
		bottom: 0;
		top: 30%;
		z-index: 999999;
		.title{
			width: 320px;
			height: 25px;
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			top: 24px;
			.info{
				font-size: 18px;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
		
		.content{
			width: 270px;
			height: auto;
			padding: 16rpx 0 16rpx 16rpx;
			position: absolute;
			top: 70px;
			left: 20px;
			border: 1px solid;
			border-radius: 3px;
			.image {
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				right: 16rpx;
				top: 8rpx;
			}
			.infoT{
				font-size: 14px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
		
		.btnBox{
			width: 320px;
			height: 88px;
			background: #1D294D;
			box-shadow: 0px -2px 12px 1px rgba(0,0,0,0.25);
			border-radius: 0px 0px 8px 8px;
			opacity: 1;
			position: absolute;
			bottom: 0px;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.btn{
				width: 132px;
				height: 40px;
				background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%);
				border-radius: 4px 4px 4px 4px;
				opacity: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 16px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
			.cancel{
				border: 1px solid #FFFFFF;
				background: #1D294D;
			}
		}
		
		
		
		
		
		.top{
			width: 90%;
			height: 60%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-left: 5%;
			overflow: scroll;
			.info{
				color: #FFFFFF;
				font-size: 38rpx;
				font-weight: bold;
				letter-spacing: 4rpx;
				margin-bottom: 10rpx;
			}
			.i{
				font-size: 28rpx;
				color: rgbrgb(207,210,216);
				letter-spacing: 4rpx;
			}
		}
		.bottom{
			width: 100%;
			height: 40%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			border-top: 1px solid rgb(59,79,119);
			.btn{
				width: 280rpx;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: linear-gradient(to right, rgb(135,57,245) 0%,rgb(70,104,253), rgb(25,137,253));
				color: #FFFFFF;
			}
			.cancel{
				color:rgb(142,148,166);
				border: 1px solid rgb(142,148,166);
				background: rgb(29,41,77);
			}
		}
	}
</style>
