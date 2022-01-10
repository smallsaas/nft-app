
 <template>
 	<view class="appHome">
 		<view class="body">
 			<!-- <view class="topBox">
 				<image src="../../static/login/newTabbar.png" class="tabbarImg"></image>
 				<image src="../../static/login/homeLogo.png" class="applogo" mode="aspectFit"></image>
 				<image src="../../static/login/menuLogo.png" class="menulogo" mode="aspectFit"></image>
 			</view> -->
 			<view class="bodyBox">
 				<image src="../../static/login/newLoginPage.png" class="bodyImg"></image>
 				<button class="btn" :class="{addClass:isShowAddClass}" @click="addClass" @touchstart="a">開始遊戲</button>
 				<button class="btn btns">下載安卓APP</button>
 			</view>
 		</view>
 	</view>
 </template>
 
 <script>
 	export default {
 		data(){
 			return{
 				isShowAddClass:false
 			}
 		},
 		methods:{
 			a(e){
 				console.log(e)
 			},
 			addClass(){
 				this.isShowAddClass = true
				
				uni.redirectTo({
					url:"/pages/login_new/login_new"
				})
 			}
 		}
 	}
 </script>
 
 <style lang="less">
 	@keyframes opacityAnimation{
 		0%{
 			opacity: 0.75;
 		}
 		25%{
 			opacity: 0.5;
 		}
 		50%{
 			opacity: 0.25;
 		}
 		75%{
 			opacity: 0;
 		}
 		100%{
 			opacity: 1;
 		}
 	}
 	
 	
     @keyframes showBtn{
 	10%{
 	background:radial-gradient(Circle,#1E7AA5 28%, #2287B7 30%, #2287B7 48%,#208FC1 60%);
 	}
 	20%{undefined
 	background:radial-gradient(Circle,#1E7AA5 32%, #2287B7 34%, #2287B7 52%,#208FC1 60%);
 	}
 	40%{undefined
 	background:radial-gradient(Circle,#1E7AA5 34%, #2287B7 36%, #2287B7 54%,#208FC1 60%);
 	}
 	60%{undefined		
 	background:radial-gradient(Circle,#1E7AA5 36%, #2287B7 38%, #2287B7 56%,#208FC1 60%);
 	}
 	80%{
 	background:radial-gradient(Circle,#1E7AA5 38%, #2287B7 40%, #2287B7 58%,#208FC1 60%);
 	}
 	100%{
 	background:radial-gradient(Circle,#1E7AA5 40%, #2287B7 42%, #2287B7 60%,#208FC1 60%);}
 }
 	.appHome {
 		width: 100%;
 		height: 100vh !important;
 		overflow: hidden !important;
 		.body {
 			width: 100vw !important;
 			height: 100vh !important;
 			overflow: hidden !important;
 			.bodyBox{
 				width: 100% !important;
 				height: 100% !important;
 				position: relative;
 				.bodyImg{
 					width: 100% !important;
 					height: 100% !important;
 				}
 				.btn{
 					position: absolute;
 					top: 65%;
 					left: 5%;
 					width: 90% !important;
 					height: 112rpx !important;
 					background: linear-gradient(45deg, #9331F5 0%, #0A95FF 100%);
 					border-radius: 16rpx 16rpx 16rpx 16rpx;
 					opacity: 1;
 					display: flex;
 					align-items: center;
 					justify-content: center;
 					font-size: 36rpx;
 					font-family: PingFang SC-Bold, PingFang SC;
 					font-weight: bold;
 					color: #ffffff;
 					transition: all .5s;
 				}
 				.btns{
 					top: 78%;
 					background: #F163AF;
 				}
 				// .addClass{
 				// 	outline:none;
 				// 	animation: opacityAnimation 1s linear;
 				// 	animation-fill-mode:forwards;
 				// }
 			}
 			// .topBox{
 			// 	width: 100%;
 			// 	height: 8%;
 			// 	position: relative;
 			// 	.tabbarImg {
 			// 		width: 100% !important;
 			// 		height: 108rpx !important;
 			// 	}
 			// 	.applogo{
 			// 		position: absolute;
 			// 		left: 5%;
 			// 		top: 23%;
 			// 		width: 216rpx;
 			// 		height: 72rpx !important;
 			// 	}
 			// 	.menulogo{
 			// 		position: absolute;
 			// 		right: 5%;
 			// 		top: 30%;
 			// 		width: 48rpx;
 			// 		height:48rpx !important;
 			// 	}
 			// }
 		}
 	}
 </style>
