<template>
	<view class="number">
		<view class="item">
			<text class="title">簽到收益:</text>
			<text class="num">{{data.signBallance||0}}</text>
			<text class="o" @click="tiqu">提取</text>
		</view>
		<view class="item">
			<text class="title">推薦收益:</text>
			<text class="num">{{data.inviting||0}}</text>
			<text class="o" @click="typeForGUGU('levelShare')">轉化GuGu令</text> 
			<!-- //zhaunhua -->
			<text class="ot" @click="transferSpiritForMarket('levelShare')">轉化精靈</text>
			<text class="ott" @click="goToTuiJian">查看明細</text>
		</view>
		<view class="item">
			<text class="title">幫會收益:</text>
			<text class="num">{{data.teamBallance||0}}</text>
			<text class="o" @click="typeForGUGU('teamBenefits')">轉化GuGu令</text>
			<text class="ot" @click="transferSpiritForMarket('teamBenefits')">轉化精靈</text>
			<text class="ott" @click="goToBangHui">查看明細</text>
		</view>
		<view class="item">
			<text class="title">轉存收益:</text>
			<text class="num">{{data.depositPoints||0}}</text>
			<text class="o" @click="typeForGUGU('redepositBallance')">轉化GuGu令</text>
			<text class="ot" @click="transferSpiritForMarket('redepositBallance')">轉化精靈</text>
		</view>
		<view class="item">
			<text class="title">市場收益:</text>
			<text class="num">{{data.depositPoints||0}}</text>
		</view>
		
		<view class="spirit_mask" v-if="isShowToast || isShowIncomeTypeForTransfer"></view>
		<toast v-if="isShowToast" :data="toastMsg" @cancelToast="closeToast"></toast>
		<transferCoin v-if="isShowIncomeTypeForTransfer" @closeCoin="closeType" :type="forChildType"></transferCoin>
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
				
				forChildType:''
			}
		},
		mounted() {
			console.log('---------',this.data)
			
		},
		methods:{
			typeForGUGU(type){
				this.forChildType = type
				this.isShowIncomeTypeForTransfer = true
			},
			closeType(){
				this.isShowIncomeTypeForTransfer = false
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
				if(this.$cache.get('status') !== 'NORMAL'){
					uni.showToast({
						title:'當前狀态不可用',
						icon:'error',
						duration:1000
					})
					return
				}
				const res = await this.$api.tiquqiandaoshouyi()
				console.log('-------------',res)
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
