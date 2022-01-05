<template>
	<view class="regist">
		<view class="box">
			<input type="text" placeholder="請輸入昵稱" v-model="info.name"/>
			<input type="number" placeholder="請輸入手機号碼" v-model="info.phone"/>
			<!-- <input type="number" placeholder="請輸入驗證碼" />
			<input type="text" placeholder="請輸入邀請碼" /> -->
			<input type="text" placeholder="請輸入登錄密碼" v-model="info.password"/>
			<button @click="regist"> 注冊并登錄 </button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					name:'',
					phone:'',
					password:''
				}
			}
		},
		methods: {
			async regist(){
				console.log(this.info,this.$api)
				const res = await this.$api.regist(this.info)
				console.log(res)
				if(res.code == 200) {
					uni.showModal({
						content:'注冊成功'
					})
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}
			}
		}
	}
</script>

<style lang="less">
.regist{
	width: auto;
	height: auto;
	.box{
		width: auto;
		height: auto;
		border: 1px solid red;
		padding: 10rpx;
		input{
			border: 1px solid red;
			margin: 10rpx;
		}
	}
}
</style>
