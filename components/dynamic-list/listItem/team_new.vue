<template>
	<view class="team newTeam">
		<view class="item">
			<view class="left">
				<!-- <image src="../../../static/spirit/coin.png" mode="widthFix" class="avator"></image> -->
				<image src="https://s2.loli.net/2022/01/08/3EKGbBZTCUR6pfy.jpg" mode="widthFix" class="avator"></image>
			</view>
			<view class="right">
				<view class="flex i"><text class="name">{{item.name}}</text></view>
				<view class="flex"><text class="account">{{item.mobilePhone}} (lv2)</text></view>
				<view class="flex ii">
					<text class="num">領養數:  {{item.adoptCount}}人</text>
					<text class="num">直推數:  13人</text>
					<text class="num tt">預約數:  {{item.appointmentCount}}人</text>
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
		props: {
			item: Object,
			ext: Object
		},
		created() {
		 console.log(this.item,'我是item')
		},
	}
</script>

<style lang="less">
	.team{
		width: 100%;
		background: rgb(5,14,23);
		padding-bottom: 20rpx;
		.item{
			width: 90%;
			height: 180rpx;
			margin-left: 5%;
			background: rgb(17,24,30);
			border-radius: 20rpx;
			display: flex;
			flex-direction: row;
			.left{
				width: 20%;
				height: 100%;
				display: flex;
				align-items: flex-start;
				justify-content: center;
				.avator{
					margin-top: 20rpx;
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
			}
			.right{
				width: 80%;
				height: 100%;
				display: flex;
				flex-direction: column;
				.flex{
					flex: 1;
					display: flex;
					align-items: center;
					.account{
						color: grey;
						font-size: 30rpx;
					}
					.num{
						color: grey;
						font-size: 25rpx;
					}
				}
				.ii{
					display: flex;
					justify-content: space-between;
					.tt{
						margin-right: 40rpx;
					}
				}
				.i{
					flex: 1.5;
					display: flex;
					align-items: center;
					.name{
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
