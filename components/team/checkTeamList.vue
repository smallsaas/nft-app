<template>
	<view class="checkTeamList">
		<view class="check">
			<input type="number" placeholder="请输入手机号码查询" class="phone"/>
			<image src="../../static/service/search.png" mode="widthFix" class="search"></image>
		</view>
		<view class="box">
			<view class="item">
				<view class="img">
					<image src="../../static/spirit/coin.png" mode="widthFix" class="avator"></image>
				</view>
				<view class="info">
					<text class="infoN">刘华强</text>
					<text class="infoP">18664521094</text>
					<text class="infoPT">备用手机号: 18664521094</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
			border: 1px solid red;
			margin-top: 20rpx;
			.item{
				width: 90%;
				height:200rpx;
				border: 1px solid red;
				background: rgb(17,24,30);
				border-radius: 20rpx;
				margin-left: 4.5%;
				display: flex;
				flex-direction: row;
				.img{
					width: 25%;
					height: 100%;
					border: 1px solid red;
					display: flex;
					align-items: flex-start;
					justify-content: center;
					.avator{
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}
				}
				.info{
					width: 75%;
					height: 100%;
					border: 1px solid red;
					display: flex;
					flex-direction: column;
					.infoN{
						height: 30%;
						color: #FFFFFF;
						font-size: 35rpx;
						border: 1px solid red;
					}
				}
			}
		}
	}
</style>
