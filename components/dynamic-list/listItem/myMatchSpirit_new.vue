<template>
	<view class="spiritMarketNew">
		<view class="newBox">
			<view class="imgBox">
				<image :src="item.wisp.previewPhotoUrl" mode="widthFix" class="img"></image>
			</view>
			<view class="info">
				<view class="nameBox"><text class="name">{{item.wispName}}</text></view>
				<view class="levelBox">
					<image class="level" src="../../../static/spirit/levelOne.png" mode="widthFix" v-if="item.wisp.level==1"></image>
					<image class="level" src="../../../static/spirit/levelTwo.png" mode="widthFix" v-if="item.wisp.level==2"></image>
					<image class="level" src="../../../static/spirit/levelThree.png" mode="widthFix" v-if="item.wisp.level==3"></image>
					<image class="level" src="../../../static/spirit/levelFour.png" mode="widthFix" v-if="item.wisp.level==4"></image>
					<image class="level" src="../../../static/spirit/levelFive.png" mode="widthFix" v-if="item.wisp.level==5"></image>
					<image class="level" src="../../../static/spirit/level6.png" mode="widthFix" v-if="item.wisp.level==6"></image>
					<image class="level" src="../../../static/spirit/level7.png" mode="widthFix" v-if="item.wisp.level==7"></image>
					<image class="level" src="../../../static/spirit/level8.png" mode="widthFix" v-if="item.wisp.level==8"></image>
				</view>
				<view class="tBox">
					<view class="Child">
						<text class="Co">增長能力</text>
						<text class="Ct">{{item.wisp.growthPercent}}%</text>
					</view>
					<view class="Child">
						<text class="Co">能力值</text>
						<text class="Ct">400-500</text>
					</view>
					<view class="Child">
						<text class="Co">培養天數</text>
						<text class="Ct">{{item.wisp.growthDays}}天</text>
					</view>
				</view>
			</view>
			<view class="timeBox"><text class="time">預約時間：{{change}}</text></view>
			<view class="oBox">
				<view class="Child">
					<image src="../../../static/spirit/newCoin.png" mode="widthFix" class="icon"></image>
					<text class="number">x{{item.wisp.costWispCoin}}</text>
				</view>
				
				
				<view class="Child">
					<image src="../../../static/spirit/newC.png" mode="widthFix" class="icon"></image>
					<text class="number">x{{item.wisp.costAccompanyWisp}}</text>
				</view>
				
				
				
				<view class="Child">
					<image src="../../../static/spirit/land.png" mode="widthFix" class="icon"></image>
					<text class="number">x{{item.wisp.growthDays}}</text>
				</view>
			</view>
			<view class="btnBox">
				<button class="btn" v-if="item.bookStatus=='MATCH_SUCCESS'" @click="goToPay">付款(剩餘59:28)</button>
				<view class="btnStatus fail" v-if="item.bookStatus=='MATCH_FAIL'"><button class="notStatus">匹配失敗</button></view>
				<view class="btnStatus" v-if="item.bookStatus=='WAITING_MATCH'"><button class="notStatus">等待匹配</button></view>
			</view>
		</view>
		<!-- <view class="box">
			<view class="itemBox">
				<view class="trueItem">
					<view class="ItemTop">
						<view class="ItemTopLeft">
							<image class="spiritImg" :src="item.previewPhotoUrl" mode="widthFix"></image>
						</view>
						<view class="ItemTopRight">
							<view class="spiritName">{{item.name}}</view>
							<view class="spiritLevel">
								<image class="levelImg" src="../../../static/spirit/levelOne.png" mode="widthFix" v-if="item.level==1"></image>
								<image class="levelImg" src="../../../static/spirit/levelTwo.png" mode="widthFix" v-if="item.level==2"></image>
								<image class="levelImg" src="../../../static/spirit/levelThree.png" mode="widthFix" v-if="item.level==3"></image>
								<image class="levelImg" src="../../../static/spirit/levelFour.png" mode="widthFix" v-if="item.level==4"></image>
								<image class="levelImg" src="../../../static/spirit/levelFive.png" mode="widthFix" v-if="item.level==5"></image>
							</view>
							<view class="infoItem"><text class="infoTitle">增長能力:</text><text class="infoValue">{{item.growthPercent}}%</text></view>
							<view class="infoItem"><text class="infoTitle">能力值:</text><text class="infoValue">10%</text></view>
							<view class="infoItem"><text class="infoTitle">培養天數:</text><text class="infoValue">{{item.growthDays}}天</text></view>
						</view>
					</view>
					<view class="ItemCenter"><text class="matchTime">匹配時間:{{item.startMatchTime.substring(0,5)}}-{{item.endMatchTime.substring(0,5)}}</text></view>
					<view class="ItemBottom">
						<view class="ItemLeft">
							<view class="itemB">
								<image class="configImg" src="../../../static/spirit/coin.png" mode="widthFix"></image>
								<text class="configTitle">x{{item.costWispCoin}}</text>
							</view>
							<view class="itemB" @click="showBuyChild(item)">
								<image class="configImg" src="../../../static/spirit/company.png" mode="widthFix"></image>
								<text class="configTitle">x{{item.costAccompanyWisp}}</text>
							</view>
							<view class="itemB" @click="showLandChild">
								<image class="configImg" src="../../../static/spirit/land.png" mode="widthFix"></image>
								<text class="configTitle">x{{item.growthDays}}</text>
							</view>
						</view>
						<view class="ItemRight">
							<button class="BTN" @click="operation(item)" v-if="item.stage=='BOOKABLE'">馬上預約</button>
							<view class="TTTT" v-if="item.stage=='DISALLOW_BOOK'"><button class="BTN BTNthree BBB">不可預約</button></view>
							<button class="BTN BTNthree" v-if="item.stage=='WAITING_MATCH'">待匹配</button>
							<button class="BTN BTNthree" v-if="item.stage=='WAITING_FOR_PAYMENT'">匹配結束</button>
							<view class="TTTT" v-if="item.stage=='END_OF_MATCH'"><button class="BTN BTNthree BBB">匹配結束</button></view>
							<button class="BTN BTNfour" v-if="item.stage=='GROWING'">成長中</button>
						</view>
					</view>
				</view>
			</view>
		</view> -->

	</view>
