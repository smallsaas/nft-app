<template>
	<view class="box">
		<view class="item">
			<view class="imgBox">
				<image :src="getImage(item.wisp.previewPhotoUrl)" mode="widthFix" class="img"></image>
			</view>
			<view class="nameBox">
				<text class="name">{{item.wisp.name}}</text>
			</view>
			<view class="levelBox">
				<image class="levelImg" src="../../../static/level/one.png" mode="widthFix"
					v-if="item.wisp.level==1"></image>
				<image class="levelImg" src="../../../static/level/two.png" mode="widthFix"
					v-if="item.wisp.level==2"></image>
				<image class="levelImg" src="../../../static/level/three.png" mode="widthFix"
					v-if="item.wisp.level==3"></image>
				<image class="levelImg" src="../../../static/level/four.png" mode="widthFix"
					v-if="item.wisp.level==4"></image>
				<image class="levelImg" src="../../../static/level/five.png" mode="widthFix"
					v-if="item.wisp.level==5"></image>
				<image class="levelImg" src="../../../static/level/six.png" mode="widthFix"
					v-if="item.wisp.level==6"></image>
				<image class="levelImg" src="../../../static/level/seven.png" mode="widthFix"
					v-if="item.wisp.level==7"></image>
				<image class="levelImg" src="../../../static/level/eight.png" mode="widthFix"
					v-if="item.wisp.level==8"></image>
			</view>
			<view class="infoBox">
				<text class="info">編號：{{item.wispNumber}}</text>
			</view>
			<view class="infoBox infoBoxOne" v-if="item.transactionCoins">
				<text class="info">能力值：{{item.transactionCoins}}</text>
			</view>
			<view class="infoBox infoBoxOne" v-if="item.realtimePrice">
				<text class="info">能力值：{{item.realtimePrice}}</text>
			</view>
			<view class="infoBox infoBoxTwo" v-if="item.createTime && !item.stageChangeTime">
				<text class="info">出售：{{formatTime(item.createTime)}}</text>
			</view>
			<view class="infoBox infoBoxTwo" v-if="item.stageChangeTime">
				<text class="info">出售：{{formatTime(item.stageChangeTime)}}</text>
			</view>
			<view class="infoBox infoBoxThree" v-if="item.buyerName">
				<text class="info">買家：{{item.buyerName}}</text>
			</view>
			<view class="infoBox infoBoxThree" v-if="item.wispOrder">
				<text class="info">買家：{{item.wispOrder.buyerName}}</text>
			</view>
			<view class="line"></view>
			<!-- 精靈副本狀态 
				MATCHING 匹配中
				GROWING 成長中
				SELLING 出售中
				EXPIRED 已過期
				TRADE_FAILED 交易失敗
				TRADING 交易中
				DESTROYED 已銷毀
				SPLIT 已拆分
			 -->
			<!-- 精靈訂單交易狀态 
				WAITING_PAYMENT 等待支付
				PAID 已支付
				PAYMENT_TIMEOUT 支付超時
				RECEIVED 确認收款
				CANCEL 訂單取消
				COMPLAINING 申訴中
			 -->
			<view class="btnBox">
				<text class="timeOne" :class="{sOne:item.stage == 'MATCHING'}" v-if="item.stage == 'MATCHING'">匹配中...</text>
				<text class="timeOne" :class="{sOne:item.stage == 'SELLING'}" v-if="item.stage == 'SELLING'">出售中...</text>
				<text class="timeOne" :class="{sOne:item.stage == 'GROWING'}" v-if="item.stage == 'GROWING'">成長中...</text>
				<text class="timeOne" :class="{sOne:item.stage == 'EXPIRED'}" v-if="item.stage == 'EXPIRED'">已過期</text>
				<!-- <text class="timeOne" :class="{sOne:item.stage == 'TRADE_FAILED'}" v-if="item.stage == 'TRADE_FAILED' ">交易失敗</text> -->
				<!-- <text class="timeOne" :class="{sOne:item.stage == 'TRADING'}" v-if="item.stage == 'TRADING'">對方付款中...</text> -->
				<!-- <text class="timeTwo" :class="{grey:item.stage == 'TRADING'}" v-if="item.stage == 'TRADING'">剩餘付款時間 {{item.remainingMinutes}}分鍾</text> -->
				<text class="timeOne" :class="{sOne:item.stage == 'DESTROYED'}" v-if="item.stage == 'DESTROYED' ">已銷毀</text>
				<text class="timeOne" :class="{sOne:item.stage == 'SPLIT'}" v-if="item.stage == 'SPLIT'">已拆分</text>

				<!-- 當前出售 -->
				<text class="timeOne" :class="{sOne:item.wispOrder.status == 'WAITING_PAYMENT'}" v-if="item.wispOrder && item.wispOrder.status == 'WAITING_PAYMENT'">對方付款中...</text>
				<text class="timeTwo" :class="{grey:item.wispOrder.status == 'WAITING_PAYMENT'}" v-if="item.wispOrder && item.wispOrder.status == 'WAITING_PAYMENT'">剩餘付款時間 {{item.wispOrder.remainingMinutes}} 分鍾</text>
				<text class="timeOne" :class="{sTwo:item.wispOrder.status == 'PAID'}" v-if="item.wispOrder && item.wispOrder.status == 'PAID'">對方已付款</text>
				<text class="timeOne" :class="{sThree:item.wispOrder.status == 'PAYMENT_TIMEOUT'}" v-if="item.wispOrder && item.wispOrder.status == 'PAYMENT_TIMEOUT'">對方未付款</text>
				<text class="timeOne" :class="{sOne:item.wispOrder.status == 'RECEIVED'}" v-if="item.wispOrder && item.wispOrder.status == 'RECEIVED'">已確認收款</text>
				<text class="timeOne" :class="{sOne:item.wispOrder.status == 'CANCEL'}" v-if="item.wispOrder && item.wispOrder.status == 'CANCEL'">訂單取消</text>
				<text class="timeOne" :class="{sOne:item.wispOrder.status == 'COMPLAINING'}" v-if="item.wispOrder && item.wispOrder.status == 'COMPLAINING'">申訴中...</text>
				<text class="timeOne" :class="{sOne:item.status == 'RECEIVED'}" v-if="item.status == 'RECEIVED'">已確認收款</text>
				<text class="timeOne" :class="{sThree:item.status == 'PAYMENT_TIMEOUT'}" v-if="item.status == 'PAYMENT_TIMEOUT'">對方未付款</text>
				<text class="timeOne" :class="{sOne:item.status == 'CANCEL'}" v-if="item.status == 'CANCEL'">訂單取消</text>
			    <button class="btn" v-if="item.wispOrder && item.wispOrder.status == 'PAID'"  @click="goToResive(item.wispOrder.id, item.wispOrder.buyerPhone, item.wispOrder.pictureUrl)">玩家已處理請确認</button>
			</view>
		</view>
		<!-- <toast v-if="isShowToast" :data="toastMsg" @cancelToast="closeToast"></toast> -->
	</view>
