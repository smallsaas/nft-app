<template>
	<view class="loginBox">
		<view class="box">
			<!-- <view class="backImg"><image class="back" src="../../static/login/back.png" mode="widthFix"></image></view> -->
			<!-- <view class="loginText"><text class="text">歡迎登錄NFT平台</text></view> -->
			<image src="../../static/login/bg.png" mode="aspectFit" class="loginBg"></image>
			<view class="label"><text class="labelTxt">賬号</text></view>
			<view class="inputBox">
				<input :class="isShowFocusA?'account focus':'account'" type="text" placeholder="請輸入賬号" v-model="data.account" @focus="focus(1)" @blur="blur(1)"></view>
			<view class="info" v-if="false"><text class="infoText">賬号有誤，請輸入正确的手機号碼</text></view>
			<view class="label"><text class="labelTxt">密碼</text></view>
			<view class="inputBox">
				<input :class="{focus:isShowFocusP}" class="account" type="text" v-model="data.password" :password="isShowPassword" placeholder="請輸入密碼" @focus="focus(2)" @blur="blur(2)"><image @click="changeLook()" class="eye" :src="isOpenLook[openIndex]" mode="widthFix"></image></view>
			<view class="label"><text class="labelTxt">驗證碼</text></view>
			<view class="viewBox">
				<view class="n">
									<input :class="{focus:isShowFocusY}"  type="text" placeholder="請輸入驗證碼" class="yzm" @focus="focus(3)" @blur="blur(3)" v-model="checkyzm">
									<view class="yzmBox" @click="change"><span :style="so" class="a">{{list[o]}}</span><span :style="st" class="a">{{list[t]}}</span><span :style="sth" class="a">{{list[th]}}</span><span :style="sf" class="a">{{list[f]}}</span></view>
									<image v-if="false" class="right" src="../../static/login/right.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="loginBox"><button class="loginBtn" @click="login">登錄</button></view>
			<view class="opeation"><text class="forget" @click="goFindP">忘記密碼?</text><text class="regist" @click="goToRegist()">注冊賬号</text></view>
		</view>
	</view>
</template>

