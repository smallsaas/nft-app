<!-- 由于uniapp小程序對jsx很不友好，所以config.fields的children隻支持到第一層 -->
<template>
	<view class="base_vants_container" :style="[_get(config, 'outStyle', {})]">
		<!-- #ifdef H5 -->
        <van-skeleton row="20" :loading="skeletonLoading">
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
				<view v-if="!skeletonLoading">
		<!-- #endif -->
					<view class="fields_Title" v-if="![undefined,null,''].includes(outTitle)">{{outTitle}}
						<text class="fields_jumpTitle" @click="handleJump(navigator.url)" v-if="navigator.title">{{navigator.title||""}}</text>
						<text @click="showModal" v-if="modal.title" class="fields_jumpTitle">{{modal.title||"修改"}}</text>
						<view v-if="isModal">
							<view class="Modal-mask"></view>
							<view class="Modal-Content">
								<view class="Modal-window">
									<view class="Modal-title">{{modal.ModalTitle||"修改"}}</view>
									<view class="Modal-ContentBox">
										<view v-for="(item,i) in modal.components">
											<view class="Modal-ContentBox-Label">
												{{item.label}}
											</view>
											<view v-if="item.type === 'code'" :class="isFocus===i?'focus Modal-ContentBox-InputBox':'Modal-ContentBox-InputBox'">
												<input :placeholder="item.placeholder" placeholder-style="color:#fff;opacity:.3;font-size:28rpx" class="Modal-ContentBox-Input" @focus="handleFocus(i)" @blur="handleBlur()" @input="(e)=>handleFieldChange(item.field,e)"/>
												<text :class="canPush?'Modal-ContentBox-code':'Modal-ContentBox-code unPush'" @click="handleGetCode(item.requestUrl)">{{canPush?'獲取驗證碼':+codeTime+'秒後重試'}}</text>
											</view>
											<view v-else-if="item.type === 'password'" :class="isFocus===i?'focus Modal-ContentBox-InputBox':'Modal-ContentBox-InputBox'">
												<input :placeholder="item.placeholder" placeholder-style="color:#fff;opacity:.3;font-size:28rpx" class="Modal-ContentBox-Input" type="password" @input="(e)=>handleFieldChange(item.field,e)" @focus="handleFocus(i)" @blur="handleBlur()"/>
											</view>
											<view v-else :class="isFocus===i?'focus Modal-ContentBox-InputBox':'Modal-ContentBox-InputBox'">
												<input :placeholder="item.placeholder" placeholder-style="color:#fff;opacity:.3;font-size:28rpx" class="Modal-ContentBox-Input" @focus="handleFocus(i)" @blur="handleBlur()" @input="(e)=>handleFieldChange(item.field,e)"/>
											</view>
										</view>
									</view>
									<view class="Modal-ButtonGroup">
										<pretty-button class="Modal-btn" borderRadius="8rpx" type="gray" borderType="gray" :text="modal.ModalCancelText||'取消'" @click="hideModal()"></pretty-button>
										<pretty-button class="Modal-btn" borderRadius="8rpx" :text="modal.ModalSuccessText||'确定'" @click="handleSumbitModal()"></pretty-button>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view :class="_get(fields[0],'__config__.layout') === 'colFormItem'?'fields-block':''">
						<block v-for="(item, index) in fields" :key="index">
						    <base-vants 
						        v-if="_get(item, '__config__.layout') === 'colFormItem'"
						        :fields="[{...item}]"
						        :form="form"
										:Details="Details"
						        @change="handleChange"
						        @clear="handleClear"
						    />
						    <view v-if="_get(item, '__config__.layout') === 'rowFormItem'"
								style="padding: 10rpx;border-radius: 5px;"
								>
									<card :title="_get(item, '__config__.componentName')" 
										:Style="{
											title:{
												'font':'30px',
												'textAlign':'center',
												'padding':'10rpx 0',
											}
										}"
									:jump="_get(item,'__config__.jump',false)"
									:url="config.NextNavigation||config.submittedNavigation"
									>
									<!-- 以上card爲标題容器 -->
										<!-- <view class="line"></view> -->
										<!-- <view>{{_get(item, '__config__.componentName')}}</view> -->
						        <block v-for="(k, i) in _get(item, '__config__.children', [])" :key="i">
						            <base-vants
						                v-if="_get(k, '__config__.layout') === 'colFormItem'"
						                :fields="[{...k}]"
						                :form="form"
														:Details="Details"
						                @change="handleChange"
						                @clear="handleClear"
						            />
						            <view v-else>
						                <view class="form_row_title">
															{{_get(k, '__config__.componentName')}}
														</view>
						                <base-vants
						                    :fields="_get(k, '__config__.children', [])"
						                    :form="form"
																:Details="Details"
						                    @change="handleChange"
						                    @clear="handleClear"
						                />
						            </view>
						        </block>
									</card>
						    </view>
						</block>
					</view>
					<view class="dynamic-form-button-group" v-if="!Details&&(_get(config, 'formBtns', true) && fields.length > 0)">
						<button
							class="dynamic-form-submitButton"
							@click='handleSubmit'
						>
							保存
						</button>
						<button
							class="dynamic-form-backButton"
							@click="handleReturn"
						>
							取消
						</button>
					</view>
				<!-- #ifdef H5 -->
        </van-skeleton>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				</view>
				<!-- #endif -->
	</view>
    
