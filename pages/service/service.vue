<template>
	<view class="Box">
		<user-bread></user-bread>
	</view>
</template>

<script>
	import userBread from '../../components/User.vue'
	export default {
		components:{
			userBread
		},
		data() {
			return {
			}
		},
		methods: {
		},
	}
</script>

<style lang="less">
.Box{
	width: 100%;
	height: 200rpx;
	border: 1px solid red;
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: space-around;
	.avatar{
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}
}
</style>
