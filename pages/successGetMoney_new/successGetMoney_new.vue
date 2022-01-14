<template>
	<view class="success">
		<view class="box">
			<view class="top">
				<text class="o">買家聯系電話：{{buyphone}}</text>
			</view>
			<view class="body">
				<text class="o">買家付款憑證</text>
				<view class="b">
					<image :src="pictureUrl" mode="widthFix" class="img" @click="showBImg"></image>
				</view>
			</view>
			<view class="bottom">
				<pretty-button class="btn" text="确認收款" @click="sureOrder"></pretty-button>
				<button class="btn btns" @click="goTo">申述</button>
			</view>
		</view>

		<!-- 模态組件 -->
		<view class="motai-mask" v-if="showBigImg==true || isShowToast==true"></view>
		<view class="motai" v-if="showBigImg">
			<image src="../../static/spirit/newBALL.png" mode="widthFix" class="upload"></image>
			<image src="../../static/service/close.png" mode="widthFix" class="deleteImg" @click="closeBigImg"></image>
		</view>

		<!-- 交互組件 -->
		<toast v-if="isShowToast" :data="toastMsg" @cancelToast="closeToast" :orderId="this.iid"></toast>
	</view>
</template>

<script>
	import toast from '@/components/spirit/toastForSureOrder.vue'
	export default {
		onLoad(e) {
			console.log("ID", e)
			this.iid = e.data
			this.buyphone = e.phone
			this.pictureUrl = e.picture
			// console.log('res',this.iid)
		},
		mounted() {
		},
		components: {
			toast
		},
		data() {
			return {
				showBigImg: false,
				bigImgSrc: '',
				iid: 0,
				isShowToast: false,
				toastMsg: '',
				buyphone:'',
				pictureUrl:''
			}
		},
		methods: {
			
			// async getOrder(id) {
			// 	const data = {
			// 		wispOrderId:id
			// 	}
			// 	const res = await this.$api.getOrderBuyerInfo(data)
			// 	console.log("RES", res)
			// 	if(res.code == 200){
			// 		this.buyInfo.buyerPhone = res.wispOrder.buyerPhone
			// 		this.buyInfo.pictureUrl = res.wispOrder.pictureUrl

			// 	}
			// 	// await this.$forceUpdate()
			// },
		
			toast(msg) {
				this.toastMsg = msg
				this.isShowToast = true
			},
			closeToast() {
				this.isShowToast = false
			},
			async sureOrder(){
				this.isShowToast = true
				this.toast('确認收到對方的付款憑證款項嗎？')
				// const data = {
				// 	wispOrderId:this.iid
				// }
				// const res = await this.$api.successGetMoneyForSeller(data)
				// if(res.code == 200){
				// 	uni.showToast({
				// 		icon:'success',
				// 		duration:100,
				// 		title:'确認收款成功'
				// 	})
				// }
				// console.log('RES',res)
			},
			showBImg() {
				this.showBigImg = true
			},
			closeBigImg() {
				console.log('aaaaaaaaa')
				this.showBigImg = false
			},
			goTo(){
				uni.navigateTo({
					url:'/pages/representations_new/representations_new?orderId=' + this.iid 
				})
			}
		}
	}
</script>

<style lang="less">
	.success {
		width: 100%;
		height: 100vh !important;

		.motai-mask {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background-color: #000;
			opacity: .8;
			z-index: 5000;
		}

		.motai {
			// width: 340px;
			// height: 570px;
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			z-index: 5001;

			.upload {
				// width: 340px;
				// height: 570px !important;
				width: 80%;
			}

			.deleteImg {
				position: fixed;
				bottom: 50rpx;
				width: 50px;
				height: 50px;
			}
		}

		.box {
			margin-top: 50rpx;
			margin-left: 5%;
			width: 90%;
			height: 70%;
			background: #11181E;
			border-radius: 8px 8px 8px 8px;

			.bottom {
				width: 100%;
				height: 17% !important;
				display: flex;
				flex-direction: row;
				align-items: center;
				border-top: 1px solid rgb(196, 196, 196, 0.1);

				.btn {
					border-top: ;
					margin-left: 6%;
					width: 40%;
					height: 40px;
					background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%);
					border-radius: 8px 8px 8px 8px;
					opacity: 1;
				}

				.btns {
					display: flex;
					align-items: center;
					justify-content: center;
					background: #11181E;
					border: 1px solid #F95D5D;
				}
			}

			.body {
				width: 100%;
				height: 70%;
				margin-top: 20rpx;

				.o {
					margin-left: 20rpx;
					font-size: 16px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #ffffff;
				}

				.b {
					width: 100%;
					height: 90%;
					display: flex;
					align-items: center;
					justify-content: center;

					.img {
						width: 90%;
						height: 90% !important;
						border-radius: 8px 8px 8px 8px;
					}
				}
			}

			.top {
				width: 100%;
				height: 10%;
				display: flex;
				align-items: center;
				border-bottom: 1px solid rgb(196, 196, 196, 0.1);

				.o {
					margin-left: 20rpx;
					font-size: 16px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #ffffff;
				}
			}
		}
	}
</style>
