<template>
	<view>
		<nav-bar :navs="navs" :defaultClick="defaultClick" v-if="defaultClick" @change="handleChange">
			<template slot="content-container">
				<view class="page-content">
					<tab-bar-page :tabId="isTab(apis[0])" v-if="clicked == 0"></tab-bar-page>
					<!-- <dynamic-page :API="apis[0]" v-if="clicked == 0"></dynamic-page> -->
				</view>
				<view class="page-content">
					<dynamic-page :API="apis[1]" v-if="clicked == 1"></dynamic-page>
				</view>
				<view class="page-content">
					<dynamic-page :API="apis[2]" v-if="clicked == 2"></dynamic-page>
				</view>
			</template>
		</nav-bar>
	</view>
</template>

<script>
	import NavBar from '../../components/publicComponents/navBar/navBar.vue'
	import tabBarPage from '../defaultPage/tabbarPage.vue'
	export default {
		components:{
			NavBar,
			tabBarPage
		},
		data() {
			return {
				navs:[
					
				],
				clicked:0,
				defaultClick:null,
				apis:[
				],
				endpoint:this.$config.formHost
			}
		},
		async created(){
			let res = await this.$api.homePage()
			let data = res.data
			console.log("进来了",data)
			this.navs = data.navs
			this.apis = []
			let that = this
			data.api.map((item,i)=>{
				that.apis.push(that.endpoint+item)
			})
			this.clicked = data.defaultClick
			this.defaultClick = data.defaultClick.toString()
			console.log(this.defaultClick,"default")
			this.$forceUpdate()
		},
		methods: {
			handleChange(e){
				console.log(e)
				this.clicked = e
				console.log(this.apis)
				this.$forceUpdate()
			},
			isTab(api){
				console.log(api.split("?id=")[1])
				return api.split("?id=")[1]
			}
		}
	}
</script>

<style>
</style>
