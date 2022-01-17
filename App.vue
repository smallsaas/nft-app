<script>
	export default {
		onLaunch: async function() {
			console.log("中國")
			// 重啓時清除動态頁面緩存
			let pageCacheList = this.$cache.get('pageCacheList')
			let pageFormCacheList = this.$cache.get("pageFormCacheList")
			let that = this
			if(this.$config.clearPageCache){
				console.log("開始删除頁面緩存")
				if(pageCacheList){
					pageCacheList.map((item,i)=>{
							that.$cache.remove(item)
							console.log("删除頁面緩存"+item)
					})
				}
				if(pageFormCacheList){
					pageFormCacheList.map((item,i)=>{
						that.$cache.remove(item)
						console.log("删除頁面表單緩存"+item)
					})
				}
				this.$cache.remove('pageCacheList')
				this.$cache.remove('pageFormCacheList')
				console.log("删除緩存成功")
			}
			this.$cache.remove('userId')
			let config = await this.$api.getGlobalConfig()
			this.$cache.set("globalConfigStorage", config.data)
			let icon = await this.$api.getIcon()
			console.log(icon)
			this.$cache.set("iconList", icon.data)
			console.log('App Launch')
			this.$cache.get("iconList")
			
			setInterval(async ()=>{
				const changeUserStatus = await this.$api.getInformationNew()
				console.log('00000000000000',changeUserStatus,'--------------')
				if(changeUserStatus.code == 200){
				this.$cache.set("status",changeUserStatus.data.status)
				}
			},6000)
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
	@import "./other.less";
	/*每個頁面公共css */
	@font-face {
		font-family:"繁體";
		src: url('./font/ft.otf');
	}
	*{
		font-family: "繁體";
	}
	page {
		background-color: #050E17;
		color: #9A9D9F;
	}

</style>
