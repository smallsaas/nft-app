<template>
	<view class="more">
		<view class="box">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="status"><text class="title">申述原因:</text><text class="info">{{item.title}}</text></view>
				<view class="boxF">
					<view class="title">
						<text class="z" style="padding: 0 16rpx;">申述圖片:</text>
					</view>
					<view class="bottom" v-if="item.credentialLink && item.credentialLink.length > 0">
						<view class="imgBox">
							<view class="success" v-for="(item,index) in item.credentialLink" :key="index">
								<image :src="item" mode="widthFix" class="upload"  @click="bigImgClick(item)"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="status"><text class="title">備注信息:</text><text class="info">{{item.content}}</text></view>
				<view class="status"><text class="title">申述狀态:</text><text class="info" :class="{infos:item.status=='PENDING_REPLY'}">{{item.status=='PENDING_REPLY'?'處理中':'已處理'}}</text></view>
				<view class="status"><text class="title">申述反饋:</text><text class="info">已溝通</text></view>
				<view class="replyRecordList" v-if="item.replyRecordList.length > 0" v-for="(rItem,rIndex) in item.replyRecordList" :key="rIndex">
					<view class="replyStatus">
						<text v-if="rIndex == 0" class="replyTitle">{{rItem.replierName}} 回複:</text>
						<text v-else class="replyTitle">{{rItem.replierName}} 追加回複:</text>
						<text class="replyInfo">{{rItem.content}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="fixBtn">
			<pretty-button class="btn" text="投訴"></pretty-button>
		</view> -->
		
		<!-- //模态組件 -->
		<view class="motai-mask" v-if="showBigImg"></view>
		<view class="motai" v-if="showBigImg">
			<image :src="bigImgSrc" mode="widthFix" class="upload"></image>
			<image src="../../static/service/close.png" mode="widthFix" class="deleteImg" @click="closeBigImg"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			ext: Object
		},
		data(){
			return{
				list:[],
				bigImgSrc: '',
				showBigImg: false
			}
		},
		mounted() {
			this.loadHistory()
		},
		methods:{
			async loadHistory(){
				const res = await this.$api.loadNewUserComplainHistory()
				console.log(res)
				if(res.code == 200){
					const records = res.data.records;
					if(records && records.length > 0){
						records.map((item, index) => {
							if(item.credentialLink){
								item.credentialLink = item.credentialLink.split(',')
							}
							return item
						})
					}
					this.list = records
				}else{
					uni.showToast({
						title:'獲取錯誤',
						icon:'error',
						duration:1000
					})
				}
			},
			bigImgClick(url) {
				this.bigImgSrc = url
				this.showBigImg = true
			},
			closeBigImg() {
				this.showBigImg = false
			}
		}
	}
</script>

<style lang="less">
	.more{
		width: 100%;
		height: 100vh;
		background: rgb(5,14,23);
		.box{
			width: 100%;
			height: 100% !important;
			overflow: scroll;
		}
		.motai-mask {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background-color: #000;
			opacity: .8;
			z-index: 5000;
		}
		.motai {
			// width: 340px;
			// height: 570px;
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			z-index: 5001;
		
			.upload {
				// width: 340px;
				// height: 570px !important;
				width: 80%;
			}
		
			.deleteImg {
				position: fixed;
				bottom: 50rpx;
				width: 50px;
				height: 50px;
			}
		}
		.fixBtn{
			width: 100%;
			height: 10%;
			position: fixed;
			bottom: 0rpx;
			background: rgb(19,22,29);
			display: flex;
			align-items: center;
			justify-content: center;
			.btn{
				background: rgb(19,22,29);
				width: 90%;
				height: 70% !important;
				display: flex;
				align-items: center;
				justify-content: center;
				color:red !important;
				border: 2px solid #F95D5D;
			}
		}
		.item{
			width: 90%;
			height: auto;
			margin-left: 2.5%;
			background: rgb(17,24,30);
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			padding: 20rpx;
			margin-bottom: 20rpx;
			.status{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-around;
				margin-top: 10rpx;
				.title{
					width: 140rpx;
					font-size: 30rpx;
				}
				.infos{
					color: #31E4B9 !important;
				}
				.info{
					width: 70%;
					height: auto;
					font-size: 30rpx;
					color: #FFFFFF;
				}
			}
			
			.replyRecordList{
				width: 100%;
				margin-top: 20rpx;
				background: rgb(17,24,30);
				border-radius: 20rpx;
				display: flex;
				flex-direction: column;
				.replyStatus{
					flex: 1;
					display: flex;
					text-align: left;
					align-items: left;
					justify-content: space-around;
					padding-left: 14rpx;
					flex-direction: column;
					.replyTitle{
						width: 400rpx;
						font-size: 30rpx;
					}
					.replyInfos{
						color: #31E4B9 !important;
					}
					.replyInfo{
						width: 100%;
						height: auto;
						font-size: 30rpx;
						color: #FFFFFF;
						padding-left: 16rpx;
					}
				}
			}
		}
	}
	
	.bottom {
			width: 100%;
			// height: 134px;
	
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
				}
			}
	}
	
	.boxF {
		width: 343px;
		background: #11181E;
		border-radius: 8px 8px 8px 8px;
		opacity: 1;
		margin: 3px auto;
	
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
			height: auto;
	
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
