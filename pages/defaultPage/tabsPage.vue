<!-- 自動渲染的tabs頁面 跳轉過來即可渲染 跳轉參數 id 支持encodeURIComponent([query])和純id -->
<template>
	<view>
		<dynamic-page :API="api" v-if="api"></dynamic-page>
		<view v-if="!api">請通過跳轉來訪問此頁面！</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				api:null
			}
		},
		methods: {
		},
		onLoad(e){
			if(JSON.stringify(e) !== '{}'){
				let param = e.query?JSON.parse(decodeURIComponent(e.query)):e
				this.api = this.$config.formHost + "?id=" + param.id
				this.$forceUpdate()
			}
		}
	}
</script>

<style>

</style>
