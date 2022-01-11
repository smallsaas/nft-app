<template>
	<view class="payBox">
		<view class="boxA">
			<text class="A">付款給：{{sellerInfo.mobilePhone}}</text>
		</view>
		<view class="boxB">
			<text class="B">￥{{sellerInfo.transactionAmount}}</text>
		</view>
		<view class="boxC">
			<view class="top">
				<view class="topL">
					<text class="L">移動支付</text>
				</view>
				<view class="topR" @click="selectTypeOne" v-if="!fistType"></view>
				<view class="topY" v-if="fistType"></view>
			</view>
			<view class="bottom">
				<text class="z">支付賬号：{{sellerInfo.wechatAccount}}</text>
				<!-- <image src="https://s2.loli.net/2021/12/28/wIHVvBTtcxyNEJb.jpg" mode="widthFix" class="img"></image> -->
				<image :src="sellerInfo.wechatQrCodePhotoUrl" mode="widthFix" class="img"></image>
				<text class="zz">支付二維碼</text>
			</view>
		</view>
		<view class="boxD">
			<view class="top">
				<view class="topL">
					<text class="L">銀行卡支付</text>
				</view>
				<view class="topR" @click="selectTypeTwp" v-if="!secondType"></view>
				<view class="topY" v-if="secondType"></view>
			</view>
			<view class="bottom">
				<text class="z">銀行卡号：{{sellerInfo.bankAccountNumber}}</text>
				<text class="z zz">戶名：{{sellerInfo.bankAccountName}}</text>
			</view>
		</view>
		<view class="boxF">
			<view class="top">
				<text class="z">上傳付款憑證</text>
			</view>
			<view class="bottom">
				<view class="imgBox">
					<view class="success" v-for="(item,index) in list" :key="index" @click="check(item)">
						<image :src="item" mode="widthFix" class="upload"></image>
						<image src="../../static/service/close.png" mode="widthFix" class="deleteImg"></image>
					</view>
					<view class="ifsuccess">
						<image src="../../static/spirit/addImg.png" mode="widthFix" class="upload"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="boxE">
			<button class="btn" @click="pay">确認已付款</button>
		</view>


		<!-- //模态組件 -->
		<view class="motai" v-if="showBigImg">
			<image src="https://s2.loli.net/2021/12/28/wIHVvBTtcxyNEJb.jpg" mode="widthFix" class="upload"></image>
			<image src="../../static/service/close.png" mode="widthFix" class="deleteImg" @click="closeBigImg"></image>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			console.log("ID",e)
			// // let id = JSON.parse(e.data).id
			// // console.log(id, 1111)
			// // this.getOrder(e.data)
			this.iid = e.data
			this.getOrder(53)
		},
		// mounted() {
		// 	this.getOrder(this.iid)
		// },
		data() {
			return {
				fistType: false,
				secondType: false,

				list: ['https://s2.loli.net/2021/12/28/wIHVvBTtcxyNEJb.jpg'],
				showBigImg: false,
				bigImgSrc: '',
				
				iid:0,
				sellerInfo:{}
			}
		},
		methods: {
			getImage(url) {
				console.log(this.$config)
				let that = this
				let imagePath;
				if (url.indexOf("http" || "https") === 0) {
					imagePath = url
				} else {
					console.log(url.indexOf("["))
					if (url.indexOf("[") === 0) {
						let urlJSON = JSON.parse(url)
						let imageUrl = urlJSON[0].url
						if (imageUrl.indexOf("http" || "https") === 0) {
							imagePath = imageUrl
						} else {
							if(![undefined,null,''].includes(that.$config.endpoint)){
								imagePath = that.$config.endpoint+imageUrl;								
							}else{
								imagePath = that.$config.imageEndpoint +imageUrl
							}
							// return this.$config.endpoint + "/" + imageUrl
						}
					}
				}
				return imagePath
			},
			async getOrder(id) {
				const data = {
					wispOrderId: id
				}
				const res = await this.$api.getOrderInfo(data)
				console.log("RES",res)
				if(res.code == 200){
					this.sellerInfo.mobilePhone = res.data.seller.mobilePhone
					this.sellerInfo.transactionAmount = res.data.transactionAmount
					this.sellerInfo.wechatAccount = res.data.buyer.wechatAccount
					this.sellerInfo.wechatQrCodePhotoUrl = res.data.buyer.wechatQrCodePhotoUrl
					this.sellerInfo.bankAccountNumber = res.data.buyer.bankAccountNumber
					this.sellerInfo.bankAccountName = res.data.buyer.bankAccountName
					uni.showToast({
						title:'獲取信息成功',
						icon:'success',
						duration:1000
					})
					console.log(this.sellerInfo,123)
				}else{
					uni.showToast({
						title:'獲取信息失敗',
						icon:'error',
						duration:1000
					})
					return;
				}
				this.$forceUpdate()
			},
			// async getOrderInfo() {
			// 	const res = await this.$api.getSpiritOrderInfo()
			// 	console.log(res, 123)
			// },
			async pay() {
				const data = {
					wispOrderId: 3
				}
				const res = await this.$api.userPay(data)
				console.log(res)
			},
			selectTypeOne() {
				this.fistType = !this.fistType
				this.secondType = false
			},
			selectTypeTwp() {
				this.secondType = !this.secondType
				this.fistType = false
			},
			check(url) {
				this.bigImgSrc = url
				this.showBigImg = true
			},
			closeBigImg() {
				this.showBigImg = false
			}
		}
	}
