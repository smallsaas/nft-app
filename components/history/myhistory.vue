<template>
	<view class="myHistory">
		<view class="left">
			<view class="leftL">
				<view class="T">
					<view class="TT"><text class="info">我的GuGu令</text></view>
					<view class="TB"><image src="../../static/spirit/coin.png" mode="widthFix" class="img"></image><text class="infoT">x  {{item.coinsAmount}}</text></view>
				</view>
				<view class="B">
					<view class="btnbtn"><button class="btn" @click="transfer">轉讓</button></view>
					<view class="btnbtn"><button class="btn btns" @click="goTo">曆史記錄</button></view>
				</view>
			</view>
			<view class="leftR">
				<view class="item">
					<view class="Info">我的能力晶石</view>
					<view class="TTT"><image src="../../static/spirit/company.png" mode="widthFix" class="img"></image><text class="infoT">x  {{item.companionWispAmount}}</text></view>
				</view>
				<view class="item">
					<view class="Info">租用土地</view>
					<view class="TTT"><image src="../../static/spirit/land.png" mode="widthFix" class="img"></image><text class="infoT">x  {{item.landRemainingDays}}</text></view>
				</view>
			</view>
		</view>
		<number @forParentClose="getValue"  @forParentCloseTwo="getValueTwo" :data="forChild"></number>
		<transfer v-if="isShowTransfer" @close="getClose"></transfer>
		<transfercoin :data="forJudge" v-if="isShowTransferCoin" @closeCoin="getCloseCoin" @forParentMessage="getMessageForChild"></transfercoin>
		<transfercoin :dataTwo="forJudgeTwo" v-if="isShowTransferCoinTwo" @closeCoin="getCloseCoinTwo" @forParentMessageTwo="getMessageForChildTwo"></transfercoin>
		<!-- 提示組件 -->
		<toast v-if="isShowToast" :data="toastMsg" @cancelToast="closeToast"></toast>
	</view>
</template>

<script>
	import number from './number.vue'
	import transfer from './transfer.vue'
	import transfercoin from './transfercoin.vue'
	import toast from '../spirit/toast.vue'
	export default{
		props:{
			// 獲取
			item:{
				type:Object,
				default:{}
			},
		},
		components:{number,transfer,transfercoin,toast},
		data(){
			return{
				isShowTransfer:false,
				isShowTransferCoin:false,
				isShowTransferCoinTwo:false,
				forChild:{},
				forJudge:{},
				forJudgeTwo:{},
				
				isShowToast: false,
				toastMsg: ''
			}
		},
		created() {
			this.forChild.recommendPoints = this.item.recommendPoints
			this.forChild.tradeUnionPoints = this.item.tradeUnionPoints
			this.forChild.marketPoints = this.item.marketPoints
			this.forChild.depositPoints = this.item.depositPoints
			
			this.forJudge.marketPoints = this.item.marketPoints
			this.forJudgeTwo.depositPoints = this.item.depositPoints
		},
		methods:{
			transfer(){
				this.isShowTransfer = true
			},
			getClose(){
				this.isShowTransfer = false
			},
			getCloseCoin(){
				this.isShowTransferCoin = false
			},
			getCloseCoinTwo(){
				this.isShowTransferCoinTwo = false
			},
			getValue(){
				this.isShowTransferCoin = true
			},
			getValueTwo(){
				this.isShowTransferCoinTwo = true
			},
			goTo(){
				uni.navigateTo({
					url:'/pages/defaultPage/page?id=' + 111222
				})
			},
			
			
			getMessageForChild(data){
				console.log(data)
				this.isShowTransferCoin = false
				data.message = data.message + '當前收益市場積分爲:' + this.item.marketPoints
				this.toast(data.message)
			},
			
			getMessageForChildTwo(data){
				console.log(data)
				this.isShowTransferCoinTwo = false
				data.message = data.message + '當前轉存積分爲:' + this.item.depositPoints
				this.toast(data.message)
			},
			
			closeToast() {
				this.isShowToast = false
			},
			
			//打開提示
			toast(msg) {
				this.toastMsg = msg
				this.isShowToast = true
			},
		}
	}
</script>

<style lang="less">
	.myHistory{
		width: 100%;
		height: 100vh;
		.left{
			margin-top: 50rpx;
			margin-left: 2.5%;
			width: 95%;
			height: 350rpx;
			display: flex;
			flex-direction: row;
			.leftL{
				width: 60%;
				height: 100%;
				border: 1px solid rgb(43,64,119);
				border-radius: 20rpx;
				background: rgb(25,38,69);
				.T{
					width: 100%;
					height: 50%;
					.TT{
						width: 100%;
						height: 40%;
						display: flex;
						align-items: center;
						.info{
							font-size: 30rpx;
							margin-left: 15rpx;
						}
					}
					.TB{
						width: 100%;
						height: 60%;
						display: flex;
						align-items: center;
						.img{
							width: 50rpx;
							height: 50rpx;
							margin-left: 15rpx;
							margin-right: 15rpx;
						}
						.infoT{
							color: #FFFFFF;
							font-size: 40rpx;
						}
					}
				}
				.B{
					width: 100%;
					height: 50%;
					border-top: 1px solid rgb(56,76,114);
					display: flex;
					align-items: center;
					justify-content: space-around;
					.btnbtn{
						width:160rpx;
						height: 64rpx;
						padding: 2rpx;
						border-radius: 8px;
						border: 1px solid;
						background-image: linear-gradient(to right bottom,rgba(147, 49, 245, 1),rgba(11, 149, 255, 1));
						.btn{
							width:160rpx;
							height: 64rpx;
							font-size: 12px;
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
			.leftR{
				width: 40%;
				height: 100%;
				.item{
					width: 90%;
					height: 45%;
					border: 1px solid rgb(43,64,119);
					border-radius: 20rpx;
					background: rgb(25,38,69);
					margin-left: 5%;
					display: flex;
					flex-direction: column;
					margin-bottom: 10%;
					.Info{
						font-size: 28rpx;
						margin-top: 15rpx;
						margin-left: 10rpx;
					}
					.TTT{
						width: 100%;
						height: 60%;
						display: flex;
						align-items: center;
						.img{
							width: 45rpx;
							height: 45rpx;
							margin-left: 15rpx;
							margin-right: 15rpx;
						}
						.infoT{
							color: #FFFFFF;
							font-size: 35rpx;
						}
					}
				}
			}
		}
	}
</style>
