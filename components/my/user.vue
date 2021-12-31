<template>
	<view class="user">
		<!-- <view class="imgBox">
			<image class="img" src="../../static/spirit/coin.png" mode="widthFix"></image>
		</view> -->
		<view class="left">
			<view class="LImg"><image class="img" src="../../static/spirit/coin.png" mode="widthFix"></image></view>
			<view class="Linfo">
				<view class="Ln"><text class="name">{{data.name}}</text></view>
				<view class="Ls"><text class="status">账号状态:  {{data.status=='NORMAL'?'正常':'冻结'}}</text></view>
			</view>
		</view>
		<view class="right">
			<image @click="getDetail" class="more" src="../../static/service/more.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			data: Object,
		},
		created() {
			console.log(this.data)
		},
		methods:{
			getDetail(){
				uni.navigateTo({
					url:'/pages/infomation/infomation?id=' + this.data.userId
				})
			}
		}
	}
</script>

<style lang="less">
	.user{
		width: 100%;
		height: 160rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 332px;
		height: 72px;
		// border: 1px solid red;
		margin: 0 auto;
		position: relative;
		.imgBox{
			width: 72px;
			height: 72px;
			border: 1px solid red;
			position: absolute;
			.img{
				width: 72px;
				height: 72px !important;
				border-radius: 50%;
				border: 1px solid rgb(132,133,147);
			}
		}
		.left{
			width: 80%;
			height: 100%;
			display: flex;
			flex-direction: row;
			margin-left: 40rpx;
			.LImg{
				width: 150rpx;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.img{
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
					border: 1px solid rgb(132,133,147);
				}
			}
			.Linfo{
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				margin-left: 20rpx;
				.Ln,.Ls{
					width: 100%;
					height: 50%;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					.name{
						color: #FFFFFF;
					}
					.status{
						font-size: 25rpx;
					}
				}
				.Ln{
					align-items: flex-end;
				}
				.Ls{
					padding-top: 30rpx;
					align-items: flex-start;
				}
			}
		}
		.right{
			width: 10%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.more{
				width: 40rpx;
				height: 50rpx;
			}
		}
	}
</style>
