<template>
	<view>
		<van-field
			:readonly="params.readonly"
			:disabled="params.disabled"
			:label="params.label"
			:error="params.error"
			:error-message="params.error ? param['error-message'] ? param['error-message'] : '' : ''"
			:required="params.required"
		>
			<template slot="input">
				<view class="Base-Image-Container">
					<view v-for="(item,i) in imageList" :key="i">
						<view class="Base-Image-ImageBox">
							<image :src="item" class="Base-Image-thumb" mode="aspectFit" @click="handleClick(i)">
							</image>
							<image src="../../static/BaseImage/close@3x.png" class="Base-Image-delete" @click="handleDelete(i)"></image>
						</view>

						<view class="Base-Image-mov" v-if="isShowLarge === i">
							<movable-area scale-area class="Base-Image-mov-area">
								<image src="../../static/BaseImage/bigImage/close@3x.png" class="Base-Image-exit-icon" mode="aspectFit" @click="handleClick(-1)"></image>
								<movable-view
									class="Base-Image-mov-view"
									direction="all"
									@scale="handleScale"
									scale="true"
									scale-min="1"
									scale-max="4"
									:scale-value="scale"
									out-of-bounds="true"
									@dblclick="handledblClick"
								>
									<image :src="item" class="Base-Image-large" mode="aspectFit"></image>
								</movable-view>
							</movable-area>
						</view>
					</view>
					<view v-if="!isReadOnly" class="Base-Image-Uploader" @click="upload">
						<image src="../../static/BaseImage/add.png" class="Base-Image-Uploader-add-icon"></image>
					</view>
				</view>
			</template>
		</van-field>
	</view>
</template>

<script>
	export default {
		name:"BaseImage",
		props:{
			params:{
				type:Object,
				default:{}
			}
		},
		data(){
			return {
				showLarge:false, //是否展示大图
				scale:1,
				iconList:{},
				imageList:[],
				showAdd:true
			}
		},
		async created() {
			let res = await this.$api.getIcon()
			this.iconList = res.data
		},
		computed:{
			isShowLarge(){
				return this.showLarge
			},
			isReadOnly(){
				if(this.params.readonly||this.params.disabled){
					return true
				}else{
					if(this.showAdd){
						return false
					}else{
						return true
					}
				}
			}
		},
		watch:{
			params:{
				handler(oldVal,val){
					if(this.params.value){
						this.imageList = JSON.parse(this.params.value)
						this.isMax()
					}
				}
			}
		},
		methods:{
			// 点击时显示大图
			handleClick(i){
				this.showLarge = i
				this.$forceUpdate()
			},
			// 缩放放大操作时响应的事件
			handleScale(){
				
			},
			// 是否上传图片超过上限
			isMax(){
				let that = this
				if(that.params["max-count"]){
					if(that.imageList.length>=that.params["max-count"]){
						that.showAdd = false
					}else{
						that.showAdd = true
					}
				}
			},
			// 双击操作
			handledblClick(){
				if(this.scale == 10){
					this.scale = 1
				}else{
					this.scale = 10
				}
			},
			// 上传
			upload(){
				let that = this
				uni.chooseImage({
					count:9,
					success:async function(path) {
						let files = path.tempFiles
						for(var i=0;i<files.length;i++){
							let file = files[i]
							let webPath = await that.$upload("/api/cloud/aliyun/oss/upload",file)
							// console.log(webPath)
							let fileList = that.imageList
							fileList.push(webPath)
							that.isMax()
							// console.log(fileList)
							that.$emit("change",JSON.stringify(fileList))
						}
					}
				})
			},
			// 删除
			handleDelete(i){
				this.imageList.splice(i,1)
				let that = this
				this.$emit("change",JSON.stringify(that.imageList))
			}
		}
	}
</script>

<style lang="less">
	.Base-Image-mov-view{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		text-align: center;
		&>.Base-Image-large{
			width: 100%;
		}
	}
	.Base-Image-exit-icon{
		position: fixed;
		bottom: 200rpx;
		left: 50%;
		transform: translate(-50%);
		width: 80rpx;
		height: 80rpx;
		z-index: 9999999;
		cursor: pointer;
	}
	.Base-Image-mov{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999998;
		background-color: #000000;
		opacity: .9;
		width: 100vw;
		height: 100vh;
	}
	.Base-Image-mov-area{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999998;
	}
	.Base-Image-thumb{
		width: 200rpx;
		height: 200rpx;
		background-color: #333333;
	}
	.Base-Image-ImageBox{
		width: 200rpx;
		height: 200rpx;
		position: relative;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}
	.Base-Image-delete{
		position: absolute;
		top: 0rpx;
		right: 0rpx;
		width: 40rpx;
		height: 40rpx;
		color: white;
		z-index: 200;
	}
	.Base-Image-Container{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
	}
	.Base-Image-Uploader{
		width: 190rpx;
		height: 190rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 5rpx dashed #888B8E;
		border-radius: 20rpx;
	}
	.Base-Image-Uploader-add-icon{
		width: 100rpx;
		height: 100rpx;
	}
	.Base-Image-large{
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
