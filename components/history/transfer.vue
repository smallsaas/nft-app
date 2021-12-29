<template>
	<view class="transfer">
		<view class="title"><text class="info">转让精灵令</text></view>
		<view class="opView">
			<view class="item">
				<text class="ti">对方手机号码</text>
				<input class="in" type="number" placeholder="请输入手机号码" />
			</view>
			<view class="item">
				<text class="ti">转让数量</text>
				<input class="in" type="number" placeholder="请输入转让数量" />
			</view>
			<view class="item">
				<text class="ti">支付密码</text>
				<input class="in" type="password" placeholder="请输入支付密码" />
			</view>
		</view>
		<view class="btnBox">
			<button class="btn cancel" @click="cancel">取消</button>
			<button class="btn add">确定</button>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			cancel(){
				this.$emit('close')
			}
		}
	}
</script>

<style lang="less">
	.transfer{
		width: 95%;
		height: 800rpx;
		position: fixed;
		top: 350rpx;
		margin-left: 2.5%;
		background: rgb(25,38,68);
		border-radius: 30rpx;
		border: 1px solid rgb(50,71,137);
		z-index: 99999;
		.title{
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.info{
				color: #FFFFFF;
				font-size: 40rpx;
				letter-spacing: 5rpx;
			}
		}
		.opView{
			width: 100%;
			height: 500rpx;
			.item{
				width: 100%;
				height: 165rpx;
				.ti{
					font-size: 28rpx;
					margin-left: 25rpx;
				}
				.in{
					background: rgb(19,29,51);
					border-radius: 30rpx;
					border: 1px solid rgb(54,63,76);
					padding: 10rpx;
					width: 80%;
					height: 60rpx;
					margin-left: 20rpx;
					margin-top: 10rpx;
				}
			}
		}
		.btnBox{
			width: 100%;
			height: 200rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			border-top: 1px solid rgb(59,80,119);
			.btn{
				width: 220rpx;
				height: 80rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.cancel{
				background: rgb(29,41,77);
				color: rgb(142,148,168);
				border: 1px solid rgb(142,148,168);
			}
			.add{
				background: linear-gradient(to right, rgb(135,57,245) 0%,rgb(70,104,253), rgb(25,137,253));
			}
		}
	}
</style>
