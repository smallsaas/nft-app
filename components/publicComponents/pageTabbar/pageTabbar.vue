<!-- 顶部tab栏 tabs传入title及url属性即可使用 -->
<template>
	<view>
		<view class="pageTabbar_TitleBox">
			<view :class="'pageTabbar_Title'+isClick(t)" @click="handleClick(tab.url,t)"  v-for="(tab,t) in tabs">
				{{tab.title}}
			</view>
		</view>
		<web-view :src="url" style="top: 120rpx;margin: 20rpx;"></web-view>
	</view>
</template>

<script>
	export default {
		name:"pageTabbar",
		props:{
			// tab栏配置
			tabs:{
				type:Array,
				default:[],
			}
		},
		data(){
			return {
				clicked:0,
				url:""
			}
		},
		created() {
			this.url = this.tabs[this.clicked].url
			// #ifdef H5
				this.url = "/#"+this.tabs[this.clicked].url
			// #endif
			console.log(this.url)
		},
		methods:{
			// tab被点击时
			handleClick(url,click){
				this.url = this.tabs[this.clicked].url
				// #ifdef H5
					this.url = "/#"+this.tabs[click].url
				// #endif
				this.clicked = click
				console.log(this.url)
				console.log(click,"click")
				this.$forceUpdate()
			},
			isClick(i){
				if(this.clicked === i){
					return " pageTabbar_Click"
				}else{
					return ""
				}
			}
		}
	}
</script>

<style>
	.pageTabbar_TitleBox{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		margin-top: 50rpx;
	}
	.pageTabbar_Title{
		font-size: 32rpx;
		height: 38rpx;
		text-align: center;
		margin: 25rpx;
		color: #A9ACB0;
	}
	.pageTabbar_Click{
		font-size: 36rpx;
		font-weight: bold;
		color: #F0F0F0;
		border-bottom: 5px solid;
		border-image: -webkit-linear-gradient(left,#772CCA,#0986E5) 5 5;
	}
</style>
