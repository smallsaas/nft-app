<template>
	<view class="service">
		<view class="line-bg">
			<user class="bg" :data="forChild"></user>
			<tab class="tab"></tab>
		</view>
		<!-- <down class="down"></down> -->
		<view class="bgs"><image @click="showModal()" src="../../static/service/xc.png" mode="widthFix" class="chatu"></image></view>
		<view class="service-mask" v-if="isModal"></view>
		<view v-if="isModal" class="service-modal">
			<view class="service-modal-container">
				<view class="service-modal-title">
					<text class="service-modal-title-text">領取福利</text>
				</view>
				<view class="service-modal-content">
					<view class="span">交流群1:123135411</view>
					<view class="span">交流群2:123545634</view>
					<view class="span">福利群1:123135419</view>
					<view class="span">福利群2:123545631</view>
					<view class="span">福利領取方式:145135415</view>
				</view>
				<view class="service-modal-buttonGroup">
					<pretty-button class="service-modal-button" text="好的" @click="hideModal()"></pretty-button>
				</view>
			</view>

		</view>
		<bottomTap class="bottomTapa" :data="forBottomTapChild"></bottomTap>
	</view>
</template>

<script>
	import user from './user.vue'
	import tab from './tab.vue'
	import down from './down.vue'
	import bottomTap from './bottomTap.vue'
	export default {
		components:{user,tab,down,bottomTap},
		props: {
			item: Object,
			ext: Object,
		},
		data(){
			return{
				forChild:{},
				forBottomTapChild:{},
				isModal:false
			}
		},
		methods:{
			showModal(){
				this.isModal = true
			},
			hideModal(){
				this.isModal = false
			}
		},
		created() {
			console.log(this.item,11111111)
			this.forChild.userId = this.item.userId
			this.forChild.name = this.item.name
			this.forChild.status = this.item.status
			this.forChild.avatar = this.item.avatar
			this.forBottomTapChild.invitationCode = this.item.invitationCode
			console.log(this.forChild)
		}
	}
</script>

<style lang="less" scoped>
	.bg{
		padding: 50rpx 0;
		// background: linear-gradient(to right top,rgb(16,17,40) 15%,rgb(77,48,163) 55%,rgb(54,79,188));
	}
	.tab{
	}
	.service{
		width: 100%;
		height: 100vh;
		background: rgb(6,17,30);
		// background-color: #0B95FF;
		// filter: blur(200px);
		// background: linear-gradient(to right,#050E17,#9331F5,#0B95FF);
		.line-bg{
			background: radial-gradient(to bottom left,#415ADC,#060E1A 75%);
		}
		

		.down{
			height: 18%;
		}
		
		.bgs{
			// border: 1px solid red;
			margin-top: 20rpx;
			display: flex;
			align-items: flex-start;
			justify-content: center;
			.chatu{
				width: 343px;
				height: 102px !important;
			}
		}
		
		.bottomTapa{
			margin-top: 30rpx;
			height: 30%;
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
	}
	.service-modal-button{
		margin-top: 50rpx;
		height: 80rpx;
	}
	.span{
		margin-bottom: 20rpx;
	}
</style>
