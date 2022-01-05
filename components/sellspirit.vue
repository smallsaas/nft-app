<template>
	<view class="match">
		<view class="box">
			<view class="item">
				<view class="left">
					<view class="img"><image class="pic" src="https://s2.loli.net/2021/12/24/7bn1rPlMmYVihAR.jpg" mode="widthFix"></image></view>
				</view>
				<view class="right">
					<view>小天使精靈</view>
					<view>級别:lv4</view>
					<view>能力值:200</view>
					<view>出售:18664521094</view>
					<view>買家:13692842253</view>
					<view>對方未付款</view>
					<button @click="suc">确認收到款項</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"matchingspirit",
		data() {
			return {
				
			};
		},
		suc(){
			uni.showModal({
				content:'收款成功'
			})
		}
	}
</script>

<style lang="less">
.match{
	width: auto;
	height: auto;
	.box{
		width: auto;
		height: auto;
		border: 1px solid red;
		padding: 20rpx;
		.item{
			width: 90%;
			height: auto;
			border: 1px solid orange;
			margin-left: 5%;
			display: flex;
			flex-direction: row;
			margin-bottom: 15rpx;
			.left{
				width: 40%;
				height: 100%;
				border: 1px solid red;
				.img{
					display: flex;
					align-items: center;
					justify-content: center;
					.pic{
						width: 250rpx;
						height: 350rpx;
					}
				}
				.time{
					width: 100%;
					font-size: 30rpx;
				}
				.info{
					width: 100%;
					border: 1px solid red;
					display: flex;
					.infoItem{
						flex: 1;
						height: 100rpx;
						border: 1px solid blue;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						.type{
							width: 50rpx;
							height: 50rpx;
							border-radius: 50%;
						}
					}
				}
			}
			.right{
				width: 60%;
				border: 1px solid red;
			}
		}
	}
}
</style>
