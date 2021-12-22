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
			let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJvcmdJZCI6IjEiLCJ1c2VySWQiOiIxIiwidXNlclR5cGUiOjEwMSwiYlVzZXJUeXBlIjoiU1lTVEVNIiwidGVuYW50T3JnSWQiOjEsImFjY291bnQiOiJhZG1pbiIsImV4dHJhVXNlclR5cGUiOjAsImlhdCI6MTYzOTk5NDE0OSwianRpIjoiMSIsInN1YiI6ImFkbWluIiwiZXhwIjoxNjQwMjUzMzQ5fQ.HY6R-IgAcF8w9jqB9PR8xVQX6QXr0fA--zBlwGKD3vn6lvLJaBYu7dn6wJ7n33rxFVyMJK4EF4TfetioE9kQvg"
			this.$cache.set("token",token)
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
</style>
