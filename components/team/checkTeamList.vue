<template>
	<view class="checkTeamList">
		<!-- <view class="check">
			<input type="number" placeholder="請輸入手機号碼查詢" class="phone" v-model="searchPhone"/>
			<image src="../../static/service/search.png" mode="widthFix" class="search" v-if="!isSearching" @click="searchIng"></image>
			<image src="../../static/service/close.png" mode="widthFix" class="search" v-if="isSearching" @click="giveUpsearchIng"></image>
		</view> -->
		<view class="box">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="img">
					<image :src="item.avatar" mode="widthFix" class="avator"></image>
				</view>
				<view class="info">
					<text class="infoN">{{item.name}}</text>
					<text class="infoP">手機号: {{item.mobilePhone==null?'暫無':item.backupMobilePhone}}</text>
					<text class="infoPT">備用手機号: {{item.backupMobilePhone==null?'暫無':item.backupMobilePhone}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {globalConfig} from '@/config.js'
	import {api} from '@/common/api.js'
	export default {
		name:'spiritMarket',
		data(){
			return{
				isSearching:false,
				searchPhone:'',
				list:[],
				copyList:[]
			}
		},
		mounted() {
			this.getStrightTeam()
		},
		watch:{
			searchPhone(value){
				if(value == ''){
					this.list = this.copyList
				}
			}
		},
		methods:{
			searchIng(){
				if(this.searchPhone.length == 0){
					uni.showToast({
						title:'查詢手機号碼不能爲空',
						icon:'error',
						duration:1000
					})
					return
				}
				this.copyList = this.list
				this.isSearching = !this.isSearching
				this.list = this.list.filter((item)=>{
					return item.mobilePhone == this.searchPhone
				})
			},
			giveUpsearchIng(){
				this.searchPhone = ''
				this.isSearching = !this.isSearching
			},
			getImage(url) {
				console.log(this.$config)
				let that = this
				let imagePath;
				if (url.indexOf("http" || "https") === 0) {
					imagePath = url
				} else {
					console.log(url.indexOf("["))
					if (url.indexOf("[") === 0) {
						let urlJSON = JSON.parse(url)
						let imageUrl = urlJSON[0].url
						if (imageUrl.indexOf("http" || "https") === 0) {
							imagePath = imageUrl
						} else {
							if(![undefined,null,''].includes(that.$config.endpoint)){
								imagePath = that.$config.endpoint + "/" +imageUrl;								
							}else{
								imagePath = that.$config.imageEndpoint + "/" +imageUrl
							}
							// return this.$config.endpoint + "/" + imageUrl
						}
					}
				}
				return imagePath
			},
			async getStrightTeam(){
				const res = await this.$api.getStrightTeam()
				console.log(res)
				if(res.code == 200){
					this.list = res.data.records
				}
			}
		}
	}
</script>

<style lang="less">
	.checkTeamList{
		width: 100%;
		height: 100%;
		.check{
			margin-top: 30rpx;
			width: 100%;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			.phone{
				width: 90%;
				height: 100%;
				border: 1px solid rgb(54,63,76);
				border-radius: 20rpx;
				padding-left: 10rpx;
			}
			.search{
				position: absolute;
				right: 10%;
				width: 60rpx;
				height: 60rpx !important;
			}
		}
		.box{
			width: 100%;
			height: auto;
			margin-top: 20rpx;
			.item{
				width: 90%;
				height:200rpx;
				background: rgb(17,24,30);
				border-radius: 20rpx;
				margin-left: 4.5%;
				display: flex;
				flex-direction: row;
				margin-bottom: 20rpx;
				.img{
					width: 25%;
					height: 100%;
					display: flex;
					align-items: flex-start;
					justify-content: center;
					.avator{
						margin-top: 20rpx;
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}
				}
				.info{
					width: 75%;
					height: 100%;
					display: flex;
					flex-direction: column;
					.infoN{
						height: 30%;
						color: #FFFFFF;
						font-size: 35rpx;
						display: flex;
						align-items: center;
					}
					.infoP{
						height: 30%;
						color: #FFFFFF;
						font-size: 25rpx;
						display: flex;
						align-items: center;
					}
					.infoPT{
						height: 30%;
						color: #FFFFFF;
						font-size: 25rpx;
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}
</style>
