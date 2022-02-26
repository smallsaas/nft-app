<template>
	<view>
		<view class="signSmoke-tips">
			{{month}}月已簽到<text class="signSmoke-tips-day">{{signDay}}</text>天
		</view>
		<view class="signSmoke-list">
			<view v-for="(item,index) in dayGroup" :key="index" :class="'signSmoke-signItem '+ispack">
				<sign-item :item="item" @fill="(day)=>handleFill(day)"></sign-item>
			</view>
		</view>
		<view :class="'signSmoke-pack '+ispack" @click="handlePack()">
			<view>{{packText}}</view>
			<image src="/static/signSmoke/pushup.png" class="signSmoke-pack-icon" v-show="packIcon==='/static/signSmoke/pushup.png'"></image>
			<image src="/static/signSmoke/more.png" class="signSmoke-pack-icon" v-show="packIcon==='/static/signSmoke/more.png'"></image>
		</view>
		<view :class="'signSmoke-sign '+isSign" @click="handleSign">
			<view class="signSmoke-signIn">
				<view class="signSmoke-signIn-Box">
					<view class="signSmoke-signIn-Button">
						<image :src="signImage" fade-show class="signSmoke-signIn-Button-image"></image>
						<view class="signSmoke-signIn-Button-text">{{signText}}</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
    import _ from 'lodash'
    import moment from 'moment'
	import signItem from './signItem.vue'
	export default {
		name:"signSmokeBox",
		components:{
			signItem
		},
		computed:{
			ispack(){
				if(this.packText === "查看全部獎勵"){
					return "small"
				}else{
					return ''
				}
			},
			isSign(){
				console.log(this.sign,'-----測試sogjsdgnsldjkgsdkl------------------------')
				if(this.sign){
					this.signText="已簽到"
					this.signImage="/static/signSmoke/signedIn.png"
					this.$forceUpdate()
					return "sign"
				}else{
					this.signText="簽到抽盒"
					this.signImage="/static/signSmoke/gift.png"
					this.$forceUpdate()
					return ""
				}
			},
			// isIcon(){
			// 	if(this.packText === "收起"){
			// 		this.packIcon = "/static/signSmoke/more.png"
			// 		return this.packIcon
			// 	}else{
			// 		this.packIcon = "/static/signSmoke/pushup.png"
			// 		return this.packIcon
			// 	}
			// }
		},
		data() {
			return {
				packText:"查看全部獎勵",
				packIcon:"/static/signSmoke/more.png",
				signText:"簽到抽盒",
				signImage:"/static/signSmoke/gift.png",
				sign:false,
				month:0,
				year:0,
				signDay:0,
				dayGroup:[],
				listGroup:[
					
				],
				nowGroup:[],
				isSignGroup:{},
				
				//是否已經補簽
				isBuQian:false
			};
		},
		props:{
			signData:{
				type:Object,
				default:{}
			}
		},
		async created() {
			
			uni.showLoading({
				title:"獲取簽到數據中"
			})
			this.getYear()
			this.getMonth()
			let that = this
			let signMes = await this.$api.getSignMes({month:that.month,year:that.year})
			console.log('--------------rrrr',signMes)
            this.signDay = _.get(signMes, 'data.records', []).length
            
			if(signMes.data.records){
                const currentDate = moment().format('YYYY-MM-DD')
                const currentDay = moment().format('DD')
				let records = _.cloneDeep(signMes.data.records).sort((x, y) => moment(y.signDate).unix() - moment(x.signDate).unix())
                const signedData = {}
                records.map(x => {
                    if (x.signDate) {
                        const dayField = moment(x.signDate).format('DD')
                        signedData[dayField] = true
                        if (Number(dayField) === Number(currentDay)) {
                            this.sign = true
                        }
                    }
                    if (x.status === 'REPLENISH_SIGN' && x.signTime) {
                        if (Number(moment(x.signTime).format('DD')) === Number(currentDay)) {
                            this.isBuQian = true
                        }
                    }
                    
                })
                this.isSignGroup = {...signedData}
			}
			this.getListGroup()
			this.getNowGroup()
			this.dayGroup = this.nowGroup
            
			uni.hideLoading()
		},
		methods:{
			getListGroup(){
				let that = this
				let nowYear = this.year
				let nowMonth = this.month
				let monthDay = this.getMonthDay(nowYear,nowMonth)
				console.log(nowYear," === nowYear")
				console.log(nowMonth," === nowMonth")
				console.log(monthDay," === monthDay")
				for(var i=0;i<monthDay;i++){
					let template
					//旧逻辑
					// if((i+1)%4===0){
					// 	template = {
					// 		"isSign":that.isSignGroup[i+1]||false,
					// 		"status":i+1>that.fetchDay(that.getToday())?"normal":i+1==that.fetchDay(that.getToday())?"today":"ended",
					// 		"day":i+1,
					// 		"image":"/static/spirit/newBALL.png",
					// 		"text":"能量晶石x1"
					// 	}
					// }else{
					// 	template = {
					// 		"isSign":that.isSignGroup[i+1]||false,
					// 		"status":i+1>that.fetchDay(that.getToday())?"normal":i+1==that.fetchDay(that.getToday())?"today":"ended",
					// 		"day":i+1,
					// 		"image":"/static/spirit/newGUGU.png",
					// 		"text":"GUGU币x1"
					// 	}
					// }
					
					//新逻辑 修改于 2022-02-26
					if((i+1) === monthDay){
						template = {
							"isSign":that.isSignGroup[i+1]||false,
							"status":i+1>that.fetchDay(that.getToday())?"normal":i+1==that.fetchDay(that.getToday())?"today":"ended",
							"day":i+1,
							"image":"/static/spirit/newBALL.png",
							"text":"能量晶石x1"
						}
					}else{
						template = {
							"isSign":that.isSignGroup[i+1]||false,
							"status":i+1>that.fetchDay(that.getToday())?"normal":i+1==that.fetchDay(that.getToday())?"today":"ended",
							"day":i+1,
							"image":"/static/spirit/newGUGU.png",
							"text":"GUGU币x1"
						}
					}
					that.listGroup.push(template)
				}
				console.log('????==', this.listGroup)
			},
			// 獲取當前月份的天數
			getMonthDay(year,month){
				var date = new Date(year,month,0)
				return date.getDate()
			},
			fetchDay(date){
				console.log("date.split('-')[2] = ", date.split('-')[2])
				return date.split('-')[2]
			},
			getMonth(){
				let date = new Date()
				this.month = date.getMonth()+1
			},
			getYear(){
				let date = new Date()
				this.year = date.getFullYear()
			},
			getToday(){
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth()+1<10?`0${date.getMonth()+1}`:date.getMonth()+1
				let day = date.getDate()<10?"0"+date.getDate():date.getDate()
				return year+"-"+month+"-"+day
			},
			// 補簽事件
			async handleFill(day){
				if(this.$frozen()){
					return ;
				}
				if(this.isBuQian == true){
					let time = new Date(new Date(new Date().toLocaleDateString()).getTime())
					console.log('time',time)
					uni.showToast({
						title:'一天隻能補簽一次',
						icon:'none',
						duration: 1000
					})
					return
				}
				let date = `${this.year}-${this.month<10?`0${this.month}`:this.month}-${day<10?`0${day}`:day}`
				console.log("補簽！",date)
				let res = await this.$api.repleinishSign({replenishSignDate:date})
				let that = this
				if(res.code === 200){
					uni.showToast({
						title:"補簽成功!",
						icon:"success",
						success: async () => {
							    this.isBuQian = true
								that.listGroup[day-1].isSign = true
								await that.getNowGroup()
								// that.dayGroup = that.nowGroup
								this.dayGroup = this.listGroup
								console.log(that.dayGroup,'可能需要等待')
								this.getYear()
								this.getMonth()
								// let that = this
								let signMes = await this.$api.getSignMes({month:that.month,year:that.year})
								console.log('--------------rrrr',signMes,'我是再次跟新----------------------------------')
								this.signDay = _.get(signMes, 'data.records', []).length
								// that.$forceUpdate()
								that.$forceUpdate()		
						}
					})
				}else{
					uni.showToast({
						title:res.message,
						icon:"none"
					})
				}
			},
			getNowGroup(){
				let that = this
				this.listGroup.map((item,i)=>{
					console.log(item.status)
					if(item.status === "today"){
						that.nowGroup = []
						// if(item.day/9<=1){
						// 	that.nowGroup = that.listGroup.slice(0,9)
						// }else if(item.day/12<=2&&item.day/9>1){
						// 	that.nowGroup = that.listGroup.slice(9,18)
						// }else if(item.day/12<=3&&item.day/9>2){
						// 	that.nowGroup = that.listGroup.slice(18,27)
						// }else if(item.day/12<=4&&item.day/9>3){
						// 	that.nowGroup = that.listGroup.slice(27,31)
						// }
                        const maxDay = Number(moment().endOf('month').format('DD'))
                        let endNum = item.day === maxDay ? maxDay : item.day
                        if (endNum < 9) {
                            endNum = 9
                        }
                        let startNum = 0
                        if (endNum > 9) {
                            startNum = endNum - 9 > 0 ? endNum - 9 : endNum
                        }
                        that.nowGroup = that.listGroup.slice(startNum, endNum)

						console.log(that.nowGroup,"NOWGROUP____")
					}
				})
				console.log(that.nowGroup,"NOWGROUP")
			},
			// 收起時操作
			handlePack(){
				if(this.packText === "收起"){
					this.packText = "查看全部獎勵"
					this.getNowGroup()
					this.dayGroup = this.nowGroup
					this.packIcon = "/static/signSmoke/more.png"
				}else{
					this.packText = "收起"
					// this.packText = "查看全部獎勵"
					this.dayGroup = this.listGroup
					this.packIcon = "/static/signSmoke/pushup.png"
				}
				this.$forceUpdate()
			},
			// 簽到事件
			async handleSign(){
				if(this.$frozen()){
					return ;
				}
				if(this.isSign==="sign"){
					return ;
				}
				console.log("簽到！")
				let that = this
				this.sign = true
				let res = await this.$api.sign()
				if(res.code === 200){
					uni.showToast({
						title:"簽到成功",
						icon:'success',
						success: async () => {
								console.log(that.dayGroup,'可能需要等待簽到哈哈哈哈')
								const dayGet = new Date()
								const getDay  = dayGet.getDate()
								for(let i=0; i<that.dayGroup.length;i++){
									if(getDay == that.dayGroup[i].day){
										that.dayGroup[i].isSign = true
									}
								}
								console.log(that.dayGroup,'可能需要等待簽到哈哈哈哈1111111111111')
								this.getYear()
								this.getMonth()
								// let that = this
								let signMes = await this.$api.getSignMes({month:that.month,year:that.year})
								console.log('--------------rrrr',signMes,'我是再次跟新----------------------------------')
								this.signDay = _.get(signMes, 'data.records', []).length
								that.$forceUpdate()
						}
					})
				}else{
					uni.showToast({
						title:"簽到失敗",
						icon:"error"
					})
				}
				
			}
		}
	}
