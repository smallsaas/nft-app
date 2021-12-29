<template>
	<view class="spiritMarketNew">
		<view class="box">
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
							<view class="infoItem"><text class="infoTitle">增长能力:</text><text class="infoValue">{{item.growthPercent}}%</text></view>
							<view class="infoItem"><text class="infoTitle">能力值:</text><text class="infoValue">10%</text></view>
							<view class="infoItem"><text class="infoTitle">培养天数:</text><text class="infoValue">{{item.growthDays}}天</text></view>
						</view>
					</view>
					<view class="ItemCenter"><text class="matchTime">匹配时间:{{item.startMatchTime.substring(0,5)}}-{{item.endMatchTime.substring(0,5)}}</text></view>
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
							<button class="BTN" @click="operation(item)" v-if="item.stage=='BOOKABLE'">可预约</button>
							<button class="BTN BTNthree" v-if="item.stage=='DISALLOW_BOOK'">不可预约</button>
							<button class="BTN BTNthree" v-if="item.stage=='WAITING_MATCH'">待匹配</button>
							<button class="BTN BTNthree" v-if="item.stage=='WAITING_FOR_PAYMENT'">待支付</button>
							<button class="BTN BTNthree" v-if="item.stage=='END_OF_MATCH'">匹配结束</button>
							<button class="BTN BTNfour" v-if="item.stage=='GROWING'">成长中</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 预约组件 -->
		<spiritBook v-if="isShowBookChild" :itemInfo="itemInfoForChild" @cancelChild="getChild" @getMsg="getMsgToast"></spiritBook>
		<!-- 陪伴精灵组件 -->
		<spiritComponenyBuy v-if="isShowBuyComponeny" @closeBuyChild="getChildBuy" :itemInfo="itemInfoForComponentChild"></spiritComponenyBuy>
		<!-- 土地组件 -->
		<spiritLandBuy v-if="isShowLandBuy" @closeLandChild="getLandChildClose"></spiritLandBuy>
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
	import {globalConfig} from '@/config.js'
	import {api} from '@/common/api.js'
	export default {
		name:'spiritMarketNew',
		components:{spiritBook,spiritComponenyBuy,spiritLandBuy,toast},
		props: {
			item: Object,
			ext: Object
		},
		data(){
			return{
				isShowBookChild:false,
				itemInfoForChild:{},
				isShowBuyComponeny:false,
				isShowLandBuy:false,
				itemInfoForComponentChild:{},
				
				
				isShowToast:false,
				toastMsg:''
			}
		},
		methods:{
			toast(msg){
				this.toastMsg = msg
				this.isShowToast = true
			},
			operation(item){
				console.log('operation',item)
				this.isShowBookChild = true
				this.itemInfoForChild = item
				console.log(this.itemInfoForChild)
			},
			getChild(){
				this.isShowBookChild = false
			},
			showBuyChild(item){
				console.log(item)
				this.itemInfoForComponentChild = item
				this.isShowBuyComponeny = true
			},
			getChildBuy(){
				this.isShowBuyComponeny = false
			},
			showLandChild(){
				this.isShowLandBuy = true
			},
			getLandChildClose(){
				this.isShowLandBuy = false
			},
			closeToast(){
				this.isShowToast = false
			},
			getMsgToast(value){
				console.log(value,12132132132)
				this.toast(value)
			}
		}
	}
</script>

<style lang="less">
	.spiritMarketNew{
		width: 100%;
		height: 100%;
		background: rgb(5,14,23);
		.box{
			width: 100%;
			height: 100%;
			// margin-top: 20rpx;
			padding-top: 20rpx;
			background: rgb(5,14,23);
			.itemBox{
				width: 95%;
				height: 560rpx;
				margin-left: 2.5%;
				background: rgb(28,40,77);
				border: 2rpx solid rgb(50,71,137);
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.trueItem{
					width: 90%;
					height: 90%;
					.ItemTop{
						width: 100%;
						height: 340rpx;
						display: flex;
						flex-direction: row;
						.ItemTopLeft{
							width: 40%;
							height: 100%;
							.spiritImg{
								width: 100%;
								height: 340rpx !important;
							}
						}
						.ItemTopRight{
							width: 60%;
							height: 340rpx;
							.spiritName{
								display: flex;
								align-items: center;
								width: 95%;
								height: 15%;
								margin-left: 5%;
								font-size: 35rpx;
								color: #FFFFFF;
								letter-spacing: 5rpx;
							}
							.spiritLevel{
								margin-top: 10rpx;
								display: flex;
								align-items: center;
								width: 95%;
								height: 15%;
								margin-left: 5%;
								.levelImg{
									width: 134rpx;
									height: 36rpx;
								}
							}
							.infoItem{
								margin-top: 15rpx;
								margin-left: 5%;
								width: 90%;
								height: 15%;
								border-bottom: 2rpx solid rgb(65,76,102);
								display: flex;
								align-items: center;
								justify-content: space-between;
								.infoTitle{
									color: #f2f2f2;
								}
								.infoValue{
									color: #f2f2f2;
								}
							}
						}
					}
					.ItemCenter{
						width: 100%;
						height: 50rpx;
						display: flex;
						align-items: center;
						.matchTime{
							font-size: 25rpx;
							margin-left: 10rpx;
						}
					}
					.ItemBottom{
						width: 100%;
						height: 100rpx;
						display: flex;
						flex-direction: row;
						padding-top: 15rpx;
						.ItemLeft{
							width: 40%;
							height: 100rpx;
							display: flex;
							.itemB{
								flex: 1;
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: center;
								.configImg{
									width: 40rpx;
									height:40rpx;
									margin-bottom: 4rpx;
								}
								.configTitle{
									color: #f2f2f2;
								}
							}
						}
						.ItemRight{
							width: 60%;
							height: 100rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							.BTN{
								width: 300rpx;
								height: 80rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								color: #FFFFFF;
								background: linear-gradient(to right, rgb(135,57,245) 0%,rgb(70,104,253), rgb(25,137,253));
							}
							.BTNtwo{
								background: rgb(24,37,65);
								border: 1px solid rgbhsla(93,103,123);
							}
							.BTNthree{
								background: rgb(24,37,65);
								border: 1px solid rgb(112,74,227);
								color: grey;
							}
							.BTNfour{
								background: rgb(24,37,65);
								border: 1px solid rgb(112,74,227);
								color: rgb(25,137,253);
								&::after{
									content: '';
									width: 200rpx;
									height: 160rpx;
									background: linear-gradient(to right, rgb(135,57,245) 0%,rgb(70,104,253), rgb(25,137,253));
								}
							}
						}
					}
				}
			}
		}
	}
</style>
