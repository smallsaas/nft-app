<template>
	<view class="toast">
		<view class="title">
			<text class="info">溫馨提示</text>
		</view>
		<view class="content">
			<text class="infoT">{{this.data}}</text>
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
			}
		},
		methods:{
			cencel(){
				this.$emit('cancelToast',false)
			}
		},
		created() {
			console.log(this.data,123132123132)
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
			width: 272px;
			height: auto;
			padding: 10px;
			position: absolute;
			top: 61px;
			left: 24px;
			overflow: scroll;
			display: flex;
			align-items: center;
			justify-content: center;
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
