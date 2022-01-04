<template>
	<view class="transfers">
		<text class="t">
			转让精灵令
		</text>
		<text class="tt">
			对方手机号码
		</text>
		<input class="ttt" placeholder="输入手机号" type="number" />
		<text class="tt tttt">
			转让数量
		</text>
		<input class="ttt ttttt" placeholder="输入数量,最低500起" type="number" />
		<text class="tt tttttt">
			支付密码
		</text>
		<input class="ttt ttttttt" placeholder="输入支付密码" type="number" />
		<view class="line"></view>
		<view class="btnBox">
			<button class="btn ccc"  @click="cancel">取消</button>
			<button class="btn">确定</button>
		</view>
		<!-- <view class="title"><text class="info">转让精灵令</text></view>
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
		</view> -->
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
	.transfers{
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
		
		.t{
			width: 90px;
			height: 25px;
			font-size: 18px;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			position: absolute;
			top: 45rpx;
			left: 230rpx;
		}
		
		.tt{
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
		
		.ttt{
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
		
		.tttt{
			top: 284rpx;
		}
		
		.ttttt{
			top: 334rpx;
		}
		
		.tttttt{
			top: 446rpx;
		}
		
		.ttttttt{
			top: 496rpx;
		}
		
		.line{
			width: 320px;
			height: 1px;
			background: linear-gradient(270deg, #182641 0%, #3F547D 49%, #182641 100%);
			border-radius: 0px 0px 0px 0px;
			opacity: 1;
			position: absolute;
			top: 624rpx;
		}
		
		.btnBox{
			width: 320px;
			height: 84px;
			position: absolute;
			bottom: 0rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.btn{
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
			.ccc{
				background: #1D294D;
				border: 1px solid #FFFFFF;
			}
		}
	}
</style>
