<template>
	<view class="LoginBox">
		<input type="number" placeholder="请输入手机号码" v-model="phone"/>
		<input type="password" placeholder="请输入密码" v-model="password"/>
		<button @click="login">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				password:''
			}
		},
		methods: {
			async login(){
				let that = this;
				const data = {
								account: "admin",
								password: "111111"
				}
				let res=await that.$api.login(data)
				console.log(res)
				that.$cache.set(that.$config.tokenStorageKey,res.data.accessToken)
				that.$cache.set('userId',res.data.userId)
				that.$cache.set('userAvatar',res.data.avatar)
				that.$cache.set('userName',res.data.name)
				let takeToken = uni.getStorage({key:that.$config.tokenStorageKey})
				takeToken.then(tokenData=>{
					console.log(tokenData[1].data)
				})
				uni.navigateTo({
					url:'/pages/market/market'
				})
				// uni.request({
				// 	url:'http://repo.dev.smallsaas.cn:8084/api/sys/oauth/login',
				// 	method:"POST",
				// 		header:{
				// 			'Authorization':"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJvcmdJZCI6IjEiLCJ1c2VySWQiOiIxIiwidXNlclR5cGUiOjEwMSwiYlVzZXJUeXBlIjoiU1lTVEVNIiwidGVuYW50T3JnSWQiOjEsImFjY291bnQiOiJhZG1pbiIsImV4dHJhVXNlclR5cGUiOjAsImlhdCI6MTYzOTk5NDE0OSwianRpIjoiMSIsInN1YiI6ImFkbWluIiwiZXhwIjoxNjQwMjUzMzQ5fQ.HY6R-IgAcF8w9jqB9PR8xVQX6QXr0fA--zBlwGKD3vn6lvLJaBYu7dn6wJ7n33rxFVyMJK4EF4TfetioE9kQvg"
				// 		},
				// 		data:{
				// 			account: "admin",
				// 			password: "111111"
				// 		},
				// 	success: (res) => {
				// 		console.log(res)
				// 	}
				// })
			}
		}
	}
</script>

<style lang="less">
.LoginBox{
	border: 1px solid red;
	input{
		border: 1px solid red;
	}
}
</style>