</template>

<script>
    import moment from 'moment'
	// import toast from '../../spirit/toast.vue'
	export default {
		props: {
			item: Object,
			ext: Object
		},
		// components:{toast},
		data() {
			return {
				// isShowToast:false,
				// toastMsg:''
				time:''
			}
		},
		created() {
			console
		},
		mounted() {
			
			// console.log('000000000000000 === ', this.item)
			if(this.item.stageChangeTime){
				const split = this.item.stageChangeTime.split('T')
				// console.log('111111111111111',this.item)
				const l = split[0] +  ' ' + split[1]
				this.time = l
			}
			this.status = this.$cache.get('status')
		},
		methods: {
			formatTime(str, format='YYYY-MM-DD HH:mm:ss') {
                if (!str) {
                    return ''
                }
                return moment(str).format(format)
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
						let imageUrl = urlJSON[1].url
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
			goToResive(id,phone,pictrue){
				if(this.$cache.get('status') !== 'NORMAL'){
					uni.showToast({
						title:'當前狀态不可用',
						icon:'error',
						duration:1000
					})
					return
				}
				uni.navigateTo({
					url:'/pages/successGetMoney_new/successGetMoney_new?data=' + id + '&phone=' + phone + '&picture=' + pictrue
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
							if (![undefined, null, ''].includes(that.$config.endpoint)) {
								imagePath = that.$config.endpoint + "/" + imageUrl;
							} else {
								imagePath = that.$config.imageEndpoint + "/" + imageUrl
							}
							// return this.$config.endpoint + "/" + imageUrl
						}
					}
				}
				return imagePath
			}
			// toast(msg) {
			// 	this.toastMsg = msg
			// 	this.isShowToast = true
			// },
			// noMessage(){
			// 	this.toast('功能暫未開放，敬請期待!')
			// },
			// closeToast(){
			// 	this.isShowToast = false
			// }
			
		}
	}
