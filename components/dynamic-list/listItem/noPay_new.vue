<template>
	<view class="team">
		<view class="item">
			<view class="top">
				<view class="left">
					<image src="../../../static/spirit/coin.png" mode="widthFix" class="avator"></image>
				</view>
				<view class="right">
					<view class="flex i"><text class="name">刘华强</text></view>
					<view class="flex"><text class="account">18664521094</text></view>
					<view class="flex ii">
						<text class="num">上级:  王小虎/18664521094</text>
					</view>
				</view>
			</view>
			<view class="bottom">
				<view class="itemS">
					<view class="viewL">
						<image src="../../../static/spirit/coin.png" mode="widthFix" class="img"></image>
					</view>
					<view class="viewC">
						<view class="cN"><text class="name">稀有精灵猫</text></view>
						<view class="cI"><image src="../../../static/spirit/levelThree.png" mode="widthFix" class="imgs"></image></view>
					</view>
					<view class="viewR">
						<view class="ro"><text class="time">45:30:20</text></view>
						<view class="rt"><text class="t">剩余付款时间</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less">
	.team{
		width: 100%;
		background: rgb(5,14,23);
		padding-top: 30rpx;
		.item{
			width: 90%;
			height: 320rpx;
			margin-left: 5%;
			background: rgb(17,24,30);
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			.top{
				width: 100%;
				height: 50%;
				display: flex;
				flex-direction: row;
				.left{
					width: 20%;
					height: 100%;
					display: flex;
					align-items: flex-start;
					justify-content: center;
					.avator{
						margin-top: 20rpx;
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}
				}
				.right{
					width: 80%;
					height: 100%;
					display: flex;
					flex-direction: column;
					.flex{
						height: 50rpx;
						display: flex;
						align-items: center;
						.account{
							color: grey;
							font-size: 30rpx;
						}
						.num{
							color: grey;
							font-size: 25rpx;
						}
					}
					.ii{
						display: flex;
						justify-content: space-between;
						.tt{
							margin-right: 40rpx;
						}
					}
					.i{
						display: flex;
						align-items: center;
						margin-top: 20rpx;
						.name{
							color: #FFFFFF;
						}
					}
				}
			}
			.bottom{
				width: 100%;
				height: 45%;
				display: flex;
				align-items: flex-start;
				justify-content: center;
				.itemS{
					margin-top: 10rpx;
					width: 90%;
					height: 110rpx;
					background: rgb(26,39,69);
					border-radius: 20rpx;
					border: 1px solid rgb(47,69,169);
					display: flex;
					flex-direction: row;
					.viewL{
						width: 20%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						.img{
							width: 70rpx;
							height: 90rpx !important;
						}
					}
					.viewC{
						width: 40%;
						height: 100%;
						.cN{
							width: 100%;
							height: 50%;
							display: flex;
							align-items: center;
							.name{
								color: #f2f2f2;
								font-size: 30rpx;
							}
						}
						.cI{
							width: 100%;
							height: 50%;
							.imgs{
								width: 150rpx;
								height: 40rpx !important;
							}
						}
					}
					.viewR{
						width: 40%;
						height: 100%;
						.ro{
							width: 100%;
							height: 50%;
							display: flex;
							align-items: center;
							justify-content: flex-end;
							.time{
								color: #FFFFFF;
								margin-right: 20rpx;
							}
						}
						.rt{
							width: 100%;
							height: 50%;
							display: flex;
							align-items: center;
							justify-content: flex-end;
							.t{
								color: grey;
								font-size: 30rpx;
								margin-right: 10rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
