<template>
	<view class="spiritBuy">
		<van-popup class="box" v-model="show" round position="bottom" :style="{ height: '60%' }" @close="getClose">
			<view class="top">
				<view class="topL">
					<image class="Cimg" src="../../static/spirit/land.png" mode="widthFix"></image>
				</view>
				<view class="topR">
					<view class="Cname"><text class="name">安防科技啥叫看</text></view>
					<view class="CLname"><text class="name">租用土地</text><text class="name">自用土地</text></view>
					<view class="CInfo"><text class="info">消耗精灵令:</text><image class="Ccoin" src="../../static/spirit/coin.png"></image><text class="Cpay">x6</text></view>
				</view>
			</view>
			<view class="add">
				<view class="CL"><text class="info">土地等级:</text></view>
				<view class="CR">
					<text class="name">毛坯-收益0%</text><text class="name">精装-收益2%</text><text class="name">豪华-收益5%</text>
				</view>
			</view>
			<view class="center">
				<view class="CL"><text class="info">租用天数:</text></view>
				<view class="CR">
					<button class="btn">-</button>
					<button class="btn num">0</button>
					<button class="btn add">+</button>
				</view>
			</view>
			<view class="bottom">
				<view class="bL">
					<view class="info"><text class="infoText">共消耗精灵令</text></view>
					<view class="num"><image class="coin" src="../../static/spirit/coin.png" mode="widthFix"></image><text class="infoText">x12</text></view>
				</view>
				<view class="bR">
					<button class="buyBtn">立即购买</button>
				</view>
			</view>
		</van-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show:true
			}
		},
		methods:{
			getClose(){
				this.$emit('closeLandChild',false)
			}
		}
	}
</script>

<style lang="less">
	.spiritBuy{
		width: 100%;
		height: 100%;
		.box{
			background: rgb(28,41,76);
			.top{
				width: 100%;
				height: 200rpx;
				margin-top: 50rpx;
				display: flex;
				flex-direction: row;
				.topL{
					width: 30%;
					height: 200rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					.Cimg{
						width: 160rpx;
						height: 160rpx;
						border-radius: 10rpx;
						border: 2rpx solid rgb(112,116,138);
					}
				}
				.topR{
					width: 70%;
					height: 100%;
					display: flex;
					flex-direction: column;
					.Cname{
						width: 100%;
						height: 40rpx;
						.name{
							color: #FFFFFF;
							letter-spacing: 2rpx;
						}
					}
					.CLname{
						width: 100%;
						height: 80rpx !important;
						display: flex;
						align-items: flex-end;
						.name{
							display: flex;
							align-items: center;
							justify-content: center;
							width: 150rpx;
							height: 30rpx;
							border: 1px solid rgb(16,119,205);
							padding: 10rpx;
							border-radius:10rpx;
							letter-spacing: 2rpx;
							color: rgb(16,119,205);
							margin-right: 15rpx;
						}
					}
					.CInfo{
						width: 100%;
						height: 70rpx !important;
						display: flex;
						align-items: center;
						.info{
							font-size: 28rpx;
							margin-right: 10rpx;
						}
						.Ccoin{
							width: 40rpx;
							height: 40rpx;
						}
						.Cpay{
							font-size: 38rpx;
							color: #FFFFFF;
							margin-left: 10rpx;
						}
					}
				}
			}
			.add{
				width: 100%;
				height: 150rpx;
				display: flex;
				flex-direction: row;
				.CL{
					width: 30%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					.info{
						color: #f2f2f2;
					}
				}
				.CR{
					width: 70%;
					height: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					flex-wrap: wrap;
					.name{
						display: flex;
						align-items: center;
						justify-content: center;
						width: 200rpx !important;
						height: 30rpx;
						border: 1px solid rgb(16,119,205);
						padding: 10rpx;
						border-radius:10rpx;
						letter-spacing: 2rpx;
						color: rgb(16,119,205);
						margin-right: 15rpx;
					}
				}
			}
			.center{
				width: 100%;
				height: 80rpx;
				display: flex;
				flex-direction: row;
				.CL{
					width: 30%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					.info{
						color: #f2f2f2;
					}
				}
				.CR{
					width: 70%;
					height: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					.btn{
						width: 70rpx;
						height: 70rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #f2f2f2;
						background: rgb(28,41,76);
						border: 2rpx solid rgb(141,148,166);
					}
					.num{
						width: 280rpx;
						margin-left: -10rpx;
					}
					.add{
						margin-left: -15rpx;
					}
				}
			}
			.bottom{
				width: 100%;
				height: 150rpx;
				display: flex;
				flex-direction: row;
				.bL{
					width: 30%;
					height: 100%;
					.info{
						width: 100%;
						height: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						.infoText{
							font-size: 28rpx;
						}
					}
					.num{
						width: 100%;
						height: 50%;
						display: flex;
						align-items: center;
						justify-content: flex-start;
						.coin{
							width: 40rpx;
							height: 40rpx;
							margin-right: 20rpx;
							margin-left: 30rpx;
						}
						.infoText{
							color: #FFFFFF;
						}
					}
				}
				.bR{
					width: 70%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					.buyBtn{
						width: 440rpx;
						height: 100rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #FFFFFF;
						background: linear-gradient(to right, rgb(135,57,245) 0%,rgb(70,104,253), rgb(25,137,253));
					}
				}
			}
		}
	}
</style>
