<template>
	<view>
		<dynamic-page :API="api"></dynamic-page>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				api:this.$config.formHost + "?id=7512"
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
