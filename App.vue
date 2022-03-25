<script>
	import moment from 'moment'
	export default {
        watch: {
            $route: { 
                handler(val, oldVal) {
                    // console.log('哈哈哈哈', val)
					if (val.path.includes('/pages/login_new/login_new')) {
						return
					} 
					this.handleCheckLoginTime()
                },
                deep: true
             } 
        },    
		methods: {
			handleClearCache() { 
				this.$cache.remove('token')
				const pageCacheList = this.$cache.get('pageCacheList')
				const pageFormCacheList = this.$cache.get("pageFormCacheList")
				if(this.$config.clearPageCache){
					if(pageCacheList){ 
						pageCacheList.map(item => {
							this.$cache.remove(item)
						})
					}
					if(pageFormCacheList){
						pageFormCacheList.map(item => {
							this.$cache.remove(item)
						})
					}
					this.$cache.remove('pageCacheList')
					this.$cache.remove('pageFormCacheList')
				}
				this.$cache.remove('userCache')
			},
			handleCheckLoginTime () {
				if (this.$route.path.includes('/pages/login_new/login_new')) {
					return
				}
				const prevLoginTime = uni.getStorageSync('prevLoginTime')
				if (!prevLoginTime) {
					return
				}
				try {
					if (moment().unix() > moment(prevLoginTime).add(12, 'hour').unix()) {
						this.handleClearCache()
						uni.showToast({ title: '登錄狀态失效', icon: 'none' })
						setTimeout(() => {
							uni.reLaunch({
								url:'/pages/login_new/login_new',
								success: () => {
									uni.removeStorageSync('prevLoginTime')
								}
							})
						}, 1000)
					}
				} catch {}
			}
		},
		onLaunch: async function() {
            if (_.get(this.$route, 'path') === '/pages/regist_new/regist_new' && _.get(this.$route, 'query.inviteCode')) {
                uni.navigateTo({
                    url: `/pages/regist_new/regist_new?inviteCode=${this.$route.query.inviteCode}`
                })
            }
			this.handleCheckLoginTime()
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
<style lang="less">
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
	uni-toast,.uni-toast{
		width: 10em!important;
	}
</style>
