<!-- 由于web-view很不友好 所以使用slot方式实现 -->
<template>
	<view>
		<view class="pageTabbar_TitleBox">
			<view :class="'pageTabbar_Title'+isClick(t)" @click="handleClick(t)"  v-for="(tab,t) in tabs">
				{{tab.title}}
			</view>
		</view>
		<view class="pageTabbar_Content">
			<slot name="content">
				
			</slot>
		</view>
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
				clicked:0
			}
		},
		created() {
			this.$emit("change",this.clicked)
		},
		methods:{
			// tab被点击时
			handleClick(click){
				this.clicked = click
				this.$emit("change",click)
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
		align-items: flex-start;
		justify-content: flex-start;
		flex-direction: row;
		/* margin-top: 50rpx; */
		flex-wrap: wrap;
		/* border: 1px solid red; */
		z-index: 999999;
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
	.pageTabbar_Content{
		width: 100%;
		height: calc(100vh - 138rpx);
		overflow: auto;
		/* border: 1px solid red; */
		margin-top: -25rpx;
	}
</style>
