<template>
	<view class="box">
		<view class="item">
			<view class="imgBox">
				<image :src="getImage(item.wisp.previewPhotoUrl)" mode="widthFix" class="img"></image>
			</view>
			<view class="nameBox">
				<text class="name">{{item.wisp.name}}</text>
			</view>
			<view class="levelBox">
				<image class="levelImg" src="../../../static/level/one.png" mode="widthFix"
					v-if="item.wisp.level==1"></image>
				<image class="levelImg" src="../../../static/level/two.png" mode="widthFix"
					v-if="item.wisp.level==2"></image>
				<image class="levelImg" src="../../../static/level/three.png" mode="widthFix"
					v-if="item.wisp.level==3"></image>
				<image class="levelImg" src="../../../static/level/four.png" mode="widthFix"
					v-if="item.wisp.level==4"></image>
				<image class="levelImg" src="../../../static/level/five.png" mode="widthFix"
					v-if="item.wisp.level==5"></image>
				<image class="levelImg" src="../../../static/level/six.png" mode="widthFix"
					v-if="item.wisp.level==6"></image>
				<image class="levelImg" src="../../../static/level/seven.png" mode="widthFix"
					v-if="item.wisp.level==7"></image>
				<image class="levelImg" src="../../../static/level/eight.png" mode="widthFix"
					v-if="item.wisp.level==8"></image>
			</view>
			<view class="infoBox">
				<text class="info">能力值：{{item.amountPrice}}/{{item.additionalIncomeDay}}</text>
			</view>
			<view class="infoBox infoBoxTwo">
				<text class="info">增長能力：{{item.wisp.growthPercent}}%</text>
			</view>
			<view class="infoBox infoBoxThree">
				<text class="info">培養天數：{{item.wisp.growthDays}}</text>
			</view>
			<view class="infoBox infoBoxThree">
				<text class="info sss">領養：{{item.updateTime}}</text>
			</view>
			<view class="line"></view>
			<view class="btnBox">
				<button class="btn one" v-if="true" @click="noMessage">鑄造(待開放</button>
				<view class="boxs" v-if="true">
					<button class="two">(培養中)自動挂售</button>
				</view>
				<!-- <text class="times" v-if="true">成長中</text>
				<text class="time" v-if="true">剩餘時間 48:52:47</text> -->
			</view>
		</view>
		<toast v-if="isShowToast" :data="toastMsg" @cancelToast="closeToast"></toast>
	</view>
</template>

<script>
	import toast from '../../spirit/toast.vue'
	export default{
		components:{toast},
		props: {
			item: Object,
			ext: Object
		},
		data() {
			return {
				isShowToast:false,
				toastMsg:''
			}
		},
		methods:{
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
								imagePath = that.$config.endpoint + "/" +imageUrl;								
							}else{
								imagePath = that.$config.imageEndpoint + "/" +imageUrl
							}
							// return this.$config.endpoint + "/" + imageUrl
						}
					}
				}
				return imagePath
			},
			toast(msg) {
				this.toastMsg = msg
				this.isShowToast = true
			},
			noMessage(){
				this.toast('功能暫未開放，敬請期待!')
			},
			closeToast(){
				this.isShowToast = false
			}
		}
	}
</script>

<style lang="less">
	.box{
		width: 100%;
		height: 100%;
		background: #050E17;
		padding-top: 20rpx;
		// padding-bottom: 20rpx;
		.item{
			margin: 0rpx auto;
			width: 686rpx;
			height: 490rpx;
			background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
			border-radius: 8px 8px 8px 8px;
			opacity: 1;
			border-top: 2rpx solid rgb(50, 71, 137);
			border-left: 2rpx solid rgb(50, 71, 137);
			position: relative;
			.imgBox{
				width: 280rpx;
				height: 280rpx;
				border-radius: 0px 0px 0px 0px;
				opacity: 1;
				position: absolute;
				top: 24rpx;
				left: 24rpx;
				.img{
					width: 280rpx;
					height: 280rpx !important;
				}
			}
			.nameBox{
				width: 350rpx !important;
				height: 44rpx;
				position: absolute;
				top: 32rpx;
				left: 328rpx;
				.name{
					font-size: 16px;
					font-family: PingFang SC-Bold, PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
				}
			}
			.levelBox{
				width: 134rpx;
				height: 36rpx !important;
				position: absolute;
				top: 92rpx;
				left: 328rpx;
				.levelImg{
					width: 134rpx;
					height: 36rpx !important;
				}
			}
				
			.infoBox,.infoBoxTwo,.infoBoxThree{
				width: 350rpx !important;
				height: 34rpx;
				position: absolute;
				top: 148rpx;
				left: 328rpx;
				.info{
					font-size: 12px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
				.sss{
					top: 168rpx !important;
				}
			}
			.infoBoxTwo{
				position: absolute;
				top: 202rpx !important;
			}
			.infoBoxThree{
				position: absolute;
				top: 256rpx !important;
				.sss{
					position: relative;
					top: 40rpx !important;
				}
			}
			.line{
				width: 684rpx;
				height: 2rpx;
				background: linear-gradient(270deg, #182641 0%, #3F547D 49%, #182641 100%);
				border-radius: 0px 0px 0px 0px;
				opacity: 1;
				position: absolute;
				top: 344rpx;
			}
			.btnBox{
				width: 100%;
				height: 142rpx;
				position: absolute;
				bottom: 0rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				.times{
					position: absolute;
					left: 32rpx;
					width: 119px;
					height: 22px;
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #31E4B9;
				}
				.time{
					position: absolute;
					right: 32rpx;
					width: 119px;
					height: 22px;
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
				.btn{
					width: 300rpx;
					height: 80rpx;
					background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%);
					border-radius: 8px 8px 8px 8px;
					opacity: 1;
					font-size: 16px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.boxs{
					width: 300rpx !important;
					height: 80rpx !important;
					padding: 2rpx;
					border-radius: 8px;
					border: 1px solid;
					background-image: linear-gradient(to right bottom,rgba(147, 49, 245, 1),rgba(11, 149, 255, 1));
					margin-right: 32rpx;
					.two{
						width: 300rpx !important;
						height: 80rpx !important;
						font-size: 15px;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						display: flex;
						align-items: center;
						justify-content: center;
						background: rgb(25,38,68);
					}
				}
			}
		}
	}
</style>
