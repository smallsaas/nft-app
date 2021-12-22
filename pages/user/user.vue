<template>
	<div>
		<dynamic-page :API="api" :Details="true"></dynamic-page>
	</div>
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
				api:`${globalConfig.formHost}?id=66666`,
			}
		},
		methods: {
		},
	}
</script>

<style>

</style>
