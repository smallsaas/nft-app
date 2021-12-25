<!-- 自动渲染的tabs页面 跳转过来即可渲染 跳转参数 id 支持encodeURIComponent([query])和纯id -->
<template>
	<view>
		<dynamic-page :API="api" v-if="api"></dynamic-page>
		<view v-if="!api">请通过跳转来访问此页面！</view>
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
