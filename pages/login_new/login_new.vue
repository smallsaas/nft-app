<template>
	<view class="loginBox">
		<view class="box">
			<view class="backImg"><image class="back" src="../../static/login/back.png" mode="widthFix"></image></view>
			<view class="loginText"><text class="text">欢迎登录NFT平台</text></view>
			<view class="label"><text class="labelTxt">账号</text></view>
			<view class="inputBox"><input :class="{focus:isShowFocusA}" class="account" type="text" placeholder="请输入账号" v-model="data.account" @focus="focus(1)" @blur="blur(1)"></view>
			<view class="info" v-if="false"><text class="infoText">账号有误，请输入正确的手机号码</text></view>
			<view class="label"><text class="labelTxt">密码</text></view>
			<view class="inputBox"><input :class="{focus:isShowFocusP}" class="account" type="text" v-model="data.password" :password="isShowPassword" placeholder="请输入密码" @focus="focus(2)" @blur="blur(2)"><image @click="changeLook()" class="eye" :src="isOpenLook[openIndex]" mode="widthFix"></image></view>
			<view class="label"><text class="labelTxt">验证码</text></view>
			<view class="viewBox"><input :class="{focus:isShowFocusY}"  type="text" placeholder="请输入验证码" class="yzm" @focus="focus(3)" @blur="blur(3)"><view class="yzmBox"></view><image v-if="false" class="right" src="../../static/login/right.png" mode="widthFix"></image></view>
			<view class="loginBox"><button class="loginBtn" @click="login">登录</button></view>
			<view class="opeation"><text class="forget" @click="goFindP">忘记密码?</text><text class="regist" @click="goToRegist()">注册账号</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowFocusA:false,
				isShowFocusP:false,
				isShowFocusY:false,
				isShowPassword:true,
				isOpenLook:['../../static/login/eyeoff.png','../../static/login/eye.png'],
				openIndex:0,
				data:{
					account:'13692842253',
					password:'123456'
				}
			}
		},
		methods: {
			focus(id){
				console.log(id)
				if(id==1){
					this.isShowFocusA = true;
					return
				}else if(id == 2){
					this.isShowFocusP = true
					return
				}else if(id == 3){
					this.isShowFocusY = true
					return
				}
			},
			blur(id){
				console.log(id)
				if(id==1){
					this.isShowFocusA = false;
					return
				}else if(id == 2){
					this.isShowFocusP = false
					return
				}else if(id == 3){
					this.isShowFocusY = false
					return
				}
			},
			changeLook(){
				this.isShowPassword = !this.isShowPassword
				this.isShowPassword==true?this.openIndex=0:this.openIndex=1
			},
			goToRegist(){
				uni.navigateTo({
					url:'/pages/regist_new/regist_new'
				})
			},
			goFindP(){
				uni.navigateTo({
					url:'/pages/find_password_new/find_password_new'
				})
			},
			async login(){
				// console.log(this.data)
				// let that = this;
				// let res=await that.$api.login(that.data)
				// console.log(res)
				// if(res.code == 200){
				// 	that.$cache.set(that.$config.tokenStorageKey,res.data.accessToken)
				// 	uni.showToast({
				// 		title:'登录成功',
				// 		duration:1000
				// 	})
				// 	setTimeout(()=>{
				// 		uni.navigateTo({
				// 			url:'/pages/home/homePage'
				// 		})
				// 	},1000)
				// }else{
				// 	uni.showToast({
				// 		title:res.message,
				// 		icon:"error"
				// 	})
				// }
				
				
				// that.$cache.set(that.$config.tokenStorageKey,'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.eyJvcmdJZCI6IiIsInVzZXJJZCI6MTA5LCJhY2NvdW50IjoiYWNjNjY3MTcyOTUiLCJkb21haW5Vc2VySWQiOjU0LCJpYXQiOjE2NDA5MTcwODMsImp0aSI6IjEwOSIsInN1YiI6ImFjYzY2NzE3Mjk1IiwiZXhwIjoxNjQxMTc2MjgzfQ.NVIrpPYKQ8fFNjWOLLF4_FIPX9j8iLJBAIVJZ3SujiC34yWy_TYcWrEjCT6AP-3kcJyzhk4-CJ2-eh12Bhw1OQ')
				uni.navigateTo({
					url:'/pages/home/homePage'
				})
			}
		}
	}
</script>

<style lang="less">
	@borderColor:linear-gradient(to right, rgb(135,57,245) 0%,rgb(70,104,253), rgb(25,137,253)) 10;
	.loginBox {
		width: 100%;
		height: 100vh;
		background: rgb(5,14,23);
		.box {
			width: 100%;
			height: 100%;
			
			.focus{
				border: 1px solid;
			    border-image: linear-gradient(to right, rgb(135,57,245) 0%,rgb(70,104,253), rgb(25,137,253)) 10;
			}

			.backImg {
				width: 60rpx;
				height: 60rpx;
				padding: 10rpx 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.back{
					width: 60rpx;
					height: 60rpx;
				}
			}
			
			.loginText{
				width: 100%;
				height: 100rpx;
				margin-top: 60rpx;
				padding-left: 30rpx;
				display: flex;
				align-items: center;
				.text{
					color: #FFFFFF;
					font-size: 40rpx;
				}
			}
			
			.label{
				width: 100%;
				height: 40rpx;
				margin-top: 20rpx;
				padding-left: 30rpx;
				.labelTxt{
					color: grey;
				}
			}
			
			.inputBox{
				width: 100%;
				height: 80rpx;
				padding-left: 30rpx;
				margin-top: 5rpx;
				position: relative;
				.account{
					width: 90%;
					height: 80rpx;
					border-radius: 10rpx;
					background: rgb(36,42,51);
					padding-left: 10rpx;
					outline-style: none;
				}
				.eye{
					width: 60rpx;
					height: 60rpx;
					position: absolute;
					right: 80rpx;
					top: 15rpx;
				}
			}
			
			.info{
				width: 100%;
				height: 30rpx;
				padding-left: 30rpx;
				margin-top: 5rpx;
				.infoText{
					color: red;
					font-size: 20rpx;
				}
			}
			
			.viewBox{
				margin-top: 5rpx;
				width: 100%;
				height: 80rpx;
				padding-left: 30rpx;
				display: flex;
				flex-direction: row;
				position: relative;
				.yzm{
					width: 45%;
					height: 80rpx;
					border-radius: 20rpx;
					background: rgb(36,42,51);
					padding-left: 20rpx;
				}
				.yzmBox{
					width: 40%;
					height: 80rpx;
					border: 1px solid red;
					margin-left: 25rpx;
					border-radius: 20rpx;
				}
				.right{
					position: absolute;
					width: 60rpx;
					height: 60rpx;
					left: 320rpx;
					top: 10rpx;
				}
			}
			
			.loginBox{
				width: 100%;
				height: 120rpx;
				margin-top: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.loginBtn{
					width: 680rpx;
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #fff;
					background: linear-gradient(to right, rgb(135,57,245) 0%,rgb(70,104,253), rgb(25,137,253));
				}
			}
			
			.opeation{
				width: 100%;
				height: 40rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-around;
				.forget{
					color: grey;
					padding-right: 330rpx;
				}
				
				.regist{
					color: rgb(23,75,116);
				}
			}
		}
	}
</style>
