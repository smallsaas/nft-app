<template>
	<view 
	   class="venue_dynamic_list_container"
	   :style="[_get(config, 'outStyle', {})]"
	>
        <view>
            <view class="tab_list" v-if="typeList.length > 0">
                <ms-tabs
                    :list="typeList"
                    field="name"
                    v-model="tabActive"
                    @selected="handleSelectTab"
                />
            </view>
            <load-refresh
                ref="loadRefresh"
                :pagination="_get(config, 'pagination', true)"
                :isRefresh="isRefresh"
                refreshType="hollowDots"
                color="#04C4C4"
                :heightReduce="heightReduce"
                :fixedHeight="fixedHeight"
                :currentPage="listCurrentPage"
                :totalPages="listTotalPages" 
								:unloading="unloading"
                @loadMore="loadMore" 
                @refresh="refresh"
             >
              <view slot="content-list" class="list_content">
                  <view 
					v-for="(item, index) in list" 
					:key="index"
					@click="handleJumpRoute(item)"
				  >
				  <spirit
				  	v-if="getListItemKey() === 'spirit'"
				  	:item="{
				  							...item,
				  							...getComponentBindData(item)
				  						}"
				  />
				  
					<spirit-market
						v-if="getListItemKey() === 'spiritMarket'"
						:item="{
												...item,
												...getComponentBindData(item)
											}"
					/>
				  
					 <self-inspection-record-item
					 	v-if="getListItemKey() === 'SelfInspectionRecordItem'"
					 	:item="{
							...item,
							...getComponentBindData(item)
						}"
					 />

					<record-steps-item 
					  v-if="getListItemKey() === 'RecordStepsItem'"
					  :item="{
						  ...item,
						  ...getComponentBindData(item)
					  }"
					/>
					<companyStateToEnforcement
					v-if="getListItemKey() === 'company-state-to-enforcement'"
					:item="{
						...item,
						...getComponentBindData(item)
					}"
					:options="_get(config,'options',{})"
					@delete="handleDelete"
					/>
					<state-to-item
					 	v-if="getListItemKey() === 'stateToItem'"
					 	:item="{
							...item,
							...getComponentBindData(item)
						}"
					></state-to-item>
					<notice-item
					v-if="getListItemKey() === 'noticeItem'"
					:item="{
						...item,
						...getComponentBindData(item)
					}"
					/>
					<to-do-list-item
						v-if="getListItemKey() === 'toDoListItem'"
						:item="{
							...item,
							...getComponentBindData(item)
						}"
						:options="config.options"
					></to-do-list-item>
					<aqy-item
						v-if="getListItemKey() === 'aqyItem'"
						:item="{
							...item,
							...getComponentBindData(item)
						}"
						:options="_get(config,'options',{})"
					></aqy-item>
					
					<market
						v-if="getListItemKey() === 'market'"
						:item="{
												...item,
												...getComponentBindData(item)
											}"
					/>
					
					<bookspirit
						v-if="getListItemKey() === 'bookspirit'"
						:item="{
												...item,
												...getComponentBindData(item)
											}"
					/>
					
					<spirit-market-new 	v-if="getListItemKey() === 'spirit-market-new'"
						:item="{
												...item,
												...getComponentBindData(item)
											}"
					/>	
					
					<my-history-new 	v-if="getListItemKey() === 'my-histort-new'"
						:item="{
												...item,
												...getComponentBindData(item)
											}"
					/>	
					
					<more-representation-new 	v-if="getListItemKey() === 'more-representation-new'"
						:item="{
												...item,
												...getComponentBindData(item)
											}"
					/>	
					
					<team-new 	v-if="getListItemKey() === 'team-new'"
						:item="{
												...item,
												...getComponentBindData(item)
											}"
					/>	
					
					<no-pay-new 	v-if="getListItemKey() === 'no-pay-new'"
						:item="{
												...item,
												...getComponentBindData(item)
											}"
					/>	
					
					<my-book-spirit-new v-if="getListItemKey() === 'my-book-spirit-new'"
						:item="{
												...item,
												...getComponentBindData(item)
											}"
											:wisp="{
												...item.wisp,
												...getComponentBindData(item).wisp
											}"
					/>	
					
					<my-match-spirit-new 	v-if="getListItemKey() === 'my-match-spirit-new'"
						:item="{
												...item,
												...getComponentBindData(item)
											}"
					/>	
					
					<my-adopt-spirit-new 	v-if="getListItemKey() === 'my-adopt-spirit-new'"
						:item="{
												...item,
												...getComponentBindData(item)
											}"
					/>	
					
					<my-self-spirit-new 	v-if="getListItemKey() === 'my-self-spirit-new'"
						:item="{
												...item,
												...getComponentBindData(item)
											}"
					/>	
					
					<transfer-spirit-new	v-if="getListItemKey() === 'transfer-spirit-new'"
						:item="{
												...item,
												...getComponentBindData(item)
											}"
					/>	
					
					<transfer-spirit-two-new	v-if="getListItemKey() === 'transfer-spirit-two-new'"
						:item="{
												...item,
												...getComponentBindData(item)
											}"
					/>	
					
                  </view>
              </view>
            </load-refresh>
        </view>
	</view>
