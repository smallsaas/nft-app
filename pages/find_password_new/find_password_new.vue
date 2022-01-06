<template>
	<view class="findBox">
		<view class="box">
<!-- 			<view class="backImg">
				<image  @click="goBack" class="back" src="../../static/login/back.png" mode="widthFix"></image>
			</view> -->
			<view class="loginText"><text class="text">找回密碼</text></view>
			<view class="label"><text class="labelTxt">賬号</text></view>
			<view class="inputBox"><input :class="isFocus==='phone'?'focus account':'account'" type="number" placeholder="請輸入手機号碼" @focus="handleFocus('phone')" @blur="handleFocus('')"></view>
			<view class="info" v-if="false"><text class="infoText">賬号有誤，請輸入正确的手機号碼</text></view>
			<view class="label"><text class="labelTxt">驗證碼</text></view>
			<view class="inputBox"><input :class="isFocus==='code'?'focus account':'account'" type="number" placeholder="請輸入驗證碼" @focus="handleFocus('code')" @blur="handleFocus('')"><text
					class="getYZM">獲取驗證碼</text></view>
			<view class="label"><text class="labelTxt">設置新密碼</text></view>
			<view class="inputBox"><input :class="isFocus==='password'?'focus account':'account'" type="text" :password="isShowPassword" placeholder="請輸入密碼" @focus="handleFocus('password')" @blur="handleFocus('')">
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
				openIndex: 0,
				isFocus:""
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
			},
			handleFocus(name){
				this.isFocus = name
			}
		}
	}
</script>

<style lang="less">
	.focus{
		border: 2rpx solid;
		border-image: linear-gradient(to left,#9331F5,#0A95FF) 10;
	}
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
				margin-top: 40rpx;
				padding-left: 30rpx;

				.labelTxt {
					color: grey;
				}
			}

			.inputBox {
				width: 100%;
				height: 80rpx;
				// padding-left: 30rpx;
				margin-top: 30rpx;
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				.account {
					width: 85%;
					height: 80rpx;
					display: flex;
					justify-content: center;
					border-radius: 20rpx;
					background: rgb(36, 42, 51);
					// padding-left: 10rpx;
						padding: 10rpx 20rpx;
						// margin: 20rpx 0;
				}

				.eye {
					width: 60rpx;
					height: 60rpx;
					position: absolute;
					right: 8%;
					// top: 15rpx;
				}

				.getYZM {
					position: absolute;
					color: rgb(47, 113, 168);
					right: 8%;
					font-size: 30rpx;
					// top: 25rpx;
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
