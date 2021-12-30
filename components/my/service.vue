<template>
	<view class="service">
		<user class="bg"  :data="forChild"></user>
		<tab class="tab"></tab>
		<!-- <down class="down"></down> -->
		<view class="bgs"><image src="https://s2.loli.net/2021/12/30/JusqwV13KkaWlrT.png" mode="widthFix"></image></view>
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
			this.forChild.userId = this.item.userId
			this.forChild.name = this.item.name
			this.forChild.status = this.item.status
			this.forBottomTapChild.invitationCode = this.item.invitationCode
			console.log(this.forChild)
		}
	}
</script>

<style lang="less">
	.service{
		width: 100%;
		height: 100vh;
		background: rgb(6,17,30);
	    .bg{
			height: 20%;
			// background: linear-gradient(to right top,rgb(16,17,40) 15%,rgb(77,48,163) 55%,rgb(54,79,188));
		}
		.tab{
			height: 12%;
		}
		.down{
			height: 18%;
		}
		
		.bgs{
			// border: 1px solid red;
			display: flex;
			align-items: flex-start;
			justify-content: center;
		}
		
		.bottomTapa{
			margin-top: 30rpx;
			height: 30%;
		}
	}
</style>
