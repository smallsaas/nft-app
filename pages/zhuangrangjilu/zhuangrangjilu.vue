<template>
	<view class="history">
		<view class="item" v-for="(item,index) in list" :key="index">
			<view class="o"><image :src="item.avatar" mode="widthFix" class="avator"></image></view>
			<view class="t">
				<text class="i io" v-if="item.orderType=='PLAYER_TRANSFER_ACCOUNTS'">轉讓GUGU令給予-{{item.targetName}}</text>
				<!-- <text class="i io" v-if="item.orderType=='SYSTEM_GIVEN'">店小二給予-{{item.targetName}}</text> -->
				<text class="i io" v-if="item.orderType=='MANAGER_GIVEN'">管理員給予-{{item.targetName}}</text>
				<text class="i io" v-if="item.orderType=='BOOK_REFUND'">匹配失敗退回gugu令-{{item.targetName}}</text>
				<text class="i io" v-if="item.orderType=='LAND_REFUND'">匹配失敗退回土地的GUGU令-{{item.targetName}}</text>
				<text class="i it">{{formatTime(item.createTime)}}</text>
			</view>
			<view class="h">
				<text class="ip">{{item.coin}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[]
			}
		},
		mounted() {
			this.load()
		},
		methods:{
			async load(){
				const res = await this.$api.checkHistory()
				console.log('------')
				if(res.code == 200){
					
					this.list = res.data.filter(item=>{
						return item.orderType == 'PLAYER_TRANSFER_ACCOUNTS' || item.orderType == 'MANAGER_GIVEN' 
						|| item.orderType == 'BOOK_REFUND'|| item.orderType == 'LAND_REFUND'
					})
					uni.showToast({
						title:'獲取數據成功',
						icon:'success',
						duration:1000
					})
				}else{
					uni.showToast({
						title:'獲取數據失敗',
						icon:'error',
						duration:1000
					})
				}
				console.log('------',res)
			},
			formatTime(time){
				let date = new Date(time)
				let year = date.getFullYear()
				let month = date.getMonth()+1
				let day = date.getDate()
				let Hour = date.getHours()
				 let Min = date.getMinutes()
				 let Second = date.getSeconds()
				return `${year}年${month}月${day}日 ${Hour}時${Min}分${Second}秒`
			}
		}
	}
</script>

<style lang="less">
	.history{
		width: 100%;
		height: 100%;
		padding-top: 30rpx;
		background: rgb(5,14,23);
		.item{
			width: 90%;
			height: 140rpx;
			margin-left: 5%;
			border-radius: 10rpx;
			background: rgb(17,24,30);
			display: flex;
			margin-bottom: 20rpx;
			flex-direction: row;
			.o{
				width: 25%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.avator{
					width: 120rpx;
					height: 120rpx !important;
					border-radius: 50%;
				}
			}
			.t{
				width: 50%;
				height: 100%;
				display: flex;
				align-items: flex-start;
				justify-content: center;
				flex-direction: column;
				.i{
					font-size: 30rpx;
					color: #FFFFFF;
				}
				.io{
					margin-bottom: 20rpx;
				}
				.it{
					color: grey;
					font-size: 25rpx;
				}
			}
			.h{
				width: 25%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.ip{
					color: #FFFFFF;
					font-weight: bold;
					font-size: 45rpx;
				}
			}
		}
	}
</style>
