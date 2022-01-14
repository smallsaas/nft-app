<template>
	<view>
		<dynamic-page :API="api" :srvFormData="srvFormData"></dynamic-page>
		<!-- <text @click="changeInfo">修改個人信息</text> -->
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
			console.log('---------------------')
			console.log(e)
			console.log(e.id)
			let id = e.id
			console.log(id)
			this.getFormData()
			console.log('---------------------')
		},
		methods: {
			async getFormData(){
				console.log('---------------------')
				console.log('開始了-------------')
				let res = await this.$api.getInformationNew()
				console.log('快乐的测试RES',res)
				this.srvFormData = res.data
				this.$cache.set('userCache',res.data)
				console.log('---------------------')
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
