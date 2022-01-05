<template>
	<view>
		<view class="spirit_mask">
			<view class="spirit_book">
				<view class="imgBox">
					<image class="img" src="../../static/spirit/levelOne.png" mode="widthFix" v-if="itemInfo.level == 1"></image>
					<image class="img" src="../../static/spirit/levelTwo.png" mode="widthFix" v-if="itemInfo.level == 2"></image>
					<image class="img" src="../../static/spirit/levelThree.png" mode="widthFix" v-if="itemInfo.level == 3"></image>
					<image class="img" src="../../static/spirit/levelFour.png" mode="widthFix" v-if="itemInfo.level == 4"></image>
					<image class="img" src="../../static/spirit/levelFive.png" mode="widthFix" v-if="itemInfo.level == 5"></image>
				</view>
				<view class="spiritBox">
					<image :src="itemInfo.previewPhotoUrl" mode="widthFix" class="imgs"></image>
				</view>
				<text class="tt">消耗精靈令</text>
				<view class="ttt">
					<image src="../../static/spirit/coin.png" mode="widthFix" class="icon"></image>
					<text class="number">x{{itemInfo.costWispCoin}}</text>
				</view>
				<text class="tt two">消耗陪伴精靈</text>
				<view class="ttt twott">
					<image src="../../static/spirit/company.png" mode="widthFix" class="icon"></image>
					<text class="number">x{{itemInfo.costAccompanyWisp}}</text>
				</view>
				<text class="tt three">需要土地</text>
				<view class="ttt threett">
					<image src="../../static/spirit/land.png" mode="widthFix" class="icon"></image>
					<text class="number">x{{itemInfo.growthDays}}</text>
				</view>
				<view class="nameBox"><text class="name">{{itemInfo.name}}</text></view>
				<view class="nameBox nTwo"><text class="name nametwo">預約剩餘時間 {{itemInfo.remainingBookMinutes}}分鍾 确定預約嗎？</text></view>
				<view class="btnBox">
					<button class="btn cancel" @click="cancel">取消</button>
					<button class="btn"  @click="book">馬上預約</button>
				</view>
				<!-- <view class="bodyBox">
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
							<view class="labelBox"><text class="label">消耗精靈令</text></view>
							<view class="infoBox"><image class="infoImage" src="../../static/spirit/coin.png" mode="widthFix"></image><text class="infoLabel">x{{itemInfo.costWispCoin}}</text></view>
						</view>
						<view class="bodyItems">
							<view class="labelBox"><text class="label">消耗陪伴精靈</text></view>
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
					<view class="bookTime">預約剩餘時間 52:32  确定預約嗎?</view>
				</view>
				<view class="btnBox">
					<button class="btnCancel btn cancel" @click="cancel">取消</button>
					<button class="btnSuccess btn book" @click="book">預約</button>
				</view> -->
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
			console.log(this.itemInfo.remainingBookMinutes)
			
			
		},
		methods:{
			handleTime(number){
				
			},
			
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
					this.msg('預約成功')
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
		// width: 650rpx;
		// // height: 800rpx;
		// position: relative;
		// background: rgb(27, 40, 74);
		// border-top: 2rpx solid rgb(47, 69, 128);
		// border-left: 2rpx solid rgb(47, 69, 128);
		// border-radius: 20rpx;
		width: 320px;
		height: 393px;
		border-radius: 8px 8px 8px 8px;
		border-top: 2rpx solid rgb(50, 71, 137);
		border-left: 2rpx solid rgb(50, 71, 137);
		background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
		position: relative;
			.imgBox{
				position: absolute;
				left: 24px;
				top: 32px;
				width: 67px;
				height: 18px;
				.img{
					width: 67px;
					height: 18px !important;
				}
			}
			
			.spiritBox{
				width: 200px;
				height: 200px;
				position: absolute;
				left: 60px;
				top: 32px;
				display: flex;
				align-items: center;
				justify-content: center;
				.imgs{
					width: 110px;
					height: 200px !important;
				}
			}
			
			.tt{
				width: 60px;
				height: 17px;
				position: absolute;
				top: 37px;
				right: 24px;
				font-size: 12px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		    
			.ttt{
				width: 60px;
				height: 20px;
				position: absolute;
				top: 58px;
				right: 24px;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.icon{
					width: 20px;
					height: 20px !important;
					margin-right: 4px;
				}
				.number{
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
			
			.btnBox{
				width: 320px;
				height: 88px;
				background: #1D294D;
				box-shadow: 0px -2px 12px 1px rgba(0,0,0,0.25);
				border-radius: 0px 0px 8px 8px;
				opacity: 1;
				position: absolute;
				bottom: 0px;
				.btn{
					width: 132px;
					height: 40px;
					background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%);
					border-radius: 4px 4px 4px 4px;
					opacity: 1;
				}
				.cancel{
					border: 1px solid #FFFFFF;
					background: #1D294D;
				}
			}
			
			.two{
				width: 75px;
				top: 94px;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		
			.twott{
				top: 115px;
			}
		
			.three{
				top: 151px;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
			
			.threett{
				top: 172px;
			}
		
			.nameBox{
				width: 320px;
				height: 22px;
				position: absolute;
				top: 238px;
				display: flex;
				align-items: center;
				justify-content: center;
				.name{
					font-size: 16px;
					font-family: PingFang SC-Bold, PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
				}
			}
			
			.nTwo{
				top: 264px;
				.nametwo{
					font-size: 12px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
		
		
		.btnBox{
			width: 100%;
			height: 140rpx;
			// border-top: 1px solid rgb(56,76,114);
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			background: rgb(29,41,77);
			border-bottom-right-radius: 20rpx;
			border-bottom-left-radius: 20rpx;
			border-top: 1px solid;
			border-image: linear-gradient(to right,rgb(25,40,67),rgb(60,80,120),rgb(43,61,95),rgb(60,80,120),rgb(25,40,67)) 1 1 1 1;
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
