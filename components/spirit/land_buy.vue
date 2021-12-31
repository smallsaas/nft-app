<template>
	<view class="spiritBuy">
		<van-popup class="box" v-model="show" round position="bottom" @close="getClose">
			<view class="imgBox">
				<image src="../../static/spirit/land.png" mode="widthFix" class="img"></image>
			</view>
			<text class="name">所需土地</text>
			<view class="typeOne">
				<view class="item" v-for="(item,index) in landType" :key="index">
					<text class="types" :class="{type:index==0}">{{item.type}}</text>
				</view>
			</view>
			<text class="info">消耗精灵令：</text>
			<image src="../../static/spirit/coin.png" mode="widthFix" class="coinImg"></image>
			<text class="numbers">x6</text>
			<text class="titleInfo">土地等级：</text>
			<view class="typeTwo">
				<view class="tItem" v-for="(item,index) in landTypeTwo" :key="index">
					<text class="infoTwoItem" :class="{infoItem:index==0}">{{item.type}}-收益{{item.get}}%</text>
				</view>
			</view>
			<text class="titleInfo dd">租用天数：</text>
			<image src="../../static/spirit/bd.png" mode="widthFix" class="bds"></image>
			<button class="btnNum">2</button>
			<image src="../../static/spirit/ad.png" mode="widthFix" class="bds ads"></image>
			<view class="btnBox">
				<text class="tt">共消耗精灵令</text>
				<image src="../../static/spirit/coin.png" mode="widthFix" class="coinImgs"></image>
				<text class="ttt">x12</text>
				<button class="btnMore">立即购买</button>
			</view>
			<!-- <view class="top">
				<view class="topL">
					<image class="Cimg" src="../../static/spirit/land.png" mode="widthFix"></image>
				</view>
				<view class="topR">
					<view class="Cname"><text class="name">安防科技啥叫看</text></view>
					<view class="CLname"><text class="names" :class="{name:index==indexType}" v-for="(item,index) in landType" :key="item.id" @click="chooseType(index)">{{item.type}}</text></view>
					<view class="CInfo"><text class="info">消耗精灵令:</text>
						<image class="Ccoin" src="../../static/spirit/coin.png"></image><text class="Cpay">x6</text>
					</view>
				</view>
			</view>
			<view class="add">
				<view class="CL"><text class="info">土地等级:</text></view>
				<view class="CR">
					<text class="names" @click="chooseTypeTwo(index)" :class="{name:index==indexTypeTwo}" v-for="(item,index) in landTypeTwo" :key="index">{{item.type}}-收益{{item.get}}%</text>
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
					<view class="num">
						<image class="coin" src="../../static/spirit/coin.png" mode="widthFix"></image><text
							class="infoText">x12</text>
					</view>
				</view>
				<view class="bR">
					<button class="buyBtn">立即购买</button>
				</view>
			</view> -->
		</van-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				landType:[{
					id:1,
					type:'租用土地'
				},{
					id:2,
					type:"自用土地"
				}],
				indexType:0,
				landTypeTwo:[{
					id:1,
					type:'毛胚',
					get:0
				},{
					id:2,
					type:"精装",
					get:2
				},
				{
					id:3,
					type:"豪华",
					get:5
				}],
				indexTypeTwo:0
			}
		},
		methods: {
			getClose() {
				this.$emit('closeLandChild', false)
			},
			chooseType(index){
				console.log(index)
				this.indexType = index
			},
			chooseTypeTwo(index){
				console.log(index)
				this.indexTypeTwo = index
			}
		}
	}
</script>

