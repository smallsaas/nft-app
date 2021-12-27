<!-- 对接PageTabbar组件的标准页面 -->
<template>
	<view>
		<page-tabbar
			:tabs="tabs"
			@change="handleChange"
		>
			<template slot="content">
				<dynamic-page v-for="(item,i) in tabs" :API="format(item.id)" v-if="click === i" :key="i"></dynamic-page>
			</template>
		</page-tabbar>
	</view>
</template>

<script>
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
					tabs:null,
					click:0
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
			}
		},
		methods: {
			async getTabs(tabId){
				let res = await this.$api.tabbar(tabId)
				this.tabs = res.data.tabs
			},
			// 改变时
			handleChange(e){
				console.log(e)
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
