<template>
	<view :style="[_get(config, 'pageStyle', {}), _get(config, 'moduleContainer', {})]" class="dynamic-page-container">
			<!-- #ifdef H5 -->
        <van-skeleton row="10" :loading="skeletonLoading">
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
				<view v-if="!skeletonLoading">
			<!-- #endif -->
          <block v-if="_get(config, 'modules', []).length > 0">
            <view v-for="(item, index) in config.modules" :key="index">
									<dynamic-form
										:Details="Details||item.Details"
										 v-if="_get(item, 'type') === 'autoform'"
										 :config="{
												..._get(config.moduleData, item.key, {}),
												outStyle: getComponentStyle(item)
										 }"
										:srvFormData="getComponentsData(item) || ((formData||srvFormData)||{})"
										:outTitle="_get(item,'name')"
										:navigator="_get(item,'navigator')"
										:modal="_get(item,'modal')"
										:useField="_get(item,'useField',false)"
										:ifManualSubmit="ifManualSubmit"
										@submit="handleSubmit"
									/>
										<view
										v-if="_get(item, 'type') === 'autolist'"
										>
											<card
													:otherStyle="{
														'padding':'10px 0 0 0',
														'fill':'#CACCCD',
														'title':{
															'fill':'#CACCCD'
														}
													}"
													:title="_get(item,'name','')||listName"
													:jump="_get(_get(config.moduleData,item.key,{}),'jump',false)"
													:jumpText="_get(_get(config.moduleData,item.key,{}),'jumpText','')"
													:url="_get(_get(config.moduleData,item.key,{}),'jumpUrl','')"
													v-if="_get(item,'name')||listName"
													>
									    <dynamic-list
											:unloading="_get(_get(config.moduleData,item.key,{}),'unloading',false)"
									      :config="{
									          ..._get(config.moduleData, item.key, {}),
									...getComponentsData(item) ? { list: getComponentsData(item) } : {},
									          outStyle: getComponentStyle(item)
									      }"
												:otherSearch="otherSearch"
									    />
											</card>
											<dynamic-list
											:unloading="_get(_get(config.moduleData,item.key,{}),'unloading',false)"
												:config="{
																	..._get(config.moduleData, item.key, {}),
												...getComponentsData(item) ? { list: getComponentsData(item) } : {},
																	outStyle: getComponentStyle(item)
												}"
												v-if="!_get(item,'name')&&!listName"
												:otherSearch="otherSearch"
											></dynamic-list>
										</view>
										
									<view v-if="_get(item, 'type') === 'banner'">
										<card
											:otherStyle="{
												'padding':'10px 0 0 0',
												'fill':'#CACCCD',
												'title':{
													'fill':'#CACCCD'
												}
											}"
											:title="_get(item,'name','')"
											v-if="_get(item,'name')!==undefined&&_get(item,'name')!==''"
											>
										<swiper-images 
											 :list="getComponentsData(item) ||  _get(config.moduleData, `${item.key}.banners`, [])"
											 :outStyle="getComponentStyle(item)"
										/>
									</card>
									<swiper-images
											v-if="_get(item,'name')===undefined||_get(item,'name')===''"
										 :list="getComponentsData(item) ||  _get(config.moduleData, `${item.key}.banners`, [])"
										 :outStyle="getComponentStyle(item)"
									/>
								</view>
								
					<view v-if="_get(item, 'type') === 'navlist'">
						<card
							:otherStyle="{
								'padding':'10px 0 0 0',
								'fill':'#EFEFEF',
								'title':{
									'fill':'#FFFFFF'
								}
							}"
							:title="_get(item,'name','')"
							v-if="_get(item,'name')!==undefined&&_get(item,'name')!==''"
							>
                <nav-list 
										:title="_get(item,'name','')"
										:config="{
											list: _get(config.moduleData, `${item.key}.navList`, []),
											itemModule: _get(config.moduleData, `${item.key}.itemModule`, []),
											outStyle: getComponentStyle(item),

										}"
                 />
							</card>
							<nav-list
								v-if="_get(item,'name')===undefined||_get(item,'name')===''"
									:title="_get(item,'name','')"
									:config="{
										list: _get(config.moduleData, `${item.key}.navList`, []),
										itemModule: _get(config.moduleData, `${item.key}.itemModule`, []),
										outStyle: getComponentStyle(item),

									}"
							 />
						</view>
				 <box-list
						v-if="_get(item,'type') === 'boxList'"
						:list="_get(config.moduleData,`${item.key}.navList`,[])"
				 ></box-list>
						<search
						 v-if="_get(item, 'type') === 'search'"
						 :config = "_get(config.moduleData,item.key,{})"
						></search>
						
						<!-- 新增  2021-2-25 -->
						<cell
							v-if="_get(item, 'type') === 'cell'"
							:param = "_get(config.moduleData,`${item.key}.param`, {})"
							:days = "getComponentsData(item) || 0"
						/>
						<!-- end -->
						<!-- 步驟條組件 2021-6-29 -->
						<steps
							v-if="_get(item, 'type') === 'steps'"
							:list="getComponentsData(item) ||  _get(config.moduleData, `${item.key}.steps`, [])"
							:outStyle="getComponentStyle(item)"
						></steps>
						 <c-button
						 	v-if="_get(item, 'type') === 'button'"
						 	:config = "_get(config.moduleData,item.key,{})"
						 ></c-button>
						 <avatar
							v-if="_get(item,'type') === 'avatar'"
							:item="getComponentsData(item)"
							:avatarData="_get(config.moduleData,item.key,{})"
						 ></avatar>
						 <sign-smoke-box
							v-if="_get(item,'type')==='sign-box'"
							:signData="getComponentsData(item)"
						 ></sign-smoke-box>
						 <pay
						 							v-if="_get(item,'type') === 'no-pay'"
						 							:item="getComponentsData(item)"
						 							:noPayData="_get(config.moduleData,item.key,{})"
						 ></pay>
						 <user
						 							v-if="_get(item,'type') === 'user'"
						 							:item="getComponentsData(item)"
						 							:pathData="_get(config.moduleData,item.key,{})"
						 ></user>
						 <!-- tab欄組件 -->
						 <pageTabbar
							v-if="_get(item,'type') === 'pageTabbar'"
							:tabs="_get(config.moduleData,item.key,{tabs:[]}).tabs"
						 ></pageTabbar>
						 <service
						 							v-if="_get(item,'type') === 'service'"
						 							:item="getComponentsData(item)"
						 ></service>
						 <my-history
						 							v-if="_get(item,'type') === 'my-history'"
						 							:item="getComponentsData(item)"
						 ></my-history>
						 <check-team-list
						 							v-if="_get(item,'type') === 'check-team-list'"
						 							:item="getComponentsData(item)"
						 ></check-team-list>
            </view>
          </block>
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
	import qs from 'qs'
	import { getFormAPIdata } from '../../common/api.js'
	import { request } from '../../common/request.js'
	import { Base64,guid } from '../../utils/tools.js'
	import dynamicList from '../dynamic-list/index.vue'
    import dynamicForm from '../dynamic-form/index.vue'
	import swiperImages from '../swiper-images/index.vue'
    import navList from '../nav-list/index.vue'
    import boxList from '../box-list/box-list.vue'
	import card from '../other/Card.vue'
	import search from '../search/search.vue'
	import cell from '../other/Cell.vue'
	import steps from '../Steps/Steps.vue'
	import cButton from '../other/C-Button.vue'
	import Avatar from '../Avatar.vue'
	import signSmokeBox from '../signIn/signSmokeBox.vue'
	import Pay from '../Pay.vue'
	import User from '../User.vue'
	import pageTabbar from '../publicComponents/pageTabbar/pageTabbar.vue'
    import { globalConfig } from '@/config.js'
    import {LoadComplete} from '@/common/api.js'
	
	//服務中心
	import Service from '../my/service.vue'
	//我的記錄
	import MyHistory from '../history/myhistory.vue'
	//直推查詢列表
	import CheckTeamList from '../team/checkTeamList.vue'
	export default {
		components: { 
			dynamicList, 
			dynamicForm,
			swiperImages,
			navList,
			boxList,
			card,
			search,
			cell,
			steps,
			cButton,
			Avatar,
			signSmokeBox,
			Pay,
			User,
			pageTabbar,
			Service,
			MyHistory,
			CheckTeamList
		},
		props: {
			API: String,  // 頁面數據請求接口
            requsetParam: {  // 頁面數據請求參數
				type: Object,
				default: function () {
					return {}
				}
			},
            contentType: {  //頁面數據類型 [base64, json]
                type: String,
                default: 'json'
            },
            contentPayload: {  //頁面有效數據位置
                type: String,
                default: 'data'
            },
						srvFormData:{
							type:Object
						},
						Details:Boolean,
						otherSearch:{
							type:Object,
							default(){
								return {}
							}
						},
						listName:{
							type:String,
							default(){
								return ""
							}
						},
						// 用于表單自定義提交
						ifManualSubmit:{
							type:Boolean,
							default:false
						}
		},
		data () {
			return {
				config: null, //頁面配置信息
				pageData: {}, // 頁面數據
				skeletonLoading: true,
				
				header: {  // 請求header
						Authorization: `Bearer ${uni.getStorageSync(`${globalConfig.tokenStorageKey}`) || ''}`,
						token: uni.getStorageSync(`${globalConfig.tokenStorageKey}`) || ''
				},
				codeData:null,
				codeAPI:"",
				code:"",
				state:null,
				conf:null,
				formData:null
			}

		},
		created() {
			let that = this
			let id = this.formatId(this.API)
			if(id){
				let data = this.$timeCache(`page_${id}`)
				let change = this.$cache.get("FormChange")
				let formData
				if(!change){
					formData = this.$timeCache(`page_${id}_form_Srv`)
				}else{
					this.$cache.remove('FormChange')
				}
				if(data){
					console.log("使用緩存page_"+id,data)
					if(formData){
						console.log(`使用緩存page_${id}_form_Srv`,formData)
						that.formData = formData
					}
					console.log(this.formData,"this")
					this.loadPage(data)
					this.$forceUpdate()
				}else{
					this.fetchConfigData()
				}
			}else{
				this.fetchConfigData()
			}
		},
		mounted(){
			let id = this.formatId(this.API)
			let that = this 
			this.skeletonLoading = true
			if(id){
				let data = this.$timeCache(`page_${id}`)
				let formData = this.$timeCache(`page_${id}_form_Srv`)
				if(data){
					console.log("使用緩存page_"+id,data)
					if(formData){
						console.log(`使用緩存page_${id}_form_Srv`,formData)
						that.formData = formData
					}
					console.log(this.formData,"this",this.srvFormData)
					this.loadPage(data)
					this.$forceUpdate()
				}else{
					this.fetchConfigData()
				}
			}else{
				this.fetchConfigData()
			}
			this.skeletonLoading = false
			// console.log("srv",this.srvFormData)
			let TFormKey = this.FormKey
			// console.log(this.FormKey)
			// console.log("modules",this.config.modules)
			if(this.config){
				this.config.modules.map((item,i)=>{
					if(_.get(item, 'type') === 'autoform'){
						let FormKey = _.get(item,'FormKey','')
						// console.log("能到這")
						if(FormKey){
							// console.log("FormKey",FormKey)
							this.getWorkflow(FormKey)	
						}else if(TFormKey){
							this.getWorkflow(TFormKey)
						}else{
							this.getCodeData(this.codeAPI,this.code)
						}
					}
				})
			}
			// console.log("執行完了")
		},
		updated(){
			let TFormKey = this.FormKey
			// console.log(this.FormKey)
			// this.config.modules.map((item,i)=>{
			// 	if(_.get(item, 'type') === 'autoform'){
			// 		let FormKey = _.get(item,'FormKey','')
			// 		if(FormKey){
			// 			// console.log("FormKey",FormKey)
			// 			this.getWorkflow(FormKey)	
			// 		}else if(TFormKey){
			// 			this.getWorkflow(TFormKey)
			// 		}else{
			// 			this.getCodeData(this.codeAPI,this.code)
			// 		}
			// 	}
			// })
		},
		methods: {
			_get (data, field, value) {
				return _.get(data, field, value)
			},
			// 表單自定義提交
			handleSubmit(e){
				console.log(e,"data")
				this.$emit('submit',e)
			},
			// 獲取頁面請求數據接口 
			getRequestUrl (resData) {
                let url
				if (_.has(resData, 'dataSource.api') && resData.dataSource.api) {
				   url =  this.$config.endpoint+resData.dataSource.api
				}
				if (url && Object.keys(this.requsetParam).length > 0) {
					let str = url.split('?')[0]
					let query = url.split('?')[1] ? qs.parse(url.split('?')[1]) : {}
                    const queryData = {
                        ...query,
                        ...this.requsetParam
                    }
					if (str.includes('/:')) {
						let newStr = ''
						str.split('/:').map((x, i) => {
                            if (_.has(queryData, x)) {
                                delete queryData[x]
                            }
							newStr += (i === 0 ? x : `/${this.requsetParam[x]}`)
						})
						str = newStr
					}
                    let queryStr = ''
                    Object.keys(queryData).map((x, i) => {
                         if (queryData[x] !== '' && this.requsetParam[x] !== '') {
                            const symbol = (i === Object.keys(queryData).length - 1 ? '' : '&')
                            queryStr += (query[x] === '' ? `${_.get(this.requsetParam, x, '')}${symbol}` : `${x}=${_.get(this.requsetParam, x, query[x])}${symbol}`) 
                         }
                    })
					url = str + (queryStr ? `?${queryStr}` : '')
				}
				return url
			},
			// 獲取id
			formatId(api){
				if(api){
					api = api.toString()
					if(api.indexOf("?id=")!==-1){
						api = api.split('?id=')[1]
						return api.split('&')[0]
					}else if(api.indexOf("&id=")!==-1){
						api = api.split('&id=')[1]
						return api.split('&')[0]
					}
				}else{
					return undefined
				}
			},
			fetchConfigData () {
				let that = this
				if(!this.API){
					return ;
				}
				uni.request({
					url: this.API,
					method: 'GET',
					header: this.header,
					complete: (res) => {
						res = that.$JSONTW(res)
						if (_.get(res, 'data.code') === 200) {                 
                            const contentType = this.contentType || 'json'
                            const contentPayload = this.contentPayload || 'data'
                            let responseData = _.get(res.data, contentPayload, contentType === 'base64' ? '' : {})
                            if (responseData && contentType === 'base64') {
                                try {
                                   responseData = Base64.decode(responseData) ? JSON.parse(Base64.decode(responseData)) : {}
                                } catch {}
                            }
							if (responseData && _.isString(responseData)) {
								try {
								   responseData = JSON.parse(responseData)
								} catch {}
							}
							const resData = _.cloneDeep(responseData)
							let id = that.formatId(that.API)
							// console.log(that.formatId(that.API),"id")
							if(id){
								that.$timeCache(`page_${id}`,resData,that.$config.cachePolicy*24*60*60)// config中的cachePolicy可以控制緩存策略
								// page緩存列表
								let pageCacheList = that.$cache.get("pageCacheList")||[]
								pageCacheList.push(`page_${id}`)
								that.$cache.set("pageCacheList",pageCacheList)
								if(that.srvFormData){
									let srvForm = that.srvFormData
									that.$timeCache(`page_${id}_form_Srv`,srvForm,that.$config.cachePolicy*24*60*60)// config中的cachePolicy可以控制緩存策略
									let pageFormCacheList = that.$cache.get('pageFormCacheList')||[]
									pageFormCacheList.push(`page_${id}_form_Srv`)
									that.$cache.set(`pageFormCacheList`,pageFormCacheList)
								}
							}
                            // 獲取頁面請求接口
							that.loadPage(resData)
       //                      let pageUrl
       //                      const dataPayload = _.get(resData, 'dataPayload')
       //                      if (dataPayload && _.get(res.data, dataPayload) && typeof _.get(res.data, dataPayload) === 'object' && JSON.stringify(_.get(res.data, dataPayload)) !== '{}') {
       //                          pageUrl = ''
       //                          this.pageData = _.cloneDeep(_.get(res.data, dataPayload))
       //                      } else {
       //                         pageUrl = this.getRequestUrl(resData)
       //                      }
							// 							console.log(pageUrl)
							// // 加載頁面數據
							// if (pageUrl) {
							// 	this.fetchPageData(resData, pageUrl)
							// } else {
							// 	this.config = resData
							// 	this.skeletonLoading = false                               
							// }
							// if (_.has(resData, 'title')) {
							// 	uni.setNavigationBarTitle({
							// 		title: _.get(resData, 'title', '動态頁面')
							// 	})
							// }
						}
					}
				})
			},
			// 加載
			loadPage(data){
				let pageUrl
				const dataPayload = _.get(data,'dataPayload')
				if(dataPayload && typeof data.dataPayload === 'object' && JSON.stringify(data.dataPayload)!== '{}'){
					pageUrl = ''
					this.pageData = _.cloneDeep(_.get(data, dataPayload))
				}else{
					pageUrl = this.getRequestUrl(data)
				}
				if (pageUrl) {
					this.fetchPageData(data, pageUrl)
				} else {
					this.config = data
					this.skeletonLoading = false                            
				}
				if (_.has(data, 'title')) {
					uni.setNavigationBarTitle({
						title: this.$zh_tw(_.get(data, 'title', '動态頁面'))
					})
				}
			},
			fetchPageData (configData = {}, pageUrl) {
				let that = this
				uni.request({
					url: pageUrl,
					method: 'GET',
                    data: _.get(configData, 'dataSource.request', {}),
                    header: this.header,
					complete: (res) => {
						res = that.$JSONTW(res)
						this.config = { ...configData }
						this.skeletonLoading = false
						if (_.get(res, 'data.code') === 200) {			
                            const resData = _.get(res, 'data', {})
                            const responseConfig = _.get(this.config, 'dataSource.response', {})
                            let dataField = 'data'
                            if (_.has(responseConfig, 'data') && responseConfig.data) {
                                dataField = responseConfig.data
                            }
                            this.pageData = _.cloneDeep(_.get(resData, dataField, {}))
						}
					}
				})
			},
			// 獲取組件數據
			getComponentsData (item) {
				if (!_.has(item, 'binding') || JSON.stringify(item.binding) === '{}') {
					return false
				}
				console.log(this.pageData)
				const comonentScouce = {}
				for (const i in item.binding) {
					comonentScouce[item.binding[i]] = _.get(this.pageData, i, '')
				}
				// console.log(comonentScouce)
				let value
				switch (item.type) {
					case 'autoform':
					    value = comonentScouce
						break;
					case 'autolist':
					    value = _.has(comonentScouce, 'list') ? comonentScouce.list : false
						break;
					case 'banner':
					    value = _.has(comonentScouce, 'banners') ? comonentScouce.banners : false;
						break;
					case 'navlist':
					    value = _.has(comonentScouce, 'navList') ? comonentScouce.navList : false
					    break;
					case 'boxList':
					    value = _.has(comonentScouce, 'navList') ? comonentScouce.navList : false
						break;
				    //新增  2021-2-25
					case 'cell':
					    value = _.has(comonentScouce, 'days') ? comonentScouce.days : false
						break;
					//
					case 'steps':
					    value = _.has(comonentScouce, 'steps') ? comonentScouce.steps : false
						break;
					default:
					    value = comonentScouce
				}
                return value
			},
            // 獲取組件容器外層布局
            getComponentStyle (item) {
                if (_.has(item, 'container') && JSON.stringify(item.container) !== '{}') {
                    return _.get(item, 'container', {})
                }
                return _.get(this.config, 'moduleContainer', {})
            }
		}
	}
</script>

<style>
</style>
