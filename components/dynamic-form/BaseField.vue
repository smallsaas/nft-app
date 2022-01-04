<template>
    <view :class="[`base_field_containe ${param.inputBlock ? 'van_field_input_block' : ''}`]">
        <van-field
           autosize
          :label="param.label"
          :required="param.required"
          :left-icon="param['left-icon']"
          :right-icon="param['right-icon']"
          :show-word-limit="param['show-word-limit']"
          :error="param.error === true"
          :error-message="param['error-message'] || ''"
          :style="param.style"
          label-class="van_field_label"
        >
			<template slot="input" style="width: 100%;">
				<view
					v-if="param.type === 'status'"
					
				>
					<text
					:style="{color:getStatus(param.value).color||'#B4B6B8','margin-right':'25rpx'}"
					>
						{{getStatus(param.value).label||param.value}}
					</text>
					<text v-if="getStatus(param.value).display" 
					class="canUse" 
					@click="handleAPI(getStatus(param.value))"
					>
					{{getStatus(param.value).displayLabel}}
					</text>
				</view>
				<textarea 
					v-else-if="param.type === 'textarea'"
					auto-height
					
					:placeholder="param.placeholder"
					:placeholder-style="param['placeholder-style'] || 'color: #C8C9CC'"
					:disabled="isRead"
					:maxlength="param.maxlength || -1"
					:value="param.value"
					@input="handleInput"
				/>
				<input
					v-else
					:type="param.type"
					:placeholder="param.placeholder"
					:placeholder-style="param['placeholder-style'] || 'color: #7D8187'"
					:disabled="isRead"
					:maxlength="param.maxlength || -1"
					:password="param.password"
					:value="param.value"
					@input="handleInput"
					:class="isRead?'readonly':'baseInput'"
				/>
				<text v-if="param.tips" style="color: #3D4348;">{{param.tips}}</text>
				<text v-if="param.canChange" :class="canUse?'canUse':'unUse'" @click="handleChange()">{{saveText}}</text></template>
		</van-field>
    </view>
</template>

<script>
    import _ from 'lodash'
    export default {
        props: {
            param: {
                type: Object,
                default: function() {
                    return { 
                        inputBlock: false,
                        type: 'text',
                        value: '',
                        placeholder: '请填写',
                        required: false,
                        clearable: false,
                        maxlength: -1,
                        "show-word-limit": false,
                        readonly: false,
                        disabled: false,
                        password: false,
                        error: false,
                        "error-message": "",
                        style: "",
												doNotUseValue:"",
												saveAPI:"",
												canChange:""
                    }
                }
            },
						status:{
							type:String,
							default:""
						}
        },
		data() {
			return {
				focus: false,
				saveText:"修改",
				isRead:false
			}
		},
		created() {
			this.whatIsRead()
		},
		computed:{
			canUse(){
				if(this.status === this.param.doNotUseValue){
					return false
				}else{
					return true
				}
			}
		},
        methods: {
					getStatus(value){
						let find = this.param.options.find(item=>item.value === value)
						return find
					},
					whatIsRead(){
						if(this.param.disabled || this.param.readonly){
							this.isRead = true
						}else{
							this.isRead = false
						}
					},
					handleAPI(param){
						uni.request({
							url:param.api,
							success(res) {
								if(res.data.code === 200){
									uni.showToast({
										title:param.successText||"成功",
										icon:'success'
									})
								}else{
									uni.showToast({
										title:param.errorText||"失败",
										icon:'error'
									})
								}
							}
						})
					},
            handleInput (e) {
               this.$emit("input", e.detail.value)
            },
						handleChange(){
							let that = this
							if(this.status === this.param.doNotUseValue){
								uni.showToast({
									icon:"error",
									title:"当前状态不可用"
								})
								return ;
							}else{
								if(this.saveText === '保存'){
									uni.request({
										url:that.param.saveAPI,
										complete(res) {
											if(res.data.code === 200){
												this.isRead = !this.isRead
												this.saveText = "修改"
												uni.showToast({
													icon:"success",
													title:"更改成功"
												})
											}else{
												uni.showToast({
													icon:"error",
													title:"更改失败"
												})
											}
										}
									})
								}else{
									this.isRead = !this.isRead
									this.saveText = "保存"
								}
							}
						}
        }
    }
</script>

<style lang="less" scoped>
    @import "./common.less";
    .base_field_container {}
		.baseInput{
			background-color: #242A33;
			border-radius: 10rpx;
			padding: 15rpx 25rpx;
			border: 1px solid #2F3844;
			width: 100%;
			margin-right: 15rpx;
			color: #7D8187;
			font-size: 10rpx;
		}
		.readonly{
			width: 7em;
			color: #B4B6B8;
		}
		.canUse,.unUse{
			min-width: 3em;
		}
		.canUse{
			color: #0E5E9C;
		}
		.unUse{
			color: #3B4146;
		}
</style>
