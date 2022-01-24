<template>
	<view class="bottomTapss">
		<view class="item"  v-for="(item,index) in list" :key="index" @click="opeation(index)">
			<image :src="item.icon" mode="widthFix" class="icon"></image>
			<text class="name">{{item.title}}</text>
			<image class="moreImg" src="../../static/service/more.png" mode="widthFix"></image>
		</view>
		<view class="item items" @click="logout">
			<image src="../../static/service/out.png" mode="widthFix" class="icon"></image>
			<text class="name">退出登錄</text>
			<image class="moreImg" src="../../static/service/more.png" mode="widthFix"></image>
		</view>
		<view class="line"></view>
		<view class="line lineT"></view>
		<!-- 邀請組件 -->
		<invite v-if="isShowInvite" :data="forChild" @close="getValueFromChild"></invite>
		<!-- 系統公告 -->
		<view class="service-mask" v-if="isShowSysNotice"></view>
		<view v-if="isShowSysNotice" class="service-modal">
			<view class="service-modal-container">
				<view class="service-modal-title">
					<text class="service-modal-title-text">系統公告</text>
				</view>
				<view class="service-modal-content">
					<view v-html="sysNoticeContent" />
				</view>
				<view class="service-modal-buttonGroup">
					<pretty-button class="service-modal-button" text="關閉" @click="getValueFromChild()"></pretty-button>
				</view>
			</view>
		
		</view>
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
					title:'邀請好友'
				},{
					icon:'../../static/service/shenshu.png',
					title:'申述服務'
				},{
					icon:'../../static/service/com.png',
					title:'系統公告'
				}],
				isShowInvite:false,
				isShowSysNotice: false,
				forChild:{},
				sysNoticeContent:''
			}
		},
		created() {
			this.forChild.invitationCode = this.data.invitationCode
		},
		methods:{
			logout(){
				this.$cache.remove('token')
				let pageCacheList = this.$cache.get('pageCacheList')
				let pageFormCacheList = this.$cache.get("pageFormCacheList")
				let that = this
				if(this.$config.clearPageCache){
					console.log("開始删除頁面緩存")
					if(pageCacheList){
						pageCacheList.map((item,i)=>{
								that.$cache.remove(item)
								console.log("删除頁面緩存"+item)
						})
					}
					if(pageFormCacheList){
						pageFormCacheList.map((item,i)=>{
							that.$cache.remove(item)
							console.log("删除頁面表單緩存"+item)
						})
					}
					this.$cache.remove('pageCacheList')
					this.$cache.remove('pageFormCacheList')
					console.log("删除緩存成功")
				}
				this.$cache.remove('userCache')
				uni.showToast({
					title:'退出成功',
					duration:1000
				})
				setTimeout(()=>{
					uni.reLaunch({
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
						url:'/pages/toushu/toushu'
					})
				}
				if(index==2){
					this.isShowSysNotice = true;
					this.getSysNotice()
				}
			},
			getValueFromChild(){
				this.isShowInvite = false
				this.isShowSysNotice = false
			},
			
			async getSysNotice(){
				const respData = await this.$api.getSysNotice();
				if(respData.code == 200){
					if(respData.data){
						this.sysNoticeContent = respData.data.content;
					}
				}else{
					console.error("获取系统公告失败 = ", respData)
				}
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
	
	.service-mask{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #000;
		opacity: .8;
		z-index: 600;
	}
	.service-modal{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 601;
	}
	.service-modal-container{
		width: 80%;
		padding: 40rpx;
		background-color: #182641;
	}
	.service-modal-title{
		font-size: 36rpx;
		color: #fff;
		text-align: center;
	}
	.service-modal-title-text{
		border-bottom: 5rpx solid #fff;
	}
	.service-modal-content{
		display: flex;
		// justify-content: center;
		margin-top: 50rpx;
		// align-items: center;
		// justify-content: column;
		flex-direction: column;
		color: #fff;
	}
	
	.service-modal-buttonGroup{
		display: flex;
		justify-content: center;
	}
	
	.service-modal-button{
		margin-top: 50rpx;
		width: 200rpx;
		height: 65rpx;
	}
	.span{
		margin-bottom: 20rpx;
	}
</style>
