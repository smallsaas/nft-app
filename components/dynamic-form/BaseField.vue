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
          :titleWidth="'8em'"
          custom-style="color: red"
        >
			<template slot="input" style="width: 100%;">
				<view
					v-if="param.type === 'status'"
					
				>
					<text
					:style="{color: _get(getStatus(param.value), 'color')||'#B4B6B8','margin-right':'25rpx'}"
					>
						{{ _get(getStatus(param.value), 'label') || param.value}}
					</text>
					<text v-if=" _get(getStatus(param.value), 'display')" 
					class="canUse" 
					@click="showModal()"
					>
					{{ _get(getStatus(param.value), 'displayLabel') }}
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
				<view v-else-if="param.type === 'yzm'" class="yzm-container">
					<input
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
					<text class="yzm" @click="handleGetCode('/api/sms/v1/captcha')">{{canPush?"獲取驗證碼":codeTime+'秒後重試'}}</text>
				</view>

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
				<text v-if="param.tips" style="font-size:24rpx;color: #3D4348;">{{param.tips}}</text>
				<!-- <text v-if="param.canChange" :class="canUse?'canUse':'unUse'" @click="handleChange()">{{saveText}}</text></template> -->
				<text @click="showModal" v-if="param.canChange" :class="canUse?'canUse':'unUse'">{{saveText||"修改"}}</text>
				<view v-if="isModal">
					<view class="Modal-mask"></view>
					<view class="Modal-Content">
						<view class="Modal-window">
							<view class="Modal-title">{{param.modalTitle||"修改"}}</view>
							<view class="Modal-ContentBox">
								<view v-for="(item,i) in components">
									<view class="Modal-ContentBox-Label" v-if="item.type!=='status'">
										{{item.label}}
									</view>
									<view v-if="item.type === 'code'" :class="isFocus===i?'focus Modal-ContentBox-InputBox':'Modal-ContentBox-InputBox'">
										<input :placeholder="item.placeholder" placeholder-style="color:#fff;opacity:.3" class="Modal-ContentBox-Input" @focus="handleFocus(i)" @blur="handleBlur()" @input="(e)=>handleFieldChange(item.field,e)"/>
										<text :class="canPush?'Modal-ContentBox-code':'Modal-ContentBox-code unPush'" @click="handleGetCode(item.requestUrl)">{{canPush?'獲取驗證碼':codeTime+'秒後重試'}}</text>
									</view>
									<view v-else-if="item.type === 'password'" :class="isFocus===i?'focus Modal-ContentBox-InputBox':'Modal-ContentBox-InputBox'">
										<input :placeholder="item.placeholder" placeholder-style="color:#fff;opacity:.3" class="Modal-ContentBox-Input" type="password" @input="(e)=>handleFieldChange(item.field,e)" @focus="handleFocus(i)" @blur="handleBlur()"/>
									</view>
									<view v-else-if="item.type === 'status'" class="Modal-Status">
										<view class="Modal-Status-SubTitle">申請解凍需要{{fieldCache["UNLOCK_ACCOUNT_CONSUME_COINS"]||0}}個精靈令，是否馬上申請？</view>
										<view class="Modal-Status-Bbox"><image src="../../static/spirit/coin.png" class="Modal-Status-icon"></image>x{{fieldCache["UNLOCK_ACCOUNT_CONSUME_COINS"]||0}}</view>
									</view>
									<view v-else :class="isFocus===i?'focus Modal-ContentBox-InputBox':'Modal-ContentBox-InputBox'">
										<input :placeholder="item.placeholder" placeholder-style="color:#fff;opacity:.3" class="Modal-ContentBox-Input" @focus="handleFocus(i)" @blur="handleBlur()" @input="(e)=>handleFieldChange(item.field,e)"/>
									</view>
								</view>
							</view>
							<view class="password-Box">
								
							</view>
							<view class="Modal-ButtonGroup">
								<pretty-button class="Modal-btn" borderRadius="8rpx" type="gray" borderType="gray" :text="param.ModalCancelText||'取消'" @click="hideModal()"></pretty-button>
								<pretty-button class="Modal-btn" borderRadius="8rpx" :text="param.ModalSuccessText||'确定'" @click="isTypeStatus?handleShowPassword():param.type==='status'?handleStatus():handleSumbit()"></pretty-button>
							</view>
						</view>
					</view>
				</view>
			</template>
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
                        placeholder: '請填寫',
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
						},
						phone:{
							type:String,
							default:""
						}
        },
		data() {
			return {
				focus: false,
				saveText:"修改",
				isRead:false,
				isModal:false,
				isFocus:-1,
				timeCache:null,
				codeTime:60,
				canPush:true,
				formData:{},
				fieldCache:{},
				components:[],
				isTypeStatus:false
			}
		},
		created() {
			// console.log(this.param,"PARAM")
			this.components = this.param.components
			if(this.param.type === 'status'){
				this.isTypeStatus = true
			}
			this.whatIsRead()
			let fieldGroup = this.$cache.get("fieldGroup")
			if(fieldGroup){
				this.fieldCache = fieldGroup
			}
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
            _get(data, field, defaulevalue = '') {
                return _.get(data, field, defaulevalue)
            },
					handleShowPassword(){
						this.isModal = false
						this.isTypeStatus = false
						this.components = [
							{"type":"password","label":"請輸入支付密碼","field":"password"}
						]
						this.isModal = true
						console.log(this.components)
						this.$forceUpdate()
					},
					// 更改狀态(解凍)
					async handleStatus(){
						let param = {
							...this.formData
						}
						let that = this
						this.isModal = false
						this.components = this.param.components
						let res = await this.$api.unlock(param)
						if(res.code === 200){
							uni.showToast({
								title:"解鎖成功",
								icon:"success",
								success() {
									// that.$reload()
									that.$cache.set("FormChange",true)
									setTimeout(()=>{
										that.$reload()
									},1000)
								}
							})
						}else{
							uni.showToast({
								title:res.message,
								icon:"none",
								success() {
									that.$cache.set("FormChange",true)
									setTimeout(()=>{
										that.$reload()
									},1000)
								}
							})
						}
						console.log(res)
					},
					// 字段改變時
					handleFieldChange(field,value){
						this.formData[field] = value.target.value
					},
					// 提交
					async handleSumbit(){
						// let userCache = this.$cache.get("userCache")
						// console.log("讀取用戶緩存",userCache)
						console.log("submit")
						console.log(this.formData,'rrrrrrrrrrrrrrr')
						// this.formData.verifyCode = parseInt(this.formData.verifyCode)
						let param ={
							...this.formData
						}
						console.log(param,'rrrrrrrrrrrrrrr')
						let that =this
						let res = await this.$api.editUserData(param)
						if(res.code === 200){
							that.$cache.set("FormChange",true)
							that.$reload()
							uni.showToast({
								title:"提交成功",
								icon:"success",
								success(){
									that.isModal = false
								}
							})
						}else{
							console.log("fail")
							uni.showToast({
								title:res.message||"提交失敗",
								icon:"none"
							})
						}
						// console.log(res)
						
					},
					handleGetCode(api){
						console.log(api)
						let that = this
						if(!that.canPush){
							return ;
						}
						let token = this.$cache.get(that.$config.tokenStorageKey)
						uni.request({
							url:this.$config.endpoint + api,
							data:{
								phone:this.phone,
								operation:"changeAccount"
							},
							header:{
								Authorization:`Bearer ${token}`
							},
							method:"POST",
							success(res) {
								if(res.statusCode === 200){
									that.canPush = false
									that.timeCache = setInterval(()=>{
										that.codeTime = that.codeTime - 1
										if(that.codeTime === 0){
											that.canPush = true
											that.codeTime = 60
											clearInterval(that.timeCache)
										}
									},1000)
									uni.showToast({
										title:"發送成功",
										icon:"success"
									})
								}else{
									uni.showToast({
										title:res.data.message||res.data.msg,
										icon:"none"
									})
								}
							},
							fail(err) {
								uni.showToast({
									title:err.data.message||err.data.msg,
									icon:"none"
								})
							}
						})
					},
					handleFocus(i){
						this.isFocus = i
					},
					handleBlur(){
						this.isFocus = -1
					},
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
					showModal(){
						console.log('00000000000000------------------')
						console.log(this.canUse)
						if(this.canUse == true){
							this.isModal = true
						}
						// if(this.$frozen()){
						// 	return ;
						// }
						// if(!this.canUse){
						// 	uni.showToast({
						// 		title:"當前狀态不可用",
						// 		icon:"error"
						// 	})
						// 	return ;
						// }
						// const status = this.$cache.get('status')
						// if(status === 'FROZEN'){
						// 		// uni.showToast({
						// 		// 	title:"請解凍後再試",
						// 		// 	icon:"error"
						// 		// })
						// 		// return
						// 		this.isModal = true
						// }
						// this.isModal = true
					},
					hideModal(){
						this.components = this.param.components
						this.isModal = false
					},
					handleAPI(param){
						let that = this
						uni.request({
							url:param.api,
							success(res) {
								res = that.$JSONTW(res)
								if(res.data.code === 200){
									uni.showToast({
										title:param.successText||"成功",
										icon:'none'
									})
								}else{
									uni.showToast({
										title:param.errorText||"失敗",
										icon:'none'
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
									title:"當前狀态不可用"
								})
								return ;
							}else{
								if(this.saveText === '保存'){
									uni.request({
										url:that.param.saveAPI,
										method:that.param.method||'GET',
										complete(res) {
											res = that.$JSONTW(res)
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
													title:"更改失敗"
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

<style lang="less">
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
			font-size: 24rpx;
		}
		.readonly{
			// width: 7.5em;
			font-size: 24rpx;
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
		.Modal-mask{
			background: #000;
			opacity: .8;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1000;
		}
		.Modal-Content{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			justify-content: center;
			align-items: center;
			display: flex;
			z-index: 1001;
		}
		.Modal-title{
			font-size: 36rpx;
			color: #FFFFFF;
			margin-bottom: 24rpx;
		}
		.Modal-Status{
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding-bottom: 30rpx;
			color: #fff;
		}
		.Modal-Status-SubTitle{
			opacity: .5;
		}
		.Modal-Status-Bbox{
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 20rpx;
			letter-spacing:5rpx
		}
		.Modal-Status-icon{
			width: 50rpx;
			height: 50rpx;
			margin-right: 5rpx;
		}
		.Modal-window{
			background-color: #192746;
			width: 70%;
			display: flex;
			flex-direction: column;
			// height: 500px;
			padding: 48rpx;
			border-radius: 16rpx;
			box-shadow: inset 2rpx 2rpx 0rpx 2rpx #23335E;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.Modal-ContentBox{
			width: 100%;
		}

		.Modal-ContentBox-Label{
			color: #fff;
			opacity: .5;
			margin-bottom: 16rpx;
			font-size: 24rpx;
		}
		.Modal-ContentBox-InputBox{
			background-color: #363F4C;
			padding: 2rpx;
			border-radius: 8rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 16rpx;
			position: relative;
		}
		.focus{
			background: linear-gradient(90deg, #9331F5 0%, #0A95FF 100%);
		}
		.Modal-ContentBox-Input{
			width: 100%;
			background-color: #131D33;
			padding: 18rpx 24rpx;
			border-radius: 8rpx;
		}
		.Modal-ContentBox-code{
			color: #33A7FF;
			position: absolute;
			right: 20rpx;
			z-index: 5000;
			font-size: 28rpx;
			cursor: pointer;
		}
		.unPush{
			color: #7F8798;
		}
		.Modal-ButtonGroup{
			width: 100%;
			// height: 176rpx;
			margin-top: 16rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			border-top: 2rpx solid;
			// padding-top: 48rpx;
			border-image: linear-gradient(270deg, #182641 0%, #3F547D 49%, #182641 100%) 20;
			box-shadow: 0px -2px 10px 0px #172240;
			padding: 48rpx 48rpx 0 48rpx;
		}
		.Modal-btn{
			// width: 90%;
			margin: 0 24rpx 0 0;
			flex: 1;
			height: 80rpx;
		}
		.Modal-btn:last-child{
			margin: 0;
		}
		.yzm{
			position: absolute;
			right: 20px;
			top: 50%;
			transform: translate(0,-50%);
			z-index: 999999;
			color: #3A72F8;
		}
		.yzm-container{
			width: 100%;
			display: flex;
			// position: relative;
		}
</style>
