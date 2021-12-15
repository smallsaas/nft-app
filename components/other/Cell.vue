<template>
	<van-cell>
	  <div slot="title">
		<div class="van-cell-text" style="font-weight: 700; font-size: 28rpx;">{{ title }}</div>
	  </div>
	  <div :style='{ color:  param.textColor }' @click="clickFunc">{{ param.content }}</div>
	</van-cell>
</template>

<script>
	export default {
		data(){
			return {
				title:''
			}
		},
		props:{
			days: Number,
			param:{
				type:Object,
				default: function(){
					return {
						title: "title",
						content: "content",
						path: "",
						textColor: "#808080"
					}
				}
			},
		},
		methods:{
			clickFunc(){
				// this.$emit('handleClick', e.detail);
				uni.navigateTo({
					url: this.param.path
				})
			}
		},
		mounted(){
			if(this.days){
				this.title = this.param.title.replace("0", " " + this.days + " ")
			}else{
				this.title = this.param.title
			}
		}
	}
</script>

<style>
</style>
