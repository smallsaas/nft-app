<template>
	<view>
		<dynamic-page :API="api" :srvFormData="srvFormData"></dynamic-page>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				api:this.$config.formHost+"?id=333444",
				srvFormData:{}
			}
		},
		onLoad(e) {
			console.log(e.id)
			this.updateInfomation(e.id)
		},
		methods: {
			async updateInfomation(id){
				let params = {}
				let res = await this.$api.updateInformation(params,id)
				console.log(res)
				this.srvFormData = res.data
			}
		}
	}
</script>

<style>

</style>
