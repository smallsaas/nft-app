
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
  				<button class="btn" v-if="item.status=='WAITING_PAYMENT' && item.currentPlayerIsBuyer==true" @click="goToPay(item)">待付款(剩餘59:28)</button>
				<view class="btnStatus fail" v-if="item.status=='WAITING_PAYMENT' && item.currentPlayerIsBuyer==false"><button class="notStatus">等待买家付款</button></view>
  				<view class="btnStatus fail" v-if="item.status=='PAID'"><button class="notStatus">已付款</button></view>
  				<view class="btnStatus" v-if="item.status=='PAYMENT_TIMEOUT'"><button class="notStatus">付款超时</button></view>
				<view class="btnStatus" v-if="item.status=='RECEIVED'"><button class="notStatus">已确认收款</button></view>
				<view class="btnStatus" v-if="item.status=='COMPLAINING'"><button class="notStatus">申诉中</button></view>
				<view class="btnStatus" v-if="item.status=='CANCEL'"><button class="notStatus">已取消</button></view>
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
					url:'/pages/userPay_new/userPay_new?data=' + item.id
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
  