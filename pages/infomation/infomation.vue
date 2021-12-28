<template>
	<view>
		<dynamic-page :API="api" :srvFormData="srvFormData"></dynamic-page>
		<!-- <text @click="changeInfo">修改个人信息</text> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				api:this.$config.formHost+"?id=222333",
				srvFormData:{}
			}
		},
		onLoad(e) {
			console.log(e)
			console.log(e.id)
			let id = e.id
			this.getFormData(id)
		},
		methods: {
			async getFormData(id){
				let params = {}
				let res = await this.$api.getUserInfo(params,id)
				console.log(res)
				this.srvFormData = res.data
			},
			async changeInfo(){
				console.log('asfafs')
				console.log(this.srvFormData)
				uni.navigateTo({
					url:'/pages/updateinfomation/updateinfomation?id=' + this.srvFormData.userId
				})
			}
		}
	}
</script>

<style>

</style>
