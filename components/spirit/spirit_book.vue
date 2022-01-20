<template>
	<view>
		<view class="spirit_mask">
			<view class="spirit_book">
				<view class="imgBox">
					<image class="img" src="../../static/level/one.png" mode="widthFix" v-if="itemInfo.level == 1"></image>
					<image class="img" src="../../static/level/two.png" mode="widthFix" v-if="itemInfo.level == 2"></image>
					<image class="img" src="../../static/level/three.png" mode="widthFix" v-if="itemInfo.level == 3"></image>
					<image class="img" src="../../static/level/four.png" mode="widthFix" v-if="itemInfo.level == 4"></image>
					<image class="img" src="../../static/level/five.png" mode="widthFix" v-if="itemInfo.level == 5"></image>
					<image class="img" src="../../static/level/six.png" mode="widthFix" v-if="itemInfo.level == 6"></image>
					<image class="img" src="../../static/level/seven.png" mode="widthFix" v-if="itemInfo.level == 7"></image>
					<image class="img" src="../../static/level/eight.png" mode="widthFix" v-if="itemInfo.level == 8"></image>
				</view>
				<view class="spiritBox">
					<image :src="getImage(itemInfo.previewPhotoUrl)" mode="aspectFit" class="imgs"></image>
				</view>
				<text class="tt">消耗GuGu令</text>
				<view class="ttt">
					<image src="../../static/spirit/newCoin.png" mode="widthFix" class="icon"></image>
					<text class="number">x{{itemInfo.costWispCoin}}</text>
				</view>
				<text class="tt two">消耗能力晶石</text>
				<view class="ttt twott">
					<image src="../../static/spirit/newC.png" mode="widthFix" class="icon"></image>
					<text class="number">x{{itemInfo.costAccompanyWisp}}</text>
				</view>
				<text class="tt three">需要土地</text>
				<view class="ttt threett">
					<image src="../../static/spirit/land.png" mode="widthFix" class="icon"></image>
					<text class="number">x{{itemInfo.growthDays}}</text>
				</view>
				<view class="newAdd"><view class="checkBtn" :class="{active:isClick==true}" @click="change"></view><text>自動預約</text></view>
				<view class="nameBox"><text class="name">{{itemInfo.name}}</text></view>
				<view class="nameBox nTwo"><text class="name nametwo">預約剩餘時間 {{itemInfo.remainingBookMinutes}}分鍾 确定預約嗎？</text></view>
				<view class="btnBox">
					<button class="btn cancel" @click="cancel">取消</button>
					<button class="btn"  @click="book" :disabled="status=='FROZEN' || isClickBtn==true">馬上預約</button>
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
		created() {
			console.log('00000000000000',this.$cache.get('status'))
			this.status = this.$cache.get('status')
		},
		data(){
			return{
				status:'',
				show:true,
				isClick:true,
				
				isClickBtn:false
			}
		},
		methods:{
			change(){
				this.isClick = !this.isClick
			},
			getImage(url) {
				console.log(this.$config)
				let that = this
				let imagePath;
				if (url.indexOf("http" || "https") === 0) {
					imagePath = url
				} else {
					console.log(url.indexOf("["))
					if (url.indexOf("[") === 0) {
						let urlJSON = JSON.parse(url)
						let imageUrl = urlJSON[0].url
						if (imageUrl.indexOf("http" || "https") === 0) {
							imagePath = imageUrl
						} else {
							if(![undefined,null,''].includes(that.$config.endpoint)){
								imagePath = that.$config.endpoint + "/" +imageUrl;								
							}else{
								imagePath = that.$config.imageEndpoint + "/" +imageUrl
							}
							// return this.$config.endpoint + "/" + imageUrl
						}
					}
				}
				return imagePath
			},
			
			handleTime(number){
				
			},
			
			msg(toast){
				this.$emit('getMsg',toast)
			},
			cancel(){
				this.$emit('cancelChild',false)
			},
			async book(){
				this.isClickBtn = true
				console.log('测试---------------123132132132132132132')
				console.log(this.itemInfo)
				const data = {
					wispId:parseInt(this.itemInfo.id),
					paymentPassword:'123456'
				}
			    const res = await this.$api.bookSpirit(data)
				this.isClickBtn = false
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
				left: 80px;
				top: 25px;
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
				left: 10px;
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
				width: 70px;
				height: 17px;
				position: absolute;
				top: 37px;
				right: 24px;
				font-size: 12px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
			
			.newAdd{
				width: 150px;
				height: 17px;
				position: absolute;
				top: 210px;
				right: 12px;
				font-size: 12px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-end;
				.active{
					background-color: rgb(16,143,233) !important;
					border: none !important;
					&::after{
						content: '√';
						color: #FFFFFF;
						font-weight: bolder;
						font-size: 10rpx;
						position: absolute;
						top: 0;
						left: 20%;
					}
				}
				.checkBtn{
					margin-top: 5rpx;
					width: 35rpx;
					height: 35rpx;
					border-radius: 50%;
					border: 1px solid white;
					margin-right: 5rpx;
					position: relative;
				}
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
