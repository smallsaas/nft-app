<template>
	<view class="box">
		<view class="item">
			<view class="imgBox">
				<image :src="item.wisp.previewPhotoUrl" mode="widthFix" class="img"></image>
			</view>
			<view class="nameBox">
				<text class="name">{{item.wisp.name}}</text>
			</view>
			<view class="levelBox">
				<image v-if="item.wisp.level == 1" src="../../../static/spirit/levelOne.png" mode="widthFix" class="levelImg"></image>
				<image v-if="item.wisp.level == 2" src="../../../static/spirit/levelTwo.png" mode="widthFix" class="levelImg"></image>
				<image v-if="item.wisp.level == 3" src="../../../static/spirit/levelThree.png" mode="widthFix" class="levelImg"></image>
				<image v-if="item.wisp.level == 4" src="../../../static/spirit/levelFour.png" mode="widthFix" class="levelImg"></image>
				<image v-if="item.wisp.level == 5" src="../../../static/spirit/levelFive.png" mode="widthFix" class="levelImg"></image>
				<image v-if="item.wisp.level == 6" src="../../../static/spirit/level6.png" mode="widthFix" class="levelImg"></image>
				<image v-if="item.wisp.level == 7" src="../../../static/spirit/level7.png" mode="widthFix" class="levelImg"></image>
				<image v-if="item.wisp.level == 8" src="../../../static/spirit/level8.png" mode="widthFix" class="levelImg"></image>
			</view>
			<view class="infoBox">
				<text class="info">能力值：400</text>
			</view>
			<view class="infoBox infoBoxTwo">
				<text class="info">增長能力：{{item.wisp.growthPercent}}%</text>
			</view>
			<view class="infoBox infoBoxThree">
				<text class="info">領養：</text>
			</view>
			<view class="line"></view>
			<view class="btnBox">
				<button class="btn one" v-if="true" @click="noMessage">鑄造</button>
				<view class="boxs" v-if="true">
					<button class="two" @click="noMessage">出售</button>
				</view>
				<text class="time" v-if="false">剩餘時間 48:52:47</text>
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
		padding-bottom: 20rpx;
		.item{
			margin: 0rpx auto;
			width: 686rpx;
			height: 470rpx;
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
			}
			.infoBoxTwo{
				position: absolute;
				top: 202rpx !important;
			}
			.infoBoxThree{
				position: absolute;
				top: 256rpx !important;
			}
			.line{
				width: 684rpx;
				height: 2rpx;
				background: linear-gradient(270deg, #182641 0%, #3F547D 49%, #182641 100%);
				border-radius: 0px 0px 0px 0px;
				opacity: 1;
				position: absolute;
				top: 324rpx;
			}
			.btnBox{
				width: 100%;
				height: 142rpx;
				position: absolute;
				bottom: 0rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
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
						font-size: 16px;
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
