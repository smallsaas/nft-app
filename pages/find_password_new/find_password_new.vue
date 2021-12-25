<template>
	<view class="findBox">
		<view class="box">
			<view class="backImg">
				<image  @click="goBack" class="back" src="../../static/login/back.png" mode="widthFix"></image>
			</view>
			<view class="loginText"><text class="text">找回密码</text></view>
			<view class="label"><text class="labelTxt">账号</text></view>
			<view class="inputBox"><input class="account" type="number" placeholder="请输入手机号码"></view>
			<view class="info" v-if="false"><text class="infoText">账号有误，请输入正确的手机号码</text></view>
			<view class="label"><text class="labelTxt">验证码</text></view>
			<view class="inputBox"><input class="account" type="number" placeholder="请输入验证码"><text
					class="getYZM">获取验证码</text></view>
			<view class="label"><text class="labelTxt">设置新密码</text></view>
			<view class="inputBox"><input class="account" type="text" :password="isShowPassword" placeholder="请输入密码">
				<image @click="changeLook()" class="eye" :src="isOpenLook[openIndex]" mode="widthFix"></image>
			</view>
			<view class="loginBox"><button class="loginBtn">确定</button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowPassword: true,
				isOpenLook: ['../../static/login/eyeoff.png', '../../static/login/eye.png'],
				openIndex: 0
			}
		},
		methods: {
			changeLook() {
				this.isShowPassword = !this.isShowPassword
				this.isShowPassword == true ? this.openIndex = 0 : this.openIndex = 1
			},
			goBack(){
				console.log('aaa')
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="less">
	.findBox {
		width: 100%;
		height: 100vh;
		background: rgb(5, 14, 23);

		.box {
			width: 100%;
			height: 100%;

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
		}
	}
</style>