</script>

<style scoped>
	page{
		padding: 0;
		margin: 0;
		background-color: #050E17;
	}
	@keyframes packUp{
		from{
			opacity: 0;
			transform: translateY(-300rpx);
		}
		to{
			opacity: 1;
			transform: translateY(0rpx);
		}
	}
	@keyframes unWind{
		from{
			opacity: 0;
			transform: translateY(-300rpx);
		}
		to{
			opacity: 1;
			transform: translateY(0rpx);
		}
	}
	@keyframes rotate{
		from{
			transform: rotate(0deg);
			background: linear-gradient(left,#9533FB,#0A84E3);
			opacity: 0;
		}
		to{
			transform: rotate(360deg);
			background: linear-gradient(left,#9533FB,#0A84E3);
			opacity: 1;
		}
	}
	.signSmoke-tips{
		color: #BCBFC1;
		padding-top: 30rpx;
		padding-left: 20rpx;
		font-size: 40rpx;
	}
	.signSmoke-tips-day{
		font-size: 50rpx;
		color: #0B9BFF;
		margin: 0rpx 20rpx;
	}
	.signSmoke-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		margin-top: 20rpx;
	}
	.signSmoke-signItem{
		width: 33.33333%;
		justify-content: center;
		display: flex;
		margin-bottom: 20rpx;
		animation: packUp .2s linear;
	}
	.small{
		animation: unWind .2s linear;
	}
	.signSmoke-pack{
		color: #63696F;
		text-align: center;
		margin: 20rpx 0;
		animation: packUp .2s linear;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.signSmoke-sign{
		height: 250rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.signSmoke-signIn{
		background: linear-gradient(left,#9533FB,#0A84E3);
		width: 220rpx;
		height: 220rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.signSmoke-signIn-Box{
		background: #050E17;
		width: 215rpx;
		height: 215rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.signSmoke-pack-icon{
		width: 50rpx;
		height: 50rpx;
	}
	.signSmoke-signIn-Button{
		background: linear-gradient(left,#9533FB,#0A84E3);
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.signSmoke-signIn-Button-image{
		width: 50rpx;
		height: 50rpx;
	}
	.signSmoke-signIn-Button-text{
		color: #ffffff;
		padding-top: 20rpx;
	}
	.sign .signSmoke-signIn{
		background: #464C53!important;
		animation: rotate .5s linear;
	}
	.sign .signSmoke-signIn-Button{
		background: #050E17!important;
		border: 2rpx solid #50565D!important;
	}
	.sign .signSmoke-signIn-Button-text{
		color: #52585F;
	}
</style>
