<template>
	<view :class="'sign-item '+isEnded">
		<view class="sign-content">
			<view class="sign-image-content">
				<view class="sign-image-ended" v-if="item.status === 'ended'">
					<view class="sign-isSign-signed" v-if="item.isSign">已簽到</view>
					<button class="sign-isSign-unSigned" v-if="!item.isSign" @click="handleFill">補簽</button>
				</view>
				<view :class="'sign-image-round '+isToday">
					<image :src="item.image" class="sign-image-icon" mode="aspectFit"></image>
				</view>
				<view class="sign-image-text">{{item.text}}</view>
			</view>
			<view class="sign-content-text">
				第{{item.day}}天
			</view>
		</view>
	</view>
</template>

<script>
	/* 簽到子項說明
		props:
		item:子項屬性
		item.isSign 是否簽到
		item.status 三種狀态 normal today ended
		item.day 第幾天
		item.image 中間顯示的圖片
		item.text 文本
		事件
		@fill 點擊補簽觸發
	 */
	export default {
		name:"signItem",
		data(){
			return {
					icon:{}
			}
		},
		props:{
			item:{
				type:Object,
				default(){
					return {
						day:0
					}
				}
			}
		},
		computed:{
			isEnded(){
				if(this.item){
					if(this.item.status === "ended"){
						return "ended"
					}else{
						return ""
					}
				}else{
					return ""
				}
			},
			isToday(){
				if(this.item){
					if(this.item.status === 'today'){
						return "today"
					}else{
						return ""
					}
				}else{
					return ""
				}

			}
		},
		async created() {
			let res = await this.$api.getIcon()
			this.icon = res.data
		},
		methods:{
			// 補簽事件
			handleFill(){
				this.$emit("fill")
			}
		}
	}
</script>

<style lang="less" scoped>
	@boxWidth:230rpx;
	@boxHeight:300rpx;
	@boxRadius:25rpx;
	@boxPadding:6rpx;
	@contentPadding:2rpx;
	.sign-item{
		width: @boxWidth;
		height: @boxHeight;
		background: linear-gradient(to bottom right,#8432E5,#136ABB);
		border-radius: @boxRadius;
		padding: @boxPadding; 
		box-sizing: border-box;
		font-family: 微軟雅黑,黑體;
		letter-spacing:5rpx;
	}
	.ended{
		background:#1A2747;
	}
	.today{
		background: linear-gradient(top,#414B66,#2A3653);
	}
	.sign-content{
		background-color: #182642;
		width: @boxWidth - (@boxPadding * 2) - 4;
		height: @boxHeight - (@boxPadding * 2) - 4;
		padding: @contentPadding;
		border-radius: @boxRadius;
	}
	.sign-image-content{
		width: (@boxWidth - (@boxPadding * 2) - 4) - (@contentPadding *2);
		height: 212rpx;
		border-top-left-radius: @boxRadius;
		border-top-right-radius: @boxRadius;
		border: 1rpx solid #374260;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.sign-image-round{
		width: 130rpx;
		height: 130rpx;
		border-radius: 50%;
		box-shadow: 0px 0px 0px 5px #2A3651;
		background-color: #555F75;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.sign-image-icon{
		width: 80rpx;
		height: 80rpx;
	}
	.sign-image-text{
		position: absolute;
		bottom: 2rpx;
		font-size: 8rpx;
		color: #70798D;
	}
	.sign-content-text{
		color: #A0A5B1;
		font-size: 34rpx;
		width: 100%;
		text-align: center;
		line-height: (@boxHeight - (@boxPadding * 2) - 4) - 212rpx;
	}
	.sign-image-ended{
		background-color: #1016;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top-left-radius: @boxRadius;
		border-top-right-radius: @boxRadius;
		z-index: 20;
	}
	.sign-isSign-signed{
		color: #DDD8D8;
		font-size: 40rpx;
	}
	.sign-isSign-unSigned{
		padding: 15rpx 22rpx;
		border-radius: 8rpx;
		color: #DDD8D8;
		font-size: 38rpx;
		background: linear-gradient(left,#8F34F5,#1287E8);
	}
</style>
