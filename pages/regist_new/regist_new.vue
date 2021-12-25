<template>
	<view class="registBox">
		<view class="box">
			<view class="backImg">
				<image class="back" @click="goBackStep" src="../../static/login/back.png" mode="widthFix"></image>
			</view>
			<view class="loginText"><text class="text" v-if="!isShowRegistInfo">会员注册</text></view>
			<view v-if="step==0">
				<view class="label"><text class="labelTxt">昵称</text></view>
				<view class="inputBox"><input class="account" type="text" placeholder="请输入您的昵称" v-model="data.name"></view>
				<view class="label"><text class="labelTxt">手机号码</text></view>
				<view class="inputBox"><input class="account" type="number" placeholder="请输入您的手机号码" v-model="data.phone"></view>
				<view class="info" v-if="false"><text class="infoText">请输入正确的手机号码</text></view>
				<view class="label"><text class="labelTxt">验证码</text></view>
				<view class="inputBox"><input class="account" type="number" placeholder="请输入验证码"><text
						class="getYZM">获取验证码</text></view>
				<view class="info" v-if="false"><text class="infoText">验证码有误</text></view>
				<view class="loginBox"><button class="loginBtn" @click="nextStep()">下一步</button></view>
				<view class="goToInfo"><text class="hasAccount">已有账号？<text class="goToLogin" @click="goLogin">去登陆</text></text></view>
				<view class="downLoad"><text class="downTxt">下载APP</text><image class="downImg" src="../../static/login/download.png" mode="widthFix"></image></view>
			</view>
			<view v-if="step==1 && isShowRegistInfo==false">
				<view class="label"><text class="labelTxt">邀请码</text></view>
				<view class="inputBox"><input class="account" type="text" placeholder="请输入您的邀请码"></view>
				<view class="label"><text class="labelTxt">登录密码</text></view>
				<view class="inputBox"><input v-model="data.password" class="account" type="text" placeholder="请输入您的登录密码" :password="isShowPassword"><image @click="changeLook()" class="eye" :src="isOpenLook[openIndex]" mode="widthFix"></image></view>
				<view class="label"><text class="labelTxt">邮箱 (选填)</text></view>
				<view class="inputBox"><input class="account" type="number" placeholder="请输入邮箱"></view>
				<view class="info" v-if="false"><text class="infoText">邮箱有误</text></view>
				<view class="check">
					<view class="checkBox" :class="{'haveRead':isReadRegistInfo==true}" @click="readRegistMessage">
						<image v-if="isReadRegistInfo" class="rightImg" src="../../static/login/right.png" mode="widthFix"></image>
					</view>
					<view class="checkInfo"><text>注册/登录即代表您已阅读并同意<text class="registInfo" @click="lookRegist">
								<<用户注册协议>>
							</text></text></view>
				</view>
				<view class="loginBox"><button class="loginBtn" @click="registAndLogin">注册并登录</button></view>
				<view class="goToInfo"><text class="hasAccount">已有账号？<text class="goToLogin" @click="goLogin">去登陆</text></text></view>
			</view>
			<view class="downLoad"><text class="downTxt" v-if="true">下载APP</text><image class="downImg" src="../../static/login/download.png" mode="widthFix"></image></view>
			
			<view class="registInfoTex" v-if="isShowRegistInfo">
				<view class="title"><text class="infoRegist">用户注册协议</text></view>
				<view class="info"><text class="infoTwo">啊水水啊水水水水水水水水啊水水水水水水水水水水啊水水水水水水水水水水水水水水啊水水水水水水水水水水水水水水啊水水水水水水水水水水水水水水啊水水水水水水水水水水水水啊水水水水水水水水啊啊水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水水水水水水水啊水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水水水水水水水啊水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水水水水水水水水水水水水水水水啊水水水水水水水水啊水水水水水水水水水水水水水水</text></view>
				<view class="btnGroup"><button class="btn agree" @click="yes">同意</button><button class="btn noAgree" @click="no">拒绝</button></view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				step: 0,
				isReadRegistInfo:false,
				isShowRegistInfo:false,
				isShowPassword:true,
				isOpenLook:['../../static/login/eyeoff.png','../../static/login/eye.png'],
				openIndex:0,
				data:{
					name:'',
					phone:'',
					password:''
				}
			}
		},
		methods: {
			nextStep() {
				this.step = 1
			},
			changeLook(){
				this.isShowPassword = !this.isShowPassword
				this.isShowPassword==true?this.openIndex=0:this.openIndex=1
			},
			goBackStep() {
				this.step = 0
			},
			readRegistMessage(){
				this.isReadRegistInfo = !this.isReadRegistInfo
			},
			goLogin(){
				uni.navigateTo({
					url:'/pages/login_new/login_new'
				})
			},
			lookRegist(){
				this.isShowRegistInfo = true
			},
			no(){
				this.isShowRegistInfo = false
				this.isReadRegistInfo = false
			},
			yes(){
				this.isShowRegistInfo = false
				this.isReadRegistInfo = !this.isReadRegistInfo
			},
			async registAndLogin(){
				console.log(this.data)
				if(this.isReadRegistInfo == false){
					uni.showToast({
						icon:'error',
						title:'请勾选用户注册协议',
						duration:1000
					})
					return;
				}
			    const res = await this.$api.regist(this.data)
				console.log(res)
				if(res.code == 200){
					uni.showToast({
						icon:'success',
						title:'注册成功',
						duration:1000
					})
					setTimeout(()=>{
						
					},1000)
				}
			}
		}
	}