</template>

<script>
	import _ from 'lodash'
    import BaseVants from './BaseVants.vue'
    import { globalConfig } from '@/config.js'

    const SUNMIT_API =  globalConfig.formHost + '/custom'
    const LOAD_API = globalConfig.formHost + '/userinfos'  // 默認獲取數據
    const DEFAULT_CONFIG = globalConfig.formHost + '/form'
    
	export default {
        components: { 
          BaseVants 
        },
		props: {
			//驗證是否有副手機号碼
			checkBackPhone:{
				type:String,
				default(){
					return ""
				}
			},
			
			config: {
                type: Object,
                default: function () {
                    return {}
                }
            },
			srvFormData: {
			  type: Object,
			  default() {
			    return {}
			  }
			},
			// 額外标題
			outTitle:{
				type:String,
				default(){
					return ""
				}
			},
            // 默認的提交數據
            formInfo: {
              type: Object,
              default() {
                return {}
              }
            },
            ifManualSubmit: Boolean, // 用于自定義提交
						Details:{
							type:Boolean,
							default:false
						},
						navigator:{
							type:Object,
							default(){
								return {}
							}
						},
						modal:{
							type:Object,
							default(){
								return {}
							}
						},
						useField:{ //使用現有字段提交，默認提交全部
								type:Boolean,
								default(){
									return true
								}
						},
						formId:{ //頁面緩存的id
							type:String,
							default(){
								return '0'
							}
						}
		},
		data() {
			return {
                formConfig: {}, // 表單配置
				fields: [],
				form: {},
				skeletonLoading: true,
				isModal:false,
				isFocus:-1,
				canPush:true,
				codeTime:60,
				formData:{},
				fieldGroup:[]
			}
		},
        watch: {
            config: {
                handler(val, oldVal) {
                  if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
                    if (_.get(val, 'fields')) {
                        this.handleInitFormData()
                    }
                  }
                },
                deep: true
             }, 
             srvFormData: {
                 handler(val, oldVal) {
                   if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
                      if (_.get(val, 'fields')) {
                           this.handleInitFormData()
                      }
                   }
                 },
                 deep: true
              },  
        },
		mounted() {
            console.log("srv",this.srvFormData)
            // 有具體配置信息時
            if (Object.keys(this.config).length > 0) {
                this.formConfig = _.cloneDeep(this.config)
            }
            if (_.has(this.formConfig, 'fields')) {
                this.handleInitFormData()
            } else {
               // 從默認配置中獲取表單
               this.fetchDefaultFormConfig()
            }
			console.log("SRVFORMDATA",this.srvFormData)
			// 外部傳入的數據源
			if (Object.keys(this.srvFormData).length > 0) {
                this.form = { ...this.srvFormData }
								this.$forceUpdate()
				return
			}
            this.fetchFormData()
		},
		methods: {
            _get (item, str, defauleValue = '') {
              return _.get(item, str, defauleValue)
            },
						// 跳轉
						handleJump(url){
							if(this.form.backupMobilePhone == null || this.form.backupMobilePhone==''){
								uni.showToast({
									icon:'error',
									duration:1000,
									title:'請先完善副手機号!'
								})
								return
							}
							uni.navigateTo({
								url:"/pages"+url,
								fail(err){
									console.log(err)
								}
							})
						},
						// 顯示模态框
						showModal(){
							this.isModal = true
						},
						hideModal(){
							this.isModal = false
						},
						// 字段改變時
						handleFieldChange(field,value){
							this.formData[field] = value.target.value
						},
						// 提交
						async handleSumbitModal(){
							// let userCache = this.$cache.get("userCache")
							// console.log("讀取用戶緩存",userCache)
							let param ={
								...this.formData
							}
						let res = await this.$api.changePassword(param)
						let that =this
						console.log(res,"res")
						if(res.code === 200){
							uni.showToast({
								title:"提交成功",
								icon:"success",
								success(){
									that.isModal = false
									that.$cache.set("FormChange",true)
									// let self = that
									// setTimeout(()=>{
										// self.$reload()
									// },1000)
								}
							})
						}else{
							uni.showToast({
								title:"提交失敗",
								icon:"error"
							})
						}
							console.log(res)
							
						},
						// 獲取驗證碼
						handleGetCode(api){
							let that = this
							if(!that.canPush){
								return ;
							}
							uni.request({
								url:this.$config.endpoint + api,
								success(res) {
									console.log(res,"success")
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
								},
								fail(err) {
									uni.showToast({
										title:err.message||err.msg
									})
								}
							})
						},
            // 獲取表單數據
            fetchFormData () {
				console.log("USE FETCH")
				let that = this
                uni.request({
                    url: that.$config.endpoint + _.get(that.formConfig, 'loadApi', '') || LOAD_API,
                    method: 'GET',
										header:{
											Authorization:`Bearer ${that.$cache.get(globalConfig.tokenStorageKey)}`
										},
                    complete: (res) => {
											that.searchConfig(that.config.fields)
                       if (_.get(res, 'data.code') === 200) {
                           let resData = _.cloneDeep(_.get(res, 'data.data', {}))
                           if (_.isFunction(_.get(that.$parent, 'formatLoadData'))) {
                               resData = that.$parent.formatLoadData(resData)
                           }
                           that.form = { ...that.form, ...resData }
						   that.$timeCache(`page_${that.formId}_form_Srv`,that.form,that.$config.cachePolicy*24*60*60)
                       }
                    }
                })
            },
            // 查找表單字段
						searchConfig(config){
							let that = this
							console.log(config,"CONFIG")
							config.map((item,i)=>{
								console.log(item,"ITEM")
								if(item.__vModel__){
									that.fieldGroup.push(item.__vModel__)
									console.log(that.fieldGroup,"FIELDGROUP")
								}else{
									if(item.__config__){
										if(item.__config__.children){
											that.searchConfig(item.__config__.children)
										}
									}
								}
							})
						},
            // 從默認接口中獲取表單配置
            fetchDefaultFormConfig () {
							let that = this
                uni.request({
                    url: DEFAULT_CONFIG + _.get(this.formConfig, 'url', ''),
                    method: 'GET',
                    data:  _.has(this.formConfig, 'id') ? { id: this.formConfig.id } : {},
                    complete: (res) => {
											res = that.$JSONTW(res)
                        if (_.get(res, 'data.code') === 200) {
                            this.formConfig = {
                                ..._.get(res, 'data.data', {}),
                                ...this.formConfig
                            }
                            if (_.has(this.formConfig, 'fields')) {
                                this.handleInitFormData()
                            }
                        }
                    }
                })
            },
            
            // 從props中或者表單配置
            handleInitFormData () {
				const renderChild = (data = []) => {
					data.map(x => {
						const value = this.form[x.__vModel__] || _.get(this.srvFormData, x.__vModel__) || _.get(x, '__config__.defaultValue')
                        if (_.has(x, '__vModel__')) {
                            this.form[x.__vModel__] = value
                        }
						if (_.get(x, '__config__.children', []).length > 0) {
						    x.__config__.children = [...renderChild(x.__config__.children)]
						}
						return x
					})
					return data
				}
            	this.fields = [...renderChild(_.cloneDeep(_.get(this.formConfig, 'fields', [])))]
				this.skeletonLoading = false
            },
            // 改變值時
            handleChange (e, item) {
              this.form[item.__vModel__] = e
							console.log(this.form)
              const checkRequired = (data = []) => {
                  data.map(x => {
                      if (x['__vModel__'] === item['__vModel__']) {
						  const formType = _.get(x, '__config__.tag') 
                          x.error = _.get(x, '__config__.required') ? !e : false
                          if (['el-upload', 'el-checkbox-group'].includes(formType)) {
                             x.error = _.get(x, '__config__.required') ? (!e || e.length === 0) : false
                          }
                      }
                      if (_.get(x, '__config__.children', []).length > 0) {
                          x.__config__.children = [...checkRequired(x.__config__.children)]
                      }
                      return x
                  })
                  return data
              }
              this.fields = [...checkRequired(this.fields)]
            },
						// 返回事件
						handleReturn(){
							uni.navigateBack({
								delta:1
							})
						},
            // 清空時
            handleClear (e, item) {
                this.form[item.__vModel__] = ''
                const checkRequired = (data = []) => {
                    data.map(x => {
                        if (x['__vModel__'] === item['__vModel__'] && ['', undefined].includes(this.form[x.__vModel__])) {
                            x.error = _.get(x, '__config__.required') ? !e : false
                        }
                        if (_.get(x, '__config__.children', []).length > 0) {
                            x.__config__.children = [...checkRequired(x.__config__.children)]
                        }
                        return x
                    })
                    return data
                }
                this.fields = [...checkRequired(this.fields)]
            },
            // 設置錯誤信息
            handleRecursive (data = []) {
                data.map(x => {
                    if (_.get(x, '__config__.required') === true) {
						const formType = _.get(x, '__config__.tag')
                        if (['', undefined, null].includes(this.form[x.__vModel__])) {
                            x.error = true
                        }
                        if (formType === 'el-checkbox-group' && _.get(this.form, x.__vModel__, []).length === 0) {
                           x.error = true 
                        }
						if (formType === 'el-switch' && ['', undefined, null, false].includes(this.form[x.__vModel__])) {
							x.error = true
						}
                        if (formType === 'el-slider' && ['', undefined, null, false, 0].includes(this.form[x.__vModel__])) {
                            x.error = true
                        }
                    }
                    if (_.get(x, '__config__.children', []).length > 0) {
                        x.__config__.children = [...this.handleRecursive(x.__config__.children)]
                    }
                    return x
                })
                return data
            },
            
            // 提交
            handleSubmit () {
                const list = this.fields
                this.fields = [...this.handleRecursive(list)]
				let isPass = true
				const checkField = (data = []) => {
					data.map(x => {
						if (x.error) {
							isPass = false
						}
						if (_.get(x, '__config__.children', []).length > 0) {
						   checkField(x.__config__.children) 
						}
					})
				}
                checkField(this.fields)
                if (!isPass) {
                    return
                }
                let submitData = {
                    ...this.formInfo,
                    ..._.get(this.srvFormData, 'id') ? { id: this.srvFormData.id } : {},
                    ...this.form
                }
								// 隻提交已有字段
								let fieldSumbit = {}
								if(this.useField){
									this.fieldGroup.map((item,i)=>{
										fieldSumbit[item] = submitData[item]
									})
								}else{
									fieldSumbit = submitData
								}

                if (_.isFunction(_.get(this.$parent, 'formatSubmitData'))) {
                    fieldSumbit = this.$parent.formatSubmitData(fieldSumbit)
                }
                if (this.ifManualSubmit) {
                    this.$emit('submit', fieldSumbit)
                } else {
                    this.handleSubmitRequest(fieldSumbit)
                }
            },
            
            // 組件内默認提交
            handleSubmitRequest (data) {
							let that = this
                const url = this.$config.endpoint + _.get(this.formConfig, 'saveApi') || SUNMIT_API
                uni.showLoading({ title: '', mask: true })
                uni.request({
                    url: url,
                    method:_.get(this.formConfig,'saveMethod')||'POST',
                    data: data,
										header:{
											Authorization:`Bearer ${that.$cache.get(that.$config.tokenStorageKey)}`
										},
                    complete: (res) => {
											res = that.$JSONTW(res)
                        uni.hideLoading()
                        if (_.get(res, 'data.code') === 200) {
                            uni.showToast({
                                title:'操作成功'
                            })
                            setTimeout(() => {
															that.$cache.set("FormChange",true)
															uni.navigateBack({
																delta:1
															})
                            }, 500)
                        }else{
													uni.showToast({
														title:'提交失敗',
														icon:'error'
													})
												}
                    }
                })
            }
		}
	}
