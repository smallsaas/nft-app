
  <template>
  <view class="spiritMarketHistoryNew newBuGu">
    <view class="item">
      <view class="right">
        <view class="ro">
          <text class="spiritName">{{ item.wisp.name }}</text>
        </view>
        <view class="rt">
          <image class="levelImg" src="../../../static/level/one.png" mode="widthFix" v-if="item.wisp.level == 1"></image>
          <image class="levelImg" src="../../../static/level/two.png" mode="widthFix" v-if="item.wisp.level == 2"></image>
          <image class="levelImg" src="../../../static/level/three.png" mode="widthFix" v-if="item.wisp.level == 3"></image>
          <image class="levelImg" src="../../../static/level/four.png" mode="widthFix" v-if="item.wisp.level == 4"></image>
          <image class="levelImg" src="../../../static/level/five.png" mode="widthFix" v-if="item.wisp.level == 5"></image>
          <image class="levelImg" src="../../../static/level/six.png" mode="widthFix" v-if="item.wisp.level == 6"></image>
          <image class="levelImg" src="../../../static/level/seven.png" mode="widthFix" v-if="item.wisp.level == 7"></image>
          <image class="levelImg" src="../../../static/level/eight.png" mode="widthFix" v-if="item.wisp.level == 8"></image>
        </view>
        <view class="rth">
          <text class="rthL">編號</text>
          <text class="rthR">{{ item.wispNumber }}</text>
        </view>
        <view class="rth">
          <text class="rthL">增長能力</text>
          <text class="rthR">{{ item.wisp.growthPercent }}%</text>
        </view>
        <view class="rth rtho">
          <text class="rthL">能力值</text>
          <text class="rthR">{{ item.wisp.minimumValue }}--{{ item.wisp.maximumValue }}</text>
        </view>
        <view class="rth rtht">
          <text class="rthL">培養天數</text>
          <text class="rthR">{{ item.wisp.growthDays }}</text>
        </view>
        <view class="rth rtht">
          <text class="rthL">當前能力值</text>
          <text class="rthR">{{ item.transactionAmount }}</text>
        </view>
        <view class="rth rtht">
          <text class="rthL">時間</text>
          <text class="rthR">{{ formatTime(item.createTime) }}</text>
        </view>
        <view class="rth rtht" v-if="item.status == 'PAID' && item.remainingTime && item.remainingTime != 0">
          <text class="rthL">交易倒計時</text>
          <text class="rthR">{{ item.remainingTime }}分鐘</text>
        </view>
        <view class="btnBox" v-if="['WAITING_PAYMENT', 'PAID', 'PAYMENT_TIMEOUT', 'RECEIVED', 'CANCEL', 'COMPLAINING'].includes(item.status)">
          <button class="btn" v-if="item.status == 'WAITING_PAYMENT'" @click="goToPay(item)">待付款(剩{{ item.remainingMinutes }}分鍾)</button>

          <!-- <button class="btn" v-if="item.status=='WAITING_PAYMENT' && item.currentPlayerIsBuyer==false">等待買家付款</button> -->
          <view class="btnStatus fail" v-if="item.status == 'PAID'"><button class="notStatus" @click="goToPay(item)">已付款</button></view>
          <view class="btnStatus" v-if="item.status == 'PAYMENT_TIMEOUT'"><button class="notStatus">玩家處理超時</button></view>
          <view class="btnStatus" v-if="item.status == 'RECEIVED'"><button class="notStatus">已确認收款</button></view>
          <view class="btnStatus" v-if="item.status == 'COMPLAINING'"><button class="notStatus" @click="goToPay(item)">申訴中</button></view>
          <view class="btnStatus" v-if="item.status == 'CANCEL'"><button class="notStatus">已取消</button></view>
        </view>
      </view>
    </view>
  </view>
</template>
  
  <script>
import moment from 'moment'
import {
  globalConfig
} from '@/config.js'
import {
  api
} from '@/common/api.js'
export default {
  name: 'spiritMarketNew',
  props: {
    item: Object,
    ext: Object
  },
  data () {
    return {

    }
  },
  methods: {
    formatTime (str, format = 'YYYY-MM-DD HH:mm:ss') {
      if (!str) {
        return ''
      }
      return moment(str).format(format)
    },
    goToPay (item) {
      if (this.$cache.get('status') !== 'NORMAL') {
        uni.showToast({
          title: '當前狀态不可用',
          icon: 'error',
          duration: 1000
        })
        return
      }
      // console.log("item ==== ", item)
      uni.navigateTo({
        url: '/pages/userPay_new/userPay_new?data=' + item.id
      })
    },

    getImage (url) {
      console.log(this.$config)
      let that = this
      let imagePath;
      if (url.indexOf("http" || "https") === 0) {
        imagePath = url
      } else {
        console.log(url.indexOf("["))
        if (url.indexOf("[") === 0) {
          let urlJSON = JSON.parse(url)
          let imageUrl = urlJSON[0].url
          if (imageUrl.indexOf("http" || "https") === 0) {
            imagePath = imageUrl
          } else {
            if (![undefined, null, ''].includes(that.$config.endpoint)) {
              imagePath = that.$config.endpoint + imageUrl;
            } else {
              imagePath = that.$config.imageEndpoint + imageUrl
            }
            // return this.$config.endpoint + "/" + imageUrl
          }
        }
      }
      return imagePath
    },
  },
}
  </script>