</template>

<script>
	import {
		globalConfig
	} from '@/config.js'
	import {
		api
	} from '@/common/api.js'
	export default {
		name: 'spiritMatchMarketNew',
		props: {
			item: Object,
			ext: Object
		},
		mounted() {
			const s = this.item.appointmentTime.split('T')
			const t = s[0]
			const th = s[1]
			const time = t + ' ' + th
			this.change = time
		},
		data() {
			return {
				change:''
			}
		},
		methods: {
			goToPay(){
				uni.navigateTo({
					url:'/pages/userPay_new/userPay_new'
				})
			}
		}
	}
</script>

<style lang="less">
	.spiritMarketNew {
		width: 100%;
		height: 100%;
		background: rgb(5, 14, 23);
		padding-bottom: 20rpx;

		.newBox {
			width: 343px;
			height: 230px;
			background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
			// box-shadow: inset 1px 1px 0px 1px rgba(255,255,255,0.75), 0px 4px 16px 1px rgba(0,0,0,0.25);
			border-radius: 8px 8px 8px 8px;
			opacity: 1;
			margin: 0 auto;
			// margin-bottom: 10px;
			border-top: 2rpx solid rgb(50, 71, 137);
			border-left: 2rpx solid rgb(50, 71, 137);
			position: relative;

			.imgBox {
				width: 140px;
				height: 140px;
				border-radius: 0px 0px 0px 0px;
				opacity: 1;
				position: absolute;
				margin-top: 12px;
				margin-left: 12px;

				.img {
					width: 100%;
					height: 100% !important;
				}
			}

			.info {
				width: 179px;
				height: 140px;
				position: absolute;
				top: 12px;
				left: 164px;

				.nameBox {
					width: 179px;
					height: 22px;
					margin-top: 4px;

					.name {
						font-size: 16px;
						font-family: PingFang SC-Bold, PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
					}
				}
				
				.levelBox{
					width: 179px;
					height: 22px;
					margin-top: 8px;
					.level{
						width: 67px;
						height: 18px !important;
					}
				}
				.tBox{
					width: 179px;
					height: 22px;
					margin-top: 12px;
					.Child{
						width: 163px;
						height: 19px;
						display: flex;
						justify-content: space-between;
						padding-bottom: 2px;
						align-items: flex-end;
						border-bottom: 1px solid rgba(255,255,255,0.2);
						.Co{
							font-size: 12px;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
						}
						.Ct{
							font-size: 12px;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
						}
					}
				}
			}
			.timeBox{
				width: 275px;
				height: 14px;
				position: absolute;
				left: 27px;
				top: 152px;
				.time{
					font-size: 10px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
			.oBox{
				width: 120px;
				height: 42px;
				position: absolute;
				left: 27px;
				top: 174px;
				display: flex;
				.Child{
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.icon{
						width: 20px;
						height: 20px !important;
					}
					.number{
						margin-top: 2px;
						font-size: 14px;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}
				}
			}
			.btnBox{
				width: 163px;
				height: 40px;
				position: absolute;
				top: 174px;
				right: 16px;
				.btn{
					width: 163px;
					height: 40px;
					background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%);
					border-radius: 8px 8px 8px 8px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 16px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
				.btnStatus{
					width: 163px;
					height: 40px;
					box-sizing: border-box; 
					padding: 1px; 
					border-radius: 8px; 
					border: 1px solid;
					background-image: linear-gradient(to right bottom,rgba(147, 49, 245, 1),rgba(11, 149, 255, 1));
					display: flex;
					align-items: center;
					justify-content: center;
					.notStatus{
						border-radius: 8px;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 163px;
						height: 38px;
						border-radius: 15rpx;
						font-size: 16px;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
					}
				}
				.fail{
				padding: 0px !important;
				border: 1px solid #FFFFFF !important;
				background-image:none !important;
				background: none !important;
				}
			}
		}
	}
</style>
