<template>
	<view class="number">
		<view class="item">
			<text class="title">簽到收益:</text>
			<text class="num">{{data.signBallance}}</text>
			<text class="o" @click="a">提取</text>
		</view>
		<view class="item">
			<text class="title">推薦收益:</text>
			<text class="num">{{data.inviting}}</text>
			<text class="o" @click="forParent">轉化GuGu令</text>
			<text class="ot" @click="transferSpiritForMarket">轉化精靈</text>
			<text class="ott" @click="transferSpiritForMarket">查看明細</text>
		</view>
		<view class="item">
			<text class="title">幫會收益:</text>
			<text class="num">{{data.teamBallance}}</text>
			<text class="o" @click="forParent">轉化GuGu令</text>
			<text class="ot" @click="transferSpiritForMarket">轉化精靈</text>
			<text class="ott" @click="transferSpiritForMarket">查看明細</text>
		</view>
		<view class="item">
			<text class="title">轉存收益:</text>
			<text class="num">{{data.depositPoints}}</text>
			<text class="o" @click="forParentTwo">轉化GuGu令</text>
			<text class="ot" @click="transferSpiritForDeposi">轉化精靈</text>
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
			console.log('---------')
			
		},
		methods:{
			a(){
				uni.request({
					url:'http://api.dev.smallsaas.cn:8087/api/u/player/signInSettlement/signINProfit',
					success: (res) => {
						console.log('res',res)
					}
				})
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
			// forParentTwo(){
			// 	this.$emit('forParentCloseTwo')
			// },
			// transferSpiritForMarket(){
			// 	uni.navigateTo({
			// 		url:'/pages/defaultPage/page?id='+ 11447722
			// 	})
			// },
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
		height: 390rpx;
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