<!--   
  <style lang="less">
  	.spiritMarketHistoryNew {
  	}
  
  	.newBuGu {
  		width: 100%;
  		height: 100%;
  		display: flex;
  		flex-direction: row;
  		padding-bottom: 20rpx;
  		background-color: #050e17;
  
  		.item {
  			width: 95%;
  			// height: 480rpx;
            padding: 20rpx 0;
  			border-top: 2rpx solid rgb(50, 71, 137);
  			border-left: 2rpx solid rgb(50, 71, 137);
  			background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
  			border-radius: 8px 8px 8px 8px;
  			margin: 0 auto;
  			display: flex;
  			flex-direction: row;
  
  			.right {
  				// width: 288rpx;
  				flex: 1;
  				margin-top: 24rpx;
  				margin-left: 16rpx;
  				display: flex;
  				flex-direction: column;
  
  				.ro {
  
  					// width: 363rpx;
  					.spiritName {
  						font-size: 32rpx;
  						font-family: PingFang SC-Bold, PingFang SC;
  						font-weight: bold;
  						color: #ffffff;
  					}
  				}
  
  				.rt {
  					margin-top: 16rpx;
  
  					.levelImg {
  						width: 134rpx;
  						height: 36rpx !important;
  					}
  				}
  
  				.rth {
  					display: flex;
  					flex-direction: row;
  					align-items: flex-end;
  					justify-content: space-between;
  					padding-bottom: 4rpx;
  					border-bottom: 1rpx solid #444e68;
  					height: 54rpx;
  					margin-right: 15px;
  
  					// width: 326rpx;
  					// flex:1;
  					.rthL {
  						font-size: 12px;
  						font-family: PingFang SC-Regular, PingFang SC;
  						font-weight: 400;
  						color: #c8ccd3;
  					}
  
  					.rthR {
  						font-size: 12px;
  						font-family: PingFang SC-Regular, PingFang SC;
  						font-weight: 400;
  						color: #dcdde2;
  					}
  				}
  
  				.rtho,
  				.rtht {
  					// margin: 0rpx !important;
  				}
  
  				.btnBox {
  					margin-top: 16rpx;
  					// width: 326rpx;
  					margin-right: 30rpx;
  					height: 80rpx;
  					display: flex;
  					align-items: center;
  					justify-content: center;
					
					.btnStatus{
						width: 135px;
						height: 40px;
						box-sizing: border-box; 
						padding: 1px; 
						border-radius: 8px; 
						border: 1px solid;
						background-image: linear-gradient(to right bottom,rgba(147, 49, 245, 1),rgba(11, 149, 255, 1));
						display: flex;
						align-items: center;
						justify-content: center;
						.notStatus{
							border-radius: 8px;
							display: flex;
							align-items: center;
							justify-content: center;
							width: 163px;
							height: 38px;
							border-radius: 15rpx;
							font-size: 16px;
							font-family: PingFang SC-Medium, PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							background: linear-gradient(135deg, #1D294F 0%, #17253F 100%);
						}
					}
					.fail{
					padding: 0px !important;
					border: 1px solid #FFFFFF !important;
					background-image:none !important;
					background: none !important;
					}
  
  					.btn {
  						width: 326rpx;
  						height: 80rpx;
  						display: flex;
  						align-items: center;
  						justify-content: center;
  						font-size: 32rpx;
  						font-family: PingFang SC-Medium, PingFang SC;
  						font-weight: 500;
  						color: #ffffff;
  						background: linear-gradient(270deg, #9331F5 0%, #0B95FF 100%);
  						border-radius: 16rpx 16rpx 16rpx 16rpx;
  					}
  
  					.father {
  						width: 326rpx;
  						height: 80rpx;
  						opacity: 1;
  						border: 1rpx solid;
  						background-image: linear-gradient(to right, #9331F5, #0B95FF);
  						border-radius: 16rpx 16rpx 16rpx 16rpx;
  						padding: 0.1rpx;
  						color: #ffffff !important;
  
  						.noStatus {
  							width: 326rpx;
  							height: 80rpx;
  							border-radius: 16rpx 16rpx 16rpx 16rpx;
  							display: flex;
  							align-items: center;
  							justify-content: center;
  							background: #172540;
  							font-size: 32rpx;
  							font-family: PingFang SC-Medium, PingFang SC;
  							font-weight: 500;
  							color: #ffffff !important;
  						}
  					}
  
  				}
  			}
  		}
  	}
  </style>
   -->