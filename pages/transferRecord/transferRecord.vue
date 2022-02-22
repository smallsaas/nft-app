<template>
	<view class="view">
		<view class="item" v-for="(item,index) in list" :key="index">
			<text class="name">{{item.revenueName}}</text>
			<text class="namesss">+{{item.profitMoney}}</text>
			<text class="namessss">{{item.orderTime}}</text>
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
				const res = await this.$api.getTransferRecord()
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
		height: 150rpx;
		position: relative;
		margin-bottom: 20rpx;
		.name{
			font-size: 14px;
			margin-left: 15rpx;
			font-size: 30rpx;
			position: absolute;
			top: 5px;
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
			top: 5px;
			right: 15px;
			font-size: 40rpx;
			font-weight: bold;
			color: #ffffff;
		}
		.namessss{
			position: absolute;
			font-size: 14px;
			top:45px;
			left: 200px;
		}
	}
}
</style>
