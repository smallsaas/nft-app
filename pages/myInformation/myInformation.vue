<template>
	<view>
		<dynamic-page :API="api" :srvFormData="srvFormData"></dynamic-page>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				api:this.$config.formHost+"?id=66667",
				srvFormData:{}
			}
		},
		methods: {
			async getFormData(id){
				let params = {}
				let res = await this.$api.getInformation(params,id)
				this.srvFormData = res.data
			}
		},
		onLoad(e) {
			let id = e.id
			this.getFormData(id)
		}
	}
</script>

<style>

</style>
