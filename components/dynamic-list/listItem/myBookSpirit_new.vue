
 <template>
 	<view class="spiritMarketNew newBuGu">
 		<view class="item">
 			<view class="left">
 				<view class="o">
 					<image :src="getImage(item.wisp?item.wisp.previewPhotoUrl:'')" mode="aspectFit" class="spiritImg"></image>
 				</view>
 				<view class="t"><text class="matchTime">匹配时间：{{item.wisp?item.wisp.startMatchTime:0}}-{{item.wisp?item.wisp.endMatchTime:0}}</text></view>
 				<view class="th">
 					<view class="thC">
 						<image src="../../../static/spirit/newCoin.png" mode="aspectFit" class="coinImg"></image>
 						<text class="numberText">x{{item.wisp?item.wisp.costWispCoin:0}}</text>
 					</view>
 					<view class="thC" @click="showBuyChild(item)">
 						<image src="../../../static/spirit/newC.png" mode="aspectFit" class="coinImg"></image>
 						<text class="numberText">x{{item.wisp?item.wisp.costAccompanyWisp:0}}</text>
 					</view>
 					<view class="thC" @click="showLandChild(item)">
 						<image src="../../../static/spirit/land.png" mode="aspectFit" class="coinImg"></image>
 						<text class="numberText">x{{item.wisp?item.wisp.growthDays:0}}</text>
 					</view>
 				</view>
 			</view>
 			<view class="right">
 				<view class="ro">
 					<text class="spiritName">{{item.wisp?item.wisp.name:''}}</text>
 				</view>
 				<view class="rt">
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
 				<view class="rth">
 					<text class="rthL">增長能力</text>
 					<text class="rthR">{{item.wisp?item.wisp.growthPercent:0}}%</text>
 				</view>
 				<view class="rth rtho">
 					<text class="rthL">能力值</text>
 					<text class="rthR">{{item.wisp?item.wisp.minimumValue:0}}-{{item.wisp?item.wisp.maximumValue:0}}</text>
 				</view>
 				<view class="rth rtht">
 					<text class="rthL">培養天數</text>
 					<text class="rthR">{{item.wisp?item.wisp.growthDays:0}}</text>
 				</view>
 				<view class="btnBox">
					<button class="btn"  v-if="item.bookStatus == 'WAITING_MATCH'">預約成功</button>
					<pretty-button class="btn" v-if="item.bookStatus=='MATCH_SUCCESS'"  type="hollow"  text="匹配成功"></pretty-button>
					<pretty-button class="btn" v-if="item.bookStatus=='MATCH_FAIL'"  type="hollow"  text="匹配失敗"></pretty-button>
					<!-- <button class="btn btnNo"  v-if="item.bookStatus == 'MATCH_FAIL'">匹配失敗</button> -->
 					<!-- <button class="btn" @click="operation(item)" v-if="item.stage=='BOOKABLE'">馬上預約</button>
 					<view class="father" v-if="item.stage=='DISALLOW_BOOK'"><button class="noStatus">不可預約</button>
 					</view>
 					<view class="father" v-if="item.stage=='END_OF_MATCH'"><button class="noStatus">匹配結束</button></view>
 					<view class="father" v-if="item.stage=='GROWING'"><button class="noStatus">成長中</button></view>
 					<view class="father" v-if="item.stage=='WAITING_MATCH'"><button class="noStatus">待匹配</button></view>
 					<view class="father" v-if="item.stage=='WAITING_FOR_PAYMENT '"><button class="noStatus">待支付</button>
 					</view> -->
 				</view>
 			</view>
 		</view>
 		<!-- 預約組件 -->
 		<view class="spirit_mask" v-if="isShowBookChild||isShowBuyComponeny||isShowLandBuy||isShowToast"></view>
 		<spiritBook v-if="isShowBookChild" :itemInfo="itemInfoForChild" @cancelChild="getChild" @getMsg="getMsgToast">
 		</spiritBook>
 		<!-- 能力晶石組件 -->
 		<spiritComponenyBuy v-if="isShowBuyComponeny" @closeBuyChild="getChildBuy" :itemInfo="itemInfoForComponentChild"
 			@decNumber="getDec" @addNumber="getAdd" @buySuccess="childBuySuccess"></spiritComponenyBuy>
 		<!-- 土地組件 -->
 		<spiritLandBuy v-if="isShowLandBuy" @closeLandChild="getLandChildClose"
 			:itemInfo="itemInfoForComponentLandChild" @decLandNumber="getLandDec" @addLandNumber="getLandAdd"
 			@buySuccess="childBuyLandSuccess"></spiritLandBuy>
 		<!-- 提示組件 -->
 		<toast v-if="isShowToast" :data="toastMsg" @cancelToast="closeToast"></toast>
 	</view>
 </template>
 
 <script>
 	//預約精靈組件
 	import spiritBook from '@/components/spirit/spirit_book.vue'
 	//購買能力晶石組件
 	import spiritComponenyBuy from '@/components/spirit/spirit_buy.vue'
 	//購買土地組件
 	import spiritLandBuy from '@/components/spirit/land_buy.vue'
 	//溫馨提示
 	import toast from '@/components/spirit/toast.vue'
 	import {
 		globalConfig
 	} from '@/config.js'
 	import {
 		api
 	} from '@/common/api.js'
 	export default {
 		name: 'bookSpriitNew',
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
 				toastMsg: '',
 
 			}
 		},
 		methods: {
 			getImage(url) {
				if(![undefined,null,''].includes(url)){
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
									imagePath = that.$config.endpoint +imageUrl;								
								}else{
									imagePath = that.$config.imageEndpoint+imageUrl
								}
								// return this.$config.endpoint + "/" + imageUrl
							}
						}
					}
					return imagePath
				}else{
					return ''
				}
 			},
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
 				this.itemInfoForComponentChild = item.companionWisp
 				this.itemInfoForComponentChild.costAccompanyWisp = item.wisp.costAccompanyWisp
 				this.isShowBuyComponeny = true
 			},
 			getChildBuy() {
 				this.isShowBuyComponeny = false
 			},
 			showLandChild(item) {
 				this.itemInfoForComponentLandChild = item.land
 				this.itemInfoForComponentLandChild.growthDays = item.wisp.growthDays
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
 
 			//處理子組件減數量
 			getDec(value) {
 				this.itemInfoForComponentChild.costAccompanyWisp = value
 			},
 			getAdd(value) {
 				this.itemInfoForComponentChild.costAccompanyWisp = value
 			},
 
 			//能力晶石購買成功
 			childBuySuccess(res) {
 				this.isShowBuyComponeny = false
 				console.log(res)
 				if (res.code == 200) {
 					this.toast('購買成功!')
 				} else {
 					this.toast(res.message)
 				}
 			},
 
 			//處理土地子組件加減數量
 			getLandDec(value) {
 				console.log(value, 1111)
 				this.itemInfoForComponentLandChild.growthDays = value
 			},
 			getLandAdd(value) {
 				console.log(value, 1111)
 				this.itemInfoForComponentLandChild.growthDays = value
 			},
 			//土地購買成功
 			childBuyLandSuccess(res) {
 				this.isShowLandBuy = false
 				console.log(res)
 				if (res.code == 200) {
 					this.toast('購買成功!')
 				} else {
 					this.toast(res.message)
 				}
 			},
 		}
 	}
 </script>
 
 <style lang="less">
 	.spirit_mask {
 		position: fixed;
 		top: 0;
 		left: 0;
 		right: 0;
 		bottom: 0;
 		z-index: 502;
 		background-color: #000;
 		opacity: .8;
 	}
 
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
 				margin-left: 30rpx;
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
 
 				.rth {
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
 					.rthL {
 						font-size: 12px;
 						font-family: PingFang SC-Regular, PingFang SC;
 						font-weight: 400;
 						color: #c8ccd3;
 					}
 
 					.rthR {
 						font-size: 12px;
 						font-family: PingFang SC-Regular, PingFang SC;
 						font-weight: 400;
 						color: #dcdde2;
 					}
 				}
 
 				.rtho,
 				.rtht {
 					// margin: 0rpx !important;
 				}
 
 				.btnBox {
 					margin-top: 44rpx;
 					// width: 326rpx;
 					margin-right: 30rpx;
 					height: 80rpx;
 					display: flex;
 					align-items: center;
 					justify-content: flex-end;
					
					.btnNo{
						background: rgb(24,38,65) !important;
					}
 
 					.btn {
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
 
 					.father {
 						width: 326rpx;
 						height: 80rpx;
 						opacity: 1;
 						border: 1rpx solid;
 						background-image: linear-gradient(to right, #9331F5, #0B95FF);
 						border-radius: 16rpx 16rpx 16rpx 16rpx;
 						padding: 0.1rpx;
 						color: #ffffff !important;
 
 						.noStatus {
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
 