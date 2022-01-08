<template>
	<view class="registBox">
		<view class="box newBox">
			<view class="A">會員注冊</view>
			<view class="B">昵稱</view>
			<view class="C">
				<input v-model="data.name" @focus="focus(1)" @blur="blur(1)" :class="{focus:isAddArticleA}" class="i" placeholder="請輸入昵稱" type="text" />
			</view>
			<view class="B">手機号碼</view>
			<view class="C">
				<input v-model="data.phone"  @focus="focus(2)" @blur="blur(2)" :class="{focus:isAddArticleB}" class="i" placeholder="請輸入手機号碼" type="number" />
			</view>
			<view class="B">驗證碼</view>
			<view class="C">
				<input v-model="data.yzm"  @focus="focus(3)" @blur="blur(3)" :class="{focus:isAddArticleC}" class="i" placeholder="請輸入驗證碼" type="number" />
				<text class="get" v-if="isShowYZM" @click="getYZM">獲取驗證碼</text>
				<text class="get gets" v-if="!isShowYZM">{{count}}秒重試</text>
			</view>
			<view class="B">登錄密碼</view>
			<view class="C">
				<input v-model="data.loginPassword"  @focus="focus(4)" @blur="blur(4)" :class="{focus:isAddArticleD}" class="i" placeholder="請輸入登錄密碼" :password="isShowPassword" />
				<image @click="changeLook()" class="eye" :src="isOpenLook[openIndex]" mode="widthFix"></image>
			</view>
			<view class="B">郵箱（選填）</view>
			<view class="C">
				<input v-model="data.email" @focus="focus(5)" @blur="blur(5)" :class="{focus:isAddArticleE}" class="i" placeholder="請輸入郵箱" type="text" />
			</view>
			<view class="B">邀請碼</view>
			<view class="C">
				<input v-model="data.invitationCode"  @focus="focus(6)" @blur="blur(6)" :class="{focus:isAddArticleF}" class="i" placeholder="請輸入邀請碼" type="text" />
			</view>
			<view class="T">
				<view class="ii" :class="{'haveRead':isReadRegistInfo==true}" @click="readRegistMessage">
					<image v-if="isReadRegistInfo" class="rightImg" src="../../static/login/right.png"
						mode="widthFix"></image>
				</view>
				<view class="iii">注冊/登錄即代表您已閱讀并同意</view>
				<view class="iiii" @click="lookRegist">《用戶注冊協議》</view>
			</view>
			<view class="TT">
				<button class="btn"  @click="registAndLogin">注冊并登錄</button>
			</view>
			<view class="last"><text class="ss">已有賬号？</text><text class="sss" @click="goLogin">去登錄</text></view>
			
			
			<view class="registInfoTex" v-if="isShowRegistInfo">
				<view class="title"><text class="infoRegist">用戶注冊協議</text></view>
				<view class="info"><text
						class="infoTwo">請勾選用戶注冊協議</text>
				</view>
				<view class="btnGroup"><button class="btn agree" @click="yes">同意</button><button class="btn noAgree"
						@click="no">拒絕</button></view>
			</view>
