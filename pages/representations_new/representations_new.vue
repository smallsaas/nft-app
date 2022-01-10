<template>
	<view class="re_new">
		<view class="all"><text class="info" @click="checkMore">查看申述記錄(結果)</text></view>
		<view class="title ttt"><text class="info">申述原因</text></view>
		<view class="select">
			<input  v-model="value" type="text" disabled="true" placeholder="選擇申述原因" class="read" />
			<image src="../../static/login/download.png" mode="widthFix" class="beaut" @click="show"></image>
		</view>
		<!-- <van-picker title="選擇申述原因" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel"
			@change="onChange" class="fix" v-if="isShow" default-index=""/> -->
		<view class="title"><text class="info">備注</text></view>
		<view class="select selectT">
			<textarea placeholder="添加其他申述原因" class="text"></textarea>
		</view>
		<view class="btnBox"><button class="btn">提交申述</button></view>
		<view class="fix" v-if="isShow">
			<view class="item" v-for="(i,index) in columns" :key="index" @click="get(i)">{{i}}</view>
			<image class="close" mode="aspectFit" src="../../static/service/close.png" @click="onCancel"></image>
		</view>
		<view class="spirit_mask" v-if="isShow"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				columns: ['對方沒付款','情況不符合'],
				value:''
			}
		},
		methods: {
			show() {
				this.isShow = true
			},
			onConfirm(value, index) {
				this.value = value
				this.isShow = false
			},
			onChange(picker, value, index) {
				this.value = value
			},
			onCancel() {
				this.isShow = false
			},
			checkMore(){
				uni.navigateTo({
					url:'/pages/defaultPage/page?id=' + 111222333
				})
			},
			get(item){
				this.value = item;
				this.isShow = false
			}
		}
	}
</script>

<style lang="less">
	.spirit_mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 502;
		background-color: #000;
		opacity: .8;
	}
	.re_new {
		width: 100%;
		height: 100%;
		.all{
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.info{
				color: rgb(26,137,253);
				font-size: 30rpx;
				margin-right: 20rpx;
			}
		}
		.ttt{
			margin-top: 100rpx;
		}
		.title {
			width: 100%;
			height: 50rpx;

			.info {
				margin-left: 5%;
			}
		}

		.select {
			width: 100%;
			height: 120rpx;
			position: relative;
			.read {
				width: 90%;
				height: 80rpx;
				margin-left: 5%;
				border-radius: 20rpx;
				padding-left: 10rpx;
				background: rgb(36, 42, 51);
				font-size: 30rpx;
				border: 1px solid rgb(54, 63, 76);
			}

			.beaut {
				position: absolute;
				top: 20rpx;
				right: 40rpx;
				width: 40rpx;
				height: 40rpx;
			}
			
		}
		
		.selectT{
			height: 300rpx;
			.text{
				width: 90%;
				height: 280rpx;
				margin-left: 5%;
				border-radius: 20rpx;
				padding-left: 10rpx;
				background: rgb(36, 42, 51);
				font-size: 30rpx;
				border: 1px solid rgb(54, 63, 76);
			}
		}
		
		.btnBox{
			width: 100%;
			height: 150rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.btn{
				width: 90%;
				height: 85rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				background: linear-gradient(to right, rgb(135,57,245) 0%,rgb(70,104,253), rgb(25,137,253));
			}
		}
	
	.fix {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 50%;
			background: rgb(5,14,23);
			z-index: 9999;
			border-radius: 8px;
			padding-top: 13%;
			.item{
				width: 100%;
				height: 40px;
				// margin-top: 12%;
				display: flex;
				align-items: center;
				justify-content: space-around;
				// font-size: 20px;
				// font-weight: bold;
				// color: #ffffff;
				background: rgb(1,3,5);
				// margin-top: 1px;
				// background: white;
				background: rgb(5,14,23);
				// .
				.o{
					font-size: 20px;
					font-weight: bold;
					color: #ffffff;
				}
				.t{
					width: 15px;
					height: 15px;
					border: 1px solid #2C405A;
				}
			}
			.close{
				width: 24px;
				height: 24px !important;
				position: absolute;
				right: 10px;
				top: 10px;
			}
		}
	}
</style>