</script>

<style lang="less">
	.box {
		width: 100%;
		height: 100%;
		background: #050E17;
		padding-bottom: 20rpx;
		
		.grey{
			color: rgb(81,101,136) !important;
		}
		
		.sOne{
			color: #FFAD33 !important;
		}
		.sTwo{
			color: #31E4B9 !important;
		}
		.sThree{
			color: #FF3355 !important;
		}

		.item {
			margin: 0rpx auto;
			width: 686rpx;
			height: 470rpx;
			background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
			border-radius: 8px 8px 8px 8px;
			opacity: 1;
			border-top: 2rpx solid rgb(50, 71, 137);
			border-left: 2rpx solid rgb(50, 71, 137);
			position: relative;

			// margin-bottom: 20rpx;
			.imgBox {
				width: 280rpx;
				height: 280rpx;
				border-radius: 0px 0px 0px 0px;
				opacity: 1;
				position: absolute;
				top: 24rpx;
				left: 24rpx;

				.img {
					width: 280rpx;
					height: 280rpx !important;
				}
			}

			.nameBox {
				width: 350rpx !important;
				height: 44rpx;
				position: absolute;
				top: 32rpx;
				left: 328rpx;

				.name {
					font-size: 16px;
					font-family: PingFang SC-Bold, PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
				}
			}

			.levelBox {
				width: 134rpx;
				height: 36rpx !important;
				position: absolute;
				top: 92rpx;
				left: 328rpx;

				.levelImg {
					width: 134rpx;
					height: 36rpx !important;
				}
			}

			.infoBox,
			.infoBoxOne,
			.infoBoxTwo,
			.infoBoxThree {
				width: 350rpx !important;
				height: 34rpx;
				position: absolute;
				top: 148rpx;
				left: 328rpx;

				.info {
					font-size: 12px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}

			.infoBoxOne {
				top: 188rpx;
			}

			.infoBoxTwo {
				position: absolute;
				top: 226rpx !important;
			}

			.infoBoxThree {
				position: absolute;
				top: 264rpx !important;
			}

			.line {
				width: 684rpx;
				height: 2rpx;
				background: linear-gradient(270deg, #182641 0%, #3F547D 49%, #182641 100%);
				border-radius: 0px 0px 0px 0px;
				opacity: 1;
				position: absolute;
				top: 344rpx;
			}

			.btnBox {
				width: 100%;
				height: 142rpx;
				position: absolute;
				bottom: 0rpx;
				position: relative;
				
				.btn{
					width: 160px !important;
					height: 40px !important;
					background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%) !important;
					border-radius: 8px 8px 8px 8px !important;
					opacity: 1;
					position: absolute;
					top: 358rpx !important;
					left: 320rpx !important;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #ffffff;
				}

				.timeOne {
					width: 81px;
					height: 22px;
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFAD33;
					position: absolute;
					top: 388rpx;
					left: 32rpx;
				}

				.timeTwo {
					width: 147px;
					height: 22px;
					font-size: 14px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					position: absolute;
					top: 388rpx;
					left: 360rpx;
				}
			}
		}
	}
</style>
