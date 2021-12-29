<template>
	<view>
		<view class="spirit_mask">
			<view class="spirit_book">
				<view class="bodyBox">
					<view class="bodyLeft">
						<image class="level" src="../../static/spirit/levelOne.png" mode="widthFix" v-if="itemInfo.level == 1"></image>
						<image class="level" src="../../static/spirit/levelTwo.png" mode="widthFix" v-if="itemInfo.level == 2"></image>
						<image class="level" src="../../static/spirit/levelThree.png" mode="widthFix" v-if="itemInfo.level == 3"></image>
						<image class="level" src="../../static/spirit/levelFour.png" mode="widthFix" v-if="itemInfo.level == 4"></image>
						<image class="level" src="../../static/spirit/levelFive.png" mode="widthFix" v-if="itemInfo.level == 5"></image>
					</view>
					<view class="bodyCenter">
						<image class="spiritImgs" :src="itemInfo.previewPhotoUrl" mode="widthFix"></image>
					</view>
					<view class="bodyRight">
						<view class="bodyItems">
							<view class="labelBox"><text class="label">消耗精灵令</text></view>
							<view class="infoBox"><image class="infoImage" src="../../static/spirit/coin.png" mode="widthFix"></image><text class="infoLabel">x{{itemInfo.costWispCoin}}</text></view>
						</view>
						<view class="bodyItems">
							<view class="labelBox"><text class="label">消耗陪伴精灵</text></view>
							<view class="infoBox"><image class="infoImage" src="../../static/spirit/company.png" mode="widthFix"></image><text class="infoLabel">x{{itemInfo.costAccompanyWisp}}</text></view>
						</view>
						<view class="bodyItems">
							<view class="labelBox"><text class="label">需要土地</text></view>
							<view class="infoBox"><image class="infoImage" src="../../static/spirit/land.png" mode="widthFix"></image><text class="infoLabel">x{{itemInfo.growthDays}}</text></view>
						</view>
					</view>
				</view>
				<view class="tips">
					<view class="bigTitle">{{itemInfo.name}}</view>
					<view class="bookTime">预约剩余时间 52:32  确定预约吗?</view>
				</view>
				<view class="btnBox">
					<button class="btnCancel btn cancel" @click="cancel">取消</button>
					<button class="btnSuccess btn book" @click="book">预约</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			itemInfo:{
				type:Object,
				default:{}
			}
		},
		data(){
			return{
				show:true,
			}
		},
		created() {
			console.log(this.itemInfo)
			console.log(this.itemInfo.startMatchTime - this.itemInfo.endMatchTime)
		},
		methods:{
			msg(toast){
				this.$emit('getMsg',toast)
			},
			cancel(){
				this.$emit('cancelChild',false)
			},
			async book(){
				// console.log(this.itemInfo)
				const data = {
					wispId:parseInt(this.itemInfo.id),
					paymentPassword:'123456'
				}
			    const res = await this.$api.bookSpirit(data)
				console.log(res)
				if(res.code !==200){
					// if(res.code == 4000){
					// 	this.cancel()
					// 	uni.navigateTo({
					// 		url:''
					// 	})
					// }
					this.cancel()
					this.msg(res.message)
					return;
				}
				if(res.code == 200){
					this.cancel()
					this.msg('预约成功')
					return;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
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
			height: 370rpx !important;
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
