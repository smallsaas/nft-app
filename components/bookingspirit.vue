<template>
	<view>
		预约精灵
		<dynamic-page :API="api"></dynamic-page>
	</view>
</template>

<script>
	import {globalConfig} from '@/config.js'
	import dynamicPage from '@/components/dynamic-page/index.vue'
	export default {
		name:"bookingspirit",
		components:{
			dynamicPage,
		},
		data() {
			return {
				api:`${globalConfig.formHost}?id=456789`,
			}
		},
		methods: {
		},
	}
</script>

<style>

</style>
