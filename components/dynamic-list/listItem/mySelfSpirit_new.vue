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
			<view class="infoBox infoBoxOne" v-if="item.coinsPrice">
				<text class="info">領養能力值：{{item.coinsPrice}}</text>
			</view>
			<view class="infoBox infoBoxFour">
				<text class="info">當前能力值：{{item.realtimePrice}}</text>
			</view>
			<view class="infoBox infoBoxFive" style="display: flex; flex-direction: row; align-items: center;">
				<text class="info">産生收益：</text><view style="color: #FF0000;font-size: 13px;">{{item.realtimePrice-item.coinsPrice}}</view>
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
			<view class="infoBox infoBoxSix" v-if="item.wispOrder && item.wispOrder.status == 'PAID'">
				<text class="info">剩餘時間：{{item.wispOrder.remainingConfirmReceivedMinutes}} 分鐘</text>
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
				<text class="timeOne" :class="{sOne:item.stage == 'SELLING'}" v-if="item.stage == 'SELLING'">待出售...</text>
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
			    <button class="btn" v-if="item.wispOrder && item.wispOrder.status == 'PAID'" @click="goToResive(item.wispOrder.id, item.wispOrder.buyerPhone, item.wispOrder.pictureUrl, item.wispOrder.buyerName)">玩家已處理請确認</button>
			    <button class="complainhistoryBtn" v-if="item.wispOrder && item.wispOrder.status == 'COMPLAINING'" @click="goToComplainhistoryDetail(item.wispOrder.id)">申訴結果</button>
			    <button class="complainConfirmPayBtn" v-if="item.wispOrder && item.wispOrder.status == 'COMPLAINING'" @click="complainConfirmPayBtnModal()">撤訴并确認收款</button>
			</view>
		</view>
		
		<!-- 提示組件 -->
		<!-- <toast v-if="isShowToast" :data="toastMsg" @cancelBtn="toastCloseBtn" @okBtn="toastOkBtn"></toast> -->
		
		<!-- 提示密碼輸入框 -->
		<view v-if="isModal">
			<view class="Modal-mask"></view>
			<view class="Modal-Content">
				<view class="Modal-window">
					<view class="Modal-title">支付密码</view>
					<view class="Modal-ContentBox">
						<view v-for="(item,i) in components" :key="i">
							<view :class="isFocus===i?'focus Modal-ContentBox-InputBox':'Modal-ContentBox-InputBox'">
								<input placeholder="请输入"  class="Modal-ContentBox-Input" type="password" @input="(e)=>handleFieldChange(item.field,e)" @focus="handleFocus(i)" @blur="handleBlur()"/>
							</view>
						</view>
					</view>
					<view class="password-Box">
						
					</view>
					<view class="Modal-ButtonGroup">
						<pretty-button class="Modal-btn" borderRadius="8rpx" type="gray" borderType="gray" :text="'取消'" @click="hideModal()"></pretty-button>
						<pretty-button class="Modal-btn" borderRadius="8rpx" :text="'确定'" @click="modalOkBtn()"></pretty-button>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
    import moment from 'moment'
	//溫馨提示
	// import toast from '@/components/toast.vue'
	// import toast from '../../spirit/toast.vue'
	export default {
		props: {
			item: Object,
			ext: Object
		},
		components:{
			// toast
		},
		data() {
			return {
				isShowToast:false,
				time:'',
				isModal:false,
				components:[
					{"type":"password","label":"請輸入支付密碼","field":"paymentPassword"}
				],
				isFocus:-1,
				formData:{},
			}
		},
		created() {
			
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
			goToResive(id,phone,pictrue, buyerName){
				if(this.$cache.get('status') !== 'NORMAL'){
					uni.showToast({
						title:'當前狀态不可用',
						icon:'error',
						duration:1000
					})
					return
				}
				uni.navigateTo({
					url:'/pages/successGetMoney_new/successGetMoney_new?data=' + id + '&phone=' + phone + '&picture=' + pictrue + '&buyerName='+buyerName
				})
			},
			goToComplainhistoryDetail(id){
				uni.navigateTo({
					url: '/pages/complainhistorydetail/complainhistorydetail?complainId=' + id
				})
			},
			getImage(url) {
				// console.log(this.$config)
				let that = this
				let imagePath;
				if (url.indexOf("http" || "https") === 0) {
					imagePath = url
				} else {
					// console.log(url.indexOf("["))
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
			},
			async complainConfirmPayBtn(){
				
				const complainId = this.item.wispOrder.id
				const data= this.formData
				const res = await this.$api.complainConfirmPay(data, complainId)
				if(res.code == 200){
					uni.showToast({
						title:'提取成功',
						icon:'success',
						duration:1500
					})
					this.isModal = false
					this.$emit('updateRecords', '')
				}else{
					uni.showToast({
						title:res.message,
						icon:'none',
						duration:1500
					})
				}
			},
			complainConfirmPayBtnModal() {
				this.isModal = true
			},
			hideModal() {
				this.isModal = false
			},
			modalOkBtn() {
				this.complainConfirmPayBtn()
			},
			// 字段改變時
			handleFieldChange(field,value){
				this.formData[field] = value.target.value
			},
			handleFocus(i){
				this.isFocus = i
			},
			handleBlur(){
				this.isFocus = -1
			},
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
			height: 548rpx;
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
			.infoBoxThree,
			.infoBoxFour,
			.infoBoxFive,
			.infoBoxSix {
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

			.infoBoxFour {
				position: absolute;
				top: 226rpx !important;
			}

			.infoBoxFive {
				position: absolute;
				top: 278rpx !important;
			}
			
			.infoBoxTwo {
				position: absolute;
				top: 308rpx !important;
			}

			.infoBoxThree {
				position: absolute;
				top: 344rpx !important;
			}
			
			.infoBoxSix{
				position: absolute;
				top: 386rpx !important;
			}

			.line {
				width: 684rpx;
				height: 2rpx;
				background: linear-gradient(270deg, #182641 0%, #3F547D 49%, #182641 100%);
				border-radius: 0px 0px 0px 0px;
				opacity: 1;
				position: absolute;
				top: 438rpx;
			}

			.btnBox {
				width: 100%;
				height: 142rpx;
				position: absolute;
				bottom: 0rpx;
				position: relative;
				
				.btn{
					width: 165px !important;
					height: 40px !important;
					background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%) !important;
					border-radius: 8px 8px 8px 8px !important;
					opacity: 1;
					position: absolute;
					top: 450rpx !important;
					left: 320rpx !important;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #ffffff;
				}
				
				.complainhistoryBtn{
					width: 88px !important;
					height: 40px !important;
					background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%) !important;
					border-radius: 8px 8px 8px 8px !important;
					opacity: 1;
					position: absolute;
					top: 450rpx !important;
					left: 200rpx !important;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #ffffff;
				}
				
				.complainConfirmPayBtn{
					width: 135px !important;
					height: 40px !important;
					background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%) !important;
					border-radius: 8px 8px 8px 8px !important;
					opacity: 1;
					position: absolute;
					top: 450rpx !important;
					left: 400rpx !important;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;
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
					top: 466rpx;
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
					top: 424rpx;
					left: 360rpx;
				}
			}
		}
	}
	
	.Modal-mask{
		background: #000;
		opacity: .8;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
	}
	
	.Modal-Content{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		justify-content: center;
		align-items: center;
		display: flex;
		z-index: 1001;
	}
	.Modal-title{
		font-size: 36rpx;
		color: #FFFFFF;
		margin-bottom: 24rpx;
	}

	.Modal-window{
		background-color: #192746;
		width: 70%;
		display: flex;
		flex-direction: column;
		// height: 500px;
		padding: 48rpx;
		border-radius: 16rpx;
		box-shadow: inset 2rpx 2rpx 0rpx 2rpx #23335E;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.Modal-ContentBox{
		width: 100%;
	}
	
	.Modal-ContentBox-InputBox{
		background-color: #363F4C;
		padding: 2rpx;
		border-radius: 8rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 16rpx;
		position: relative;
	}
	.focus{
		background: linear-gradient(90deg, #9331F5 0%, #0A95FF 100%);
	}
	.Modal-ContentBox-Input{
		width: 100%;
		background-color: #131D33;
		padding: 18rpx 24rpx;
		border-radius: 8rpx;
	}
	.Modal-ContentBox-code{
		color: #33A7FF;
		position: absolute;
		right: 20rpx;
		z-index: 5000;
		font-size: 28rpx;
		cursor: pointer;
	}
	.unPush{
		color: #7F8798;
	}
	.Modal-ButtonGroup{
		width: 100%;
		// height: 176rpx;
		margin-top: 16rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-top: 2rpx solid;
		// padding-top: 48rpx;
		border-image: linear-gradient(270deg, #182641 0%, #3F547D 49%, #182641 100%) 20;
		box-shadow: 0px -2px 10px 0px #172240;
		padding: 48rpx 48rpx 0 48rpx;
	}
	.Modal-btn{
		// width: 90%;
		margin: 0 24rpx 0 0;
		flex: 1;
		height: 80rpx;
	}
	.Modal-btn:last-child{
		margin: 0;
	}
	
	
</style>
