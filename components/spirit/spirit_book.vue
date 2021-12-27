<template>
	<view>
		<!-- <van-overlay :show="true"><text>4456456465</text></van-overlay> -->
		<view class="spirit_mask">
			<view class="spirit_book">
				<view class="LevelBox">
					<image class="level" src="../../static/spirit/levelFive.png" mode="widthFix"></image>
				</view>
				<view class="bodyBox">
					<view class="bodyLeft">
						<image class="spiritImgs" src="../../static/BaseImage/add.png" mode="widthFix"></image>
						<text class="bigTitle">盎司附近客户</text>
						<text class="bookTime">剩余预约时间  确定预约么?</text>
					</view>
					<view class="bodyRight">
						<view class="labelBox"><text class="label">消耗精灵令</text></view>
						<view class="infoBox"><image class="infoImage" src="../../static/spirit/coin.png" mode="widthFix"></image><text class="infoLabel">x6</text></view>
						<view class="labelBox"><text class="label">消耗陪伴精灵</text></view>
						<view class="infoBox"><image class="infoImage" src="../../static/spirit/company.png" mode="widthFix"></image><text class="infoLabel">x6</text></view>
						<view class="labelBox"><text class="label">需要土地</text></view>
						<view class="infoBox"><image class="infoImage" src="../../static/spirit/land.png" mode="widthFix"></image><text class="infoLabel">x6</text></view>
					</view>
				</view>
				<view class="btnBox">
					<button class="btnCancel btn cancel" @click="cancel">取消</button>
					<button class="btnSuccess btn book">预约</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			itemInfoForChild:{
				type:JSON,
				default:null
			}
		},
		data(){
			return{
				show:true
			}
		},
		created() {
			console.log(this.itemInfoForChild)
		},
		methods:{
			cancel(){
				this.$emit('cancelChild',false)
			}
		}
	}
</script>

<style lang="less">
	// .van-overlay{
	// 	width: 80%;
	// 	margin-left: 10%;
	// 	height: 800rpx;
	// 	position: absolute;
	// 	// top: 50rpx;
	// 	background: rgb(27, 40, 74);
	// 	border: 2rpx solid rgb(47, 69, 128);
	// 	border-radius: 20rpx;
	// }
	.spirit_mask{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #333;
		opacity: .8;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.spirit_book {
		width: 80%;
		height: 800rpx;
		position: absolute;
		top: 50rpx;
		background: rgb(27, 40, 74);
		border: 2rpx solid rgb(47, 69, 128);
		border-radius: 20rpx;

		.LevelBox {
			width: 100%;
			height: 90rpx;
			display: flex;
			align-items: center;

			.level {
				width: 150rpx;
				height: 150rpx;
				margin-left: 50rpx;
			}
		}
		.bodyBox{
			width: 100%;
			height: 550rpx;
			display: flex;
			flex-direction: row;
			.bodyLeft{
				width: 70%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items:center;
				justify-content: center;
				.spiritImgs{
					width: 220rpx;
					height: 400rpx !important;
				}
				.bigTitle{
					color: #FFFFFF;
					margin-top: 6rpx;
					letter-spacing: 3rpx;
				}
				.bookTime{
					margin-top: 10rpx;
					font-size: 24rpx;
					color: rgb(118,126,145);
				}
			}
			.bodyRight{
				width: 30%;
				height: 100%;
				.labelBox{
					width: 100%;
					height: 10%;
					display: flex;
					align-items: center;
					justify-content: center;
					.label{
						font-size: 22rpx;
					}
				}
				.infoBox{
					width: 80%;
					height: 10%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					.infoImage{
						width: 45rpx;
						height: 45rpx;
					}
					.infoLabel{
						font-size: 28rpx;
						margin-left: 10rpx;
						color: #FFFFFF;
					}
				}
			}
		}
		.btnBox{
			width: 100%;
			height: 140rpx;
			border-top: 1px solid rgb(56,76,114);
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.btn{
				width: 220rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #FFFFFF;
			}
			.cancel{
				border: 1px solid rgb(142,148,166);
				background: rgb(27,40,74);
			}
			.book{
				background: linear-gradient(to right, rgb(135,57,245) 0%,rgb(70,104,253), rgb(25,137,253));
			}
		}
	}
</style>
