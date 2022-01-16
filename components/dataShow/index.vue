<template>
	<view class="dataShow">
		<view v-for="(item,i) in fieldList" class="dataShow-item">
			<view class="dataShow-itemBox">{{labelList[i]}}:{{data[item]}}{{unitGroup[i]||""}}</view>
		</view>
	</view>
</template>

<!-- 對接api /api/u/player/getUserTeam -->
<script>
	export default {
		name:"data-show",
		props:{
			loadApi:{
				type:String,
				default:""
			},
			fieldGroup:{
				type:String,
				default:{}
			},
			// 單位組
			unitGroup:{}
		},
		data(){
			return {
				fieldList:[],
				labelList:[],
				data:{}
			}
		},
		created() {
			this.getData()
		},
		mounted() {
			console.log("FIELDGROUP",this.fieldGroup)
			this.fieldList = Object.keys(this.fieldGroup)
			this.labelList = Object.values(this.fieldGroup)
			console.log(this.fieldList,this.labelList,"FIELDLABEL")
			this.getData()
		},
		methods:{
			getData(){
				let that = this
				let token = this.$cache.get(that.$config.tokenStorageKey)
				uni.request({
					url:this.$config.endpoint + this.loadApi,
					header:{
						Authorization:`Bearer ${token}`
					},
					success(res) {
						// console.log(res)
						that.data = res.data.data
					}
				})
			}
		}
	}
</script>

<style>
	.dataShow{
		/* color: white; */
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-top: 20px;
	}
	.dataShow-item{
		/* flex: 1; */
		width: 50%;
		text-align: center;
		/* padding:20px; */
	}
	.dataShow-itemBox{
		padding: 40rpx;
		margin: 20rpx;
		background:#11181E;
		border-radius: 10rpx;
	}
</style>