</script>

<style lang="less">
	.payBox {
		width: 100%;
		height: 100%;
	
	.motai {
			width: 340px;
			height: 570px;
			position: fixed;
			top: 50px;
			left: 5%;

			.upload {
				width: 340px;
				height: 570px !important;
			}

			.deleteImg {
				position: fixed;
				right: 20px;
				top: 60px;
				width: 30px;
				height: 30px;
				z-index: 99999999;
			}
		}

		.boxF {
			width: 343px;
			height: 191px;
			background: #11181E;
			border-radius: 8px 8px 8px 8px;
			opacity: 1;
			margin: 24px auto;

			.top {
				width: 100%;
				height: 56px;
				border-bottom: 1px solid #C4C4C4;
				position: relative;

				.z {
					position: absolute;
					top: 16px;
					left: 16px;
					font-size: 16px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
			}

			.bottom {
				width: 100%;
				height: 134px;

				.imgBox {
					margin-top: 10px;
					display: flex;
					flex-direction: row;

					.success {
						height: auto;
						padding: 2px;
						padding-left: 10px;
						position: relative;

						.upload {
							width: 100px;
							height: 100px !important;
							border-radius: 5px 5px 0px 0px;
						}

						.deleteImg {
							position: absolute;
							right: 5px;
							top: 5px;
							width: 15px;
							height: 15px;
						}
					}

					.ifsuccess {
						width: 100px;
						height: 100px !important;
						padding: 2px;
						padding-left: 10px;

						.upload {
							width: 100px;
							height: 100px !important;
						}
					}
				}
			}
		}

		.boxE {
			width: 343px;
			height: 56px;
			margin: 24px auto;

			.btn {
				width: 343px;
				height: 56px;
				background: linear-gradient(45deg, #9331F5 0%, #0A95FF 100%);
				border-radius: 8px 8px 8px 8px;
				opacity: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 18px;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
		}

		.boxD {
			width: 343px;
			height: 139px;
			background: #11181E;
			border-radius: 8px 8px 8px 8px;
			opacity: 1;
			margin: -12px auto;

			.top {
				width: 100%;
				height: 56px;
				border-bottom: 1px solid #C4C4C4;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.topL {
					width: 80px;
					height: 24px;
					font-size: 16px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					margin-left: 10px;
				}

				.topR {
					width: 16px;
					height: 16px;
					margin-right: 10px;
					border: 1px solid #C4C4C4;
				}

				.topY {
					width: 16px;
					height: 16px;
					margin-right: 10px;
					background: url(../../static/login/yes.png) no-repeat;
					background-size: 100% 100%;
					background-position: center;
				}
			}

			.bottom {
				width: 100%;
				height: 82px;
				position: relative;

				.z {
					position: absolute;
					top: 8px;
					left: 15px;
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}

				.zz {
					top: 40px;
				}
			}
		}

		.boxC {
			width: 343px;
			height: 239px;
			background: #11181E;
			border-radius: 8px 8px 8px 8px;
			opacity: 1;
			margin: 24px auto;

			.top {
				width: 100%;
				height: 56px;
				border-bottom: 1px solid #C4C4C4;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.topL {
					width: 74px;
					height: 24px;
					font-size: 16px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					margin-left: 10px;
				}

				.topR {
					width: 16px;
					height: 16px;
					margin-right: 10px;
					border: 1px solid #C4C4C4;
				}

				.topY {
					width: 16px;
					height: 16px;
					margin-right: 10px;
					background: url(../../static/login/yes.png) no-repeat;
					background-size: 100% 100%;
					background-position: center;
				}
			}

			.bottom {
				width: 100%;
				height: 182px;
				position: relative;

				.z {
					position: absolute;
					top: 8px;
					left: 16px;
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}

				.img {
					width: 100px;
					height: 100px !important;
					position: absolute;
					top: 40px;
					left: 122px;
				}

				.zz {
					position: absolute;
					top: 142px;
					left: 142px;
					font-size: 12px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
		}

		.boxA {
			width: 100%;
			height: 48rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.A {
				font-size: 14px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}

		.boxB {
			width: 100%;
			height: 68rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 16px;

			.B {
				font-size: 36px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
</style>
