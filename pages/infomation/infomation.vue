<template>
	<view>
		<dynamic-page :API="api"></dynamic-page>
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
		destroyed() {
			this.$cache.remove("page_222333")
		},
		onLoad(e) {
			// console.log('---------------------')
			console.log(e)
			console.log(e.id)
			let id = e.id
			console.log(id)
			this.getFormData()
			// console.log('---------------------')
		},
		onShow(option) {
			let change = this.$cache.get("FormChange")
			if(change){
				console.log("顯示了")
				this.$reload()
			}
		},
		methods: {
			async getFormData(){
				console.log('---------------------')
				console.log('開始了-------------')
				let res = await this.$api.getInformationNew()
				console.log('快樂的測試RES',res)
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
