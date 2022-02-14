<template>
	<view class="more">
		<view class="box">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="status"><text class="title">申述原因:</text><text class="info">{{item.title}}</text></view>
				<view class="status"><text class="title">備注信息:</text><text class="info">{{item.content}}</text></view>
				<view class="status"><text class="title">申述狀态:</text><text class="info" :class="{infos:item.status=='PENDING_REPLY'}">{{item.status=='PENDING_REPLY'?'處理中':'已處理'}}</text></view>
				<view class="status"><text class="title">申述反饋:</text><text class="info">已溝通</text></view>
				<view class="replyRecordList" v-if="item.replyRecordList.length > 0" v-for="(rItem,rIndex) in item.replyRecordList" :key="rIndex">
					<view class="replyStatus">
						<text v-if="rIndex == 0" class="replyTitle">{{rItem.replierName}} 回复:</text>
						<text v-else class="replyTitle">{{rItem.replierName}} 追加回复:</text>
						<text class="replyInfo">{{rItem.content}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="fixBtn">
			<pretty-button class="btn" text="投訴" @click="goTo"></pretty-button>
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
				list:[]
			}
		},
		created() {
			this.loadHistory()
			console.log('-----------------粗放')
		},
		mounted() {
			this.loadHistory()
			console.log('-----------------粗放')
		},
		methods:{
			goTo(){
				if(this.$cache.get('status') !== 'NORMAL'){
					uni.showToast({
						title:'當前狀态不可用',
						icon:'error',
						duration:1000
					})
					return
				}
				uni.navigateTo({
					url:'/pages/toushupage/toushupage'
				})
			},
			async loadHistory(){
				const res = await this.$api.getTouShuHistory()
				console.log(res)
				if(res.code == 200){
					this.list = res.data.records
					uni.showToast({
						title:'獲取成功',
						icon:'error',
						duration:1000
					})
				}else{
					uni.showToast({
						title:'獲取錯誤',
						icon:'error',
						duration:1000
					})
				}
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
			height: 90% !important;
			overflow: scroll;
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
</style>
