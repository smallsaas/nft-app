<template>
	<view class="spiritMarketNew newBuGu">
		<view class="item">
			<view class="left">
				<view class="o">
					<image :src="item.previewPhotoUrl" mode="aspectFit" class="spiritImg"></image>
				</view>
				<view class="t"><text class="matchTime">匹配时间：{{item.startMatchTime}}-{{item.endMatchTime}}</text></view>
				<view class="th">
					<view class="thC">
						<image src="../../../static/spirit/newCoin.png" mode="aspectFit" class="coinImg"></image>
						<text class="numberText">x{{item.costWispCoin}}</text>
					</view>
					<view class="thC">
						<image src="../../../static/spirit/newC.png" mode="aspectFit" class="coinImg"></image>
						<text class="numberText">x{{item.costAccompanyWisp}}</text>
					</view>
					<view class="thC">
						<image src="../../../static/spirit/land.png" mode="aspectFit" class="coinImg"></image>
						<text class="numberText">x{{item.growthDays}}</text>
					</view>
				</view>
			</view>
			<view class="right">
				<view class="ro">
					<text class="spiritName">{{item.name}}</text>
				</view>
				<view class="rt">
					<image class="levelImg" src="../../../static/spirit/levelOne.png" mode="widthFix" v-if="item.level==1"></image>
					<image class="levelImg" src="../../../static/spirit/levelTwo.png" mode="widthFix" v-if="item.level==2"></image>
					<image class="levelImg" src="../../../static/spirit/levelThree.png" mode="widthFix" v-if="item.level==3"></image>
					<image class="levelImg" src="../../../static/spirit/levelFour.png" mode="widthFix" v-if="item.level==4"></image>
					<image class="levelImg" src="../../../static/spirit/levelFive.png" mode="widthFix" v-if="item.level==5"></image>
				</view>
				<view class="rth">
					<text class="rthL">增长能力</text>
					<text class="rthR">{{item.growthPercent}}%</text>
				</view>
				<view class="rth rtho">
					<text class="rthL">能力值</text>
					<text class="rthR">400-500</text>
				</view>
				<view class="rth rtht">
					<text class="rthL">培养天数</text>
					<text class="rthR">{{item.growthDays}}</text>
				</view>
				<view class="btnBox">
					<button class="btn" @click="operation(item)" v-if="item.stage=='BOOKABLE'">马上预约</button>
					<view class="father" v-if="item.stage=='DISALLOW_BOOK'"><button class="noStatus">不可预约</button></view>
					<view class="father" v-if="item.stage=='END_OF_MATCH'"><button class="noStatus">匹配结束</button></view>
					<view class="father" v-if="item.stage=='GROWING'"><button class="noStatus">成长中</button></view>
					<view class="father" v-if="item.stage=='WAITING_MATCH'"><button class="noStatus">待匹配</button></view>
					<view class="father" v-if="item.stage=='WAITING_FOR_PAYMENT '"><button class="noStatus">待支付</button></view>
				</view>
			</view>
		</view>
		<!-- <view class="newBox">
			<view class="imgBox">
				<image :src="item.previewPhotoUrl" mode="widthFix" class="img"></image>
			</view>
			<view class="info">
				<view class="nameBox"><text class="name">{{item.name}}</text></view>
				<view class="levelBox">
					<image class="level" src="../../../static/spirit/levelOne.png" mode="widthFix" v-if="item.level==1"></image>
					<image class="level" src="../../../static/spirit/levelTwo.png" mode="widthFix" v-if="item.level==2"></image>
					<image class="level" src="../../../static/spirit/levelThree.png" mode="widthFix" v-if="item.level==3"></image>
					<image class="level" src="../../../static/spirit/levelFour.png" mode="widthFix" v-if="item.level==4"></image>
					<image class="level" src="../../../static/spirit/levelFive.png" mode="widthFix" v-if="item.level==5"></image>
				</view>
				<view class="tBox">
					<view class="Child">
						<text class="Co">增长能力</text>
						<text class="Ct">{{item.growthPercent}}%</text>
					</view>
					<view class="Child">
						<text class="Co">能力值</text>
						<text class="Ct">400-500</text>
					</view>
					<view class="Child">
						<text class="Co">培养天数</text>
						<text class="Ct">{{item.growthDays}}天</text>
					</view>
				</view>
			</view>
			<view class="timeBox"><text class="time">匹配时间：{{item.startMatchTime}}-{{item.endMatchTime}}</text></view>
			<view class="oBox">
				<view class="Child">
					<image src="../../../static/spirit/newCoin.png" mode="widthFix" class="icon"></image>
					<text class="number">x{{item.costWispCoin}}</text>
				</view>
				
				
				<view class="Child" @click="showBuyChild(item)">
					<image src="../../../static/spirit/newC.png" mode="widthFix" class="icon"></image>
					<text class="number">x{{item.costAccompanyWisp}}</text>
				</view>
				
				
				
				<view class="Child" @click="showLandChild(item)">
					<image src="../../../static/spirit/land.png" mode="widthFix" class="icon"></image>
					<text class="number">x{{item.growthDays}}</text>
				</view>
			</view>
			<view class="btnBox">
				<button class="btn" @click="operation(item)" v-if="item.stage=='BOOKABLE'">马上预约</button>
				<view class="btnStatus" v-if="item.stage=='DISALLOW_BOOK'"><button class="notStatus">不可预约</button></view>
				<view class="btnStatus" v-if="item.stage=='END_OF_MATCH'"><button class="notStatus">匹配结束</button></view>
				<view class="btnStatus" v-if="item.stage=='GROWING'"><button class="notStatus">成长中</button></view>
				<view class="btnStatus" v-if="item.stage=='WAITING_MATCH'"><button class="notStatus">待匹配</button></view>
				<view class="btnStatus" v-if="item.stage=='WAITING_FOR_PAYMENT '"><button class="notStatus">待支付</button></view>
			</view>
		</view> -->

		<!-- 预约组件 -->
		<spiritBook v-if="isShowBookChild" :itemInfo="itemInfoForChild" @cancelChild="getChild" @getMsg="getMsgToast">
		</spiritBook>
		<!-- 陪伴精灵组件 -->
		<spiritComponenyBuy v-if="isShowBuyComponeny" @closeBuyChild="getChildBuy" :itemInfo="itemInfoForComponentChild"
			@decNumber="getDec" @addNumber="getAdd" @buySuccess="childBuySuccess"></spiritComponenyBuy>
		<!-- 土地组件 -->
		<spiritLandBuy v-if="isShowLandBuy" @closeLandChild="getLandChildClose"
			:itemInfo="itemInfoForComponentLandChild" @decLandNumber="getLandDec" @addLandNumber="getLandAdd"
			@buySuccess="childBuyLandSuccess"></spiritLandBuy>
		<!-- 提示组件 -->
		<toast v-if="isShowToast" :data="toastMsg" @cancelToast="closeToast"></toast>
	</view>
