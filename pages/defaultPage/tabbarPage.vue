<!-- 對接PageTabbar組件的标準頁面 -->
<template>
	<view>
		<page-tabbar
			:tabs="newNavList"
			@change="handleChange"
            @childChange="handleChildChange"
            :defaultClicked="currentClick === 1 ? 1 : 0"
		>
            <template slot="content">
                <dynamic-page v-for="(item,i) in tabs" :API="format(item.id)" v-if="click === i" :key="item.id"></dynamic-page>
            </template>
		</page-tabbar>
	</view>
</template>

<script>
    import { mapState } from 'vuex'
    import _ from 'lodash'
	import pageTabbar from '@/components/publicComponents/pageTabbar/pageTabbar.vue'
	export default {
		name:"tabbarPage",
		components:{
			pageTabbar
		},
		onLoad(e) {
			let params = e.params?JSON.parse(decodeURIComponent(e)):e
			let tabId = params.id
			this.getTabs(tabId)
		},
		data() {
			return {
					tabs: [],
					click: 1,
                    allTabs: []
			}
		},
        computed:{
            ...mapState(['redDotData']),
            newNavList () {
                return _.cloneDeep(this.tabs).map((x, i) => {
                    x.showDot = _.get(this.redDotData, 'hasUnpaidOrder') === true && x.title === '匹配精靈'
                    return x
                })
            }
        },
		created(){
			if(this.tabId){
				this.getTabs(this.tabId)
			}
		},
		props:{
			tabId:{
				type:String,
				default:""
			},
			currentClick: {
				type: Number,
				default: 0
			}
		},
		methods: {
			async getTabs(tabId){
				let res = await this.$api.tabbar(tabId)
				this.tabs = res.data.tabs
                this.allTabs = _.cloneDeep(res.data.tabs)
			},
			// 改變時
			handleChange(e){
				this.click = e
                this.tabs = [...this.allTabs]
				this.$forceUpdate()
			},
            handleChildChange (e, child) {
                console.log()
              this.click = e
              
              const list = _.cloneDeep(this.allTabs).map((x, i) => {
                  if (Number(e) === i && child) {
                      x.id = child.id
                  }
                  return x
              })
              this.tabs = [...list]
              console.log('OOOOO', e, this.tabs)
            },
			format(id){
                console.log('KKKK', id)
				return this.$config.formHost+"?id="+id
			}
		}
	}
</script>

<style>

</style>
