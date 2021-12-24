<template>
	<view class="spiritMarket">
		<view class="spiritMarketBox">
			<view class="spiritMarketBoxItem" >
				<view class="spiritMarketBoxItemTop">
					<view class="spiritBox">
						<image class="spiritImg" :src="item.previewPhotoUrl" lazy-load mode="aspectFit"></image>
					</view>
					<view class="spiritInfoBox">
						<view class="spiritTitle"><text>NFT精灵-{{item.name}}</text></view>
						<view class="spiritTwoSideBox">
							<view class="sideLeft">匹配时间：<text>{{item.waitingMatchMinute}}</text></view>
							<view class="sideRight">级别：<text>V{{item.level}}</text></view>
						</view>
						<view class="spiritTwoSideBox">
							<view class="sideLeft">增长能力：<text>{{item.growthPercent}}%</text></view>
							<view class="sideRight">能力值：<text>{{item.capabilityValue}}</text></view>
						</view>
						<view class="spiritTwoSideBox">
							<view class="sideLeft">培养时间：<text>{{item.growthDays}}</text></view>
							<view class="sideRight">匹配消耗精灵令：<text>{{item.costWispCoin}}</text></view>
						</view>
						<view class="spiritTwoSideBox">
							<view class="sideLeft">消耗陪伴精灵：<text>{{item.costAccompanyWisp}}个</text></view>
							<view class="sideRight">匹配需要土地</view>
						</view>
					</view>
				</view>
				<view class="spiritMarketBoxItemBottom">
					<view class="spiritStatus">
						<text @click="book(item)">{{item.stage==null?'可预约':item.stage}}</text>
					</view>
					<view class="spiritBuyBtn" @click="buy(item)">
						购买陪伴精灵
					</view>
					<view class="spiritLandSelect">
						<!-- <select class="selectLand">
							<options value="1" selected="selected" >租用土地</options>
							<options value="2">自用土地</options>
						</select> -->
						<text @click="buyLand(item)">购买土地</text>
					</view>
				</view>
			</view>										
		</view>
		<Window v-if="isCanBook"></Window>
	</view>
</template>

<script>
	import Window from '../../Window.vue'
	import {globalConfig} from '@/config.js'
	import {api} from '@/common/api.js'
	export default {
		name:'spiritMarket',
		props: {
			item: Object,
			ext: Object
		},
		components:{Window},
		data() {
			return {
				isCanBook:false,
				playerId:''
			}
		},
		created() {
			// console.log(api)
			// api.getspiritMarket("/api/crud/oms/wisp/wisps/market","").then(res=>{
			// 	console.log(res)
			// })
			// console.log('asfsafaf',11111111)
			// uni.request({
			// 	url:'http://repo.dev.smallsaas.cn:8084/api/crud/oms/wisp/wisps/market',
			// 	method:'GET',
			// 	header:{
			// 		'Authorization':"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJvcmdJZCI6IjEiLCJ1c2VySWQiOiIxIiwidXNlclR5cGUiOjEwMSwiYlVzZXJUeXBlIjoiU1lTVEVNIiwidGVuYW50T3JnSWQiOjEsImFjY291bnQiOiJhZG1pbiIsImV4dHJhVXNlclR5cGUiOjAsImlhdCI6MTYzOTk5NDE0OSwianRpIjoiMSIsInN1YiI6ImFkbWluIiwiZXhwIjoxNjQwMjUzMzQ5fQ.HY6R-IgAcF8w9jqB9PR8xVQX6QXr0fA--zBlwGKD3vn6lvLJaBYu7dn6wJ7n33rxFVyMJK4EF4TfetioE9kQvg"
			// 	},
			// 	success: (res) => {
			// 		console.log(res,1111)
			// 		this.spiritMarketList = res.data.data.records
			// 		console.log(this.spiritMarketList)
			// 	}
			// })
		},
		methods:{
			 book(item){
				console.log(uni.getStorage({key:"userId"}))
				const user = uni.getStorage({key:"userId"})
				user.then(async userId=>{
					console.log(userId[1].data)
				    this.playerId = userId[1].data
					this.isCanBook = false
					console.log(item)
					if(item.stage == "可预约"){
						this.isCanBook = !this.isCanBook
					}
					console.log(item.id)
					console.log(this.$api)
					const data = {
						wispId:item.id,
						player_id:this.playerId
					}
					const res = await this.$api.bookSpirit(data)
					console.log(res)
					this.isCanBook = !this.isCanBook
					uni.showModal({
						content:'预约成功'
					})
				})
			},
			
			buy(item){
				console.log(uni.getStorage({key:"userId"}))
				const user = uni.getStorage({key:"userId"})
				user.then(async userId=>{
					console.log(userId[1].data)
				    this.playerId = userId[1].data
					console.log(item)
					console.log(item.id)
					console.log(this.$api)
					const data = {
						companionWispId: 0,
						number: 0,
						paymentPassword: "string"
					}
					const res = await this.$api.buyCompanySpirit(data)
					console.log(res)
					uni.showModal({
						content:'购买成功'
					})
				})
			},
			
			buyLand(item){
				console.log(item)
				console.log(uni.getStorage({key:"userId"}))
				const user = uni.getStorage({key:"userId"})
				user.then(async userId=>{
					console.log(userId[1].data)
				    this.playerId = userId[1].data
					console.log(item)
					console.log(item.id)
					console.log(this.$api)
					const data = {
						  contractDays: 2,
						  landId: 1,
						  playerId: this.playerId,
						  totalPrice: 100,
						  start_time:'11',
						  expiration_time:'22'
					}
					const res = await this.$api.buyLand(data)
					console.log(res)
					uni.showModal({
						content:'购买成功'
					})
				})
			}
		}
	}
