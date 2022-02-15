<template>
	<view>
		<nav-bar :navs="newNavList" :defaultClick="defaultClick" v-if="defaultClick" @change="handleChange">
			<template slot="content-container">
				<view class="page-content">
					<tab-bar-page :tabId="isTab(apis[0])" :currentClick="clicked" v-if="clicked == 0"></tab-bar-page>
					<!-- <dynamic-page :API="apis[0]" v-if="clicked == 0"></dynamic-page> -->
				</view>
				<view class="page-content">
					<tab-bar-page :tabId="isTab(apis[1])" :currentClick="clicked" v-if="clicked == 1"></tab-bar-page>
					<!-- <dynamic-page :API="apis[1]" v-if="clicked == 1"></dynamic-page> -->
				</view>
				<view class="page-content" v-if="isUpdatePageChange">
					<dynamic-page :API="apis[2]" :currentClick="clicked" v-if="clicked == 2"></dynamic-page>
				</view>
			</template>
		</nav-bar>
		
		<!-- 未處理記錄提示 -->
		<view class="record-tips" v-if="isShowRecordTips"></view>
		<view v-if="isShowRecordTips" class="record-modal">
			<view class="record-modal-container">
				<view class="record-modal-title">
					<!-- <text class="record-modal-title-text">系統公告</text> -->
				</view>
				<view class="record-modal-content">
					<!-- <view v-html="sysNoticeContent" /> -->
					<image class="level" src="../../static/ppcg.png" mode="widthFix"></image>
				</view>
				<view class="record-modal-buttonGroup">
					<pretty-button class="record-modal-button" text="關閉" @click="getValueFromChild()"></pretty-button>
					<pretty-button class="record-modal-button-ok" text="確認" @click="goToPage()"></pretty-button>
				</view>
			</view>
		
		</view>
		<!-- 系统公告 -->
		<view class="service-mask" v-if="isShowSysNotice"></view>
		<view v-if="isShowSysNotice" class="service-modal">
			<view class="service-modal-container">
				<view class="service-modal-title">
					<text class="service-modal-title-text">系統公告</text>
				</view>
				<view class="service-modal-content">
					<view v-html="sysNoticeContent" />
				</view>
				<view class="service-modal-buttonGroup">
					<pretty-button class="service-modal-button" text="關閉" @click="closeSysNoticeModal()"></pretty-button>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
    import { mapState } from 'vuex'
    import commonStore from '@/store/common.js'
	import moment from 'moment'
    import _ from 'lodash'
	import NavBar from '../../components/publicComponents/navBar/navBar.vue'
	import tabBarPage from '../defaultPage/tabbarPage.vue'
	export default {
		components:{
			NavBar,
			tabBarPage
		},
		data() {
			return {
				navs:[],
				clicked:0,
				defaultClick:null,
				apis:[],
				endpoint:this.$config.formHost,
                timer: null, // 定時器，用戶定時獲取我的精靈未處理的數據
				isShowRecordTips: false,
                isFirstShowRecordTips: true,
                isUpdatePageChange: false, // 是否需要刷新頁面
				isShowSysNotice: false, //显示通告
				isFirstShowSysNote: true,
				sysNoticeContent:'',
				isUpdate: false
			}
		},
        computed:{
          ...mapState(['redDotData']),
          newNavList () {
              return _.cloneDeep(this.navs).map((x, i) => {
                  x.showDot = _.get(this.redDotData, 'hasUnpaidOrder') === true && x.title === '我的精靈'
                  return x
              })
          }
        },
		async created(){
			let res = await this.$api.homePage()
			if(res.code == 200){
				let data = res.data
				console.log("進來了",data)
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
			}else{
				uni.showToast({
					icon:"error",
					title:"請檢查網絡"
				})
			}
		},
        onShow() {
           this.fetchPersonalInfo()
        },
        onHide() {
            this.isUpdatePageChange = false
        },
        onLoad() {
			// this.fetchMySpiritUnpaidCount()
			this.fetchGetSysNotice()
			this.timer = setInterval(() => {
				this.fetchMySpiritUnpaidCount()
			}, 10000)
        },
        onUnload() {
           if (this.timer) {
               clearInterval(this.timer)
           }
        },
		methods: {
            async fetchMySpiritUnpaidCount () {
                const res = await this.$api.getMySpiritUnpaidCount()
                if (res.code === 200) {
                    commonStore.commit('updateState', {
                        redDotData: _.get(res, 'data', {})
                    })
                    if (this.isFirstShowRecordTips && _.get(res, 'data.hasUnpaidOrder')) {
                        this.isShowRecordTips = true
                    }
                }
            },
            async fetchPersonalInfo () {
                const res = await this.$api.getInformationNew()
                if(res.code == 200){
                    uni.setStorageSync('status', _.get(res, 'data.status'))
                }
                this.isUpdatePageChange = true
            },
			async fetchGetSysNotice () {
			    const respData = await this.$api.getSysNotice();
			    if(respData.code == 200){
			    	if(respData.data){
						//判断首次进入APP显示公告
						if(this.isFirstShowSysNote){
							let sysNoticeTime = respData.data.lastModifiedTime.split(" ")[0]
							//判断公告时间是否是今天
							if(sysNoticeTime == this.getToday()){
								this.isShowSysNotice = true
								this.sysNoticeContent = respData.data.content;
							}else{
								//获取匹配精灵信息
								this.fetchMySpiritUnpaidCount()
							}
						}
			    	}
			    }else{
			    	console.error("獲取系統公告失敗 = ", respData)
			    }
			},
            
			handleChange(e){
				this.clicked = e
                if (e === 2) {
                    this.fetchPersonalInfo()
                } else {
                    this.isUpdatePageChange = false
                }
				console.log(this.apis)
				this.$forceUpdate()
			},
			isTab(api){
				console.log(api.split("?id=")[1])
				return api.split("?id=")[1]
			},
			getValueFromChild(){
				this.isShowRecordTips = false
                this.isFirstShowRecordTips = false
			},
			closeSysNoticeModal(){
				this.isFirstShowSysNote = false
				this.isShowSysNotice = false
				this.fetchMySpiritUnpaidCount()
			},
			goToPage(){
                this.isFirstShowRecordTips = false
				this.isShowRecordTips = false
				this.clicked = 1
				this.defaultClick = 1
				this.isTab(apis[1])
				this.$forceUpdate()
			},
			getToday () {
			  let nowDate = new Date()
			  let date = {
			    year: nowDate.getFullYear(),
			    month: nowDate.getMonth() + 1,
			    date: nowDate.getDate()
			  }
			  return date.year + '-' + date.month + '-' + date.date
			}
		}
	}
