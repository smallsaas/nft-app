<template>
	<view :class="'pretty-button-container '+borderType" :style="{'border-radius':borderRadius}">
		<button :class="'pretty-button '+type" @click="handleClick" :style="{'border-radius':borderRadius}">{{text}}</button>
	</view>
</template>
<script>
	export default {
		name:"prettyButton",
		methods:{
			handleClick(e){
				this.$emit('click',e)
			}
		},
		props:{
			text:{
				type:String,
				default(){
					return ''
				}
			},
			type:{
				type:String,
				default(){
					return 'default'
				}
			},
			borderType:{
				type:String,
				default(){
					return ''
				}
			},
			borderRadius:{
				type:String,
				default(){
					return '16rpx'
				}
			}
		}
	}
</script>
<style scoped>
	@keyframes ripple{
		from{
			opacity: 1;
		}
		to{
			opacity: .8;
		}
	}
	.pretty-button-container{
		background: linear-gradient(90deg,#9331F5,#0B95FF);
		font-size: 32rpx;
		padding: 2rpx;
		display: flex;
		overflow: hidden;
		border-radius: 16rpx;
		justify-content: center;
		align-items: center;
		/* color: #FFFFFF; */
	}
	.pretty-button-container:active{
		animation: ripple .5s linear;
	}
	.pretty-button-container:hover{
		/* animation: ripple .5s linear; */
		opacity: .9;
	}
	.hollow{
		background: #192644;
	}
	.default{
		/* background: linear-gradient(90deg,#9331F5,#0B95FF); */
		background: transparent;
	}
	.gray{
		background: #7E8FB2;
	}
	.gray .pretty-button{
		background: #192644;
	}
	.pretty-button{
		border-radius: 16rpx;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		outline: none;
		
		border: none;
		color: #FFFFFF;
		/* height: 100%; */
	}
	.pretty-button::after{
		border: none;
		/* color: #FFFFFF; */
	}
</style>