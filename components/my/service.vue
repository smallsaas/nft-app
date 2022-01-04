<template>
	<view class="service">
		<view class="line-bg">
			<user class="bg" :data="forChild"></user>
			<tab class="tab"></tab>
		</view>
		<!-- <down class="down"></down> -->
		<view class="bgs"><image src="https://s2.loli.net/2021/12/30/JusqwV13KkaWlrT.png" mode="widthFix" class="chatu"></image></view>
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
				forBottomTapChild:{}
			}
		},
		methods:{
			
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

<style lang="less">
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
</style>
