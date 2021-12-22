<template>
	<view>
		<dynamic-page :API="api" ></dynamic-page>
	</view>
</template>

<script>
	import {globalConfig} from '@/config.js'
	import dynamicPage from '@/components/dynamic-page/index.vue'
	export default {
		components:{
			dynamicPage
		},
		data() {
			return {
				api:`${globalConfig.formHost}?id=55555`,
			}
		},
		methods: {
		},
	}
</script>

<style>

</style>