</script>

<style lang="less">
	.spiritMarket{
		width: 100%;
		height: 100%;
		.spiritMarketBox{
			width: 100%;
			height: 100%;
			background-color: rgb(246,244,252);
			.spiritMarketBoxItem{
					width: 700rpx;
					height: 390rpx;
					background-color: rgba(255, 255, 255, 1);
					border-radius: 10px;
					font-size: 28rpx;
					box-shadow: 0rpx 8rpx 8rpx 0rpx rgba(250, 228, 222, 1);
					padding: 8rpx;
					margin-bottom: 24rpx;
					.spiritMarketBoxItemTop{
						width: 700rpx;
						height: 264rpx;
						display: flex;
						flex-direction: row;
						.spiritBox{
								width: 252rpx;
								height: 250rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								border-radius: 5px;
								border: rgba(166, 166, 166, 1) solid 1px;
								padding: 5rpx;
								.spiritImg{
									width: 242rpx;
									height: 254rpx;
								}
						}
						.spiritInfoBox{
							padding: 0rpx 5rpx;
							width: 448rpx;
							height: 264rpx;
							.spiritTitle{
									width: auto;
									height: 52rpx;
									color: rgba(0, 0, 0, 1);
									font-size: 17px;
									margin-bottom: 10rpx;
									margin-top: 14rpx;
							}
							.spiritTwoSideBox{
								margin-bottom: 8rpx;
								width: 448rpx;
								height: 42rpx;
								display: flex;
								flex-direction: row;
								align-items: center;
								justify-content: space-between;
								color: rgba(0, 0, 0, 1);
								font-size: 28rpx;
								.sideRight{
									margin-right: 14rpx;
								}
							}
						}
					}
					.spiritMarketBoxItemBottom{
						width: 700rpx;
						height: 126rpx;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-around;
						.spiritStatus{
								width: 132rpx;
								height: 50rpx;
								color: rgba(42, 130, 228, 1);
								background-color: rgba(255, 255, 255, 1);
								border-radius: 12rpx;
								font-size: 32rpx;
								border: rgba(42, 130, 228, 1) solid 4rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								// margin: 32rpx 62rpx 30rpx 94rpx;
						}
						.spiritBuyBtn{
								width: 196rpx;
								height: 50rpx;
								color: rgba(42, 130, 228, 1);
								background-color: rgba(255, 255, 255, 1);
								border-radius: 12rpx;
								font-size: 32rpx;
								border: rgba(42, 130, 228, 1) solid 2rpx;
								// margin: 32rpx 62rpx 30rpx 0rpx;
								display: flex;
								align-items: center;
								justify-content: center;
						}
						.spiritLandSelect{
							.selectLand{
									width: 220rpx;
									height: 50rpx;
									color: rgba(42, 130, 228, 1);
									border-color: rgba(42, 130, 228, 1);
							}
						}
					}
			}
		}
	}
</style>
