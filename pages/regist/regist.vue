<template>
	<view class="regist">
		<view class="box">
			<input type="text" placeholder="请输入昵称" v-model="info.name"/>
			<input type="number" placeholder="请输入手机号码" v-model="info.phone"/>
			<!-- <input type="number" placeholder="请输入验证码" />
			<input type="text" placeholder="请输入邀请码" /> -->
			<input type="text" placeholder="请输入登录密码" v-model="info.password"/>
			<button @click="regist"> 注册并登录 </button>
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
						content:'注册成功'
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
