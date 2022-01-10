<template>
	<view class="box">
		<view class="item">
			<view class="imgBox">
				<image :src="getImage(item.wispOrder.pictureUrl)" mode="widthFix" class="img"></image>
			</view>
			<view class="nameBox">
				<text class="name">{{item.wispOrder.name}}</text>
			</view>
			<view class="levelBox">
				<image src="../../../static/spirit/levelFive.png" mode="widthFix" class="levelImg"></image>
			</view>
			<view class="infoBox">
				<!-- <text class="info">能力值：{{item.wisp.minimumValue}} - {{item.wisp.maximumValue}}</text> -->
			</view>
			<view class="infoBox infoBoxTwo">
				<!-- <text class="info">出售：{{item.stageChangeTime}}</text> -->
			</view>
			<view class="infoBox infoBoxThree">
				<text class="info">買家：18545879654</text>
			</view>
			<view class="line"></view>
			<view class="btnBox">
				<text class="timeOne">對方付款中...</text>
				<text class="timeTwo">剩餘付款時間 01:58:32</text>
			</view>
		</view>
		<!-- <toast v-if="isShowToast" :data="toastMsg" @cancelToast="closeToast"></toast> -->
	</view>
</template>

<script>
	// import toast from '../../spirit/toast.vue'
	export default {
		props: {
			item: Object,
			ext: Object
		},
		// components:{toast},
		data() {
			return {
				// isShowToast:false,
				// toastMsg:''
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
							if (![undefined, null, ''].includes(that.$config.endpoint)) {
								imagePath = that.$config.endpoint + "/" + imageUrl;
							} else {
								imagePath = that.$config.imageEndpoint + "/" + imageUrl
							}
							// return this.$config.endpoint + "/" + imageUrl
						}
					}
				}
				return imagePath
			}
			// toast(msg) {
			// 	this.toastMsg = msg
			// 	this.isShowToast = true
			// },
			// noMessage(){
			// 	this.toast('功能暫未開放，敬請期待!')
			// },
			// closeToast(){
			// 	this.isShowToast = false
			// }
		}
	}
</script>

<style lang="less">
	.box {
		width: 100%;
		height: 100%;
		background: #050E17;
		padding-bottom: 20rpx;

		.item {
			margin: 0rpx auto;
			width: 686rpx;
			height: 470rpx;
			background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
			border-radius: 8px 8px 8px 8px;
			opacity: 1;
			border-top: 2rpx solid rgb(50, 71, 137);
			border-left: 2rpx solid rgb(50, 71, 137);
			position: relative;

			// margin-bottom: 20rpx;
			.imgBox {
				width: 280rpx;
				height: 280rpx;
				border-radius: 0px 0px 0px 0px;
				opacity: 1;
				position: absolute;
				top: 24rpx;
				left: 24rpx;

				.img {
					width: 280rpx;
					height: 280rpx !important;
				}
			}

			.nameBox {
				width: 350rpx !important;
				height: 44rpx;
				position: absolute;
				top: 32rpx;
				left: 328rpx;

				.name {
					font-size: 16px;
					font-family: PingFang SC-Bold, PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
				}
			}

			.levelBox {
				width: 134rpx;
				height: 36rpx !important;
				position: absolute;
				top: 92rpx;
				left: 328rpx;

				.levelImg {
					width: 134rpx;
					height: 36rpx !important;
				}
			}

			.infoBox,
			.infoBoxTwo,
			.infoBoxThree {
				width: 350rpx !important;
				height: 34rpx;
				position: absolute;
				top: 148rpx;
				left: 328rpx;

				.info {
					font-size: 12px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}

			.infoBoxTwo {
				position: absolute;
				top: 202rpx !important;
			}

			.infoBoxThree {
				position: absolute;
				top: 256rpx !important;
			}

			.line {
				width: 684rpx;
				height: 2rpx;
				background: linear-gradient(270deg, #182641 0%, #3F547D 49%, #182641 100%);
				border-radius: 0px 0px 0px 0px;
				opacity: 1;
				position: absolute;
				top: 324rpx;
			}

			.btnBox {
				width: 100%;
				height: 142rpx;
				position: absolute;
				bottom: 0rpx;
				position: relative;

				.timeOne {
					width: 81px;
					height: 22px;
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFAD33;
					position: absolute;
					top: 388rpx;
					left: 32rpx;
				}

				.timeTwo {
					width: 147px;
					height: 22px;
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					position: absolute;
					top: 388rpx;
					left: 360rpx;
				}
			}
		}
	}
</style>