</template>

<script>
	//预约精灵组件
	import spiritBook from '@/components/spirit/spirit_book.vue'
	//购买陪伴精灵组件
	import spiritComponenyBuy from '@/components/spirit/spirit_buy.vue'
	//购买土地组件
	import spiritLandBuy from '@/components/spirit/land_buy.vue'
	//温馨提示
	import toast from '@/components/spirit/toast.vue'
	import {
		globalConfig
	} from '@/config.js'
	import {
		api
	} from '@/common/api.js'
	export default {
		name: 'spiritMarketNew',
		components: {
			spiritBook,
			spiritComponenyBuy,
			spiritLandBuy,
			toast
		},
		props: {
			item: Object,
			ext: Object
		},
		data() {
			return {
				isShowBookChild: false,
				itemInfoForChild: {},
				isShowBuyComponeny: false,
				isShowLandBuy: false,
				itemInfoForComponentChild: {},
				itemInfoForComponentLandChild: {},

				isShowToast: false,
				toastMsg: ''
			}
		},
		methods: {
			toast(msg) {
				this.toastMsg = msg
				this.isShowToast = true
			},
			operation(item) {
				console.log('operation', item)
				this.isShowBookChild = true
				this.itemInfoForChild = item
				console.log(this.itemInfoForChild)
			},
			getChild() {
				this.isShowBookChild = false
			},
			showBuyChild(item) {
				console.log(item)
				this.itemInfoForComponentChild = item.companionWisp
				this.itemInfoForComponentChild.costAccompanyWisp = item.costAccompanyWisp
				this.isShowBuyComponeny = true
			},
			getChildBuy() {
				this.isShowBuyComponeny = false
			},
			showLandChild(item) {
				this.itemInfoForComponentLandChild = item.land
				this.itemInfoForComponentLandChild.growthDays = item.growthDays
				this.isShowLandBuy = true
			},
			getLandChildClose() {
				this.isShowLandBuy = false
			},
			closeToast() {
				this.isShowToast = false
			},
			getMsgToast(value) {
				console.log(value, 12132132132)
				this.toast(value)
			},

			//处理子组件减数量
			getDec(value) {
				this.itemInfoForComponentChild.costAccompanyWisp = value
			},
			getAdd(value) {
				this.itemInfoForComponentChild.costAccompanyWisp = value
			},

			//陪伴精灵购买成功
			childBuySuccess(res) {
				this.isShowBuyComponeny = false
				console.log(res)
				if (res.code == 200) {
					this.toast('购买成功!')
				} else {
					this.toast(res.message)
				}
			},

			//处理土地子组件加减数量
			getLandDec(value) {
				console.log(value, 1111)
				this.itemInfoForComponentLandChild.growthDays = value
			},
			getLandAdd(value) {
				console.log(value, 1111)
				this.itemInfoForComponentLandChild.growthDays = value
			},
			//土地购买成功
			childBuyLandSuccess(res) {
				this.isShowLandBuy = false
				console.log(res)
				if (res.code == 200) {
					this.toast('购买成功!')
				} else {
					this.toast(res.message)
				}
			},
		}
	}