<script>
    import moment from 'moment'
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
					account:'18689911298',
					// password:'a111111',
					password:'a123456',
					//18689911298
					//13925814700
					//13800000002 生産賬戶13800000002 密碼a123456
					//13313331001
					//13600136003
					//13422212814
					//18664521094
					//A123456
					//13814736900
					//a123456
					//18689911295
					verifyCode:'',
					//13425836900
					 //A123456789
					  // 15322315902
					  // 13313331137
					  // 123456
					  //13147258369
					  // 13321370747
					  //15322315900
					  //13929292929
				},
				list:['1','2','3','4','5','6','7','8','9'],
				yanzhengma:'',
				checkyzm:'',
				o:0,
				t:0,
				th:0,
				f:0,
				so:'',
				st:'',
				sth:'',
				sf:''
			}
		}, 
		mounted() {
			this.o = Math.floor( Math.random() * 9)
			this.t = Math.floor( Math.random() * 9)
			this.th = Math.floor( Math.random() * 9)
			this.f = Math.floor( Math.random() * 9)
			this.yanzhengma = this.list[this.o] + this.list[this.t] + this.list[this.th] + this.list[this.f]
			this.getStyle()
		},
		methods: {
			getStyle(){
			let chars = [
			"font-weight: bold;margin-right:5px;font-size: 32px;text-decoration:overline;color:#BA55D3;font-family: 'Arabic Typesetting'",
			"font-weight: bold;font-size: 26px;text-decoration:overline;color:pink;font-family: 'PingFang SC'",
			"font-weight: solid;font-size: 33px;text-decoration:line-through;color:hotpink;font-family: Vijaya",
			"font-weight: bold;font-size: 25px;text-decoration:underline;color:#9400D3; font-family: Aharoni",
			"font-weight: bold;font-size: 29px;text-decoration:underline;color:#FF8C00;font-family: 'Arabic Typesetting'",
			"font-weight: bold;font-size: 27px;text-decoration:line-through;color:#FF1493;font-family: 'PingFang SC'",
			"font-weight: solid;font-size: 28px;text-decoration:line-through;color:#1E90FF;font-family: Vijaya",
			];
			let res = [];
			for (let i = 0; i < 9; i++) {
			let id = Math.ceil(Math.random() * 9);
			res[i] += chars[id-1];
			}
			this.so = res[0];
			this.st = res[1];
			this.sth = res[2];
			this.sf = res[3];
			return res.toString();
			},
			change(){
				this.o = Math.floor( Math.random() * 9)
				this.t = Math.floor( Math.random() * 9)
				this.th = Math.floor( Math.random() * 9)
				this.f = Math.floor( Math.random() * 9)
				this.yanzhengma = this.list[this.o] + this.list[this.t] + this.list[this.th] + this.list[this.f]
				this.getStyle()
			},
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
				let that = this;
				console.log(this.checkyzm , this.yanzhengma)
				if(this.checkyzm == ''){
					uni.showToast({
						title:'請輸入驗證碼',
						icon:"error"
					})
					return
				}
				if(this.checkyzm !== this.yanzhengma){
					uni.showToast({
						title:'驗證碼錯誤',
						icon:"error"
					})
				}else{
					let res=await that.$api.login(that.data)
					console.log(res)
					if(res.code == 200){
                        
                        // 记录此刻登录的时间
                        uni.setStorageSync('prevLoginTime', moment().format('YYYY-MM-DD HH:mm:ss'))
                        
						that.$cache.set(that.$config.tokenStorageKey,res.data.accessToken)
						let user = await that.$api.getInformationNew()
						if(user.code == 200){
							that.$cache.set("userId",user.data.id)
							that.$cache.set("status",user.data.status)
							uni.showToast({
								title:'登錄成功',
								duration:1000,
								success() {
									setTimeout(async()=>{
										// 獲取後台配置緩存
										let fieldConfig = await that.$api.getFieldConfig()
										if(fieldConfig.code === 200){
											let fieldData = fieldConfig.data
											let fieldGroup = {}
											fieldData.map((item,i)=>{
												console.log(item,"ITEM")
												fieldGroup[item.field] = item.value
											})
											console.log(fieldGroup,"fieldGroup")
											that.$cache.set("fieldGroup",fieldGroup)
										}else{
											uni.showToast({
												title:"獲取配置失敗",
												icon:"error"
											})
										}
									},1000)

								}
							})
							setTimeout(()=>{
								uni.reLaunch({
									url:'/pages/home/homePage'
								})
							},1000)
						}
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				}
				
				
				// that.$cache.set(that.$config.tokenStorageKey,'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.eyJvcmdJZCI6IiIsInVzZXJJZCI6MTEzLCJhY2NvdW50IjoiYWNjNjExMjQ4MzciLCJkb21haW5Vc2VySWQiOjU4LCJpYXQiOjE2NDIxMjUxNTUsImp0aSI6IjExMyIsInN1YiI6ImFjYzYxMTI0ODM3IiwiZXhwIjoxNjQyMzg0MzU1fQ.jyVzbOeysm6hQPPKKyzKGALTR6STLGvhIqgbcH2cCa9AnmFWznT5qRQ4JZTsSCjirjjgZ4_jwz0DsNdhCvOmBw')
				// uni.navigateTo({
				// 	url:'/pages/home/homePage'
				// })
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
			
			.loginBg{
				width: 95%;
				// height: 200px !important;
				margin-left: 2.5%;
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
				margin-top: 30rpx;
				padding-left: 4%;
				.labelTxt{
					color: grey;
				}
			}
			
			.inputBox{
				width: 100%;
				height: 80rpx;
				// padding-left: 30rpx;
				margin-top: 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.account{
					width: 90%;
					height: 80rpx;
					border-radius: 10rpx;
					background: rgb(36,42,51);
					// padding-left: 20rpx;
					padding: 10rpx 20rpx;
					margin: 20rpx 0;
					outline-style: none;
				}
				.eye{
					width: 60rpx;
					height: 60rpx;
					position: absolute;
					right: 6%;
					// top: 15rpx;
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
				margin-top: 15rpx;
				width: 100%;
				height: 80rpx;
				// padding-left: 3.8%;
				display: flex;
				// flex-direction: row;
				position: relative;
				align-items: center;
				justify-content: center;
				margin: 20rpx 0px !important;
				.n{
					width: 100%;
					height: 80rpx;
					display: flex;
					flex-direction: row;
					display: flex;
					align-items: center;
					// justify-content: center;
					.yzm{
						// margin-left: 4%;
						width: 40%;
						height: 80rpx;
						border-radius: 10rpx;
						background: rgb(36,42,51);
						// padding-left: 20rpx;
						padding: 10rpx 20rpx;
						outline-style: none;
						margin-left: 3%;
						margin-right: 25rpx;
					}
					.yzmBox{
						// margin-left: 2.5%;
						// margin-right: 4%;
						width: 40%;
						height: 80rpx;
						// margin-left: 1%;
						border-radius: 10rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						color: rgb(173,92,250);
						font-size: 28px;
					    background-image: url(https://s2.loli.net/2022/01/08/QK4IeajhiuzA1RZ.jpg);
						opacity: .8;
						// position: absolute;
						// right: 2.5%;
						padding: 10rpx 20rpx;
						// right: 10%;
						.a{
							margin-right: 15px;
						}
					}
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
					width: 92%;
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
