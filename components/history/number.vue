<template>
	<view class="number">
		<view class="item">
			<text class="title">簽到收益:</text>
			<text class="num">{{pSingPoint||0}}</text>
			<text class="o" @click="tiqu">提取</text>
		</view>
		<view class="item">
			<text class="title">推薦收益:</text>
			<text class="num">{{rPoint||0}}</text>
			<text class="o" @click="typeForGUGU(1)">轉化GuGu令</text> 
			<!-- //zhaunhua -->
			<text class="ot" @click="transferSpiritForMarket('recommendCoinCredit')">轉化精靈</text>
			<text class="ott" @click="goToTuiJian">查看明細</text>
		</view>
		<view class="item">
			<text class="title">幫會收益:</text>
			<text class="num">{{tPoint||0}}</text>
			<text class="o" @click="typeForGUGU(2)">轉化GuGu令</text>
			<text class="ot" @click="transferSpiritForMarket('teamBenefits')">轉化精靈</text>
			<text class="ott" @click="goToBangHui">查看明細</text>
		</view>
		<view class="item">
			<text class="title">轉存收益:</text>
			<text class="num">{{tsPonit||0}}</text>
			<text class="o" @click="typeForGUGU(3)">轉化GuGu令</text>
			<text class="ot" @click="transferSpiritForMarket('transferCoinCredit')">轉化精靈</text>
		</view>
		<view class="item">
			<text class="title">市場收益:</text>
			<text class="num">{{mPoint}}</text>
		</view>
		
		<view class="spirit_mask" v-if="isShowToast || isShowIncomeTypeForTransfer"></view>
		<toast v-if="isShowToast" :data="toastMsg" @cancelToast="closeToast"></toast>
		<transferCoin v-if="isShowIncomeTypeForTransfer" @closeCoin="closeType" :type="forChildType" :num="judge"></transferCoin>
	</view>
</template>

