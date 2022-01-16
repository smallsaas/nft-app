<template>
	<view class="view">
		<view class="item" v-for="(item,index) in list" :key="index">
			<text class="name">{{item.profitName}}</text>
			<text class="names">精靈昵稱</text>
			<text class="namess">精靈金額</text>
			<text class="namesss">收益:{{item.profitMoney}}</text>
			<text class="namessss">{{item.settlementTime}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			async load(){
				const res = await this.$api.checkB()
				console.log('--------')
				console.log(res)
				if(res.code == 200){
					this.list = res.data
				}
			}
		}
	}
</script>

<style lang="less">
.view{
	width: 100%;
	height: 100vh;
	.item{
		background: #11181E;
		margin-top: 20rpx;
		border-radius: 8px;
		margin: 0 auto;
		width: 90%;
		height: 180rpx;
		position: relative;
		margin-bottom: 20rpx;
		.name{
			font-size: 14px;
			margin-left: 10rpx;
		}
		.names{
			position: absolute;
			font-size: 14px;
			top: 25px;
			left: 5px;
		}
		.namess{
			position: absolute;
			font-size: 14px;
			top: 25px;
			left: 105px;
		}
		.namesss{
			position: absolute;
			font-size: 14px;
			top: 45px;
			left: 5px;
		}
		.namessss{
			position: absolute;
			font-size: 14px;
			top: 65px;
			left: 195px;
		}
	}
}
</style>
