<template>
	<view>
		<dynamic-page :API="api" :srvFormData="srvFormData" ifManualSubmit="true" @submit="handleSubmit"></dynamic-page>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				api:this.$config.formHost+"?id=71541",
				srvFormData:{}
			}
		},
		methods: {
			async getSrvFormData(){
				let res = await this.$api.getAccountData(109)//傳入id獲取用戶信息
				if(res.code == 200){
					this.srvFormData = res.data
				}else{
					uni.showToast({
						icon:"error",
						title:"加載失敗"
					})
				}
			},
			// 額外提交方法
			async handleSubmit(data){
				let res = await this.$api.editAccountData(109,data)
				if(res.code == 200){
					uni.showToast({
						icon:"success",
						title:"提交成功"
					})
				}else{
					uni.showToast({
						icon:"none",
						title:res.message||res.msg
					})
				}
			}
		},
		created() {
			this.getSrvFormData()
		}
	}
</script>

<style>

</style>