</template>

<script>
    import _ from 'lodash'
    import qs from 'qs'
	import loadRefresh from '../load-refresh/load-refresh.vue'
    import msTab from '../ms-tabs/ms-tabs.vue'
	import SelfInspectionRecordItem from './listItem/SelfInspectionRecordItem.vue'
	import RecordStepsItem from './listItem/RecordStepsItem.vue'
	import StateToItem from './listItem/StateToList.vue'
	import ToDoListItem from './listItem/todoListItem.vue'
	import noticeItem from './listItem/NoticeItem.vue'
	import aqyItem from './listItem/aqyItem.vue'
	import CompanyStateToEnforcement from './listItem/AvatarStateList/companyStateToEnforcement/companyStateToEnforcement.vue'
    import { globalConfig } from '@/config.js'
	
	//引入精靈市場
	import spiritMarket from './listItem/spiritMarket.vue'
	
	//引入精靈市場
	import spirit from './listItem/spirit.vue'
	
	
	import market from './listItem/market.vue'
	import bookspirit from './listItem/bookspirit.vue'
	
	import spiritMarketNew from './listItem/spiritMarket_new.vue'
	import myHistoryNew from './listItem/my_history_new.vue'
	import moreRepresentationNew from './listItem/moreRepresentation_new.vue'
	import teamNew from './listItem/team_new.vue'
	import noPayNew from './listItem/noPay_new.vue'
	import myBookSpiritNew from './listItem/myBookSpirit_new.vue'
	import myMatchSpiritNew from './listItem/myMatchSpirit_new.vue'
	import myAdoptSpiritNew from './listItem/myAdoptSpirit_new.vue'
	import mySelfSpiritNew from './listItem/mySelfSpirit_new.vue'
	import transferSpiritNew from './listItem/transferSpirit_new.vue'
	import transferSpiritTwoNew from './listItem/transferSpiritTwo_new.vue'
    
	export default {
		components: {
			loadRefresh,
			msTab,
			SelfInspectionRecordItem,
			RecordStepsItem,
			StateToItem,
			ToDoListItem,
			CompanyStateToEnforcement,
			noticeItem,
			aqyItem,
			spiritMarket,
			spirit,
			market,
			bookspirit,
			
			
			//新版頁面
			spiritMarketNew,
			myHistoryNew,
			moreRepresentationNew,
			teamNew,
			noPayNew,
			myBookSpiritNew,
			myMatchSpiritNew,
			myAdoptSpiritNew,
			mySelfSpiritNew,
			transferSpiritNew,
			transferSpiritTwoNew
		},
		props: {
			config: {
				type: Object,
				default: function() {
					return {}
				}
			},
			unloading:{
				type:Boolean,
				default(){
					return false
				}
			},
			// 外部傳入的查詢
			otherSearch:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				listCurrentPage: 1,
				listTotalPages: 1,
				list: [],
                typeList: [],
                tabActive: 0,
                
                listSearch: {}, // 列表查詢參數
                pageNoField: '',  // 頁數配置的字段名
                pageSizeField: '', // size配置的字段名
								isStop:false ,//是否停止自動刷新
								Time:null,
								isDelete:false
								
			}
		},
        computed: {
          heightReduce () {
            return this.typeList.length > 0 ? 88 : 0
          },
		  //是否外部傳入數據
		  isPropsList () {
			return _.has(this.config, 'list') && _.isArray(this.config.list)
		  },
          // 列表高度
          fixedHeight () {
             // 默認傳入的爲px
             let height = 0
             if (_.get(this.config, 'outStyle.height')) {
                height = parseInt(_.get(this.config, 'outStyle.height', 0)) - (this.typeList.length > 0 ? 44 : 0)
             }
             if (height < 0) {
                height = 0
             }
             return height * 2
          },
          isRefresh () {
              // return !this.isPropsList && this.list.length !== 0
			  return false
          }
        },
		mounted() {
			console.log(this.config)
		 // 外部傳入數據源
		 if (_.get(this.config, 'loadApi')) {
		    this.updateData()
				this.Time = setInterval(()=>{
					if(!this.isStop){
						this.fetchList({ refresh: true })
					}
				},5000)
				// console.log(this.Time)
		 } else {
			 if (this.isPropsList) {
				this.list = _.cloneDeep(this.config.list)
			 }
		 }
		},
		beforeDestroy(){
			clearInterval(this.Time)
		},
		methods: {
			_has (item = {}, str) {
				if (Object.keys(item).length === 0) {
					return false
				}  
				return _.get(item, str)
			},
            _get (item, str, defauleValue = '') {
              return _.get(item, str, defauleValue)
            },
            getListItemKey() {
              // const moduleKey = _.get(this.config, 'config.modules[0].key', '')
              // const moduleData = _.get(this.config, 'config.moduleData', {})
              // const keyData = _.get(moduleData, moduleKey, {})
			  const keyData = _.get(this.config,'itemModule',{})
              return _.get(keyData, 'name', '')
            },
            handleDelete(e){
							this.isDelete = e
						},
            // 切換tab
            handleSelectTab (e, item) {
                this.tabActive = e
                const typeField = _.get(this.config, 'request.fixed')
                this.listSearch = {
                    ...this.listSearch,
                    [typeField]: _.get(item, 'value'),
                    [this.pageNoField]: 1
                }
                this.fetchList({ refresh: true })
            },
            
            // 更新數據
            updateData () {  
                this.typeList =  _.get(this.config, 'tabConfig.show') === true ? _.get(this.config, 'tabConfig.list', []) : []
                const requestData = _.get(this.config, 'request', {})
                const searchData = {}
                for (const key in requestData) {
                    if (key !== 'default') {
                        searchData[requestData[key]] = ''
                    }
                }
                if (_.has(searchData, 'pageNum')) {
                    searchData.pageNum = 1
                }
                if (_.has(searchData, 'pageSize')) {
                    searchData.pageSize = 10
                }
								
                this.pageNoField = _.get(searchData, 'pn', 'pageNum')
                this.pageSizeField = _.get(searchData, 'ps', 'pageSize')
                this.listSearch = { ...searchData, ..._.get(this.config, 'request.default', {}),...this.otherSearch||{} }
                if (_.get(this.config, 'loadApi')) {
                    this.fetchList({ refresh: true })
               }
            },
            formatLoadApi(api){
							let that = this
							let apistring
							if(api.indexOf("{{")!==-1){
								let string = api.split("{{")[1]
								let string1 = string.split("}}")[0]
								if(string1.indexOf('.')!==-1){
									let cache = that.$cache.get(string1)
									let itemString = string1.split(".")[1]
									let value = cache[itemString]
									 apistring = api.replace(`{{${string1}}}`,value)
								}else{
									let cache = that.$cache.get(string1)
									console.log(cache,"cache",string1)
									apistring = api.replace("{{"+string1+"}}",cache)
								}
							}else{
								apistring = api
								console.log("noCache",apistring)
							}
							console.log(apistring)
							return apistring
						},
            // 獲取列表信息
            fetchList (searchData = {}) {
							console.log(this.formatLoadApi(_.get(this.config,'loadApi')),"loadAPi")
							let that = this
              uni.request({
                  url: this.$config.endpoint + this.formatLoadApi(_.get(this.config, 'loadApi')),
                  method: _.get(this.config,'method','GET'),
                  data: this.listSearch,
                  header: {
                      Authorization: `Bearer ${uni.getStorageSync(`${globalConfig.tokenStorageKey}`) || ''}`,
                      token: uni.getStorageSync(`${globalConfig.tokenStorageKey}`) || ''
                  },
                  complete: (res) => {
                     // uni.hideLoading()
                     if (['000000', 200].includes(_.get(res, 'data.code'))) {
                        const data = _.get(res, 'data.data')
                        const listField = _.get(this.config, 'response.list', '')
                        const totolField = _.get(this.config, 'response.total', 0)
                        // console.log(data,"data")
                        const prevList = _.get(searchData, 'refresh') ? [] : this.list
                        this.list = prevList.concat(listField ? _.get(data, listField, []) : data)
						console.log(this.list,"LIST")
                        const total = _.get(data, totolField, 0)
						// this.listCurrentPage = this.list.length < 10 ? 1 :  Math.floor(total / 10)
						// this.listTotalPages = total < 10 ? 1 : Math.floor(total / 10)
                        this.listCurrentPage = this.list.length < 10 ? 1 :  Math.floor(total / 1)
                        this.listTotalPages = total < 10 ? 1 : Math.floor(total / 1)
                        this.$refs.loadRefresh.completed()
                     }
										if(res.data.code==='00000'||res.data.code===200){
											const data = _.get(res, 'data.data')
											const listField = _.get(this.config, 'response.list', '')
											const totolField = _.get(this.config, 'response.total', 0)
											// console.log(data,"data")
											const prevList = _.get(searchData, 'refresh') ? [] : this.list
											this.list = prevList.concat(listField ? _.get(data, listField, []) : data)
											const total = _.get(data, totolField, 0)
											// this.listCurrentPage = this.list.length < 10 ? 1 :  Math.floor(total / 10)
											// this.listTotalPages = total < 10 ? 1 : Math.floor(total / 10)
											this.listCurrentPage = this.list.length < 10 ? 1 :  Math.floor(total / 1)
											this.listTotalPages = total < 10 ? 1 : Math.floor(total / 1)
											this.$refs.loadRefresh.completed()
										}
										that.$forceUpdate()
                  }
              })  
            },
            
            // 加載更多
            loadMore () {
							if(!this.unloading){
							// console.log("加載更多")
				if (this.isPropsList) {
					return
				}
				this.isStop = true
                this.listSearch = {
                    ...this.listSearch,
                    [this.pageNoField]: parseInt(this.listSearch[this.pageNoField]) + 1
                }
                this.fetchList(this.listsearch)
								
								}
            },
            
            // 上拉加載刷新
            refresh () {
							if(!this.unloading){
								// console.log("刷新")
				if (this.isPropsList) {
					return
				}
            	this.listSearch = {
            	    ...this.listSearch,
            	    [this.pageNoField]: parseInt(1)
            	}
            	this.fetchList({ refresh: true })
							}
            },
			
			// 列表項組件與列表數據綁定
			getComponentBindData (item) {
				if (!_.has(this.config, 'binding') || JSON.stringify(this.config.binding) === '{}') {
					return {}
				}
				const comonentScouce = {}
				for (const i in this.config.binding) {
					comonentScouce[this.config.binding[i]] = _.get(item, i, '')
				}
				return comonentScouce
			},
			
			// 統一跳轉路由
			handleJumpRoute (item) {
				if(this.isDelete){
					return
				}
				if (!_.get(this.config, 'itemNavigation')) {
					return
				}
				let routeUrl = ''
				const itemNavigation = this.config.itemNavigation
				const route = itemNavigation.split('?')[0]
				const query = itemNavigation.split('?')[1] ? qs.parse(itemNavigation.split('?')[1]) : {}
				routeUrl += (`/pages${route.charAt(0) !== '/' ? '/' : ''}` + route)
				if (Object.keys(query).length > 0) {
				    for (const i in query) {
				        if (query[i] === '') {
				            query[i] = item[i] || ''
				        }
				    }
				    routeUrl += '?query=' + encodeURIComponent(JSON.stringify(query))
				}
				// console.log('routeUrl= ', routeUrl)
				// 舊跳轉方式
				uni.navigateTo({
					url:routeUrl
				})
				// 棧溢出,改用redirectTo
				// uni.redirectTo({
				// 	url: routeUrl
				// 	// success:res =>{// console.log("跳轉成功")},
				// 	// fail:err =>(// console.log("跳轉失敗",err))
				// })
			}
		}
	}
</script>

<style lang="less" scoped>
	.venue_dynamic_list_container {
		width: 100%;
		display: block;
		background-color: #050E17;
		.tab_list {
			border-bottom: 1px solid #f2f2f2;
			position: relative;
			z-index: 100;
		}

		.list_content {}
	}
</style>
