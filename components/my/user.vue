<template>
	<view class="usernew">
		<view class="imgBox">
			<image class="img" :src="data.avatar" mode="widthFix"></image>
			<image class="upload" @click="uploadImage" :src="list[0]"/></image>
		</view>
		<view class="names">
			<text class="name">{{data.name}}</text>
		</view>
		<text class="status">
			<text>賬号狀态：</text><text class="wid" :class="{forzen:data.status !=='NORMAL'}">{{data.status=='NORMAL'?'正常':'凍結'}}</text>
		</text>
		<text class="shezhi">設置</text>
		<image @click="getDetail" class="more" src="../../static/service/more.png" mode="widthFix"></image>
	<!-- 	<view class="left">
			<view class="LImg"><image class="img" src="../../static/spirit/coin.png" mode="widthFix"></image></view>
			<view class="Linfo">
				<view class="Ln"><text class="name">{{data.name}}</text></view>
				<view class="Ls"><text class="status">賬号狀态:  {{data.status=='NORMAL'?'正常':'凍結'}}</text></view>
			</view>
		</view>
		<view class="right">
			<image @click="getDetail" class="more" src="../../static/service/more.png" mode="widthFix"></image>
		</view> -->
	</view>
</template>

<script>
	export default{
		props: {
			data: Object,
		},
		data(){
			return{
				uploadsrc:'',
				list:[],
				avatar:null
			}
		},
		created() {
			console.log(this.data,"DATA")
			this.avatar = this.data.avatar
		},
		methods:{
			async uploadImage() {
				let that = this
				await uni.chooseImage({
					count: 9,
					success: async function(path) {
						let files = path.tempFiles
						for (var i = 0; i < files.length; i++) {
							let file = files[i]
							let webPath = await that.$upload("/api/u/fs/uploadfile", file.path)
							let fileList = that.list
							fileList.push(that.$config.endpoint + webPath)
							// console.log(fileList)
						}
						let data = {
							avatar:that.list[0]
						}
						const wait = await that.$api.updateUserAvatar(data)
						console.log('wait',wait)
					}
				})
			},
			getDetail(){
				uni.navigateTo({
					url:'/pages/infomation/infomation?id=' + this.data.userId
				})
			}
		}
	}
</script>

<style lang="less">
	.usernew{
		position: relative;
		width: 100%;
		height: 120rpx;
		.imgBox{
			width: 72px;
			height: 72px;
			position: absolute;
			top: 30rpx;
			left: 32rpx;
			.img{
				width: 72px;
				height: 72px !important;
				border-radius: 50%;
				border: 1px solid rgb(132,133,147);
			}
			.upload{
				position: absolute;
				top: 0px;
				width: 72px;
				height: 72px !important;
				border-radius: 50%;
				border: 1px solid rgb(132,133,147);
				opacity: 1;
				z-index: 99999999;
			}
		}
		.names{
			position: absolute;
			top: 50rpx;
			left: 200rpx;
			width: 450rpx;
			height: 50rpx;
			.name{
				font-size: 18px;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
		.status{
			width: 228px;
			height: 20px;
			font-size: 14px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			position: absolute;
			top: 110rpx;
			left: 202rpx;
		}
		.shezhi{
			font-size: 14px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			position: absolute;
			top: 85rpx;
			left: 620rpx;
		}
		.forzen{
			color: red !important;
		}
		.more{
			width: 40rpx;
			height: 50rpx !important;
			position: absolute;
			right: 36rpx;
			top: 80rpx;
		}
	}
</style>
