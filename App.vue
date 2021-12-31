<script>
	export default {
		onLaunch: async function() {
			// 重启时清除动态页面缓存
			let pageCacheList = this.$cache.get('pageCacheList')
			let that = this
			if(this.$config.clearPageCache){
				console.log("开始删除页面缓存")
				pageCacheList.map((item,i)=>{
						that.$cache.remove(item)
						console.log("删除页面缓存"+item)
				})
				this.$cache.remove('pageCacheList')
				console.log("删除缓存成功")
			}
			let config = await this.$api.getGlobalConfig()
			this.$cache.set("globalConfigStorage", config.data)
			let icon = await this.$api.getIcon()
			console.log(icon)
			this.$cache.set("iconList", icon.data)
			console.log('App Launch')
			this.$cache.get("iconList")
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		background-color: #050E17;
		color: #9A9D9F;
	}

</style>
