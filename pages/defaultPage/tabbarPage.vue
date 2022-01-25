<!-- 對接PageTabbar組件的标準頁面 -->
<template>
	<view>
		<page-tabbar
			:tabs="newNavList"
			@change="handleChange"
            :defaultClicked="currentClick === 1 ? 1 : 0"
		>
			<template slot="content">
				<dynamic-page v-for="(item,i) in tabs" :API="format(item.id)" v-if="click === i" :key="i"></dynamic-page>
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
					click: 1
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
				type:String,
				default: 0
			}
		},
		methods: {
			async getTabs(tabId){
				let res = await this.$api.tabbar(tabId)
				this.tabs = res.data.tabs
                console.log('当前哈哈哈', this.tabs)
			},
			// 改變時
			handleChange(e){
				this.click = e
				this.$forceUpdate()
			},
			format(id){
				console.log(this.$config.formHost+"?id="+id)
				return this.$config.formHost+"?id="+id
			}
		}
	}
</script>

<style>

</style>