<!-- 			<view class="backImg">
				<image class="back" @click="goBackStep" src="../../static/login/back.png" mode="widthFix"></image>
			</view> -->
		<!-- 	<view class="loginText"><text class="text" v-if="!isShowRegistInfo">會員注冊</text></view>
			<view v-if="step==0">
				<view class="label"><text class="labelTxt">昵稱</text></view>
				<view class="inputBox"><input :class="isFocus==='name'?'focus account':'account'" type="text" placeholder="請輸入您的昵稱" v-model="data.name" @focus="handleFocus('name')" @blur="handleFocus('')">
				</view>
				<view class="label"><text class="labelTxt">手機号碼</text></view>
				<view class="inputBox"><input :class="isFocus==='phone'?'focus account':'account'" type="number" placeholder="請輸入您的手機号碼" @focus="handleFocus('phone')" @blur="handleFocus('')"
						v-model="data.phone"></view>
				<view class="info" v-if="false"><text class="infoText">請輸入正确的手機号碼</text></view>
				<view class="label"><text class="labelTxt">驗證碼</text></view>
				<view class="inputBox"><input :class="isFocus==='code'?'focus account':'account'" type="number" placeholder="請輸入驗證碼" @focus="handleFocus('code')" @blur="handleFocus('')"><text
						class="getYZM">獲取驗證碼</text></view>
				<view class="info" v-if="false"><text class="infoText">驗證碼有誤</text></view>
				<view class="loginBox"><button class="loginBtn" @click="nextStep()">下一步</button></view>
				<view class="goToInfo"><text class="hasAccount">已有賬号？<text class="goToLogin"
							@click="goLogin">去登陸</text></text></view>
				<view class="downLoad"><text class="downTxt">下載APP</text>
					<image class="downImg" src="../../static/login/download.png" mode="widthFix"></image>
				</view>
			</view>
			<view v-if="step==1 && isShowRegistInfo==false">
				<view class="label"><text class="labelTxt">邀請碼</text></view>
				<view class="inputBox"><input class="account" type="text" placeholder="請輸入您的邀請碼"
						v-model="data.invitationCode"></view>
				<view class="label"><text class="labelTxt">登錄密碼</text></view>
				<view class="inputBox"><input v-model="data.loginPassword" class="account" type="text"
						placeholder="請輸入您的登錄密碼" :password="isShowPassword">
					<image @click="changeLook()" class="eye" :src="isOpenLook[openIndex]" mode="widthFix"></image>
				</view>
				<view class="label"><text class="labelTxt">郵箱 (選填)</text></view>
				<view class="inputBox"><input class="account" type="text" placeholder="請輸入郵箱" v-model="data.email">
				</view>
				<view class="info" v-if="false"><text class="infoText">郵箱有誤</text></view>
				<view class="check">
					<view class="checkBox" :class="{'haveRead':isReadRegistInfo==true}" @click="readRegistMessage">
						<image v-if="isReadRegistInfo" class="rightImg" src="../../static/login/right.png"
							mode="widthFix"></image>
					</view>
					<view class="checkInfo"><text>注冊/登錄即代表您已閱讀并同意<text class="registInfo" @click="lookRegist">
								<<用戶注冊協議>>
							</text></text></view>
				</view>
				<view class="loginBox"><button class="loginBtn" @click="registAndLogin">注冊并登錄</button></view>
				<view class="goToInfo"><text class="hasAccount">已有賬号？<text class="goToLogin"
							@click="goLogin">去登陸</text></text></view>
			</view>
			<view class="downLoad"><text class="downTxt" v-if="true">下載APP</text>
				<image class="downImg" src="../../static/login/download.png" mode="widthFix"></image>
			</view>

			<view class="registInfoTex" v-if="isShowRegistInfo">
				<view class="title"><text class="infoRegist">用戶注冊協議</text></view>
				<view class="info"><text
						class="infoTwo">啊水水啊水水水水水水水水啊水水水水水水水水水水啊水水水水水水水水水水水水水水啊水水水水水水水水水水水水水水啊水水水水水水水水水水水水水水啊水水水水水水水水水水水水啊水水水水水水水水啊啊水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水水水水水水水啊水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水水水水水水水啊水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水啊水水水水水水水水水水水水水水水水水水水水水水啊水水水水水水水水啊水水水水水水水水水水水水水水</text>
				</view>
				<view class="btnGroup"><button class="btn agree" @click="yes">同意</button><button class="btn noAgree"
						@click="no">拒絕</button></view>
			</view> -->
         
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowYZM:true,
				count:5,
				
				step: 0,
				isReadRegistInfo: false,
				isShowRegistInfo: false,
				isShowPassword: true,
				isOpenLook: ['../../static/login/eyeoff.png', '../../static/login/eye.png'],
				openIndex: 0,
				data: {
					name: '',
					phone: '',
					yzm:'',
					loginPassword: '',
					email: '',
					invitationCode: '',
					// PNywB5
				},
				isFocus:'',
				
				isAddArticleA:false,
				isAddArticleB:false,
				isAddArticleC:false,
				isAddArticleD:false,
				isAddArticleE:false,
				isAddArticleF:false
			}
		},
		methods: {
			getYZM(){
				clearInterval(time)
				uni.showToast({
					title:'獲取成功',
					icon:"success"
				})
				this.isShowYZM = !this.isShowYZM
				this.count = 5
				let time = setInterval(()=>{
					this.count-=1
					if(this.count == 0){
						this.isShowYZM = !this.isShowYZM
						clearInterval(time)
					}
				},1000)
			},
			
			focus(id){
				if(id==1){
					this.isAddArticleA = true
					return
				}else if(id == 2){
					this.isAddArticleB = true
					return
				}else if(id == 3){
					this.isAddArticleC = true
					return
				}else if(id == 4){
					this.isAddArticleD = true
					return
				}else if(id == 5){
					this.isAddArticleE = true
					return
				}else if(id == 6){
					this.isAddArticleF = true
					return
				}
			},
			
			blur(id){
			if(id==1){
				this.isAddArticleA = false
				return
			}else if(id == 2){
				this.isAddArticleB = false
				return
			}else if(id == 3){
				this.isAddArticleC = false
				return
			}else if(id == 4){
				this.isAddArticleD = false
				return
			}else if(id == 5){
				this.isAddArticleE = false
				return
			}else if(id == 6){
				this.isAddArticleF = false
				return
			}
			},
			
			nextStep() {
				this.step = 1
			},
			changeLook() {
				this.isShowPassword = !this.isShowPassword
				this.isShowPassword == true ? this.openIndex = 0 : this.openIndex = 1
			},
			goBackStep() {
				this.step = 0
			},
			readRegistMessage() {
				this.isReadRegistInfo = !this.isReadRegistInfo
			},
			goLogin() {
				uni.navigateTo({
					url: '/pages/login_new/login_new'
				})
			},
			lookRegist() {
				this.isShowRegistInfo = true
			},
			no() {
				this.isShowRegistInfo = false
				this.isReadRegistInfo = false
			},
			yes() {
				this.isShowRegistInfo = false
				this.isReadRegistInfo = !this.isReadRegistInfo
			},
			handleFocus(name){
				this.isFocus = name
			},
			async registAndLogin() {
				console.log(this.data)
				if (this.isReadRegistInfo == false) {
					uni.showToast({
						icon: 'error',
						title: '請勾選用戶注冊協議',
						duration: 1000
					})
					return;
				}
				const res = await this.$api.regist(this.data)
				console.log(res)
				if (res.code == 200) {
					const loginUser = {
						account:this.data.phone?this.data.phone:this.data.email,
						password:this.data.loginPassword
					}
					console.log(loginUser)
					let resUser = await this.$api.login(loginUser)
					console.log(resUser)
					if (resUser.code == 200) {
						uni.showToast({
							icon: 'success',
							title: '注冊成功',
							duration: 1000
						})
						setTimeout(()=>{
							this.$cache.set(this.$config.tokenStorageKey, resUser.data.accessToken)
							uni.navigateTo({
								url: '/pages/home/homePage'
							})
						},1000)
					}else{
						uni.showToast({
							icon: 'error',
							title: '登錄失敗',
							duration: 1000
						})
					}
				}else{
					uni.showToast({
						icon: 'error',
						title: '注冊失敗',
						duration: 1000
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.spirit_mask{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 502;
		background-color: #000;
		opacity: .8;
	}
	.newBox{
		width: 100%;
		height: 100vh;
		.focus{
			border: 1px solid !important;
		    border-image: linear-gradient(to right, rgb(135,57,245) 0%,rgb(70,104,253), rgb(25,137,253)) 10 !important;
		}
		.last{
			width: 100%;
			height: 5%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding-right: 5%;
			.ss{
				font-size: 14px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: rgb(101,118,104);
			}
			.sss{
				font-size: 14px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #33A7FF;
				margin-right: 5%;
			}
		}
		.TT{
			width: 100%;
			height: 10%;
			display: flex;
			align-items: center;
			justify-content: center;
			.btn{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 90%;
				height: 56px;
				background: linear-gradient(45deg, #9331F5 0%, #0A95FF 100%);
				border-radius: 8px 8px 8px 8px;
				opacity: 1;
				color: #ffffff;
			}
		}
		.T{
			width: 100%;
			height: 5%;
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-left: 5%;
			.haveRead {
				background: linear-gradient(to right, rgb(135, 57, 245) 0%, rgb(70, 104, 253), rgb(25, 137, 253)) !important;
			}
			.ii{
				width: 20px;
				height: 20px;
				background: rgb(36,42,51);
				position: relative;
				.rightImg{
					position: absolute;
					top: 0;
					left: 0;
					width: 20px;
					height: 20px;
				}
			}
			.iii{
				font-size: 12px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
				margin-left: 5px;
			}
			.iiii{
				font-size: 12px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;			
				color: #33A7FF;
				margin-left: 5px;
			}
		}
		.A{
			width: 100%;
			height: 5%;
			display: flex;
			align-items: center;
			padding-left: 2%;
			font-size: 24px;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: #ffffff;
		}
		.B{
			width: 100%;
			height: 4%;
			display: flex;
			align-items: center;
			padding-left: 5%;
			font-size: 14px;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
			color: rgb(88,94,100);
		}
		.C{
			width: 100%;
			height: 10%;
			display: flex;
			align-items: flex-start;
			justify-content: center;
			position: relative;
			.gets{
				color: #ccc !important;
			}
		    .get{
				position: absolute;
				right: 5%;
				top: 25%;
				font-size: 16px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #33A7FF;
			}
			.eye{
				position: absolute;
				right: 5%;
				top: 5%;
				width: 48px;
				height: 48px !important;
			}
			.i{
				width: 90%;
				height: 56px;
				font-size: 14px;
				color: rgb(88,94,100);
				padding-left: 10px;
				background: #242A33;
				border-radius: 8px 8px 8px 8px;
				opacity: 1;
				border: 1px solid #363F4D;
			}
		}
	}
	
	
	.focus{
		border: 2rpx solid;
		border-image: linear-gradient(to left,#9331F5,#0A95FF) 10;
	}
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

			.registInfoTex {
				width: 90%;
				height: 900rpx;
				position: fixed;
				top: 200rpx;
				margin-left: 4.5%;
				background-color: rgb(24, 38, 65);
				border: 1px solid rgb(123, 130, 151);
				border-bottom: none;

				.title {
					width: 100%;
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					border: 1px solid rgb(123, 130, 151);
					border-bottom: none;
					border-right: none;
					border-left: none;

					.infoRegist {
						color: #FFFFFF;
						font-size: 35rpx;
						font-weight: bold;
					}
				}

				.info {
					width: 95%;
					height: 650rpx;
					display: flex;
					justify-content: center;
					overflow: scroll;

					.infoTwo {
						color: #FFFFFF;
						padding-right: 20rpx;
					}
				}

				.btnGroup {
					width: 100%;
					height: 155rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;

					.btn {
						width: 220rpx;
						height: 65rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #FFFFFF;
					}

					.agree {
						background: linear-gradient(to right, rgb(135, 57, 245) 0%, rgb(70, 104, 253), rgb(25, 137, 253));
					}

					.noAgree {
						border: 1px solid rgb(123, 130, 151);
						background: rgb(29, 41, 77);
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
			margin-top: 20rpx;
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
				margin-top: 50rpx;
				margin-bottom: 50rpx;
				align-items: center;
				justify-content: center;
				color: #fff;
				background: linear-gradient(to right, rgb(135, 57, 245) 0%, rgb(70, 104, 253), rgb(25, 137, 253));
			}
		}


		.goToInfo {
			width: 100%;
			height: 40rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.hasAccount {
				font-size: 30rpx;
				color: grey;
			}

			.goToLogin {
				font-size: 30rpx;
				color: rgb(25, 137, 253);
				margin-right: 40rpx;
			}
		}

		.downLoad {
			width: 100%;
			height: 40rpx;
			position: fixed;
			bottom: 120rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.downTxt {
				font-size: 30rpx;
				color: rgb(25, 137, 253);
				padding-right: 10rpx;
			}

			.downImg {
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