</script>

<style lang="less">
	.registBox {
		width: 100%;
		height: 100vh;
		background: rgb(5, 14, 23);
		
		
		.haveRead {
			background: linear-gradient(to right, rgb(135, 57, 245) 0%, rgb(70, 104, 253), rgb(25, 137, 253));
		}

		.box {
			width: 100%;
			height: 100%;
			.registInfoTex{
				width: 90%;
				height: 900rpx;
				position: fixed;
				top: 200rpx;
				margin-left: 4.5%;
				background-color: rgb(24,38,65);
				border: 1px solid rgb(123,130,151);
				border-bottom: none;
				.title{
					width: 100%;
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					border: 1px solid rgb(123,130,151);
					border-bottom: none;
					border-right: none;
					border-left: none;
					.infoRegist{
						color: #FFFFFF;
						font-size: 35rpx;
						font-weight: bold;
					}
				}
				.info{
					width: 95%;
					height: 650rpx;
					display: flex;
					justify-content: center;
					overflow: scroll;
					.infoTwo{
						color: #FFFFFF;
						padding-right: 20rpx;
					}
				}
				.btnGroup{
					width: 100%;
					height: 155rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					.btn{
						width: 220rpx;
						height: 65rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #FFFFFF;
					}
					.agree{
						background: linear-gradient(to right, rgb(135, 57, 245) 0%, rgb(70, 104, 253), rgb(25, 137, 253));
					}
					.noAgree{
						border: 1px solid rgb(123,130,151);
						background: rgb(29,41,77);
					}
				}
			}

			.backImg {
				width: 60rpx;
				height: 60rpx;
				padding: 10rpx 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.back {
					width: 60rpx;
					height: 60rpx;
				}
			}
		}

		.loginText {
			width: 100%;
			height: 100rpx;
			margin-top: 60rpx;
			padding-left: 30rpx;
			display: flex;
			align-items: center;

			.text {
				color: #FFFFFF;
				font-size: 40rpx;
			}
		}

		.label {
			width: 100%;
			height: 40rpx;
			margin-top: 20rpx;
			padding-left: 30rpx;

			.labelTxt {
				color: grey;
			}
		}

		.inputBox {
			width: 100%;
			height: 80rpx;
			padding-left: 30rpx;
			margin-top: 5rpx;
			position: relative;

			.account {
				width: 90%;
				height: 80rpx;
				border-radius: 20rpx;
				background: rgb(36, 42, 51);
				padding-left: 10rpx;
			}

			.eye {
				width: 60rpx;
				height: 60rpx;
				position: absolute;
				right: 80rpx;
				top: 15rpx;
			}

			.getYZM {
				position: absolute;
				color: rgb(47, 113, 168);
				right: 90rpx;
				font-size: 30rpx;
				top: 25rpx;
			}
		}

		.info {
			width: 100%;
			height: 30rpx;
			padding-left: 30rpx;
			margin-top: 5rpx;

			.infoText {
				color: red;
				font-size: 20rpx;
			}
		}

		.loginBox {
			width: 100%;
			height: 120rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.loginBtn {
				width: 680rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				background: linear-gradient(to right, rgb(135, 57, 245) 0%, rgb(70, 104, 253), rgb(25, 137, 253));
			}
		}
		
		
		.goToInfo{
			width: 100%;
			height: 40rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.hasAccount{
				font-size: 30rpx;
				color: grey;
			}
			.goToLogin{
				font-size: 30rpx;
				color: rgb(25, 137, 253);
				margin-right: 40rpx;
			}
		}
		
		.downLoad{
			width: 100%;
			height: 40rpx;
			position: fixed;
			bottom: 120rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.downTxt{
				font-size: 30rpx;
				color: rgb(25, 137, 253);
				padding-right: 10rpx;
			}
			.downImg{
				width: 50rpx;
				height: 50rpx;
			}
		}

		.check {
			width: 100%;
			height: 40rpx;
			margin-top: 30rpx;
			padding-left: 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			.checkBox {
				width: 30rpx;
				height: 30rpx;
				border: 1px solid grey;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;

				.rightImg {
					width: 30rpx;
					height: 30rpx;
					position: absolute;
				}

			}

			.checkInfo {
				margin-left: 10rpx;
				width: 630rpx;
				height: 30rpx;
				font-size: 20rpx;
				color: grey;

				.registInfo {
					margin-left: 10rpx;
					color: rgb(23, 74, 115);
				}
			}
		}
	}
</style>