</script>

<style lang="less">
	.newBuGu {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		padding-bottom: 20rpx;
		background-color: #050e17;
		.item {
			width: 95%;
			height: 460rpx;
			border-top: 2rpx solid rgb(50, 71, 137);
			border-left: 2rpx solid rgb(50, 71, 137);
			background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
			border-radius: 8px 8px 8px 8px;
			margin: 0 auto;
			display: flex;
			flex-direction: row;

			.left {
				margin-top: 24rpx;
				margin-left: 60rpx;
				display: flex;
				flex-direction: column;

				.o {
					.spiritImg {
						width: 280rpx;
						height: 280rpx !important;
					}
				}

				.t {
					display: flex;
					align-items: center;
					justify-content: center;

					.matchTime {
						font-size: 20rpx;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #c7cbd2;
					}
				}

				.th {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-around;
					margin-top: 16rpx;

					.thC {
						display: flex;
						flex-direction: column;
						flex: 1;
						align-items: center;
						justify-content: center;

						.coinImg {
							width: 40rpx;
							height: 40rpx !important;
							margin-bottom: 4rpx;
						}

						.numberText {
							font-size: 28rpx;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #fdfdfd;
						}
					}
				}
			}
			.right {
				// width: 288rpx;
				flex: 1;
				margin-top: 24rpx;
				margin-left: 24rpx;
				display: flex;
				flex-direction: column;
				.ro {
					// width: 363rpx;
					.spiritName {
						font-size: 32rpx;
						font-family: PingFang SC-Bold, PingFang SC;
						font-weight: bold;
						color: #ffffff;
					}
				}
				.rt {
					margin-top: 16rpx;
					.levelImg {
						width: 134rpx;
						height: 36rpx !important;
					}
				}
				.rth{
					display: flex;
					flex-direction: row;
					align-items: flex-end;
					justify-content: space-between;
					padding-bottom: 4rpx;
					border-bottom: 1rpx solid #444e68;
					height: 54rpx;
					margin-right: 15px;
					// width: 326rpx;
					// flex:1;
					.rthL{
						font-size: 12px;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #c8ccd3;
					}
					.rthR{
						font-size: 12px;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #dcdde2;
					}
				}
				.rtho,.rtht{
					// margin: 0rpx !important;
				}
				.btnBox{
					margin-top: 44rpx;
					// width: 326rpx;
					margin-right: 30rpx;
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					.btn{
						width: 326rpx;
						height: 80rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 32rpx;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #ffffff;
						background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%);
						border-radius: 16rpx 16rpx 16rpx 16rpx;
					}
					
					.father{
						width: 326rpx;
						height: 80rpx;
						opacity: 1;
						border: 1rpx solid;
						background-image: linear-gradient(to right,#9331F5,#0B95FF );
						border-radius: 16rpx 16rpx 16rpx 16rpx;
						padding: 0.1rpx;
						color: #ffffff !important;
						.noStatus{
							width: 326rpx;
							height: 80rpx;
							border-radius: 16rpx 16rpx 16rpx 16rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							background: #172540;
							font-size: 32rpx;
							font-family: PingFang SC-Medium, PingFang SC;
							font-weight: 500;
							color: #ffffff !important;
						}
					}
					
				}
			}
		}
	}

</style>
