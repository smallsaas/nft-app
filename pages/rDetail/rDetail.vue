<template>
	<view class="box">
		<view class="item">
			<view class="o">
				<text class="name">昵称: 刘大花</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
.box{
	width: 100%;
	height: 100vh;
	padding-top: 20rpx;
	.item{
		width: 90%;
		height: 350rpx;
		border: 1px solid red;
		border-radius: 8px;
		background:rgb(17,24,30);
		margin-left: 5%;
		.o{
			width:100%;
			height: 60rpx;
			border: 1px solid red;
			display: flex;
			align-items: center;
			.name{
				color: #F1F1F1;
				margin-left: 25rpx;
			}
		}
	}
}
</style>
