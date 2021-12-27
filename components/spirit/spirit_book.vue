<template>
	<view>
		<!-- <van-overlay :show="true"><text>4456456465</text></van-overlay> -->
		<view class="spirit_mask">
			<view class="spirit_book">
				<view class="bodyBox">
					<view class="bodyLeft">
						<image class="level" src="../../static/spirit/levelFive.png" mode="widthFix"></image>
					</view>
					<view class="bodyCenter">
						<image class="spiritImgs" src="../../static/spirit/1.png" mode="widthFix"></image>
					</view>
					<view class="bodyRight">
						<view class="bodyItems">
							<view class="labelBox"><text class="label">消耗精灵令</text></view>
							<view class="infoBox"><image class="infoImage" src="../../static/spirit/coin.png" mode="widthFix"></image><text class="infoLabel">x6</text></view>
						</view>
						<view class="bodyItems">
							<view class="labelBox"><text class="label">消耗陪伴精灵</text></view>
							<view class="infoBox"><image class="infoImage" src="../../static/spirit/company.png" mode="widthFix"></image><text class="infoLabel">x6</text></view>
						</view>
						<view class="bodyItems">
							<view class="labelBox"><text class="label">需要土地</text></view>
							<view class="infoBox"><image class="infoImage" src="../../static/spirit/land.png" mode="widthFix"></image><text class="infoLabel">x6</text></view>
						</view>
					</view>
				</view>
				<view class="tips">
					<view class="bigTitle">稀有幽冥灵猫</view>
					<view class="bookTime">预约剩余时间 52:32  确定预约吗?</view>
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

<style lang="less" scoped>
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
		background-color: #0009;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999999;
	}
	.bodyBox{
		display: flex;
		margin: 60rpx 30rpx;
		.level{
			width: 140rpx;
		}
		.spiritImgs{
			width: 280rpx;
		}
		.infoImage{
			width: 40rpx;
		}
		.infoBox,.labelBox{
			display: flex;
			justify-content: flex-end;
		}
		.infoBox{
			margin-top: 10rpx;
		}
		.label{
			font-size: 24rpx;
			text-align: right;
			color: #5F697E;
		}
	}
	.bigTitle{
		text-align: center;
		color: #FFFFFF;
		font-weight: 600;
		font-size: 36rpx;
	}
	.bookTime{
		text-align: center;
		font-size: 30rpx;
		margin-top: 10rpx;
		margin-bottom: 50rpx;
	}
	.bodyItems{
		margin-bottom: 30rpx;
	}
	.bodyLeft,.bodyCenter,.bodyRight{
		flex: 1;
	}
	.infoLabel{
		font-size: 30rpx;
		line-height: 40rpx;
		margin-left: 5rpx;
	}
	.spirit_book {
		width: 650rpx;
		// height: 800rpx;
		position: relative;
		background: rgb(27, 40, 74);
		border: 2rpx solid rgb(47, 69, 128);
		border-radius: 20rpx;
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
