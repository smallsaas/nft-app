<template>
	<div>
		<dynamic-page :API="api"></dynamic-page>
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
				api:`${globalConfig.formHost}?id=53125`
			}
		},
		methods: {
			handleJump(){
				uni.navigateTo({
					url:"/pages/defaultPage/add?id=53125",
					fail(err) {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style>

</style>
