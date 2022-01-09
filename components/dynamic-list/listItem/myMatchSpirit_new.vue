<!-- <template>
	<view class="spiritMarketNew">
		<view class="newBox">
			<view class="imgBox">
				<image :src="getImage(item.wisp.previewPhotoUrl)" mode="widthFix" class="img"></image>
			</view>
			<view class="info">
				<view class="nameBox"><text class="name">{{item.wisp.name}}</text></view>
				<view class="levelBox">
					<image class="level" src="../../../static/spirit/levelOne.png" mode="widthFix" v-if="item.wisp.level==1"></image>
					<image class="level" src="../../../static/spirit/levelTwo.png" mode="widthFix" v-if="item.wisp.level==2"></image>
					<image class="level" src="../../../static/spirit/levelThree.png" mode="widthFix" v-if="item.wisp.level==3"></image>
					<image class="level" src="../../../static/spirit/levelFour.png" mode="widthFix" v-if="item.wisp.level==4"></image>
					<image class="level" src="../../../static/spirit/levelFive.png" mode="widthFix" v-if="item.wisp.level==5"></image>
					<image class="level" src="../../../static/spirit/level6.png" mode="widthFix" v-if="item.wisp.level==6"></image>
					<image class="level" src="../../../static/spirit/level7.png" mode="widthFix" v-if="item.wisp.level==7"></image>
					<image class="level" src="../../../static/spirit/level8.png" mode="widthFix" v-if="item.wisp.level==8"></image>
				</view>
				<view class="tBox">
					<view class="Child">
						<text class="Co">增長能力</text>
						<text class="Ct">{{item.wisp.growthPercent}}%</text>
					</view>
					<view class="Child">
						<text class="Co">能力值</text>
						<text class="Ct">400-500</text>
					</view>
					<view class="Child">
						<text class="Co">培養天數</text>
						<text class="Ct">{{item.wisp.growthDays}}天</text>
					</view>
				</view>
			</view>
			<view class="timeBox"><text class="time">預約時間：{{change}}</text></view>
			<view class="oBox">
				<view class="Child">
					<image src="../../../static/spirit/newCoin.png" mode="widthFix" class="icon"></image>
					<text class="number">x{{item.wisp.costWispCoin}}</text>
				</view>
				
				
				<view class="Child">
					<image src="../../../static/spirit/newC.png" mode="widthFix" class="icon"></image>
					<text class="number">x{{item.wisp.costAccompanyWisp}}</text>
				</view>
				
				
				
				<view class="Child">
					<image src="../../../static/spirit/land.png" mode="widthFix" class="icon"></image>
					<text class="number">x{{item.wisp.growthDays}}</text>
				</view>
			</view>
			<view class="btnBox">
				<button class="btn" v-if="item.stage=='MATCH_SUCCESS'" @click="goToPay">付款(剩餘59:28)</button>
				<view class="btnStatus fail" v-if="item.stage=='MATCH_FAIL'"><button class="notStatus">匹配失敗</button></view>
				<view class="btnStatus" v-if="item.stage=='MATCHING'"><button class="notStatus">等待匹配</button></view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		globalConfig
	} from '@/config.js'
	import {
		api
	} from '@/common/api.js'
	export default {
		name: 'spiritMatchMarketNew',
		props: {
			item: Object,
			ext: Object
		},
		mounted() {
			const s = this.item.appointmentTime.split('T')
			const t = s[0]
			const th = s[1]
			const time = t + ' ' + th
			this.change = time
		},
		data() {
			return {
				change:''
			}
		},
		methods: {
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
			goToPay(){
				uni.navigateTo({
					url:'/pages/userPay_new/userPay_new'
				})
			}
		}
	}
</script>

