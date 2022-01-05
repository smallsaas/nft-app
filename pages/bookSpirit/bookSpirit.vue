<template>
	<view class="box">
		<view class="nav">
			<view @click="getNav(index)" :class="{active:index==navIndex}" class="item" v-for="(item,index) in navList" :key="index">{{item}}</view>
		</view>
		<view class="body">
			<bookingspirit v-if="navIndex == 0"></bookingspirit>
			<matchingspirit v-if="navIndex == 1"></matchingspirit>
			<adoptspirit v-if="navIndex == 2"></adoptspirit>
			<sellspirit v-if="navIndex == 3"></sellspirit>
		</view>
		<!-- <dynamic-page :API="api"></dynamic-page> -->
		<bottomtabbar></bottomtabbar>
	</view>
</template>

<script>
	import {globalConfig} from '@/config.js'
	import dynamicPage from '@/components/dynamic-page/index.vue'
	import bottomtabbar from '@/components/bottomtabbar.vue'
	import bookingspirit from '@/components/bookingspirit.vue'
	import matchingspirit from '@/components/matchingspirit.vue'
	import adoptspirit from '@/components/adoptspirit.vue'
	import sellspirit from '@/components/sellspirit.vue'
	export default {
		components:{
			dynamicPage,
			bottomtabbar,
			bookingspirit,
			matchingspirit,
			adoptspirit,
			sellspirit
		},
		data() {
			return {
				api:`${globalConfig.formHost}?id=456789`,
				navList:['預約精靈','匹配精靈','領養精靈','出售精靈'],
				navIndex:0
			}
		},
		methods: {
			getNav(index){
				console.log(index)
				this.navIndex = index
			}
		},
	}
</script>

<style lang="less">
.box{
	.nav{
		width: 100%;
		height: 100rpx;
		border: 1px solid red;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		.active{
			border-bottom: 1px solid orange;
		}
	}
}
</style>
