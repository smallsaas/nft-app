<template>
	<view class="Box" @click="navigateTo()">
		<image class="avatar" src="../static/logo.png"></image>
		<text>小王</text>
		<text>账号状态:</text>
		<text>查看详情</text>
	</view>
</template>

<script>
	export default {
		name:"User",
		props:{
			// 获取
			item:{
				type:Object,
				default:{}
			},
			pathData:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				userAvatar:'',
				userName:''
			};
		},
		created() {
			let userA = uni.getStorage({key:"userAvatar"})
			userA.then(res=>{
				console.log(res)
				this.userAvatar = res[1].data
			})
			let userN = uni.getStorage({key:"userName"})
			userN.then(res=>{
				console.log(res)
				this.userName = res[1].data
			})
			
			this.getUserInfo()
		},
		methods:{ 
			async getUserInfo(){
				const res = await this.$api.getUserInfo()
				console.log(res,123)
			},
			navigateTo(){
				uni.navigateTo({
					// url:'/pages/infomation/infomation?id=' +  1
					url:'/pages/infomation/infomation?id=' + '1'
				})
			  //  let userI = uni.getStorage({key:"userId"})
			  //  userI.then(res=>{
			  //    console.log(res[1].data)
				 // uni.navigateTo({
				 // 	url:'/pages/infomation/infomation?id=' +  1
				 // })
			  //  })
				// console.log(this.pathData)
				// console.log(this.item)
				// uni.navigateTo({
				// 	url:"/pages"+this.pathData.navigator+"?id="+this.item.id,
				// 	fail(err) {
				// 		console.log(err)
				// 	}
				// })
			}
		}
	}
</script>

<style lang="less">
.Box{
	width: 100%;
	height: 200rpx;
	border: 1px solid red;
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: space-around;
	.avatar{
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}
}
</style>
