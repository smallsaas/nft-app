<template>
	<view class="re_new">
		<view class="all"><text class="info" @click="checkMore">查看申述記錄(結果)</text></view>
		<view class="title ttt"><text class="info">申述原因</text></view>
		<view class="select">
			<input  v-model="value" type="text" disabled="true" placeholder="選擇申述原因" class="read" />
			<image src="../../static/login/download.png" mode="widthFix" class="beaut" @click="show"></image>
		</view>
		<view class="title"><text class="info">備注</text></view>
		<view class="select selectT">
			<textarea placeholder="添加其他申述原因" class="text" v-model="moreValue"></textarea>
		</view>
		<view class="btnBox"><button class="btn" @click="shenshu">提交申述</button></view>
		<view class="fix" v-if="isShow">
			<view class="t">
				<text class="info" @click="cancel">取消</text>
				<text class="info infos">選擇申訴原因</text>
				<text class="info" @click="sure">确定</text>
			</view>
			<view class="b">
				<view class="item" :class="{active:inx == index}"  v-for="(i,index) in columns" :key="index" @click="choose(index)">
					{{i}}
				</view>
			</view>
		</view>
		<view class="spirit_mask" v-if="isShow"></view>
	</view>
</template>

<script>
	export default {
		props:{
		},
		onLoad(e) {
			console.log('RES',parseInt(e.orderId))
			this.orderIdS = parseInt(e.orderId)
			console.log('慘過了參數',this.orderIdS)
		},
		data() {
			return {
				isShow: false,
				columns: ['對方沒付款','情況不符合','其他'],
				inx:-1,
				value:'',
				moreValue:'',
				orderIdS:0
			}
		},
		methods: {
			show() {
				this.inx = -1
				this.isShow = true
			},
			choose(index){
				this.inx = index
			},
			cancel(){
				this.isShow = false
			},
			sure(){
				this.value = this.columns[this.inx]
				this.isShow = false
			},
			async shenshu(){
				let data = {
					relationOrderId:this.orderIdS,
					title:this.value,
					content:this.moreValue,
					credentialLink: "憑證鏈接"
				}
				const res = await this.$api.orderCpmplain(data)
				console.log('RES',res)
			}
		}
	}
</script>

<style lang="less">
	.active{
		color: #FFFFFF !important;
	}
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
			background: #1C294C;
			z-index: 9999;
			border-radius: 16px 16px 0px 0px;
			.t{
				width: 100%;
				height: 10%;
				display: flex;
				align-items: center;
				justify-content: space-around;
				.infos{
					color: #FFFFFF;
				}
			}
			.b{
				width: 100%;
				height: 85%;
				overflow: scroll;
				.item{
					margin-top: 20rpx;
					width: 100%;
					height: 60rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
</style>
