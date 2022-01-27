<template>
	<view class="payBox">
		<view class="boxA">
			<text class="A">付款給：{{sellerInfo.name}}</text>
		</view>
		<view class="boxB">
			<text class="B">￥{{sellerInfo.transactionAmount}}</text>
		</view>
		<view class="boxC">
			<view class="top">
				<view class="topL">
					<text class="L">微信支付</text>
				</view>
				<view class="topR" @click="selectTypeOne" v-if="!fistType"></view>
				<view class="topY" v-if="fistType"></view>
			</view>
			<view class="bottom">
				<text class="x">戶名：{{sellerInfo.wechatAccount}}</text>
				<text class="z">微信賬号：{{sellerInfo.wechatAccount}}</text>
				<!-- <image src="https://s2.loli.net/2021/12/28/wIHVvBTtcxyNEJb.jpg" mode="widthFix" class="img"></image> -->
				<image :src="sellerInfo.wechatQrCodePhotoUrl" mode="widthFix" class="img"></image>
				<text class="zz">微信二維碼</text>
			</view>
		</view>
		<view class="boxDD">
			<view class="top">
				<view class="topL">
					<text class="L">支付寶支付</text>
				</view>
				<view class="topR" @click="selectTypeThree" v-if="!thirdType"></view>
				<view class="topY" v-if="thirdType"></view>
			</view>
			<view class="bottom">
				<text class="x">戶名：{{sellerInfo.wechatAccount}}</text>
				<text class="z">支付寶賬号：{{sellerInfo.alipayAccount}}</text>
				<!-- <image src="https://s2.loli.net/2021/12/28/wIHVvBTtcxyNEJb.jpg" mode="widthFix" class="img"></image> -->
				<image :src="sellerInfo.alipayQrCodePhotoUrl" mode="widthFix" class="img"></image>
				<text class="zz">支付寶二維碼</text>
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
				<text class="z">開戶行：{{sellerInfo.bankName}}</text>
				<text class="z zz">戶名：{{sellerInfo.bankAccountName}}</text>
				<text class="z zzz">銀行卡号：{{sellerInfo.bankAccountNumber}}</text>
			</view>
		</view>
		
		<view class="boxD" style="margin-top: 25px;">
			<view class="top">
				<view class="topL">
					<text class="L">銀行卡2支付</text>
				</view>
				<view class="topR" @click="selectTypeFifth" v-if="!fifthType"></view>
				<view class="topY" v-if="fifthType"></view>
			</view>
			
			<view class="bottom">
				<text class="z">開戶行2：{{sellerInfo.bankName2}}</text>
				<text class="z zz">戶名2：{{sellerInfo.bankAccountName2}}</text>
				<text class="z zzz">銀行卡号2：{{sellerInfo.bankAccountNumber2}}</text>
			</view>
		</view>
		
		<view class="boxF">
			<view class="top">
				<text class="z">上傳付款憑證</text>
			</view>
			<view class="bottom">
				<view class="imgBox">
					<view class="success" v-for="(item,index) in list" :key="index">
						<image :src="item" mode="widthFix" class="upload" @click="check(item)"></image>
						<image src="../../static/BaseImage/close.png" mode="widthFix" class="deleteImg"
							@click="deleteImage(index)" v-if="!showBigImg"></image>
					</view>
					<view class="ifsuccess" @click="uploadImage">
						<image src="../../static/spirit/addImg.png" mode="widthFix" class="upload"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="boxE">
			<button class="btn" @click="pay">{{disabled ? '确認' : '确認已付款'}}</button>
		</view>


		<!-- //模态組件 -->
		<view class="motai-mask" v-if="showBigImg"></view>
		<view class="motai" v-if="showBigImg">
			<image :src="bigImgSrc" mode="widthFix" class="upload"></image>
			<image src="../../static/service/close.png" mode="widthFix" class="deleteImg" @click="closeBigImg"></image>
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	export default {
		onLoad(e) {
			console.log("ID", e)
			this.iid = e.data
			this.getOrder(this.iid)
			console.log('-------------------------')
		},
		data() {
			return {
				fistType: false,
				secondType: false,
				thirdType: false,
				fifthType: false,

				list: [],
				showBigImg: false,
				bigImgSrc: '',

				iid: 0,
				sellerInfo: {},
				orderData: {}
			}
		},
		computed:{
			disabled () {
				return ['COMPLAINING', 'PAID'].includes(_.get(this.orderData, 'status'))
			}
		},
		methods: {
			// 删除圖片
			deleteImage(i) {
				this.list.splice(i, 1)
				this.$forceUpdate()
			},
			getImage(item) {
				console.log("圖片路徑", item)
				if (item.indexOf('http' || 'https') === 0) {
					return item
				} else {
					return this.$config.endpoint + item
				}
			},
			getImages(url) {
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
							if (![undefined, null, ''].includes(that.$config.endpoint)) {
								imagePath = that.$config.endpoint + imageUrl;
							} else {
								imagePath = that.$config.imageEndpoint + imageUrl
							}
							// return this.$config.endpoint + "/" + imageUrl
						}
					}
				}
				return imagePath
			},
			// 上傳圖片
			uploadImage() {
				let that = this
				uni.chooseImage({
					count: 9,
					success: async function(path) {
						let files = path.tempFiles
						for (var i = 0; i < files.length; i++) {
							let file = files[i]
							let webPath = await that.$upload("/api/u/fs/uploadfile", file.path)
							let fileList = that.list
							fileList.push(that.$config.endpoint + webPath)
							// console.log(fileList)
						}
					}
				})
			},
			async getOrder(id) {
				const data = {
					wispOrderId: id
				}
				const res = await this.$api.getOrderInfo(data)
				console.log("RES", res)
				if (res.code == 200) {
					this.orderData = res.data || {}
					if (_.get(res, 'data.paymentMethod') === 'WECHAT_PAYMENT') {
						this.fistType = true
					}
					if (_.get(res, 'data.paymentMethod') === 'ALIPAY_PAYMENT') {
						this.thirdType = true
					}
					
					if (_.get(res, 'data.paymentMethod') === 'BANK_CARD_PAYMENT') {
						this.secondType = true
						this.fifthType = true
					}
					
					
					if (res.data.seller.mobilePhone == null) {
						this.sellerInfo.mobilePhone = ''
					} else {
						this.sellerInfo.mobilePhone = res.data.seller.mobilePhone
					}
					if (res.data.seller.name == null) {
						this.sellerInfo.name = ''
					} else {
						this.sellerInfo.name = res.data.seller.name
					}
					this.sellerInfo.transactionAmount = res.data.transactionAmount
					this.sellerInfo.wechatAccount = res.data.seller.wechatAccount
					if (res.data.seller.wechatQrCodePhotoUrl == null) {
						this.sellerInfo.wechatQrCodePhotoUrl = ''
					} else {
						this.sellerInfo.wechatQrCodePhotoUrl = this.getImages(res.data.seller.wechatQrCodePhotoUrl)
					}
					console.log(res.data.seller.wechatQrCodePhotoUrl, '------微信哈哈哈哈哈哈')
					// this.sellerInfo.wechatQrCodePhotoUrl = res.data.seller.wechatQrCodePhotoUrl
					this.sellerInfo.alipayAccount = res.data.seller.alipayAccount
					// this.sellerInfo.alipayQrCodePhotoUrl = res.data.seller.alipayQrCodePhotoUrl
					if (res.data.seller.alipayQrCodePhotoUrl == null) {
						this.sellerInfo.alipayQrCodePhotoUrl = ''
					} else {
						this.sellerInfo.alipayQrCodePhotoUrl = this.getImages(res.data.seller.alipayQrCodePhotoUrl)
					}
					console.log(this.sellerInfo.alipayQrCodePhotoUrl, '------支付寶哈哈哈哈哈哈')
					this.sellerInfo.bankAccountNumber = res.data.seller.bankAccountNumber
					this.sellerInfo.bankAccountName = res.data.seller.bankAccountName
					this.sellerInfo.bankName = res.data.seller.bankName
					
					this.sellerInfo.bankAccountNumber2 = res.data.seller.bankAccountNumber2
					this.sellerInfo.bankAccountName2 = res.data.seller.bankAccountName2
					this.sellerInfo.bankName2 = res.data.seller.bankName2
					uni.showToast({
						title: '獲取信息成功',
						icon: 'success',
						duration: 1000
					})
					console.log(this.sellerInfo, 123)
				} else {
					uni.showToast({
						title: '獲取信息失敗',
						icon: 'error',
						duration: 1000
					})
					return;
				}
				await this.$forceUpdate()
			},

			async pay() {
				const data = {
					wispOrderId: this.iid,
					pictureUrl: this.list[0],
					paymentMethod: "",
					// BANK_CARD_PAYMENT,
					// ALIPAY_PAYMENT,
					// WECHAT_PAYMENT
				}
				console.log(this.fistType, this.secondType, this.thirdType, this.fifthType)
				if (!this.disabled && this.fistType == false && this.secondType == false && this.thirdType == false && this.fifthType == false) {
					uni.showToast({
						title: '請勾選付款方式',
						icon: 'none',
						duration: 1000
					})
					return
				}
				if (this.fistType == true && this.secondType == false && this.thirdType == false && this.fifthType == false) {
					data.paymentMethod = 'WECHAT_PAYMENT'
				}
				if (this.fistType == false && this.secondType == false && this.thirdType == true && this.fifthType == false) {
					data.paymentMethod = 'ALIPAY_PAYMENT'
				}
				if (this.fistType == false && this.secondType == true && this.thirdType == false && this.fifthType == false) {
					data.paymentMethod = 'BANK_CARD_PAYMENT'
				}
				if (this.fistType == false && this.secondType == false && this.thirdType == false && this.fifthType == true) {
					data.paymentMethod = 'BANK_CARD_PAYMENT'
				}
				if (this.list.length == 0) {
					uni.showToast({
						title: '請上傳付款憑證',
						icon: 'none',
						duration: 1000
					})
					return
				}
                let res
                if (_.get(this.orderData, 'status') === 'PAID') {
                    res = await this.$api.postBuyerReUploadPaymentProof({
                        wispOrderId: data.wispOrderId,
                        pictureUrl: data.pictureUrl,
                        paymentMethod: data.paymentMethod
                    })
                } else if (_.get(this.orderData, 'status') === 'COMPLAINING') {
                    res = await this.$api.postReiterate(data.wispOrderId, {
                        credentialLink: data.pictureUrl
                    })
                }  else {
                    res = await this.$api.userPay(data)
                }
				console.log(res)
				if (res.code == 200) {
					uni.showToast({
						title: '付款成功',
						icon: 'success',
						duration: 1000
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				} else {
					uni.showToast({
						title: res.message,
						icon: 'none',
						duration: 1000
					})
				}
			},
			selectTypeOne() {
				if (this.disabled) {
					return
				}
				this.fistType = !this.fistType
				this.secondType = false
				this.thirdType = false
				this.fifthType = false
			},
			selectTypeTwp() {
				if (this.disabled) {
					return
				}
				this.secondType = !this.secondType
				this.fistType = false
				this.thirdType = false
				this.fifthType = false
			},
			selectTypeThree() {
				if (this.disabled) {
					return
				}
				this.thirdType = !this.thirdType
				this.fistType = false
				this.secondType = false
				this.fifthType = false
			},
			selectTypeFifth(){
				if (this.disabled) {
					return
				}
				this.fifthType = !this.fifthType
				this.fistType = false
				this.secondType = false
				this.thirdType = false
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
				border-bottom: 1px solid #1B2228;
				position: relative;

				.z {
					position: absolute;
					top: 16px;
					left: 16px;
					font-size: 16px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #B9BBBD;
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
							border-radius: 16rpx 16rpx 16rpx 16rpx;
						}

						.deleteImg {
							position: absolute;
							right: 8rpx;
							top: 8rpx;
							width: 40rpx;
							height: 40rpx;
							z-index: 50000;
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
			height: 165px;
			background: #11181E;
			border-radius: 8px 8px 8px 8px;
			opacity: 1;
			margin: -12px auto;

			.top {
				width: 100%;
				height: 56px;
				border-bottom: 1px solid #1B2228;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.topL {
					width: 95px;
					height: 24px;
					font-size: 16px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #B9BBBD;
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
					color: #B9BBBD;
				}

				.zz {
					top: 40px;
				}
				
				.zzz{
					top: 70px;
				}
			}
		}

		.boxDD {
			width: 343px;
			height: 259px;
			background: #11181E;
			border-radius: 8px 8px 8px 8px;
			opacity: 1;
			margin: -12px auto 24px auto;

			.top {
				width: 100%;
				height: 56px;
				border-bottom: 1px solid #1B2228;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.topL {
					width: 200px;
					height: 24px;
					font-size: 16px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #B9BBBD;
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
				
				.x {
					position: absolute;
					top: 8px;
					left: 16px;
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #B9BBBD;
				}
				
				.z {
					position: absolute;
					top: 8px;
					left: 16px;
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #B9BBBD;
				}
				
				.z {
					position: absolute;
					top: 28px;
					left: 16px;
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #B9BBBD;
				}

				.img {
					width: 100px;
					height: 100px !important;
					position: absolute;
					top: 60px;
					left: 122px;
				}

				.zz {
					position: absolute;
					top: 162px;
					left: 142px;
					font-size: 12px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #B9BBBD;
				}
			}
		}

		.boxC {
			width: 343px;
			height: 259px;
			background: #11181E;
			border-radius: 8px 8px 8px 8px;
			opacity: 1;
			margin: 24px auto;

			.top {
				width: 100%;
				height: 56px;
				border-bottom: 1px solid #1B2228;
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
					color: #B9BBBD;
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

				.x {
					position: absolute;
					top: 8px;
					left: 16px;
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #B9BBBD;
				}
				
				.z {
					position: absolute;
					top: 28px;
					left: 16px;
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #B9BBBD;
				}

				.img {
					width: 100px;
					height: 100px !important;
					position: absolute;
					top: 60px;
					left: 122px;
				}

				.zz {
					position: absolute;
					top: 162px;
					left: 142px;
					font-size: 12px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #B9BBBD;
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
				color: #B9BBBD;
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
				color: #B9BBBD;
			}
		}
	}
</style>