<style lang="less">
	.spiritBuy {
		width: 100%;
		height: 100%;

		.box {
			width: 375px;
			height: 407px;
			background: #1C294C;
			border-radius: 16px 16px 0px 0px;
			opacity: 1;
			z-index: 9999999 !important;
			position: fixed;
			
			
			.imgBox{
				width: 100px;
				height: 100px;
				background: #1C294C;
				border-radius: 8px 8px 8px 8px;
				opacity: 1;
				border: 1px solid rgba(196, 196, 196, 0.5);
				position: absolute;
				top: 32px;
				left: 16px;
				display: flex;
				align-items: center;
				justify-content: center;
				.img{
					width: 88px;
					height: 88px;
				}
			}
			
			.name{
				width: 72px;
				height: 25px;
				font-size: 18px;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
				position: absolute;
				top: 32px;
				left:128px;
			}
			
			.typeOne{
				width: 160px;
				height: 24px;
				position: absolute;
				top: 69px;
				left: 128px;
				display: flex;
				flex-direction: row;
				.item{
					width: 64px;
					height: 24px;
					border-radius: 2px 2px 2px 2px;
					opacity: 1;
					border: 1px solid #0B95FF;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 8px;
					.types{
						font-size: 12px;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						position: relative;
					}
					.type{
						font-size: 12px;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #0B95FF;
						position: relative;
						&::after {
							position: absolute;
							right: -10px;
							bottom: -4px;
							content: '√';
							color: #FFFFFF;
							font-size: 10px;
							line-height: 10px;
							width: 0rpx;
							height: 0rpx;
							border: 10px solid red;
							border-color: transparent rgb(11,149,255) rgb(11,149,255) transparent;
						}
					}
				}
			}
			
			.info{
				width: 84px;
				height: 20px;
				font-size: 14px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				position: absolute;
				top: 108px;
				left: 130px;
			}
			
			.coinImg{
				position: absolute;
				width: 20px;
				height: 20px !important;
				top: 108px;
				left: 214px;
				margin-right: 3px;
			}
			
			.numbers{
				position: absolute;
				top: 105px;
				left: 242px;
				width: 21px;
				height: 25px;
				font-size: 18px;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
			
			.titleInfo{
				position: absolute;
				top: 156px;
				left: 16px;
				width: 80px;
				height: 24px;
				font-size: 16px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
			
			.typeTwo{
				position: absolute;
				width: 200px;
				height: 60px;
				top: 156px;
				left: 104px;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.tItem{
					width: 90px;
					height: 24px;
					border-radius: 2px 2px 2px 2px;
					opacity: 1;
					border: 1px solid #0B95FF;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 8px;
					margin-bottom: 8px;
					.infoTwoItem{
						font-size: 12px;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}
					.infoItem{
						font-size: 12px;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #0B95FF;
						position: relative;
						&::after {
							position: absolute;
							right: -10px;
							bottom: -4px;
							content: '√';
							color: #FFFFFF;
							font-size: 10px;
							line-height: 10px;
							width: 0rpx;
							height: 0rpx;
							border: 10px solid red;
							border-color: transparent rgb(11,149,255) rgb(11,149,255) transparent;
						}
					}
				}
			}
			
			.dd{
				top: 240px;
			}
			
			.bds{
				position: absolute;
				top: 236px;
				left: 104px;
				width: 32px;
				height: 32px !important;
			}
			
			.btnNum{
				position: absolute;
				top: 236px;
				left: 140px;
				width: 80px;
				height: 32px;
				border-radius: 4px 4px 4px 4px;
				opacity: 1;
				border: 1px solid rgba(255, 255, 255, 0.5);
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 16px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				background: #1C294C;
			}
			
			.ads{
				left: 224px;
			}
			
			.btnBox{
				width: 375px;
				height: 100px;
				position: absolute;
				top: 285px;
				border-top: 1px solid rgba(255,255,255,0.1);
				.tt{
					width: 72px;
					height: 17px;
					font-size: 12px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					position: absolute;
					top: 24px;
					left: 16px;
				}
				.coinImgs{
					width: 20px;
					height: 20px !important;
					position: absolute;
					top: 48px;
					left: 16px;
				}
				.ttt{
					position: absolute;
					top: 45px;
					left: 44px;
					width: 32px;
					height: 25px;
					font-size: 18px;
					font-family: PingFang SC-Bold, PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
				}
			}
			
			.btnMore{
				width: 224px;
				height: 48px;
				background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%);
				border-radius: 8px 8px 8px 8px;
				opacity: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 16px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				position: absolute;
				top: 37px;
				left: 135px;
			}

			.top {
				width: 100%;
				height: 200rpx;
				margin-top: 50rpx;
				display: flex;
				flex-direction: row;

				.topL {
					width: 30%;
					height: 200rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.Cimg {
						width: 160rpx;
						height: 160rpx;
						border-radius: 10rpx;
						border: 2rpx solid rgb(112, 116, 138);
					}
				}

				.topR {
					width: 70%;
					height: 100%;
					display: flex;
					flex-direction: column;

					.Cname {
						width: 100%;
						height: 40rpx;

						.name {
							color: #FFFFFF;
							letter-spacing: 2rpx;
						}
					}

					.CLname {
						width: 100%;
						height: 80rpx !important;
						display: flex;
						align-items: flex-end;
						
						.names{
							display: flex;
							align-items: center;
							justify-content: center;
							width: 150rpx;
							height: 30rpx;
							// border: 1px solid rgb(16, 119, 205);
							padding: 10rpx;
							border-radius: 10rpx;
							letter-spacing: 2rpx;
							// color: rgb(16, 119, 205);
							border: 1px solid grey;
							color: grey;
							margin-right: 15rpx;
							position: relative;
						}

						.name {
							border: 1px solid rgb(16, 119, 205);
							color: rgb(16, 119, 205);
							position: relative;
							&::after {
								position: absolute;
								right: 0;
								bottom: 0;
								content: '√';
								color: #FFFFFF;
								font-size: 12rpx;
								width: 0rpx;
								height: 0rpx;
								border: 10px solid red;
								border-color: transparent rgb(11,149,255) rgb(11,149,255) transparent;
							}
						}
					}

					.CInfo {
						width: 100%;
						height: 70rpx !important;
						display: flex;
						align-items: center;

						.info {
							font-size: 28rpx;
							margin-right: 10rpx;
						}

						.Ccoin {
							width: 40rpx;
							height: 40rpx;
						}

						.Cpay {
							font-size: 38rpx;
							color: #FFFFFF;
							margin-left: 10rpx;
						}
					}
				}
			}

			.add {
				width: 100%;
				height: 150rpx;
				display: flex;
				flex-direction: row;

				.CL {
					width: 30%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					.info {
						color: #f2f2f2;
					}
				}

				.CR {
					width: 70%;
					height: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					flex-wrap: wrap;
					
					.names{
						display: flex;
						align-items: center;
						justify-content: center;
						width: 200rpx !important;
						height: 30rpx;
						border: 1px solid grey;
						padding: 10rpx;
						border-radius: 10rpx;
						letter-spacing: 2rpx;
						color: grey;
						margin-right: 15rpx;
					}
					
					.name {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 200rpx !important;
						height: 30rpx;
						border: 1px solid rgb(16, 119, 205);
						padding: 10rpx;
						border-radius: 10rpx;
						letter-spacing: 2rpx;
						color: rgb(16, 119, 205);
						margin-right: 15rpx;
						position: relative;
						&::after {
							position: absolute;
							right: 0;
							bottom: 0;
							content: '√';
							color: #FFFFFF;
							font-size: 12rpx;
							width: 0rpx;
							height: 0rpx;
							border: 10px solid red;
							border-color: transparent rgb(11,149,255) rgb(11,149,255) transparent;
						}
					}
				}
			}

			.center {
				width: 100%;
				height: 80rpx;
				display: flex;
				flex-direction: row;

				.CL {
					width: 30%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					.info {
						color: #f2f2f2;
					}
				}

				.CR {
					width: 70%;
					height: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;

					.btn {
						width: 70rpx;
						height: 70rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #f2f2f2;
						background: rgb(28, 41, 76);
						border: 2rpx solid rgb(141, 148, 166);
					}

					.num {
						width: 280rpx;
						margin-left: -10rpx;
					}

					.add {
						margin-left: -15rpx;
					}
				}
			}

			.bottom {
				width: 100%;
				height: 150rpx;
				display: flex;
				flex-direction: row;

				.bL {
					width: 30%;
					height: 100%;

					.info {
						width: 100%;
						height: 50%;
						display: flex;
						align-items: center;
						justify-content: center;

						.infoText {
							font-size: 28rpx;
						}
					}

					.num {
						width: 100%;
						height: 50%;
						display: flex;
						align-items: center;
						justify-content: flex-start;

						.coin {
							width: 40rpx;
							height: 40rpx;
							margin-right: 20rpx;
							margin-left: 30rpx;
						}

						.infoText {
							color: #FFFFFF;
						}
					}
				}

				.bR {
					width: 70%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					.buyBtn {
						width: 440rpx;
						height: 100rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #FFFFFF;
						background: linear-gradient(to right, rgb(135, 57, 245) 0%, rgb(70, 104, 253), rgb(25, 137, 253));
					}
				}
			}
		}
	}
</style>
