<template>
	<view class="spiritMarketNew newBuGu">
		<view class="item">
			<view class="left">
				<view class="o">
					<image :src="getImage(item.previewPhotoUrl)" mode="aspectFit" class="spiritImg"></image>
				</view>
				<view class="t"><text class="matchTime">匹配時間：{{item.startMatchTime}}-{{item.endMatchTime}}</text></view>
				<view class="th">
					<view class="thC">
						<image src="../../../static/spirit/newCoin.png" mode="aspectFit" class="coinImg"></image>
						<text class="numberText">x{{item.costWispCoin}}</text>
					</view>
					<view class="thC">
						<image src="../../../static/spirit/newC.png" mode="aspectFit" class="coinImg"></image>
						<text class="numberText">x{{item.costAccompanyWisp}}</text>
					</view>
					<view class="thC">
						<image src="../../../static/spirit/land.png" mode="aspectFit" class="coinImg"></image>
						<text class="numberText">x{{item.growthDays}}</text>
					</view>
				</view>
			</view>
			<view class="right">
				<view class="ro">
					<text class="spiritName">{{item.name}}</text>
				</view>
				<view class="rt">
					<image class="levelImg" src="../../../static/level/one.png" mode="widthFix"
						v-if="item.level==1"></image>
					<image class="levelImg" src="../../../static/level/two.png" mode="widthFix"
						v-if="item.level==2"></image>
					<image class="levelImg" src="../../../static/level/three.png" mode="widthFix"
						v-if="item.level==3"></image>
					<image class="levelImg" src="../../../static/level/four.png" mode="widthFix"
						v-if="item.level==4"></image>
					<image class="levelImg" src="../../../static/level/five.png" mode="widthFix"
						v-if="item.level==5"></image>
					<image class="levelImg" src="../../../static/level/six.png" mode="widthFix"
						v-if="item.level==6"></image>
					<image class="levelImg" src="../../../static/level/seven.png" mode="widthFix"
						v-if="item.level==7"></image>
					<image class="levelImg" src="../../../static/level/eight.png" mode="widthFix"
						v-if="item.level==8"></image>
				</view>
				<view class="rth">
					<text class="rthL">增長能力</text>
					<text class="rthR">{{item.growthPercent}}%</text>
				</view>
				<view class="rth rtho">
					<text class="rthL">能力值</text>
					<text class="rthR">{{item.minimumValue}}-{{item.maximumValue}}</text>
				</view>
				<view class="rth rtht">
					<text class="rthL">培養天數</text>
					<text class="rthR">{{item.growthDays}}</text>
				</view>
				<view class="btnBox">
					<pretty-button class="btn"  text="轉化" @click="changeSpirit(item.id)"></pretty-button>
					<!-- <pretty-button class="btn" @click="operation(item)" v-if="item.stage=='BOOKABLE' || item.stage=='GROWING'" text="馬上預約" ></pretty-button>
					<pretty-button class="btn" v-if="item.stage=='WAITING_MATCH' || item.stage=='WAITING_FOR_PAYMENT' || item.stage=='DISALLOW_BOOK'"  type="hollow"  text="已預約"></pretty-button>
					<pretty-button class="btn" v-if="item.stage=='END_OF_MATCH'"  type="hollow"  text="預約結束"></pretty-button> -->
					<!-- <pretty-button class="btn" v-if="item.stage=='DISALLOW_BOOK'" type="hollow" text="不可預約"></pretty-button> -->
					<!-- <pretty-button class="btn" v-if="item.stage=='END_OF_MATCH'"  type="hollow"  text="匹配結束"></pretty-button> -->
					<!-- <pretty-button class="btn" @click="operation(item)" v-if="item.stage=='GROWING'"  type="hollow"  text="馬上預約"></pretty-button> -->
					<!-- <pretty-button class="btn" v-if="item.stage!=='WAITING_MATCH' && item.stage!=='BOOKABLE'"  type="hollow"  text="匹配中"></pretty-button> -->
					<!-- <pretty-button class="btn" v-if="item.stage=='WAITING_FOR_PAYMENT'"  type="hollow"  text="待支付"></pretty-button> -->
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
		created() {
			console.log('00000000000000',this.$cache.get('status'))
			this.status = this.$cache.get('status')
			console.log('rrrrrrrrrrrrrr',this.$route.query.type,'eeeeeeeeeeeeeeeeeee')
		},
		data() {
			return {
				status:'',

			}
		},
		methods: {
			msg(code,message){
				if(code == 200){
					uni.showToast({
						title:'轉化成功',
						icon:'success',
						duration:1000
						
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:"/pages/defaultPage/page?id=" + 999666 + '&success=' + 1
						})
					},1000)
				}else{
					uni.showToast({
						title:message,
						icon:'error',
						duration:1000
						
					})
				}
			},
			async changeSpirit(id){	
				let pages = getCurrentPages()
				let nowPage = pages[pages.length-1];
				let params = nowPage.options
				console.log(params,"PAGES")//頁面詳細信息
				if(params.type == "recommendCoinCredit"){
					console.log('1')
					const data = {
						incomeType:params.type,
						wispId:id
					}
					const res = await this.$api.tuijianforspirit(data)
					console.log('res',res)
					this.msg(res.code,res.message)
				}else if(params.type == "teamCoinCredit"){
					console.log('2')
					const data = {
						incomeType:params.type,
						wispId:id
					}
					const res = await this.$api.tuijianforspirit(data)
					console.log('res',res)
					this.msg(res.code,res.message)
				}else if(params.type == "transferCoinCredit"){
					console.log('3')
					const data = {
						incomeType:params.type,
						wispId:id
					}
					const res = await this.$api.tuijianforspirit(data)
					console.log('res',res)
					this.msg(res.code,res.message)
				}
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
								imagePath = that.$config.imageEndpoint +imageUrl
							}
							// return this.$config.endpoint + "/" + imageUrl
						}
					}
				}
				return imagePath
			},
		}
	}
</script>

<style lang="less">
	.list_content{
		display: none !important;
		opacity: 0 !important;
	}
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
		padding-top: 20rpx;
		// padding-bottom: 20rpx;
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