</script>

<style lang="less">
	.record-tips{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #000;
		opacity: .8;
		z-index: 600;
	}
	.record-modal{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 601;
	}
	.record-modal-container{
		width: 80%;
		padding: 40rpx;
		// background-color: #182641;
		background-color: transparent;
	}
	.record-modal-title{
		font-size: 36rpx;
		color: #fff;
		text-align: center;
	}
	.record-modal-title-text{
		border-bottom: 5rpx solid #fff;
	}
	.record-modal-content{
		display: flex;
		// justify-content: center;
		margin-top: 50rpx;
		// align-items: center;
		// justify-content: column;
		flex-direction: column;
		color: #fff;
	}
	
	.record-modal-buttonGroup{
		display: flex;
		justify-content: center;
	}
	
	.record-modal-button{
		background-color: #ccc;
		margin-top: 50rpx;
		margin-right: 20rpx;
		width: 200rpx;
		height: 65rpx;
	}
	
	.record-modal-button-ok{
		margin-top: 50rpx;
		width: 200rpx;
		height: 65rpx;
	}
	.span{
		margin-bottom: 20rpx;
	}
	
	.service-mask{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #000;
		opacity: .8;
		z-index: 600;
	}
	.service-modal{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 601;
	}
	.service-modal-container{
		width: 80%;
		padding: 40rpx;
		background-color: #182641;
	}
	.service-modal-title{
		font-size: 36rpx;
		color: #fff;
		text-align: center;
	}
	.service-modal-title-text{
		border-bottom: 5rpx solid #fff;
	}
	.service-modal-content{
		display: flex;
		// justify-content: center;
		margin-top: 50rpx;
		// align-items: center;
		// justify-content: column;
		flex-direction: column;
		color: #fff;
	}
	
	.service-modal-buttonGroup{
		display: flex;
		justify-content: center;
	}
	
	.service-modal-button{
		margin-top: 50rpx;
		width: 200rpx;
		height: 65rpx;
	}
	.span{
		margin-bottom: 20rpx;
	}
</style>
