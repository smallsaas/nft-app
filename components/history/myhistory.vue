<template>
	<view class="myHistory">
		<view class="left">
			<view class="leftL">
				<view class="T">
					<view class="TT"><text class="info">我的GuGu令</text></view>
					<view class="TB"><image src="../../static/spirit/newCoin.png" mode="widthFix" class="img"></image><text class="infoT">x  {{coin||0}}</text></view>
				</view>
				<view class="B">
					<view class="btnbtn"><button class="btn" @click="transfer">轉讓</button></view>
					<view class="btnbtn"><button class="btn btns" @click="goTo">曆史記錄</button></view>
				</view>
			</view>
			<view class="leftR">
				<view class="item">
					<view class="Info">我的能力晶石</view>
					<view class="TTT"><image src="../../static/spirit/newC.png" mode="widthFix" class="img"></image><text class="infoT">x  {{item.companionWispAmount||0}}</text></view>
				</view>
				<view class="item">
					<view class="Info">租用土地</view>
					<view class="TTT"><image src="../../static/spirit/land.png" mode="widthFix" class="img"></image><text class="infoT">x  {{item.landRemainingDays||0}}</text></view>
				</view>
			</view>
		</view>

		<view class="static_block_content">
			<view class="flex_item">
				<view class="item">GuGu精靈總數: {{wispData.wispCount || 0}}</view>
				<view class="item">GuGu能力總值: {{wispData.wispValueAmount || 0}}</view>
				<view class="item">精灵总收益: {{forChild.marketPoints || 0}}</view>
			</view>
		</view>

		<view class="spirit_mask" v-if="isShowTransfer||isShowTransferCoin||isShowTransferCoinTwo"></view>
		<number @forParentClose="getValue"  @forParentCloseTwo="getValueTwo" :data="forChild" @forParentToChangeCoin="getValueForUpdateCoin"></number>
		<transfer v-if="isShowTransfer" @close="getClose" @tellFather="getChildren"></transfer>
		<transfercoin :data="forJudge" v-if="isShowTransferCoin" @closeCoin="getCloseCoin" @forParentMessage="getMessageForChild"></transfercoin>
		<transfercoin :dataTwo="forJudgeTwo" v-if="isShowTransferCoinTwo" @closeCoin="getCloseCoinTwo" @forParentMessageTwo="getMessageForChildTwo"></transfercoin>
		<!-- 提示組件 -->
		<toast v-if="isShowToast" :data="toastMsgs" @cancelToast="closeToast"></toast>
	</view>
</template>

<script>
	import _ from 'lodash'
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
				toastMsgs: '',
				
				
				
				coin:0,
				wispData: {}
			}
		},
		  async created() {
			let pages = getCurrentPages()
			let nowPage = pages[pages.length-1];
			let params = nowPage.options
			console.log(params,'aaaaaaaaaaaaaaaaaaaaaaaaaa')
			 // if(this.$route.query.success !== '' || this.$route.query.success!==null || this.$route.query.success == 1){
				//  const res = await this.$api.getUserWallet()
				//  console.log('rrrrrrraaaaaaaaaaaaaaaa',res,'ajklshjklfhsajkfhafjkhsaf')
				//  this.coin = res.data.coinsAmount
				//  this.forChild.signInCoinCredit = this.item.signInCoinCredit
				//  this.forChild.recommendCoinCredit = this.item.recommendCoinCredit
				//  this.forChild.teamCoinCredit = this.item.teamCoinCredit
				//  this.forChild.transferCoinCredit = this.item.transferCoinCredit
				//  this.forChild.marketPoints = this.item.marketPoints
				//  this.forJudgeTwo.depositPoints = this.item.depositPoints
				//  return
			 // }
			this.coin = this.item.coinsAmount
			
			this.forChild.signInCoinCredit = this.item.signInCoinCredit
			this.forChild.recommendCoinCredit = this.item.recommendCoinCredit
			this.forChild.teamCoinCredit = this.item.teamCoinCredit
			this.forChild.transferCoinCredit = this.item.transferCoinCredit
			this.forChild.marketPoints = this.item.marketPoints
			this.forJudgeTwo.depositPoints = this.item.depositPoints
		},
		async mounted() {
			// let pages = getCurrentPages()
			// let nowPage = pages[pages.length-1];
			// let params = nowPage.options
			// console.log(params,'aaaaaaaaaaaaaaaaaaaaaaaaaa')
			//  if(this.$route.query.success !== '' || this.$route.query.success!==null || this.$route.query.success == 1){
			// 	 const res = await this.$api.getUserWallet()
			// 	 console.log('rrrrrrraaaaaaaaaaaaaaaa',res,'ajklshjklfhsajkfhafjkhsaf')
			// 	 this.coin = res.data.coinsAmount
			// 	 this.forChild.signInCoinCredit = this.item.signInCoinCredit
			// 	 this.forChild.recommendCoinCredit = this.item.recommendCoinCredit
			// 	 this.forChild.teamCoinCredit = this.item.teamCoinCredit
			// 	 this.forChild.transferCoinCredit = this.item.transferCoinCredit
			// 	 this.forChild.marketPoints = this.item.marketPoints
			// 	 this.forJudgeTwo.depositPoints = this.item.depositPoints
			// 	 return
			//  }
			// this.coin = this.item.coinsAmount
			this.fetchUserWisp()
		},
		methods:{

			async fetchUserWisp () {
				const res = await this.$api.getUserWisp()
				if (res.code === 200) {
					this.wispData = _.get(res, 'data', {})
				}
			},

			getValueForUpdateCoin(value){
				this.coin = value
			},
			
			transfer(){
				if(this.$cache.get('status') !== 'NORMAL'){
					uni.showToast({
						title:'當前狀态不可用',
						icon:'error',
						duration:1000
					})
					return
				}
				this.isShowTransfer = true
			},
			getClose(data){
				this.isShowTransfer = false
				this.toast(data.message)
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
					url:'/pages/zhuangrangjilu/zhuangrangjilu'
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
				this.toastMsgs = msg
				this.isShowToast = true
			},
			
			async getChildren(value){
				console.log(value,12123132)
				if(value == true){
					const res = await this.$api.getUserWallet()
					console.log(res)
					this.coin = res.data.coinsAmount
				}
			}
		}
	}
</script>

<style lang="less">
	.spirit_mask{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 502;
		background-color: #000;
		opacity: .8;
	}
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

		.static_block_content {
			margin: 40rpx 30rpx 0 30rpx;
			.flex_item {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				>.item {
					padding: 30rpx 20rpx;
					background: #11181E;
					border-radius: 10rpx;
					margin-right: 20rpx;
					font-size: 30rpx;
					// flex: 1;
					min-width: calc(50% - 30px);
					margin-bottom: 15px;
				}
				>.item:nth-child(2n) {
					margin-right: 0;
				}
				>.item:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>
