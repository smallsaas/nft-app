<template>
	<view>
		<dynamic-page :API="api"></dynamic-page>
		<bottomtabbar></bottomtabbar>
	</view>
</template>

<script>
	import {globalConfig} from '@/config.js'
	import dynamicPage from '@/components/dynamic-page/index.vue'
	import bottomtabbar from '@/components/bottomtabbar.vue'
	export default {
		components:{
			dynamicPage,
			bottomtabbar
		},
		data() {
			return {
				api:`${globalConfig.formHost}?id=555666`,
			}
		},
		methods: {
		},
	}
</script>

<style>

</style>