</script>

<style lang="less" scoped>
	.fields_Title{
		font-size: 34rpx;
		margin-left: 20rpx;
		margin-top: 30rpx;
		font-weight: 600;
	}
	.fields_jumpTitle{
		line-height: 34rpx;
		font-size: 26rpx;
		color: #08518B;
		margin-left: 20rpx;
		font-weight: 500;
	}
	.fields-block{
		margin: 10rpx;
		padding: 10rpx;
		background-color: #11181E;
		border-radius: 20rpx;
	}
    .base_vants_container {
        .form_row_title {
            color: rgba(80, 80, 80, 1);
            font-size: 30rpx;
            line-height: 150%;
            text-align: left;
            font-weight: bold;
            padding: 10rpx 14rpx;
			display: flex;
			align-items: center;
			& .line {
				width: 6rpx;
				height: 30rpx;
				background-color: rgba(153, 153, 153, 1);
				margin-right: 10rpx;
			}
        }
        .submit_but {
        	width: 80%;
        }
    }
		.dynamic-form-button-group{
			display: flex;
			padding: 25rpx;
		}
		.dynamic-form-backButton,.dynamic-form-submitButton{
			width: 290rpx;
			height: 90rpx;
			line-height: 90rpx;
			font-size: 32rpx;
		}
		.dynamic-form-submitButton{
			background: linear-gradient(to left,#8C30EB,#0C98FF);
			color: #E8EBFE;
		}
		.dynamic-form-backButton{
			background-color: transparent;
			border: 1px solid #5F646A;
			color: #5F646A;
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
			font-size: 28rpx;
			z-index: 5000;
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
</style>
