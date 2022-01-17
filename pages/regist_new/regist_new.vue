<template>
	<view class="registBox">
		<view class="box">
			<!-- 模态框 -->
			<view class="motai" v-if="isShowRegistInfo">
				<view class="title"><text class="infoRegist">用戶注冊協議</text></view>
				<view class="info"><text class="infoTwo" v-html="content"></text>
				</view>
				<view class="btnGroup"><button class="btn agree" @click="yes">同意</button><button class="btn noAgree"
						@click="no">拒絕</button></view>
			</view>
			<view class="registText">
				<text class="text">會員注冊</text>
			</view>
			<view class="labelTetx">
				<text class="text">昵稱</text>
			</view>
			<view class="inputBox">
				<input type="text" placeholder="請輸入昵稱" class="inputBoxC" v-model="data.name" @focus="focus(1)"
					@blur="blur(1)" :class="{focus:isAddArticleA}" />
			</view>
			<view class="labelTetx">
				<text class="text">手機号碼</text>
			</view>
			<view class="inputBox">
				<input type="number" placeholder="請輸入手機号碼" class="inputBoxC" v-model="data.phone" @focus="focus(2)"
					@blur="blur(2)" :class="{focus:isAddArticleB}" />
			</view>
			<view class="labelTetx">
				<text class="text">驗證碼</text>
			</view>
			<view class="inputBox">
				<view class="HC">
					<input type="number" placeholder="請輸入驗證碼" class="inputBoxC" v-model="data.verifyCode" @focus="focus(3)"
						@blur="blur(3)" :class="{focus:isAddArticleC}" />
					<text class="get" v-if="isShowYZM" @click="getYZM">獲取驗證碼</text>
					<text class="get gets" v-if="!isShowYZM">{{count}}秒重試</text>
				</view>
			</view>
			<view class="labelTetx">
				<text class="text">登錄密碼</text>
			</view>
			<view class="inputBox">
				<view class="HCC">
					<input type="text" placeholder="以字母開頭的6-20個字母、數字、下劃線" class="inputBoxC" v-model="data.loginPassword"
						@focus="focus(4)" @blur="blur(4)" :class="{focus:isAddArticleD}" :password="isShowPassword" />
					<image @click="changeLook()" class="eye" :src="isOpenLook[openIndex]" mode="widthFix"></image>
				</view>
			</view>
			<view class="labelTetx">
				<text class="text">支付密碼</text>
			</view>
			<view class="inputBox">
				<input type="text" placeholder="以字母開頭的6-20個字母、數字、下劃線" class="inputBoxC" v-model="data.paymentPassword"
					@focus="focus(7)" @blur="blur(7)" :class="whatFocus===7?'focus':''" />
			</view>
			<view class="labelTetx">
				<text class="text">郵箱(選填)</text>
			</view>
			<view class="inputBox">
				<input type="text" placeholder="請輸入郵箱" class="inputBoxC" v-model="data.email" @focus="focus(5)"
					@blur="blur(5)" :class="{focus:isAddArticleE}" />
			</view>
			<view class="labelTetx">
				<text class="text">邀請碼</text>
			</view>
			<view class="inputBox">
				<input type="text" placeholder="請輸入邀請碼" class="inputBoxC" v-model="data.invitationCode"
					@focus="focus(6)" @blur="blur(6)" :class="{focus:isAddArticleF}" />
			</view>
			<view class="INFO">
				<view class="INFOc">
					<view class="circle" @click="readRegistMessage" v-if="!isReadRegistInfo"></view>
					<image v-if="isReadRegistInfo" class="rightImg" src="../../static/login/yes.png" mode="widthFix"
						@click="readRegistMessage"></image>
					<text class="infoccc">注冊/登錄即代表您已閱讀并同意</text>
					<text class="infoblue" @click="lookRegist">《用戶注冊協議》</text>
				</view>
			</view>
			<view class="btnBox">
				<pretty-button class="btn" text="注冊并登錄" @click="registAndLogin"></pretty-button>
			</view>
			<view class="LAST">
				<view class="LASTc">
					<text class="TEXT">已有賬号？</text>
					<text class="TEXT TEXTB" @click="goLogin">去登錄</text>
				</view>
			</view>
		</view>

		<view class="spirit_mask" v-if="isShowRegistInfo"></view>

		<!-- 	<view class="registInfoTex">
			<view class="title"><text class="infoRegist">用戶注冊協議</text></view>
			<view class="info"><text class="infoTwo">請勾選用戶注冊協議</text>
			</view>
			<view class="btnGroup"><button class="btn agree" @click="yes">同意</button><button class="btn noAgree"
					@click="no">拒絕</button></view>
		</view> -->
		<!-- <view class="box newBox">
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
		</view> -->
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			if (e.inviteCode == undefined) {
				this.data.invitationCode = ''
				console.log(this.data)
			} else {
				this.data.invitationCode = e.inviteCode
			}
			console.log('RESSSSS', e)
			console.log('RESSSSSaaaaaaaaaaaaaaaaaaaaaaa', e.inviteCode)
		},
		data() {
			return {
				isShowYZM: true,
				count: 60,

				step: 0,
				isReadRegistInfo: false,
				isShowRegistInfo: false,
				isShowPassword: true,
				isOpenLook: ['../../static/login/eyeoff.png', '../../static/login/eye.png'],
				openIndex: 0,
				data: {
					name: '',
					phone: '',
					verifyCode: '',
					loginPassword: '',
					email: '',
					invitationCode: '',
					// operation: "register"
					// PNywB5
				},
				isFocus: '',
				whatFocus:-1,
				isAddArticleA: false,
				isAddArticleB: false,
				isAddArticleC: false,
				isAddArticleD: false,
				isAddArticleE: false,
				isAddArticleF: false,

				//注冊協議
				content: ''
			}
		},
		methods: {
			async getYZM() {
				if([undefined,null,''].includes(this.data.phone)){
					uni.showToast({
						title:"請輸入手機号碼",
						icon:"error"
					})
					return ;
				}
				console.log(this.data)
				clearInterval(time)
				const data = {
					"phone": this.data.phone,
					"operation": "register"
				}
				const res = await this.$api.message(data)
				if(res.statusCode === 200){
					uni.showToast({
						title: '發送驗證碼成功',
						icon: "success"
					})
				}else{
					uni.showToast({
						title: '發送驗證碼失敗',
						icon: "error"
					})
				}
					this.isShowYZM = !this.isShowYZM
					this.count = 60
					var time = setInterval(() => {
						this.count -= 1
						if (this.count == 0) {
							this.isShowYZM = !this.isShowYZM
							clearInterval(time)
						}
					}, 1000)
			},

			focus(id) {
				console.log(id)
				if (id == 1) {
					this.isAddArticleA = true
					return
				} else if (id == 2) {
					this.isAddArticleB = true
					return
				} else if (id == 3) {
					this.isAddArticleC = true
					return
				} else if (id == 4) {
					this.isAddArticleD = true
					return
				} else if (id == 5) {
					this.isAddArticleE = true
					return
				} else if (id == 6) {
					this.isAddArticleF = true
					return
				}else{
					this.whatFocus = id
				}
			},

			blur(id) {
				if (id == 1) {
					this.isAddArticleA = false
					return
				} else if (id == 2) {
					this.isAddArticleB = false
					return
				} else if (id == 3) {
					this.isAddArticleC = false
					return
				} else if (id == 4) {
					this.isAddArticleD = false
					return
				} else if (id == 5) {
					this.isAddArticleE = false
					return
				} else if (id == 6) {
					this.isAddArticleF = false
					return
				}else{
					this.whatFocus = -1
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
			async lookRegist() {
				console.log('AAAA')
				this.isShowRegistInfo = true
				const res = await this.$api.getUserRegistInfo()
				if (res.code == 200) {
					this.content = res.data.content
				}
				console.log('Re', res)
			},
			no() {
				this.isShowRegistInfo = false
				this.isReadRegistInfo = false
			},
			yes() {
				this.isShowRegistInfo = false
				this.isReadRegistInfo = !this.isReadRegistInfo
			},
			handleFocus(name) {
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
				// if(this.data.loginPassword)
				const res = await this.$api.regist(this.data)
				console.log(res)
				if (res.code == 200) {
					const loginUser = {
						account: this.data.phone ? this.data.phone : this.data.email,
						password: this.data.loginPassword
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
						setTimeout(() => {
							this.$cache.set(this.$config.tokenStorageKey, resUser.data.accessToken)
							uni.navigateTo({
								url: '/pages/home/homePage'
							})
						}, 1000)
					} else {
						uni.showToast({
							icon: 'error',
							title: '登錄失敗',
							duration: 1000
						})
					}
				} else {
					uni.showToast({
						icon: 'error',
						title: res.message,
						duration: 1000
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.box {
		width: 100%;
		height: 100%;

		.spirit_mask {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 502;
			background-color: #000;
			opacity: .8;
		}

		.motai {
			width: 90%;
			height: 900rpx;
			position: fixed;
			top: 200rpx;
			margin-left: 5%;
			// background-color: rgb(24, 38, 65);
			border-bottom: none;
			z-index: 99999999;

			background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
			// box-shadow: inset 1px 1px 0px 1px rgba(255,255,255,0.75), 0px 4px 16px 1px rgba(0,0,0,0.25);
			border-radius: 8px 8px 8px 8px;
			opacity: 1;
			// margin-bottom: 10px;
			border-top: 2rpx solid rgb(50, 71, 137);
			border-left: 2rpx solid rgb(50, 71, 137);

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

		.focus {
			border: 1px solid !important;
			border-image: linear-gradient(to right, rgb(135, 57, 245) 0%, rgb(70, 104, 253), rgb(25, 137, 253)) 10 !important;
		}

		.LAST {
			width: 100%;
			height: 50rpx;

			.LASTc {
				width: 100%;
				height: 50rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.TEXT {
					font-size: 12px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #ffffff;
				}

				.TEXTB {
					color: #33A7FF !important;
					margin-right: 5%;
				}
			}
		}

		.btnBox {
			width: 100%;
			height: 150rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.btn {
				width: 90%;
				height: 112rpx;
			}
		}

		.INFO {
			width: 100%;
			height: 80rpx;

			.INFOc {
				width: 100%;
				height: 80rpx;
				display: flex;
				align-items: center;
				position: relative;

				.circle {
					margin-left: 30rpx;
					width: 20px;
					height: 20px;
					background: rgb(36, 42, 51);
					margin-right: 10rpx;
				}

				.rightImg {
					margin-left: 30rpx;
					width: 20px;
					height: 20px !important;
					margin-right: 10rpx;
				}

				.infoccc {
					font-size: 12px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #ffffff;
				}

				.infoblue {
					font-size: 12px;
					font-family: PingFang SC-Regular, PingFang SC;
					font-weight: 400;
					color: #33A7FF;
				}
			}
		}

		.registText {
			width: 100%;
			height: 80rpx;
			margin-top: 20rpx;

			.text {
				margin-left: 30rpx;
				font-size: 24px;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #ffffff;
			}
		}

		.labelTetx {
			width: 100%;
			height: 45rpx;
			margin-bottom: 5rpx;

			.text {
				margin-left: 30rpx;
				font-size: 14px;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: rgb(88, 94, 100);
			}
		}

		.inputBox {
			width: 100%;
			height: 120rpx;

			.inputBoxC {
				margin: 0 auto;
				width: 90%;
				height: 100rpx;
				font-size: 14px;
				color: rgb(88, 94, 100);
				padding-left: 10px;
				background: #242A33;
				border-radius: 8px 8px 8px 8px;
				opacity: 1;
				border: 1px solid #363F4D;
			}

			.HC {
				width: 100%;
				height: 120rpx;
				position: relative;

				.inputBoxC {
					margin: 0 auto;
					width: 90%;
					height: 100rpx;
					font-size: 14px;
					color: rgb(88, 94, 100);
					padding-left: 10px;
					background: #242A33;
					border-radius: 8px 8px 8px 8px;
					opacity: 1;
					border: 1px solid #363F4D;
				}

				.get {
					position: absolute;
					top: 20%;
					right: 5%;
					font-size: 16px;
					font-family: PingFang SC-Medium, PingFang SC;
					font-weight: 500;
					color: #33A7FF;
				}

				.gets {
					color: rgb(88, 94, 100) !important;
				}
			}

			.HCC {
				width: 100%;
				height: 120rpx;
				position: relative;

				.inputBoxC {
					margin: 0 auto;
					width: 90%;
					height: 100rpx;
					font-size: 14px;
					color: rgb(88, 94, 100);
					padding-left: 10px;
					background: #242A33;
					border-radius: 8px 8px 8px 8px;
					opacity: 1;
					border: 1px solid #363F4D;
				}

				.eye {
					position: absolute;
					top: 7%;
					right: 5%;
					width: 48px;
					height: 48px !important;
				}
			}
		}

	}

	.spirit_mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 502;
		background-color: #000;
		opacity: .8;
	}

	// .newBox{
	// 	width: 100%;
	// 	height: 100vh;
	// 	.focus{
	// 		border: 1px solid !important;
	// 	    border-image: linear-gradient(to right, rgb(135,57,245) 0%,rgb(70,104,253), rgb(25,137,253)) 10 !important;
	// 	}
	// 	.last{
	// 		width: 100%;
	// 		height: 5%;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: flex-end;
	// 		padding-right: 5%;
	// 		.ss{
	// 			font-size: 14px;
	// 			font-family: PingFang SC-Regular, PingFang SC;
	// 			font-weight: 400;
	// 			color: rgb(101,118,104);
	// 		}
	// 		.sss{
	// 			font-size: 14px;
	// 			font-family: PingFang SC-Regular, PingFang SC;
	// 			font-weight: 400;
	// 			color: #33A7FF;
	// 			margin-right: 5%;
	// 		}
	// 	}
	// 	.TT{
	// 		width: 100%;
	// 		height: 10%;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: center;
	// 		.btn{
	// 			display: flex;
	// 			align-items: center;
	// 			justify-content: center;
	// 			width: 90%;
	// 			height: 56px;
	// 			background: linear-gradient(45deg, #9331F5 0%, #0A95FF 100%);
	// 			border-radius: 8px 8px 8px 8px;
	// 			opacity: 1;
	// 			color: #ffffff;
	// 		}
	// 	}
	// 	.T{
	// 		width: 100%;
	// 		height: 5%;
	// 		display: flex;
	// 		flex-direction: row;
	// 		align-items: center;
	// 		padding-left: 5%;
	// 		.haveRead {
	// 			background: linear-gradient(to right, rgb(135, 57, 245) 0%, rgb(70, 104, 253), rgb(25, 137, 253)) !important;
	// 		}
	// 		.ii{
	// 			width: 20px;
	// 			height: 20px;
	// 			background: rgb(36,42,51);
	// 			position: relative;
	// 			.rightImg{
	// 				position: absolute;
	// 				top: 0;
	// 				left: 0;
	// 				width: 20px;
	// 				height: 20px;
	// 			}
	// 		}
	// 		.iii{
	// 			font-size: 12px;
	// 			font-family: PingFang SC-Regular, PingFang SC;
	// 			font-weight: 400;
	// 			color: #ffffff;
	// 			margin-left: 5px;
	// 		}
	// 		.iiii{
	// 			font-size: 12px;
	// 			font-family: PingFang SC-Regular, PingFang SC;
	// 			font-weight: 400;			
	// 			color: #33A7FF;
	// 			margin-left: 5px;
	// 		}
	// 	}
	// 	.A{
	// 		width: 100%;
	// 		height: 5%;
	// 		display: flex;
	// 		align-items: center;
	// 		padding-left: 2%;
	// 		font-size: 24px;
	// 		font-family: PingFang SC-Bold, PingFang SC;
	// 		font-weight: bold;
	// 		color: #ffffff;
	// 	}
	// 	.B{
	// 		width: 100%;
	// 		height: 50rpx;
	// 		display: flex;
	// 		align-items: center;
	// 		padding-left: 5%;
	// 		font-size: 14px;
	// 		font-family: PingFang SC-Bold, PingFang SC;
	// 		font-weight: bold;
	// 		color: rgb(88,94,100);
	// 	}
	// 	.C{
	// 		width: 100%;
	// 		height: 130rpx;
	// 		display: flex;
	// 		align-items: flex-start;
	// 		justify-content: center;
	// 		// position: relative;
	// 		.gets{
	// 			color: #ccc !important;
	// 		}
	// 	    .get{
	// 			position: absolute;
	// 			right: 5%;
	// 			top: 41%;
	// 			font-size: 16px;
	// 			font-family: PingFang SC-Medium, PingFang SC;
	// 			font-weight: 500;
	// 			color: #33A7FF;
	// 		}
	// 		.eye{
	// 			position: absolute;
	// 			right: 5%;
	// 			top: 53.5%;
	// 			width: 48px;
	// 			height: 48px !important;
	// 		}
	// 		.i{
	// 			width: 90%;
	// 			height: 56px;
	// 			font-size: 14px;
	// 			color: rgb(88,94,100);
	// 			padding-left: 10px;
	// 			background: #242A33;
	// 			border-radius: 8px 8px 8px 8px;
	// 			opacity: 1;
	// 			border: 1px solid #363F4D;
	// 			position: relative;
	// 		}
	// 	}
	// }


	// .focus{
	// 	border: 2rpx solid;
	// 	border-image: linear-gradient(to left,#9331F5,#0A95FF) 10;
	// }
	// .registBox {
	// 	width: 100%;
	// 	height: 100vh;
	// 	background: rgb(5, 14, 23);


	// 	.haveRead {
	// 		background: linear-gradient(to right, rgb(135, 57, 245) 0%, rgb(70, 104, 253), rgb(25, 137, 253));
	// 	}

	// 	.box {
	// 		width: 100%;
	// 		height: 100%;

	// 		.registInfoTex {
	// 			width: 90%;
	// 			height: 900rpx;
	// 			position: fixed;
	// 			top: 200rpx;
	// 			margin-left: 4.5%;
	// 			background-color: rgb(24, 38, 65);
	// 			border: 1px solid rgb(123, 130, 151);
	// 			border-bottom: none;

	// 			.title {
	// 				width: 100%;
	// 				height: 80rpx;
	// 				display: flex;
	// 				align-items: center;
	// 				justify-content: center;
	// 				border: 1px solid rgb(123, 130, 151);
	// 				border-bottom: none;
	// 				border-right: none;
	// 				border-left: none;

	// 				.infoRegist {
	// 					color: #FFFFFF;
	// 					font-size: 35rpx;
	// 					font-weight: bold;
	// 				}
	// 			}

	// 			.info {
	// 				width: 95%;
	// 				height: 650rpx;
	// 				display: flex;
	// 				justify-content: center;
	// 				overflow: scroll;

	// 				.infoTwo {
	// 					color: #FFFFFF;
	// 					padding-right: 20rpx;
	// 				}
	// 			}

	// 			.btnGroup {
	// 				width: 100%;
	// 				height: 155rpx;
	// 				display: flex;
	// 				flex-direction: row;
	// 				align-items: center;
	// 				justify-content: center;

	// 				.btn {
	// 					width: 220rpx;
	// 					height: 65rpx;
	// 					display: flex;
	// 					align-items: center;
	// 					justify-content: center;
	// 					color: #FFFFFF;
	// 				}

	// 				.agree {
	// 					background: linear-gradient(to right, rgb(135, 57, 245) 0%, rgb(70, 104, 253), rgb(25, 137, 253));
	// 				}

	// 				.noAgree {
	// 					border: 1px solid rgb(123, 130, 151);
	// 					background: rgb(29, 41, 77);
	// 				}
	// 			}
	// 		}

	// 		.backImg {
	// 			width: 60rpx;
	// 			height: 60rpx;
	// 			padding: 10rpx 10rpx;
	// 			display: flex;
	// 			align-items: center;
	// 			justify-content: center;

	// 			.back {
	// 				width: 60rpx;
	// 				height: 60rpx;
	// 			}
	// 		}
	// 	}

	// 	.loginText {
	// 		width: 100%;
	// 		height: 100rpx;
	// 		margin-top: 60rpx;
	// 		padding-left: 30rpx;
	// 		display: flex;
	// 		align-items: center;

	// 		.text {
	// 			color: #FFFFFF;
	// 			font-size: 40rpx;
	// 		}
	// 	}

	// 	.label {
	// 		width: 100%;
	// 		height: 40rpx;
	// 		margin-top: 40rpx;
	// 		padding-left: 30rpx;

	// 		.labelTxt {
	// 			color: grey;
	// 		}
	// 	}

	// 	.inputBox {
	// 		width: 100%;
	// 		height: 80rpx;
	// 		// padding-left: 30rpx;
	// 		margin-top: 20rpx;
	// 		position: relative;
	// 		display: flex;
	// 		justify-content: center;
	// 		align-items: center;
	// 		.account {
	// 			width: 85%;
	// 			height: 80rpx;
	// 			display: flex;
	// 			justify-content: center;
	// 			border-radius: 20rpx;
	// 			background: rgb(36, 42, 51);
	// 			// padding-left: 10rpx;
	// 				padding: 10rpx 20rpx;
	// 				// margin: 20rpx 0;
	// 		}

	// 		.eye {
	// 			width: 60rpx;
	// 			height: 60rpx;
	// 			position: absolute;
	// 			right: 8%;
	// 		}

	// 		.getYZM {
	// 			position: absolute;
	// 			color: rgb(47, 113, 168);
	// 			right: 8%;
	// 			font-size: 30rpx;
	// 			// top: 25rpx;
	// 		}
	// 	}

	// 	.info {
	// 		width: 100%;
	// 		height: 30rpx;
	// 		padding-left: 30rpx;
	// 		margin-top: 5rpx;

	// 		.infoText {
	// 			color: red;
	// 			font-size: 20rpx;
	// 		}
	// 	}

	// 	.loginBox {
	// 		width: 100%;
	// 		height: 120rpx;
	// 		margin-top: 20rpx;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: center;

	// 		.loginBtn {
	// 			width: 680rpx;
	// 			height: 80rpx;
	// 			display: flex;
	// 			margin-top: 50rpx;
	// 			margin-bottom: 50rpx;
	// 			align-items: center;
	// 			justify-content: center;
	// 			color: #fff;
	// 			background: linear-gradient(to right, rgb(135, 57, 245) 0%, rgb(70, 104, 253), rgb(25, 137, 253));
	// 		}
	// 	}


	// 	.goToInfo {
	// 		width: 100%;
	// 		height: 40rpx;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: flex-end;

	// 		.hasAccount {
	// 			font-size: 30rpx;
	// 			color: grey;
	// 		}

	// 		.goToLogin {
	// 			font-size: 30rpx;
	// 			color: rgb(25, 137, 253);
	// 			margin-right: 40rpx;
	// 		}
	// 	}

	// 	.downLoad {
	// 		width: 100%;
	// 		height: 40rpx;
	// 		position: fixed;
	// 		bottom: 120rpx;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: center;

	// 		.downTxt {
	// 			font-size: 30rpx;
	// 			color: rgb(25, 137, 253);
	// 			padding-right: 10rpx;
	// 		}

	// 		.downImg {
	// 			width: 50rpx;
	// 			height: 50rpx;
	// 		}
	// 	}

	// 	.check {
	// 		width: 100%;
	// 		height: 40rpx;
	// 		margin-top: 30rpx;
	// 		padding-left: 30rpx;
	// 		display: flex;
	// 		flex-direction: row;
	// 		align-items: center;

	// 		.checkBox {
	// 			width: 30rpx;
	// 			height: 30rpx;
	// 			border: 1px solid grey;
	// 			display: flex;
	// 			align-items: center;
	// 			justify-content: center;
	// 			position: relative;

	// 			.rightImg {
	// 				width: 30rpx;
	// 				height: 30rpx;
	// 				position: absolute;
	// 			}

	// 		}

	// 		.checkInfo {
	// 			margin-left: 10rpx;
	// 			width: 630rpx;
	// 			height: 30rpx;
	// 			font-size: 20rpx;
	// 			color: grey;

	// 			.registInfo {
	// 				margin-left: 10rpx;
	// 				color: rgb(23, 74, 115);
	// 			}
	// 		}
	// 	}
	// }
</style>
