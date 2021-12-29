<template>
	<view class="myHistory">
		<view class="left">
			<view class="leftL">
				<view class="T">
					<view class="TT"><text class="info">我的精灵令</text></view>
					<view class="TB"><image src="../../static/spirit/coin.png" mode="widthFix" class="img"></image><text class="infoT">x  {{item.coinsAmount}}</text></view>
				</view>
				<view class="B">
					<button class="btn" @click="transfer">转让</button>
					<button class="btn" @click="goTo">历史记录</button>
				</view>
			</view>
			<view class="leftR">
				<view class="item">
					<view class="Info">我的陪伴精灵</view>
					<view class="TTT"><image src="../../static/spirit/company.png" mode="widthFix" class="img"></image><text class="infoT">x  {{item.companionWispAmount}}</text></view>
				</view>
				<view class="item">
					<view class="Info">租用土地</view>
					<view class="TTT"><image src="../../static/spirit/land.png" mode="widthFix" class="img"></image><text class="infoT">x  2350</text></view>
				</view>
			</view>
		</view>
		<number @forParentClose="getValue" :data="forChild"></number>
		<transfer v-if="isShowTransfer" @close="getClose"></transfer>
		<transfercoin v-if="isShowTransferCoin" @closeCoin="getCloseCoin"></transfercoin>
	</view>
</template>

<script>
	import number from './number.vue'
	import transfer from './transfer.vue'
	import transfercoin from './transfercoin.vue'
	export default{
		props:{
			// 获取
			item:{
				type:Object,
				default:{}
			},
		},
		components:{number,transfer,transfercoin},
		data(){
			return{
				isShowTransfer:false,
				isShowTransferCoin:false,
				forChild:{}
			}
		},
		created() {
			this.forChild.recommendPoints = this.item.recommendPoints
			this.forChild.tradeUnionPoints = this.item.tradeUnionPoints
			this.forChild.marketPoints = this.item.marketPoints
			this.forChild.depositPoints = this.item.depositPoints
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
			getValue(){
				this.isShowTransferCoin = true
			},
			goTo(){
				uni.navigateTo({
					url:'/pages/defaultPage/page?id=' + 111222
				})
			}
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
					.btn{
						display: flex;
						align-items: center;
						justify-content: center;
						color: #FFFFFF;
						width: 200rpx;
						height: 80rpx;
						font-size: 30rpx;
						background: rgb(26,39,71);
						border: 1px solid rgb(102,72,230);
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
