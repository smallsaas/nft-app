<script>
	export default {
		onLaunch: async function() {
			let config = await this.$api.getGlobalConfig()
			this.$cache.set("globalConfigStorage",config.data)
			let icon = await this.$api.getIcon()
			console.log(icon)
			this.$cache.set("iconList",icon.data)
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
	page{
		background-color: #050E17;
		color: #9A9D9F;
	}
</style>