<style lang="less">
	.spiritMarketNew {
		width: 100%;
		height: 100%;
		background: rgb(5, 14, 23);
		padding-bottom: 20rpx;

		.newBox {
			width: 343px;
			height: 230px;
			background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
			// box-shadow: inset 1px 1px 0px 1px rgba(255,255,255,0.75), 0px 4px 16px 1px rgba(0,0,0,0.25);
			border-radius: 8px 8px 8px 8px;
			opacity: 1;
			margin: 0 auto;
			// margin-bottom: 10px;
			border-top: 2rpx solid rgb(50, 71, 137);
			border-left: 2rpx solid rgb(50, 71, 137);
			position: relative;

			.imgBox {
				width: 140px;
				height: 140px;
				border-radius: 0px 0px 0px 0px;
				opacity: 1;
				position: absolute;
				margin-top: 12px;
				margin-left: 12px;

				.img {
					width: 100%;
					height: 100% !important;
				}
			}

			.info {
				width: 179px;
				height: 140px;
				position: absolute;
				top: 12px;
				left: 164px;

				.nameBox {
					width: 179px;
					height: 22px;
					margin-top: 4px;

					.name {
						font-size: 16px;
						font-family: PingFang SC-Bold, PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
					}
				}
				
				.levelBox{
					width: 179px;
					height: 22px;
					margin-top: 8px;
					.level{
						width: 67px;
						height: 18px !important;
					}
				}
				.tBox{
					width: 179px;
					height: 22px;
					margin-top: 12px;
					.Child{
						width: 163px;
						height: 19px;
						display: flex;
						justify-content: space-between;
						padding-bottom: 2px;
						align-items: flex-end;
						border-bottom: 1px solid rgba(255,255,255,0.2);
						.Co{
							font-size: 12px;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
						}
						.Ct{
							font-size: 12px;
							font-family: PingFang SC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
						}
					}
				}
			}
			.timeBox{
				width: 275px;
				height: 14px;
				position: absolute;
				left: 27px;
				top: 152px;
				.time{
					font-size: 10px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
			.oBox{
				width: 120px;
				height: 42px;
				position: absolute;
				left: 27px;
				top: 174px;
				display: flex;
				.Child{
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.icon{
						width: 20px;
						height: 20px !important;
					}
					.number{
						margin-top: 2px;
						font-size: 14px;
						font-family: PingFang SC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}
				}
			}
			.btnBox{
				width: 163px;
				height: 40px;
				position: absolute;
				top: 174px;
				right: 16px;
				.btn{
					width: 163px;
					height: 40px;
					background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%);
					border-radius: 8px 8px 8px 8px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 16px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
				.btnStatus{
					width: 163px;
					height: 40px;
					box-sizing: border-box; 
					padding: 1px; 
					border-radius: 8px; 
					border: 1px solid;
					background-image: linear-gradient(to right bottom,rgba(147, 49, 245, 1),rgba(11, 149, 255, 1));
					display: flex;
					align-items: center;
					justify-content: center;
					.notStatus{
						border-radius: 8px;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 163px;
						height: 38px;
						border-radius: 15rpx;
						font-size: 16px;
						font-family: PingFang SC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
					}
				}
				.fail{
				padding: 0px !important;
				border: 1px solid #FFFFFF !important;
				background-image:none !important;
				background: none !important;
				}
			}
		}
	}
</style>
 -->
 
 
 <!-- <template>
 	<view class="spiritMarketNew">
 		<view class="newBox">
 			<view class="imgBox">
 				<image :src="item.wisp.previewPhotoUrl" mode="widthFix" class="img"></image>
 			</view>
 			<view class="info">
 				<view class="nameBox"><text class="name">{{item.wispName}}</text></view>
 				<view class="levelBox">
 					<image class="level" src="../../../static/spirit/levelOne.png" mode="widthFix" v-if="item.wisp.level==1"></image>
 					<image class="level" src="../../../static/spirit/levelTwo.png" mode="widthFix" v-if="item.wisp.level==2"></image>
 					<image class="level" src="../../../static/spirit/levelThree.png" mode="widthFix" v-if="item.wisp.level==3"></image>
 					<image class="level" src="../../../static/spirit/levelFour.png" mode="widthFix" v-if="item.wisp.level==4"></image>
 					<image class="level" src="../../../static/spirit/levelFive.png" mode="widthFix" v-if="item.wisp.level==5"></image>
 					<image class="level" src="../../../static/spirit/level6.png" mode="widthFix" v-if="item.wisp.level==6"></image>
 					<image class="level" src="../../../static/spirit/level7.png" mode="widthFix" v-if="item.wisp.level==7"></image>
 					<image class="level" src="../../../static/spirit/level8.png" mode="widthFix" v-if="item.wisp.level==8"></image>
 				</view>
 				<view class="tBox">
 					<view class="Child">
 						<text class="Co">增長能力</text>
 						<text class="Ct">{{item.wisp.growthPercent}}%</text>
 					</view>
 					<view class="Child">
 						<text class="Co">能力值</text>
 						<text class="Ct">400-500</text>
 					</view>
 					<view class="Child">
 						<text class="Co">培養天數</text>
 						<text class="Ct">{{item.wisp.growthDays}}天</text>
 					</view>
 				</view>
 			</view>
 			<view class="timeBox"><text class="time">預約時間：{{change}}</text></view>
 			<view class="oBox">
 				<view class="Child">
 					<image src="../../../static/spirit/newCoin.png" mode="widthFix" class="icon"></image>
 					<text class="number">x{{item.wisp.costWispCoin}}</text>
 				</view>
 				
 				
 				<view class="Child">
 					<image src="../../../static/spirit/newC.png" mode="widthFix" class="icon"></image>
 					<text class="number">x{{item.wisp.costAccompanyWisp}}</text>
 				</view>
 				
 				
 				
 				<view class="Child">
 					<image src="../../../static/spirit/land.png" mode="widthFix" class="icon"></image>
 					<text class="number">x{{item.wisp.growthDays}}</text>
 				</view>
 			</view>
 			<view class="btnBox">
 				<button class="btn"  v-if="true">預約成功</button>
 				<view class="btnStatus" v-if="item.bookStatus=='DISALLOW_BOOK'"><button class="notStatus">不可預約</button></view>
 				<view class="btnStatus" v-if="item.bookStatus=='END_OF_MATCH'"><button class="notStatus">匹配結束</button></view>
 				<view class="btnStatus" v-if="item.bookStatus=='GROWING'"><button class="notStatus">成長中</button></view>
 				<view class="btnStatus" v-if="item.bookStatus=='WAITING_MATCH'"><button class="notStatus">待匹配</button></view>
 				<view class="btnStatus fail" v-if="item.bookStatus=='MATCH_FAIL'"><button class="notStatus">匹配失敗</button></view>
 				<view class="btnStatus" v-if="item.bookStatus=='MATCH_SUCCESS'"><button class="notStatus">匹配成功</button></view>
 			</view>
 		</view>
 
 	</view>
 </template>
 
 <script>
 	import {
 		globalConfig
 	} from '@/config.js'
 	import {
 		api
 	} from '@/common/api.js'
 	export default {
 		name: 'spiritMarketNew',
 		props: {
 			item: Object,
 			ext: Object
 		},
 		mounted() {
 			const s = this.item.appointmentTime.split('T')
 			const t = s[0]
 			const th = s[1]
 			const time = t + ' ' + th
 			this.change = time
 		},
 		data() {
 			return {
 				change:''
 			}
 		},
 		methods: {
 		}
 	}
 </script>
 
 <style lang="less">
 	.spiritMarketNew {
 		width: 100%;
 		height: 100%;
 		background: rgb(5, 14, 23);
 		padding-bottom: 20rpx;
 
 		.newBox {
 			width: 343px;
 			height: 230px;
 			background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
 			// box-shadow: inset 1px 1px 0px 1px rgba(255,255,255,0.75), 0px 4px 16px 1px rgba(0,0,0,0.25);
 			border-radius: 8px 8px 8px 8px;
 			opacity: 1;
 			margin: 0 auto;
 			border-top: 2rpx solid rgb(50, 71, 137);
 			border-left: 2rpx solid rgb(50, 71, 137);
 			position: relative;
 
 			.imgBox {
 				width: 140px;
 				height: 140px;
 				border-radius: 0px 0px 0px 0px;
 				opacity: 1;
 				position: absolute;
 				margin-top: 12px;
 				margin-left: 12px;
 
 				.img {
 					width: 100%;
 					height: 100% !important;
 				}
 			}
 
 			.info {
 				width: 179px;
 				height: 140px;
 				position: absolute;
 				top: 12px;
 				left: 164px;
 
 				.nameBox {
 					width: 179px;
 					height: 22px;
 					margin-top: 4px;
 
 					.name {
 						font-size: 16px;
 						font-family: PingFang SC-Bold, PingFang SC;
 						font-weight: bold;
 						color: #FFFFFF;
 					}
 				}
 				
 				.levelBox{
 					width: 179px;
 					height: 22px;
 					margin-top: 8px;
 					.level{
 						width: 67px;
 						height: 18px !important;
 					}
 				}
 				.tBox{
 					width: 179px;
 					height: 22px;
 					margin-top: 12px;
 					.Child{
 						width: 163px;
 						height: 19px;
 						display: flex;
 						justify-content: space-between;
 						padding-bottom: 2px;
 						align-items: flex-end;
 						border-bottom: 1px solid rgba(255,255,255,0.2);
 						.Co{
 							font-size: 12px;
 							font-family: PingFang SC-Regular, PingFang SC;
 							font-weight: 400;
 							color: #FFFFFF;
 						}
 						.Ct{
 							font-size: 12px;
 							font-family: PingFang SC-Regular, PingFang SC;
 							font-weight: 400;
 							color: #FFFFFF;
 						}
 					}
 				}
 			}
 			.timeBox{
 				width: 275px;
 				height: 14px;
 				position: absolute;
 				left: 27px;
 				top: 152px;
 				.time{
 					font-size: 10px;
 					font-family: PingFang SC-Regular, PingFang SC;
 					font-weight: 400;
 					color: #FFFFFF;
 				}
 			}
 			.oBox{
 				width: 120px;
 				height: 42px;
 				position: absolute;
 				left: 27px;
 				top: 174px;
 				display: flex;
 				.Child{
 					flex: 1;
 					display: flex;
 					flex-direction: column;
 					align-items: center;
 					justify-content: center;
 					.icon{
 						width: 20px;
 						height: 20px !important;
 					}
 					.number{
 						margin-top: 2px;
 						font-size: 14px;
 						font-family: PingFang SC-Regular, PingFang SC;
 						font-weight: 400;
 						color: #FFFFFF;
 					}
 				}
 			}
 			.btnBox{
 				width: 163px;
 				height: 40px;
 				position: absolute;
 				top: 174px;
 				right: 16px;
 				.btn{
 					width: 163px;
 					height: 40px;
 					background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%);
 					border-radius: 8px 8px 8px 8px;
 					display: flex;
 					align-items: center;
 					justify-content: center;
 					font-size: 16px;
 					font-family: PingFang SC-Medium, PingFang SC;
 					font-weight: 500;
 					color: #FFFFFF;
 				}
 				.btnStatus{
 					width: 163px;
 					height: 40px;
 					box-sizing: border-box; 
 					padding: 1px; 
 					border-radius: 8px; 
 					border: 1px solid;
 					background-image: linear-gradient(to right bottom,rgba(147, 49, 245, 1),rgba(11, 149, 255, 1));
 					display: flex;
 					align-items: center;
 					justify-content: center;
 					.notStatus{
 						border-radius: 8px;
 						display: flex;
 						align-items: center;
 						justify-content: center;
 						width: 163px;
 						height: 38px;
 						border-radius: 15rpx;
 						font-size: 16px;
 						font-family: PingFang SC-Medium, PingFang SC;
 						font-weight: 500;
 						color: #FFFFFF;
 						background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
 					}
 				}
 				.fail{
 				padding: 0px !important;
 				border: 1px solid #FFFFFF !important;
 				background-image:none !important;
 				background: none !important;
 				}
 			}
 		}
 	}
 </style>
  -->
  
  <template>
  	<view class="spiritMarketNew newBuGu">
  		<view class="item">
  			<view class="left">
  				<view class="o">
  					<image :src="getImage(item.wisp.previewPhotoUrl)" mode="aspectFit" class="spiritImg"></image>
  				</view>
  				<view class="t"><text class="matchTime">匹配時間：{{item.wisp.startMatchTime}}-{{item.wisp.endMatchTime}}</text></view>
  				<view class="th">
  					<view class="thC">
  						<image src="../../../static/spirit/newCoin.png" mode="aspectFit" class="coinImg"></image>
  						<text class="numberText">x{{item.wisp.costWispCoin}}</text>
  					</view>
  					<view class="thC" @click="showBuyChild(item)">
  						<image src="../../../static/spirit/newC.png" mode="aspectFit" class="coinImg"></image>
  						<text class="numberText">x{{item.wisp.costAccompanyWisp}}</text>
  					</view>
  					<view class="thC" @click="showLandChild(item)">
  						<image src="../../../static/spirit/land.png" mode="aspectFit" class="coinImg"></image>
  						<text class="numberText">x{{item.wisp.growthDays}}</text>
  					</view>
  				</view>
  			</view>
  			<view class="right">
  				<view class="ro">
  					<text class="spiritName">{{item.wisp.name}}</text>
  				</view>
  				<view class="rt">
  					<image class="levelImg" src="../../../static/spirit/levelOne.png" mode="widthFix"
  						v-if="item.wisp.level==1"></image>
  					<image class="levelImg" src="../../../static/spirit/levelTwo.png" mode="widthFix"
  						v-if="item.wisp.level==2"></image>
  					<image class="levelImg" src="../../../static/spirit/levelThree.png" mode="widthFix"
  						v-if="item.wisp.level==3"></image>
  					<image class="levelImg" src="../../../static/spirit/levelFour.png" mode="widthFix"
  						v-if="item.wisp.level==4"></image>
  					<image class="levelImg" src="../../../static/spirit/levelFive.png" mode="widthFix"
  						v-if="item.wisp.level==5"></image>
  					<image class="levelImg" src="../../../static/spirit/level6.png" mode="widthFix"
  						v-if="item.wisp.level==6"></image>
  					<image class="levelImg" src="../../../static/spirit/level7.png" mode="widthFix"
  						v-if="item.wisp.level==7"></image>
  					<image class="levelImg" src="../../../static/spirit/level8.png" mode="widthFix"
  						v-if="item.wisp.level==8"></image>
  				</view>
  				<view class="rth">
  					<text class="rthL">增長能力</text>
  					<text class="rthR">{{item.wisp.growthPercent}}%</text>
  				</view>
  				<view class="rth rtho">
  					<text class="rthL">能力值</text>
  					<text class="rthR">{{item.wisp.minimumValue}}-{{item.wisp.maximumValue}}</text>
  				</view>
  				<view class="rth rtht">
  					<text class="rthL">培養天數</text>
  					<text class="rthR">{{item.wisp.growthDays}}</text>
  				</view>
  				<view class="btnBox">
  				<button class="btn" v-if="item.stage=='TRADING'" @click="goToPay(item)">付款(剩餘59:28)</button>
  				<view class="btnStatus fail" v-if="item.stage=='MATCH_FAIL'"><button class="notStatus">匹配失敗</button></view>
  				<view class="btnStatus" v-if="item.stage=='MATCHING'"><button class="notStatus">等待匹配</button></view>
  				</view>
  			</view>
  		</view>
  	</view>
  </template>
  
  <script>
  	import {
  		globalConfig
  	} from '@/config.js'
  	import {
  		api
  	} from '@/common/api.js'
  	export default {
  		name: 'spiritMarketNew',
  		props: {
  			item: Object,
  			ext: Object
  		},
  		data() {
  			return {
  
  			}
  		},
  		methods: {
			goToPay(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/userPay_new/userPay_new?data=' + item
				})
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
  								imagePath = that.$config.endpoint+imageUrl;								
  							}else{
  								imagePath = that.$config.imageEndpoint+imageUrl
  							}
  							// return this.$config.endpoint + "/" + imageUrl
  						}
  					}
  				}
  				return imagePath
  			},
  	},
}
  </script>
  
  <style lang="less">
  	.spirit_mask {
  		position: fixed;
  		top: 0;
  		left: 0;
  		right: 0;
  		bottom: 0;
  		z-index: 502;
  		background-color: #000;
  		opacity: .8;
  	}
  
  	.newBuGu {
  		width: 100%;
  		height: 100%;
  		display: flex;
  		flex-direction: row;
  		padding-bottom: 20rpx;
  		background-color: #050e17;
  
  		.item {
  			width: 95%;
  			height: 460rpx;
  			border-top: 2rpx solid rgb(50, 71, 137);
  			border-left: 2rpx solid rgb(50, 71, 137);
  			background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
  			border-radius: 8px 8px 8px 8px;
  			margin: 0 auto;
  			display: flex;
  			flex-direction: row;
  
  			.left {
  				margin-top: 24rpx;
  				margin-left: 30rpx;
  				display: flex;
  				flex-direction: column;
  
  				.o {
  					.spiritImg {
  						width: 280rpx;
  						height: 280rpx !important;
  					}
  				}
  
  				.t {
  					display: flex;
  					align-items: center;
  					justify-content: center;
  
  					.matchTime {
  						font-size: 20rpx;
  						font-family: PingFang SC-Regular, PingFang SC;
  						font-weight: 400;
  						color: #c7cbd2;
  					}
  				}
  
  				.th {
  					display: flex;
  					flex-direction: row;
  					align-items: center;
  					justify-content: space-around;
  					margin-top: 16rpx;
  
  					.thC {
  						display: flex;
  						flex-direction: column;
  						flex: 1;
  						align-items: center;
  						justify-content: center;
  
  						.coinImg {
  							width: 40rpx;
  							height: 40rpx !important;
  							margin-bottom: 4rpx;
  						}
  
  						.numberText {
  							font-size: 28rpx;
  							font-family: PingFang SC-Regular, PingFang SC;
  							font-weight: 400;
  							color: #fdfdfd;
  						}
  					}
  				}
  			}
  
  			.right {
  				// width: 288rpx;
  				flex: 1;
  				margin-top: 24rpx;
  				margin-left: 24rpx;
  				display: flex;
  				flex-direction: column;
  
  				.ro {
  
  					// width: 363rpx;
  					.spiritName {
  						font-size: 32rpx;
  						font-family: PingFang SC-Bold, PingFang SC;
  						font-weight: bold;
  						color: #ffffff;
  					}
  				}
  
  				.rt {
  					margin-top: 16rpx;
  
  					.levelImg {
  						width: 134rpx;
  						height: 36rpx !important;
  					}
  				}
  
  				.rth {
  					display: flex;
  					flex-direction: row;
  					align-items: flex-end;
  					justify-content: space-between;
  					padding-bottom: 4rpx;
  					border-bottom: 1rpx solid #444e68;
  					height: 54rpx;
  					margin-right: 15px;
  
  					// width: 326rpx;
  					// flex:1;
  					.rthL {
  						font-size: 12px;
  						font-family: PingFang SC-Regular, PingFang SC;
  						font-weight: 400;
  						color: #c8ccd3;
  					}
  
  					.rthR {
  						font-size: 12px;
  						font-family: PingFang SC-Regular, PingFang SC;
  						font-weight: 400;
  						color: #dcdde2;
  					}
  				}
  
  				.rtho,
  				.rtht {
  					// margin: 0rpx !important;
  				}
  
  				.btnBox {
  					margin-top: 44rpx;
  					// width: 326rpx;
  					margin-right: 30rpx;
  					height: 80rpx;
  					display: flex;
  					align-items: center;
  					justify-content: flex-end;
					
					.btnStatus{
						width: 163px;
						height: 40px;
						box-sizing: border-box; 
						padding: 1px; 
						border-radius: 8px; 
						border: 1px solid;
						background-image: linear-gradient(to right bottom,rgba(147, 49, 245, 1),rgba(11, 149, 255, 1));
						display: flex;
						align-items: center;
						justify-content: center;
						.notStatus{
							border-radius: 8px;
							display: flex;
							align-items: center;
							justify-content: center;
							width: 163px;
							height: 38px;
							border-radius: 15rpx;
							font-size: 16px;
							font-family: PingFang SC-Medium, PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
						}
					}
					.fail{
					padding: 0px !important;
					border: 1px solid #FFFFFF !important;
					background-image:none !important;
					background: none !important;
					}
  
  					.btn {
  						width: 326rpx;
  						height: 80rpx;
  						display: flex;
  						align-items: center;
  						justify-content: center;
  						font-size: 32rpx;
  						font-family: PingFang SC-Medium, PingFang SC;
  						font-weight: 500;
  						color: #ffffff;
  						background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%);
  						border-radius: 16rpx 16rpx 16rpx 16rpx;
  					}
  
  					.father {
  						width: 326rpx;
  						height: 80rpx;
  						opacity: 1;
  						border: 1rpx solid;
  						background-image: linear-gradient(to right, #9331F5, #0B95FF);
  						border-radius: 16rpx 16rpx 16rpx 16rpx;
  						padding: 0.1rpx;
  						color: #ffffff !important;
  
  						.noStatus {
  							width: 326rpx;
  							height: 80rpx;
  							border-radius: 16rpx 16rpx 16rpx 16rpx;
  							display: flex;
  							align-items: center;
  							justify-content: center;
  							background: #172540;
  							font-size: 32rpx;
  							font-family: PingFang SC-Medium, PingFang SC;
  							font-weight: 500;
  							color: #ffffff !important;
  						}
  					}
  
  				}
  			}
  		}
  	}
  </style>
  