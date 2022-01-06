<template>
	<view>
		<view class="mask_container">
		</view>
		<view class="mask_content">
			<slot name="content"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"mask"
	}
</script>

<style lang="less">
	.mask_container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		// background-color: rgba(0, 0, 0, 0.6);
		background-color: #000;
		opacity: .6;
		overflow: hidden;
		transition: all .2s;
		z-index: 9999998;
	}
	.mask_content{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
	}
</style>
