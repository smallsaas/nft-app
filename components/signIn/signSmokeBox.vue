<template>
	<view>
		<view class="signSmoke-tips">
			{{month}}月已簽到<text class="signSmoke-tips-day">{{signDay}}</text>天
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
				if(this.packText === "查看全部獎勵"){
					return "small"
				}else{
					return ''
				}
			},
			isSign(){
				if(this.sign){
					this.signText="已簽到"
					this.signImage="/static/signSmoke/signedIn.png"
					this.$forceUpdate()
					return "sign"
				}else{
					this.signText="簽到抽盒"
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
				packText:"查看全部獎勵",
				packIcon:"/static/signSmoke/more.png",
				signText:"簽到抽盒",
				signImage:"/static/signSmoke/gift.png",
				sign:false,
				month:0,
				signDay:0,
				dayGroup:[],
				listGroup:[
					
				],
				nowGroup:[],
				isSignGroup:{}
			};
		},
		props:{
			signData:{
				type:Object,
				default:{}
			}
		},
		async created() {
			uni.showLoading({
				title:"獲取簽到數據中"
			})
			console.log(this.signData,"signData")
			this.listGroup = this.signData.list
			this.sign = this.signData.isSign
			this.signDay = this.signData.day||0
			this.getMonth()
			this.getNowGroup()
			this.dayGroup = this.nowGroup
			let that = this
			let signMes = await this.$api.getSignMes({month:this.getMonth()})
			console.log(signMes)
			if(signMes.data.records){
				let records = signMes.data.records
				let today = this.getToday()
				console.log(records,"RECORDS",today)
				let find = records.find(item=>item.signDate === today)
				console.log(find,"FIND")
				if(![[],'',undefined,null].includes(find)){
					this.sign = true
					let today = this.fetchDay(find.signDate)
					for(var i in records){
						let item = records[i]
						if(that.fetchDay(item.signDate)<=today){
							that.isSignGroup[that.fetchDay(item.signDate)] = true
						}
					}
				}
			}
			uni.hideLoading()
		},
		methods:{
			fetchDay(date){
				return date.split('-')[2]
			},
			getMonth(){
				let date = new Date()
				this.month = date.getMonth()+1
			},
			getToday(){
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth()+1<10?`0${date.getMonth()+1}`:date.getMonth()+1
				let day = date.getDate()<10?"0"+date.getDate():date.getDate()
				return year+"-"+month+"-"+day
			},
			// 補簽事件
			handleFill(){
				console.log("補簽！")
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
			// 收起時操作
			handlePack(){
				if(this.packText === "收起"){
					this.packText = "查看全部獎勵"
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
			// 簽到事件
			async handleSign(){
				console.log("簽到！")
				this.sign = true
				let res = await this.$api.sign()
				if(res.code === 200){
					uni.showToast({
						title:"簽到成功",
						icon:'success'
					})
				}else{
					uni.showToast({
						title:"簽到失敗",
						icon:"error"
					})
				}
				
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
