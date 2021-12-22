<template>
	<view class="spiritMarket">
		<view class="head" @click="g">
			<view class="tab">精灵商店</view>
			<view class="tab">预约签到</view>
		</view>
		<view class="bodyList">
			<list></list>
		</view>
	</view>
</template>

<script>
	import {
		globalConfig
	} from '@/config.js'
	import list from '../dynamic-list/listItem/spiritMarket.vue'
	export default {
		name:"spiritMarket",
		components: {
			list
		},
		data() {
			return {

			}
		},
		methods: {
			g() {
				uni.navigateTo({
					url: '/pages/defaultPage/page?id=' + 55555
				})
			}
		}
	}
</script>

<style lang="less">
	.spiritMarket {
		width: 100vw;
		height: 100vh;
		background: #ccc;
		position: relative;

		.head {
			width: 375px;
			height: 48px;
			color: rgba(80, 80, 80, 1);
			background-color: rgba(255, 255, 252, 1);
			font-size: 14px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;

			.tab {
				width: 117px;
				height: 38px;
				color: rgba(227, 60, 100, 1);
				background-color: rgba(255, 255, 255, 1);
				font-size: 18px;
				line-height: 38px;
				text-align: center;
			}
		}

		.bodyList {
			width: 375px;
			border: 1px solid blue;
		}
	}
</style>
