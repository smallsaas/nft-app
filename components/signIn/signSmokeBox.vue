<template>
	<view>
		<view class="signSmoke-tips">
			{{month}}月已签到<text class="signSmoke-tips-day">{{signDay}}</text>天
		</view>
		<view class="signSmoke-list">
			<view v-for="(item,index) in dayGroup" :key="index" :class="'signSmoke-signItem '+ispack">
				<sign-item :item="item" @fill="handleFill"></sign-item>
			</view>
		</view>
		<view :class="'signSmoke-pack '+ispack" @click="handlePack()">
			<view>{{packText}}</view>
			<image src="/static/signSmoke/pushup.png" class="signSmoke-pack-icon" v-show="packIcon==='/static/signSmoke/pushup.png'"></image>
			<image src="/static/signSmoke/more.png" class="signSmoke-pack-icon" v-show="packIcon==='/static/signSmoke/more.png'"></image>
		</view>
		<view :class="'signSmoke-sign '+isSign" @click="handleSign">
			<view class="signSmoke-signIn">
				<view class="signSmoke-signIn-Box">
					<view class="signSmoke-signIn-Button">
						<image :src="signImage" fade-show class="signSmoke-signIn-Button-image"></image>
						<view class="signSmoke-signIn-Button-text">{{signText}}</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import signItem from './signItem.vue'
	export default {
		name:"signSmokeBox",
		components:{
			signItem
		},
		computed:{
			ispack(){
				if(this.packText === "查看全部奖励"){
					return "small"
				}else{
					return ''
				}
			},
			isSign(){
				if(this.sign){
					this.signText="已签到"
					this.signImage="/static/signSmoke/已签到.png"
					this.$forceUpdate()
					return "sign"
				}else{
					this.signText="签到抽盒"
					this.signImage="/static/signSmoke/gift.png"
					this.$forceUpdate()
					return ""
				}
			},
			// isIcon(){
			// 	if(this.packText === "收起"){
			// 		this.packIcon = "/static/signSmoke/more.png"
			// 		return this.packIcon
			// 	}else{
			// 		this.packIcon = "/static/signSmoke/pushup.png"
			// 		return this.packIcon
			// 	}
			// }
		},
		data() {
			return {
				packText:"查看全部奖励",
				packIcon:"/static/signSmoke/more.png",
				signText:"签到抽盒",
				signImage:"/static/signSmoke/gift.png",
				sign:false,
				month:0,
				signDay:0,
				dayGroup:[],
				listGroup:[
					
				],
				nowGroup:[]
			};
		},
		props:{
			signData:{
				type:Object,
				default:{}
			}
		},
		created() {
			console.log(this.signData,"signData")
			this.listGroup = this.signData.list
			this.sign = this.signData.isSign
			this.signDay = this.signData.day||0
			this.getMonth()
			this.getNowGroup()
			this.dayGroup = this.nowGroup
		},
		methods:{
			getMonth(){
				let date = new Date()
				this.month = date.getMonth()+1
			},
			// 补签事件
			handleFill(){
				console.log("补签！")
			},
			getNowGroup(){
				let that = this
				this.listGroup.map((item,i)=>{
					if(item.status === "today"){
						that.nowGroup = []
						if(item.day/9<=1){
							that.nowGroup = that.listGroup.slice(0,9)
						}else if(item.day/12<=2&&item.day/9>1){
							that.nowGroup = that.listGroup.slice(9,18)
						}else if(item.day/12<=3&&item.day/9>2){
							that.nowGroup = that.listGroup.slice(18,27)
						}else if(item.day/12<=4&&item.day/9>3){
							that.nowGroup = that.listGroup.slice(27,31)
						}
					}
				})
			},
			// 收起时操作
			handlePack(){
				if(this.packText === "收起"){
					this.packText = "查看全部奖励"
					this.getNowGroup()
					this.dayGroup = this.nowGroup
					this.packIcon = "/static/signSmoke/more.png"
				}else{
					this.packText = "收起"
					this.dayGroup = this.listGroup
					this.packIcon = "/static/signSmoke/pushup.png"
				}
				this.$forceUpdate()
			},
			// 签到事件
			handleSign(){
				console.log("签到！")
				this.sign = true
			}
		}
	}
</script>

<style scoped>
	page{
		padding: 0;
		margin: 0;
		background-color: #050E17;
	}
	@keyframes packUp{
		from{
			opacity: 0;
			transform: translateY(-300rpx);
		}
		to{
			opacity: 1;
			transform: translateY(0rpx);
		}
	}
	@keyframes unWind{
		from{
			opacity: 0;
			transform: translateY(-300rpx);
		}
		to{
			opacity: 1;
			transform: translateY(0rpx);
		}
	}
	@keyframes rotate{
		from{
			transform: rotate(0deg);
			background: linear-gradient(left,#9533FB,#0A84E3);
			opacity: 0;
		}
		to{
			transform: rotate(360deg);
			background: linear-gradient(left,#9533FB,#0A84E3);
			opacity: 1;
		}
	}
	.signSmoke-tips{
		color: #BCBFC1;
		padding-top: 30rpx;
		padding-left: 20rpx;
		font-size: 40rpx;
	}
	.signSmoke-tips-day{
		font-size: 50rpx;
		color: #0B9BFF;
		margin: 0rpx 20rpx;
	}
	.signSmoke-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		margin-top: 20rpx;
	}
	.signSmoke-signItem{
		width: 33.33333%;
		justify-content: center;
		display: flex;
		margin-bottom: 20rpx;
		animation: packUp .2s linear;
	}
	.small{
		animation: unWind .2s linear;
	}
	.signSmoke-pack{
		color: #63696F;
		text-align: center;
		margin: 20rpx 0;
		animation: packUp .2s linear;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.signSmoke-sign{
		height: 250rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.signSmoke-signIn{
		background: linear-gradient(left,#9533FB,#0A84E3);
		width: 220rpx;
		height: 220rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.signSmoke-signIn-Box{
		background: #050E17;
		width: 215rpx;
		height: 215rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.signSmoke-pack-icon{
		width: 50rpx;
		height: 50rpx;
	}
	.signSmoke-signIn-Button{
		background: linear-gradient(left,#9533FB,#0A84E3);
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.signSmoke-signIn-Button-image{
		width: 50rpx;
		height: 50rpx;
	}
	.signSmoke-signIn-Button-text{
		color: #ffffff;
		padding-top: 20rpx;
	}
	.sign .signSmoke-signIn{
		background: #464C53!important;
		animation: rotate .5s linear;
	}
	.sign .signSmoke-signIn-Button{
		background: #050E17!important;
		border: 2rpx solid #50565D!important;
	}
	.sign .signSmoke-signIn-Button-text{
		color: #52585F;
	}
</style>
