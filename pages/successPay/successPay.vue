<template>
	<view class="successPay">
		<view class="box">
			<view class="top">
				<text class="t">買家聯系電話：15845484521</text>
			</view>
			<view class="body">
				<view class="tt">買家付款憑證：</view>
				<view class="imgBox">
					<image src="../../static/spirit/newCoin.png" mode="aspectFit" class="img" @click="showBig"></image>
				</view>
			</view>
			<view class="btnBox">
				<button class="btn" @click="successPay">确認收款</button>
				<button class="btn shenshu">申訴</button>
			</view>
		</view>
		<view class="spirit_mask" v-if="isShowToast"></view>
		<!-- //模态組件 -->
		<view class="motai" v-if="showBigImg">
			<image src="https://s2.loli.net/2021/12/28/wIHVvBTtcxyNEJb.jpg" mode="aspectFit" class="upload"></image>
			<image src="../../static/service/close.png" mode="widthFix" class="deleteImg" @click="closeBigImg"></image>
		</view>
		<!-- 提示組件 -->
		<toast v-if="isShowToast" :data="toastMsg" @cancelToast="closeToast"></toast>
	</view>
</template>

<script>
	//溫馨提示
	import toast from '@/components/spirit/toasttwo.vue'
	export default {
		components:{toast},
		data() {
			return {
				isShowToast:false,
				toastMsg:'',
				showBigImg:false
			}
		},
		methods: {
			showBig(){
				this.showBigImg = true
			},
			closeBigImg(){
				this.showBigImg = false
			},
			toast(msg) {
				this.toastMsg = msg
				this.isShowToast = true
			},
			successPay(){
				this.isShowToast = true
				this.toast('确認收到對方的付款憑證款項嗎？')
			},
			closeToast(){
				this.isShowToast = false
			}
		}
	}
</script>

<style lang="less">
	.spirit_mask{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 502;
		background-color: #000;
		opacity: .8;
	}
.successPay{
	width: 100%;
	height: 100vh;
	.motai{
		width: 340px;
		height: 570px;
		position: fixed;
		top: 50px;
		left: 5%;
		.upload{
			width: 340px;
			height: 570px !important;
		}
		.deleteImg{
			position: fixed;
			right: 20px;
			top: 60px;
			width: 30px;
			height: 30px;
			z-index: 99999999;
		}
	}
	.box{
		margin: 5%;
		width: 90%;
		height: 511px;
		background: #11181E;
		border-radius: 8px 8px 8px 8px;
		opacity: 1;
		.btnBox{
			width: 100%;
			height: 88px;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.btn{
				width: 150px;
				height: 40px;
				background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%);
				border-radius: 8px 8px 8px 8px;
				opacity: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 16px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
			.shenshu{
				background: rgb(17,24,30);
				border: 1px solid #F95D5D;
			}
		}
		.body{
			width: 100%;
			height: 365px;
			border-bottom: 1px solid #C4C4C4;
			.tt{
				margin-top: 1%;
				margin-left: 5%;
				font-size: 16px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #ffffff;
			}
			.imgBox{
				width: 311px;
				height: 311px;
				margin: 10px auto;
				background: #050E17;
				border-radius: 8px 8px 8px 8px;
				.img{
					width: 311px;
					height: 311px !important;		
					border-radius: 8px 8px 8px 8px;
				}
			}
		}
		.top{
			width: 100%;
			height: 56px;
			border-bottom: 1px solid #C4C4C4;
			display: flex;
			align-items: center;
			.t{
				margin-left: 5%;
				font-size: 16px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #ffffff;
			}
		}
	}
}
</style>
