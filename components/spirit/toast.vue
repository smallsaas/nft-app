<template>
	<view class="toast">
		<view class="top">
			<text class="info">温馨提示</text>
			<text class="info i">{{this.data}}</text>
		</view>
		<view class="bottom">
			<button class="btn cancel" @click="cencel">取消</button>
			<button class="btn"  @click="cencel">确定</button>
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
		width: 86%;
		height: 500rpx;
		background: rgb(25,38,68);
		position: fixed;
		left: 7%;
		right: 0;
		bottom: 0;
		top: 30%;
		border-radius: 20rpx;
		border: 1px solid rgb(49,70,132);
		z-index: 999999;
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
