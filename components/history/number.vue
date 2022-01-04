<template>
	<view class="number">
		<view class="item">
			<text class="title">推荐积分:</text>
			<text class="num">{{data.recommendPoints}}</text>
		</view>
		<view class="item">
			<text class="title">帮会积分:</text>
			<text class="num">{{data.tradeUnionPoints}}</text>
		</view>
		<view class="item">
			<text class="title">市场积分:</text>
			<text class="num">{{data.marketPoints}}</text>
			<text class="o" @click="forParent">转化精灵令</text>
			<text class="ot" @click="transferSpiritForMarket">转化精灵</text>
		</view>
		<view class="item">
			<text class="title">转存积分:</text>
			<text class="num">{{data.depositPoints}}</text>
			<text class="o" @click="forParentTwo">转化精灵令</text>
			<text class="ot" @click="transferSpiritForDeposi">转化精灵</text>
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
		methods:{
			forParent(){
				this.$emit('forParentClose')
			},
			forParentTwo(){
				this.$emit('forParentCloseTwo')
			},
			transferSpiritForMarket(){
				uni.navigateTo({
					url:'/pages/defaultPage/page?id='+ 11447722
				})
			},
			transferSpiritForDeposi(){
				uni.navigateTo({
					url:'/pages/defaultPage/page?id='+ 22559988
				})
			}
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
			.o,.ot{
				font-size: 30rpx;
				margin-left:30rpx;
				color: rgb(13,116,197);
			}
		}
	}
</style>
