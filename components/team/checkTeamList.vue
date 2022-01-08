<template>
	<view class="checkTeamList">
		<view class="check">
			<input type="number" placeholder="請輸入手機号碼查詢" class="phone"/>
			<image src="../../static/service/search.png" mode="widthFix" class="search"></image>
		</view>
		<view class="box">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="img">
					<image src="../../static/spirit/coin.png" mode="widthFix" class="avator"></image>
				</view>
				<view class="info">
					<text class="infoN">{{item.name}}</text>
					<text class="infoP">{{item.mobilePhone}}</text>
					<text class="infoPT">備用手機号: {{item.backupMobilePhone==null?'暫無':item.backupMobilePhone}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {globalConfig} from '@/config.js'
	import {api} from '@/common/api.js'
	export default {
		name:'spiritMarket',
		data(){
			return{
				list:[]
			}
		},
		mounted() {
			this.getStrightTeam()
		},
		methods:{
			async getStrightTeam(){
				const res = await this.$api.getStrightTeam()
				console.log(res)
				if(res.code == 200){
					this.list = res.data
				}
			}
		}
	}
</script>

<style lang="less">
	.checkTeamList{
		width: 100%;
		height: 100%;
		.check{
			margin-top: 30rpx;
			width: 100%;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			.phone{
				width: 90%;
				height: 100%;
				border: 1px solid rgb(54,63,76);
				border-radius: 20rpx;
				padding-left: 10rpx;
			}
			.search{
				position: absolute;
				right: 10%;
				width: 60rpx;
				height: 60rpx !important;
			}
		}
		.box{
			width: 100%;
			height: auto;
			margin-top: 20rpx;
			.item{
				width: 90%;
				height:200rpx;
				background: rgb(17,24,30);
				border-radius: 20rpx;
				margin-left: 4.5%;
				display: flex;
				flex-direction: row;
				margin-bottom: 20rpx;
				.img{
					width: 25%;
					height: 100%;
					display: flex;
					align-items: flex-start;
					justify-content: center;
					.avator{
						margin-top: 20rpx;
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}
				}
				.info{
					width: 75%;
					height: 100%;
					display: flex;
					flex-direction: column;
					.infoN{
						height: 30%;
						color: #FFFFFF;
						font-size: 35rpx;
						display: flex;
						align-items: center;
					}
					.infoP{
						height: 30%;
						color: #FFFFFF;
						font-size: 25rpx;
						display: flex;
						align-items: center;
					}
					.infoPT{
						height: 30%;
						color: #FFFFFF;
						font-size: 25rpx;
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}
</style>
