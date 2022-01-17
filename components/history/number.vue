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
			<text class="o" @click="zhaunhua">轉化GuGu令</text>
			<text class="ot" @click="transferSpiritForMarket">轉化精靈</text>
			<text class="ott" @click="goToTuiJian">查看明細</text>
		</view>
		<view class="item">
			<text class="title">幫會收益:</text>
			<text class="num">{{data.teamBallance||0}}</text>
			<text class="o" @click="zhuancunTwo">轉化GuGu令</text>
			<text class="ot" @click="transferSpiritForMarket">轉化精靈</text>
			<text class="ott" @click="goToBangHui">查看明細</text>
		</view>
		<view class="item">
			<text class="title">轉存收益:</text>
			<text class="num">{{data.depositPoints||0}}</text>
			<text class="o" @click="zhuancunThree">轉化GuGu令</text>
			<text class="ot" @click="transferSpiritForDeposi">轉化精靈</text>
		</view>
		<view class="item">
			<text class="title">市场收益:</text>
			<text class="num">{{data.depositPoints||0}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			data:{
				type:Object
			}
		},
		mounted() {
			console.log('---------',this.data)
			
		},
		methods:{
			async zhaunhua(){
				if(this.$cache.get('status') !== 'NORMAL'){
					uni.showToast({
						title:'当前状态不可用',
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
						title:'当前状态不可用',
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
						title:'当前状态不可用',
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
						title:'当前状态不可用',
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
			transferSpiritForMarket(){
				uni.navigateTo({
					url:'/pages/defaultPage/page?id='+ 11447722
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
				margin-left: 80rpx;
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
