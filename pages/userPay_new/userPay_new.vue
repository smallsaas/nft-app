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
					<view class="success" v-for="(item,index) in list" :key="index">
						<image :src="item" mode="widthFix" class="upload" @click="check(item)"></image>
						<image src="../../static/BaseImage/close.png" mode="widthFix" class="deleteImg" @click="deleteImage(index)"></image>
					</view>
					<view class="ifsuccess" @click="uploadImage">
						<image src="../../static/spirit/addImg.png" mode="widthFix" class="upload"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="boxE">
			<button class="btn" @click="pay">确認已付款</button>
		</view>


		<!-- //模态組件 -->
		<view class="motai-mask" v-if="showBigImg"></view>
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
			this.getOrder(this.iid)
		},
		// mounted() {
		// 	this.getOrder(this.iid)
		// },
		data() {
			return {
				fistType: false,
				secondType: false,

				list: [],
				showBigImg: false,
				bigImgSrc: '',
				
				iid:0,
				sellerInfo:{}
			}
		},
		methods: {
			// 删除图片
			deleteImage(i){
				this.list.splice(i,1)
				this.$forceUpdate()
			},
			// 上传图片
			uploadImage(){
				let that = this
				uni.chooseImage({
					count:9,
					success:async function(path) {
						let files = path.tempFiles
						for(var i=0;i<files.length;i++){
							let file = files[i]
							let webPath = await that.$upload("/api/u/fs/uploadfile",file)
							// console.log(webPath)
							let fileList = that.list
							fileList.push(webPath)
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
				console.log("RES",res)
				if(res.code == 200){
					this.sellerInfo.mobilePhone = res.data.seller.mobilePhone
					this.sellerInfo.transactionAmount = res.data.transactionAmount
					this.sellerInfo.wechatAccount = res.data.seller.wechatAccount
					if(res.data.seller.wechatQrCodePhotoUrl.indexOf('[')===0){
						let url = JSON.parse(res.data.seller.wechatQrCodePhotoUrl)[0]
						this.sellerInfo.wechatQrCodePhotoUrl = url
					}else{
						this.sellerInfo.wechatQrCodePhotoUrl = res.data.seller.wechatQrCodePhotoUrl
					}
					this.sellerInfo.bankAccountNumber = res.data.seller.bankAccountNumber
					this.sellerInfo.bankAccountName = res.data.seller.bankAccountName
					uni.showToast({
						title:'获取信息成功',
						icon:'success',
						duration:1000
					})
					console.log(this.sellerInfo,123)
				}else{
					uni.showToast({
						title:'获取信息失败',
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
	.motai-mask{
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
			height: 139px;
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
					width: 80px;
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

				.z {
					position: absolute;
					top: 8px;
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
