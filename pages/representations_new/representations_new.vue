<template>
	<view class="re_new">
		<view class="all"><text class="info" @click="checkMore">查看申述記錄(結果)</text></view>
		<view class="title ttt"><text class="info">申述原因</text></view>
		<view class="select">
			<input v-model="value" type="text" disabled="true" placeholder="選擇申述原因" class="read" />
			<image src="../../static/login/download.png" mode="widthFix" class="beaut" @click="show"></image>
		</view>
		
		<view class="boxF">
			<view class="top">
				<text class="z">上傳圖片</text>
			</view>
			<view class="bottom">
				<view class="imgBox">
					<view class="success" v-for="(item,index) in list" :key="index">
						<image :src="item" mode="widthFix" class="upload" @click="check(item)"></image>
						<image src="../../static/BaseImage/close.png" mode="widthFix" class="deleteImg"
							@click="deleteImage(index)" v-if="!showBigImg"></image>
					</view>
					<view class="ifsuccess" @click="uploadImage">
						<image src="../../static/spirit/addImg.png" mode="widthFix" class="upload"></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="title"><text class="info">備注</text></view>
		<view class="select selectT">
			<textarea placeholder="添加其他申述原因" class="text" v-model="moreValue"></textarea>
		</view>
		<view class="btnBox"><button class="btn" @click="shenshu">提交申述</button></view>
		<view class="fix" v-if="isShow">
			<view class="t">
				<text class="info" @click="cancel">取消</text>
				<text class="info infos">選擇申訴原因</text>
				<text class="info" @click="sure">确定</text>
			</view>
			<view class="b">
				<view class="item" :class="{active:inx == index}" v-for="(i,index) in columns" :key="index"
					@click="choose(index)">
					{{i}}
				</view>
			</view>
		</view>
		<view class="spirit_mask" v-if="isShow"></view>
	</view>
</template>

<script>
	export default {
		props: {},
		onLoad(e) {
			// console.log('RES', parseInt(e.orderId))
			this.orderIdS = parseInt(e.orderId)
			// console.log('慘過了參數', this.orderIdS)
		},
		data() {
			return {
				isShow: false,
				columns: ['對方沒付款', '情況不符合', '其他'],
				inx: -1,
				value: '',
				moreValue: '',
				orderIdS: 0,
				showBigImg: false,
				list: [],
				loading: false
			}
		},
		methods: {
			show() {
				this.inx = -1
				this.isShow = true
			},
			choose(index) {
				this.inx = index
			},
			cancel() {
				this.isShow = false
			},
			sure() {
				this.value = this.columns[this.inx]
				this.isShow = false
			},
			checkMore() {
				uni.navigateTo({
					url: '/pages/complainhistory/complainhistory'
				})
			},
			checkLoadingStatus(){
				if(this.loading){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: '不能重複提交'
					})
				}else{
					this.shenshu()
				}
			},
			async shenshu() {
				this.loading = true
				let data = {
					//71
					//this.orderIdS
					relationOrderId: this.orderIdS,
					title: this.value,
					content: this.moreValue,
					credentialLink: this.list.toString()
				}
				const res = await this.$api.orderCpmplain(data)
				// console.log('RES', res)
				if (res.code == 200) {
					uni.showToast({
						icon: 'success',
						duration: 1000,
						title: '提交申述成功'
					})
					uni.navigateTo({
						url: '/pages/complainhistorydetail/complainhistorydetail?complainId=' + data.relationOrderId
					})

					// uni.navigateTo({
					// 	url:'/pages/defaultPage/page?id=' + 111222333
					// })
				} else {
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: res.message
					})
				}
				
				this.loading = false


				// const res = await this.$api.checkOrderCpmplain()
				// console.log('RES',res)
			},
			// 删除圖片
			deleteImage(i) {
				this.list.splice(i, 1)
				this.$forceUpdate()
			},
			// 上傳圖片
			uploadImage() {
				let that = this
				uni.chooseImage({
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
					}
				})
			},
		},
	}
</script>

<style lang="less">
	.active {
		color: #FFFFFF !important;
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

	.re_new {
		width: 100%;
		height: 100%;

		.all {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.info {
				color: rgb(26, 137, 253);
				font-size: 30rpx;
				margin-right: 20rpx;
			}
		}

		.ttt {
			margin-top: 100rpx;
		}

		.title {
			width: 100%;
			height: 50rpx;

			.info {
				margin-left: 5%;
			}
		}

		.select {
			width: 100%;
			height: 120rpx;
			position: relative;

			.read {
				width: 90%;
				height: 80rpx;
				margin-left: 5%;
				border-radius: 20rpx;
				padding-left: 10rpx;
				background: rgb(36, 42, 51);
				font-size: 30rpx;
				border: 1px solid rgb(54, 63, 76);
			}

			.beaut {
				position: absolute;
				top: 20rpx;
				right: 40rpx;
				width: 40rpx;
				height: 40rpx;
			}

		}

		.selectT {
			height: 300rpx;

			.text {
				width: 90%;
				height: 280rpx;
				margin-left: 5%;
				border-radius: 20rpx;
				padding-left: 10rpx;
				background: rgb(36, 42, 51);
				font-size: 30rpx;
				border: 1px solid rgb(54, 63, 76);
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
				height: 85rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				background: linear-gradient(to right, rgb(135, 57, 245) 0%, rgb(70, 104, 253), rgb(25, 137, 253));
			}
		}

		.fix {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 50%;
			background: #1C294C;
			z-index: 9999;
			border-radius: 16px 16px 0px 0px;

			.t {
				width: 100%;
				height: 10%;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.infos {
					color: #FFFFFF;
				}
			}

			.b {
				width: 100%;
				height: 85%;
				overflow: scroll;

				.item {
					margin-top: 20rpx;
					width: 100%;
					height: 60rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
	
	.boxF {
		width: 343px;
		height: 191px;
		background: #11181E;
		border-radius: 8px 8px 8px 8px;
		opacity: 1;
		margin: 24px auto;
	
		.top {
			width: 100%;
			height: 56px;
			border-bottom: 1px solid #1B2228;
			position: relative;
	
			.z {
				position: absolute;
				top: 16px;
				left: 16px;
				font-size: 16px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 500;
				color: #B9BBBD;
			}
		}
	
		.bottom {
			width: 100%;
			height: 134px;
	
			.imgBox {
				margin-top: 10px;
				display: flex;
				flex-direction: row;
	
				.success {
					height: auto;
					padding: 2px;
					padding-left: 10px;
					position: relative;
	
					.upload {
						width: 100px;
						height: 100px !important;
						border-radius: 16rpx 16rpx 16rpx 16rpx;
					}
	
					.deleteImg {
						position: absolute;
						right: 8rpx;
						top: 8rpx;
						width: 40rpx;
						height: 40rpx;
						z-index: 50000;
					}
				}
	
				.ifsuccess {
					width: 100px;
					height: 100px !important;
					padding: 2px;
					padding-left: 10px;
	
					.upload {
						width: 100px;
						height: 100px !important;
					}
				}
			}
		}
	}
</style>
