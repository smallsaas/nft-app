<template>
	<view class="border-Input">
		<view class="Input">
			<input
			class="input_component"
			:type="type"
			:placeholder=""
			@input="handleInput"
			@click="handleClick"
			@focus="handleFocus"
			@blur="handleBlur"
			/>
		</view>
	</view>
</template>

<script>
	export default {
		name:"prettyInput",
		data() {
			return {
				
			};
		},
		props:{
			type:{
				type:String,
				default:""
			},
			placeholder:{
				type:String,
				default:""
			}
		},
		methods:{
			handleClick(e){
				this.$emit("click",e)
			},
			handleBlur(e){
				this.$emit("blur",e)
			},
			handleInput(e){
				this.$emit("input",e)
			},
			handleFocus(e){
				this.$emit("focus",e)
			}
		}
	}
</script>

<style scoped>
	.border-Input{
		background: linear-gradient(to left,#9331F5,#0A95FF);
		padding: 5rpx;
	}
	.Input{
		background-color: #242A33;
		color: #4A5A74;
		padding: 32rpx 34rpx;
	}
	.input_component{
		background:transparent;
		outline: none;
		border: none;
	}
</style>
