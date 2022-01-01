<!-- 由于uniapp小程序对jsx很不友好，所以config.fields的children只支持到第一层 -->
<template>
	<view class="base_vants_container" :style="[_get(config, 'outStyle', {})]">
        <van-skeleton row="20" :loading="skeletonLoading">
					<view class="fields_Title" v-if="![undefined,null,''].includes(outTitle)">{{outTitle}}
						<text class="fields_jumpTitle" @click="handleJump(navigator.url)" v-if="navigator">{{navigator.title||""}}</text>
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
									<!-- 以上card为标题容器 -->
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
        </van-skeleton>
	</view>
    
</template>

<script>
	import _ from 'lodash'
    import BaseVants from './BaseVants.vue'
    import { globalConfig } from '@/config.js'

    const SUNMIT_API =  globalConfig.formHost + '/custom'
    const LOAD_API = globalConfig.formHost + '/userinfos'  // 默认获取数据
    const DEFAULT_CONFIG = globalConfig.formHost + '/form'
    
	export default {
        components: { 
          BaseVants 
        },
		props: {
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
			// 额外标题
			outTitle:{
				type:String,
				default(){
					return ""
				}
			},
            // 默认的提交数据
            formInfo: {
              type: Object,
              default() {
                return {}
              }
            },
            ifManualSubmit: Boolean, // 用于自定义提交
						Details:{
							type:Boolean,
							default:false
						},
						navigator:{
							type:Object,
							default:{}
						}
		},
		data() {
			return {
                formConfig: {}, // 表单配置
				fields: [],
				form: {},
				skeletonLoading: true,
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
            // 有具体配置信息时
            if (Object.keys(this.config).length > 0) {
                this.formConfig = _.cloneDeep(this.config)
            }
            if (_.has(this.formConfig, 'fields')) {
                this.handleInitFormData()
            } else {
               // 从默认配置中获取表单
               this.fetchDefaultFormConfig()
            }
			// 外部传入的数据源
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
						// 跳转
						handleJump(url){
							uni.navigateTo({
								url:"/pages"+url,
								fail(err){
									console.log(err)
								}
							})
						},
            // 获取表单数据
            fetchFormData () {
				let that = this
                uni.request({
                    url: that.$config.endpoint + _.get(that.formConfig, 'loadApi', '') || LOAD_API,
                    method: 'GET',
										header:{
											Authorization:`Bearer ${that.$cache.get(globalConfig.tokenStorageKey)}`
										},
                    complete: (res) => {
                       if (_.get(res, 'data.code') === 200) {
                           let resData = _.cloneDeep(_.get(res, 'data.data', {}))
                           if (_.isFunction(_.get(that.$parent, 'formatLoadData'))) {
                               resData = that.$parent.formatLoadData(resData)
                           }
                           that.form = { ...that.form, ...resData }
                       }
                    }
                })
            },
            
            // 从默认接口中获取表单配置
            fetchDefaultFormConfig () {
                uni.request({
                    url: DEFAULT_CONFIG + _.get(this.formConfig, 'url', ''),
                    method: 'GET',
                    data:  _.has(this.formConfig, 'id') ? { id: this.formConfig.id } : {},
                    complete: (res) => {
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
            
            // 从props中或者表单配置
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
            // 改变值时
            handleChange (e, item) {
              this.form[item.__vModel__] = e
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
            // 清空时
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
            // 设置错误信息
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
                if (_.isFunction(_.get(this.$parent, 'formatSubmitData'))) {
                    submitData = this.$parent.formatSubmitData(submitData)
                }
                console.log("submit",this.ifManualSubmit)
                if (this.ifManualSubmit) {
                    this.$emit('submit', submitData)
                } else {
                    this.handleSubmitRequest(submitData)
                }
            },
            
            // 组件内默认提交
            handleSubmitRequest (data) {
                const url = this.$config.endpoint + _.get(this.formConfig, 'saveApi') || SUNMIT_API
                uni.showLoading({ title: '', mask: true })
                uni.request({
                    url: url,
                    method:_.get(this.formConfig,'saveMethod')||'POST',
                    data: data,
                    complete: (res) => {
                        uni.hideLoading()
                        if (_.get(res, 'data.code') === 200) {
                            uni.showToast({
                                title:'操作成功'
                            })
                            setTimeout(() => {
                                uni.navigateBack()
                            }, 500)
                        }
                    }
                })
            }
		}
	}
</script>

<style lang="less">
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
			background: linear-gradient(left,#8C30EB,#0C98FF);
			color: #E8EBFE;
		}
		.dynamic-form-backButton{
			background-color: transparent;
			border: 1px solid #5F646A;
			color: #5F646A;
		}
</style>
