<template>
	<view class="team newTeam">
		<!-- <view class="newItem">
			<view class="imgBox">
				<image src="../../../static/spirit/coin.png" mode="widthFix" class="userImg"></image>
			</view>
		</view> -->
		<view class="item">
			<view class="left">
				<image src="../../../static/spirit/coin.png" mode="widthFix" class="avator"></image>
			</view>
			<view class="right">
				<view class="flex i"><text class="name">劉華強</text></view>
				<view class="flex"><text class="account">18664521094 (lv2)</text></view>
				<view class="flex ii">
					<text class="num">領養數:  13人</text>
					<text class="num">直推數:  13人</text>
					<text class="num tt">預約數:  13人</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less">
	// .newTeam{
	// 	width: 100%;
	// 	height: 100%;
	// 	background-color: #050E17;
	// 	padding-bottom: 20rpx;
	// 	.newItem{
	// 		margin: 0rpx auto;
	// 		width: 686rpx;
	// 		height: 200rpx;
	// 		background: #11181E;
	// 		box-shadow: 0rpx 8rpx 8rpx 2rpx rgba(0, 0, 0, 0.25);
	// 		border-radius: 8rpx 8rpx 8rpx 8rpx;
	// 		opacity: 1;
	// 		border: 1rpx solid red;
	// 		position: relative;
	// 		.imgBox{
	// 			position: absolute;
	// 			top: 32rpx;
	// 			left: 32rpx;
	// 			border: 1px solid red;
	// 			width: 96rpx;
	// 			height: 96rpx;
	// 			.userImg{
					
	// 			}
	// 		}
	// 	}
	// }
	.team{
		width: 100%;
		background: rgb(5,14,23);
		padding-bottom: 20rpx;
		.item{
			width: 90%;
			height: 180rpx;
			margin-left: 5%;
			background: rgb(17,24,30);
			border-radius: 20rpx;
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
					flex: 1;
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
					flex: 1.5;
					display: flex;
					align-items: center;
					.name{
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
