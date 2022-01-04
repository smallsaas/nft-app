<template>
	<view class="bottomTapss">
		<view class="item"  v-for="(item,index) in list" :key="index" @click="opeation(index)">
			<image :src="item.icon" mode="widthFix" class="icon"></image>
			<text class="name">{{item.title}}</text>
			<image class="moreImg" src="../../static/service/more.png" mode="widthFix"></image>
		</view>
		<view class="item items" @click="logout">
			<image src="../../static/service/out.png" mode="widthFix" class="icon"></image>
			<text class="name">退出登录</text>
			<image class="moreImg" src="../../static/service/more.png" mode="widthFix"></image>
		</view>
		<view class="line"></view>
		<view class="line lineT"></view>
		<!-- <view class="box">
			<view class="item" v-for="(item,index) in list" :key="index" @click="opeation(index)">
				<view class="itemL">
					<image class="tapI" :src="item.icon" mode="widthFix"></image>
					<text class="title">{{item.title}}</text>
				</view>
				<view class="itemR"><image class="moreImg" src="../../static/service/more.png" mode="widthFix"></image></view>
			</view>
		</view>
		<view class="elseBox">
			<view class="item" @click="logout">
				<view class="itemL">
					<image class="tapI" src="../../static/service/out.png" mode="widthFix"></image>
					<text class="title">退出登录</text>
				</view>
				<view class="itemR"><image class="moreImg" src="../../static/service/more.png" mode="widthFix"></image></view>
			</view>
		</view>
		<!-- 邀请组件 -->
		<invite v-if="isShowInvite" :data="forChild" @close="getValueFromChild"></invite>
	</view>
</template>

<script>
	import invite from './invite.vue'
	export default{
		components:{invite},
		props: {
			data: Object,
		},
		data(){
			return{
				list:[{
					icon:'../../static/service/invite.png',
					title:'邀请好友'
				},{
					icon:'../../static/service/shenshu.png',
					title:'申述服务'
				},{
					icon:'../../static/service/com.png',
					title:'联系我们'
				}],
				isShowInvite:false,
				forChild:{}
			}
		},
		created() {
			console.log(this.data)
			this.forChild.invitationCode = this.data.invitationCode
		},
		methods:{
			logout(){
				this.$cache.remove('token')
				uni.showToast({
					title:'退出成功',
					duration:1000
				})
				setTimeout(()=>{
					uni.navigateTo({
						url:'/pages/login_new/login_new'
					})
				},1000)
			},
			opeation(index){
				if(index==0){
					this.isShowInvite = true
				}
				if(index==1){
					uni.navigateTo({
						url:'/pages/representations_new/representations_new'
					})
				}
			},
			getValueFromChild(){
				this.isShowInvite = false
			}
		}
	}
</script>

<style lang="less">
	.bottomTapss{
		width: 100%;
		height: 300rpx !important;
		margin-top: 34rpx;
		position: relative;
		.line{
			position: absolute;
			top: 100rpx;
			left: 50rpx;
			width: 323px;
			height: 1rpx;
			border-bottom: 1px solid rgb(36,43,48) !important;
		}
		.lineT{
			top: 200rpx;
		}
		.item{
			width: 343px;
			height: 50px;
			border-radius: 0px 0px 0px 0px;
			opacity: 1;
			margin: 0 auto;
			background-color: #11181E;
			position: relative;
			.icon{
				margin: 36rpx 34rpx;
				width: 32rpx;
				height: 32rpx !important;
				
			}
			.name{
				font-size: 16px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				position: absolute;
				left: 80rpx;
				top: 28rpx;
			}
			.moreImg{
				position: absolute;
				right: 32rpx;
				top: 26rpx;
				width: 48rpx;
				height: 48rpx !important;
			}
		}
		.items{
			margin-top: 20rpx;
			background-color: #11181E;
		}
	}
	.bottomTaps{
		width: 100%;
		height: 400rpx !important;
		.box,.elseBox{
			width: 90% !important;
			height: 240rpx !important;
			margin-left: 5%;
			background: rgb(17,24,30);
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			padding-bottom: 10rpx;
			.item{
				width: 90%;
				flex: 1;
				border-bottom: 1px solid rgb(36,43,48) !important;
				margin-left: 5%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				.itemL{
					width: 40%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					.tapI{
						width: 40rpx;
						height: 40rpx;
						margin-right: 10rpx;
					}
					.title{
						color: #FFFFFF;
						font-size: 30rpx;
					}
				}
				.itemR{
					width: 10%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					.moreImg{
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
		.elseBox{
			width: 90% !important;
			height: 80rpx !important;
			margin-left: 5%;
			background: rgb(17,24,30);
			border-radius: 20rpx;
			margin-top: 40rpx;
		}
	}
</style>