<script>
	import toast from '../spirit/toast.vue'
	import transferCoin from './transfercoin.vue'
	export default{
		components:{toast,transferCoin},
		props:{
			data:{
				type:Object
			}
		},
		data(){
			return{
				isShowToast:false,
				toastMsg:'',
				
				isShowIncomeTypeForTransfer:false,
				
				forChildType:0,
				
				
				pSingPoint:0,
				rPoint:0,
				tPoint:0,
				tsPonit:0,
				mPoint:0,
				
				judge:0
			}
		},
		mounted() {
			console.log('---------',this.data)
			this.pSingPoint = this.data.signInCoinCredit
			this.rPoint = this.data.recommendCoinCredit
			this.tPoint = this.data.teamCoinCredit
			this.tsPonit = this.data.transferCoinCredit
			this.mPoint = this.data.marketPoints
			
		},
		methods:{
			toastMsg(){
				uni.showToast({
					title:'收益100起转化',
					icon:'error',
					duration:1000
				})
			},
			typeForGUGU(type){
				if(this.rPoint < 100 ){
					this.toastMsg()
					return
				}
				if(this.tPoint < 100 ){
					this.toastMsg()
					return
				}
				if(this.tsPonit < 100 ){
					this.toastMsg()
					return
				}
				this.forChildType = type
				this.isShowIncomeTypeForTransfer = true
			},
			async closeType(value){
				if(value=='update'){
					const res = await this.$api.getUserWallet()
					console.log(res,'---------------------------------')
					if(res.code == 200){
						this.pSingPoint = res.data.signInCoinCredit
						this.rPoint = res.data.recommendCoinCredit
						this.tPoint = res.data.teamCoinCredit
						this.tsPonit = res.data.transferCoinCredit
						this.mPoint = res.data.marketPoints
						this.isShowIncomeTypeForTransfer = false
						this.$emit('forParentToChangeCoin',res.data.coinsAmount)
					}
				}else{
					this.isShowIncomeTypeForTransfer = false
				}
			},
			typeForRecomment(){
				this.isShowIncomeTypeForTransfer = true
			},
			toast(msg) {
				this.toastMsg = msg
				this.isShowToast = true
			},
			closeToast(){
				this.isShowToast = false
			},
			async zhaunhua(){
				if(this.$cache.get('status') !== 'NORMAL'){
					uni.showToast({
						title:'當前狀态不可用',
						icon:'error',
						duration:1000
					})
					return
				}
				// this.$emit('forParentCloseTwo')
				const res = await this.$api.zhuanhuaType()
				console.log('rrrrr',res)
				if(res.code == 200){
					uni.showToast({
						title:'轉化成功',
						icon:'success',
						duration:1000
					})
				}else{
					uni.showToast({
						title:res.message,
						icon:'error',
						duration:1000
					})
					return
				}
			},
			async zhuancunTwo(){
				if(this.$cache.get('status') !== 'NORMAL'){
					uni.showToast({
						title:'當前狀态不可用',
						icon:'error',
						duration:1000
					})
					return
				}
				const res = await this.$api.zhuanhuaTypeTwo()
				console.log('rrrrr',res)
				if(res.code == 200){
					uni.showToast({
						title:'轉化成功',
						icon:'success',
						duration:1000
					})
				}else{
					uni.showToast({
						title:res.message,
						icon:'error',
						duration:1000
					})
					return
				}
			},
			async zhuancunThree(){
				if(this.$cache.get('status') !== 'NORMAL'){
					uni.showToast({
						title:'當前狀态不可用',
						icon:'error',
						duration:1000
					})
					return
				}
				const res = await this.$api.zhuanhuaTypeThree()
				console.log('rrrrr',res)
				if(res.code == 200){
					uni.showToast({
						title:'轉化成功',
						icon:'success',
						duration:1000
					})
				}else{
					uni.showToast({
						title:res.message,
						icon:'error',
						duration:1000
					})
					return
				}
			},
			async tiqu(){
				console.log('00000000000000000000000000000')
				if(this.$cache.get('status') !== 'NORMAL'){
					uni.showToast({
						title:'當前狀态不可用',
						icon:'error',
						duration:1000
					})
					return
				}
				if(this.pSingPoint < 100){
					uni.showToast({
						title:'收益100起转化',
						icon:'error',
						duration:1000
					})
					return
				}
				let data = {
					 incomeType:"signINProfit",
					 number:this.data.signInCoinCredit
				}
				const res = await this.$api.tiquqiandaoshouyi(data)
				console.log('-------------',res)
				if(res.code == 200){
					uni.showToast({
						title:'提取成功',
						icon:'success',
						duration:1000
					})
				}else{
					uni.showToast({
						title:res.message,
						icon:'error',
						duration:1000
					})
					return
				}
			},
			forParent(){
				// this.$emit('forParentClose')
				uni.request({
					url:'http://api.dev.smallsaas.cn:8087/api/u/player/signInSettlement/signINProfit',
					success: (res) => {
						console.log('res',res)
					}
				})
			},
			goToBangHui(){
				uni.navigateTo({
					url:'/pages/banghuishouyimingxi/banghuishouyimingxi'
				})
			},
			goToTuiJian(){
				uni.navigateTo({
					url:'/pages/tuijianshouyimingxi/tuijianshouyimingxi'
				})
			},
			// forParentTwo(){
			// 	this.$emit('forParentCloseTwo')
			// },
			transferSpiritForMarket(type){
				console.log('------',type)
				uni.navigateTo({
					url:'/pages/defaultPage/page?id='+ 11447722 + '&type=' + type 
				})
			},
			// transferSpiritForDeposi(){
			// 	uni.navigateTo({
			// 		url:'/pages/defaultPage/page?id='+ 22559988
			// 	})
			// }
		}
	}
</script>

<style lang="less">
	.number{
		width: 95%;
		height: 470rpx;
		background: rgb(17,24,30);
		border-radius: 20rpx;
		margin-left: 2.5%;
		margin-top: 50rpx;
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
		.item{
			width: 95%;
			height:60rpx;
			margin-left: 2.5%;
			padding-top: 30rpx;
			display: flex;
			align-items: center;
			.title{
				font-size: 30rpx;
			}
			.num{
				font-size: 30rpx;
				margin-left: 40rpx;
				color: #FFFFFF;
			}
			.o,.ot,.ott{
				font-size: 25rpx;
				margin-left:25rpx;
				color: rgb(13,116,197);
			}
		}
	}
</style>
