<!-- 精灵记录页面 -->
<template>
    <view class="spirit_record_container">
        <view class="spirit_record_content">
            <view class="header_item">
                <view class="name">{{_get(item, 'wisp.name')}}</view>
                <image class="levelImg" src="../../../static/level/one.png" mode="widthFix"
                	v-if="_get(item, 'wisp.level') === 1"></image>
                <image class="levelImg" src="../../../static/level/two.png" mode="widthFix"
                	v-if="_get(item, 'wisp.level') === 2"></image>
                <image class="levelImg" src="../../../static/level/three.png" mode="widthFix"
                	v-if="_get(item, 'wisp.level') === 3"></image>
                <image class="levelImg" src="../../../static/level/four.png" mode="widthFix"
                	v-if="_get(item, 'wisp.level') === 4"></image>
                <image class="levelImg" src="../../../static/level/five.png" mode="widthFix"
                	v-if="_get(item, 'wisp.level') === 5"></image>
                <image class="levelImg" src="../../../static/level/six.png" mode="widthFix"
                	v-if="_get(item, 'wisp.level') === 6"></image>
                <image class="levelImg" src="../../../static/level/seven.png" mode="widthFix"
                	v-if="_get(item, 'wisp.level') === 7"></image>
                <image class="levelImg" src="../../../static/level/eight.png" mode="widthFix"
                	v-if="_get(item, 'wisp.level') === 8"></image>
            </view>
            <view class="flex_item">
                <view>增長能力</view>
                <view>{{ _get(item, 'wisp.growthPercent', 0)}}%</view>
            </view>
            <view class="flex_item">
                <view>能力值</view>
                <view>{{ _get(item, 'wisp.minimumValue', 0)}} - {{ _get(item, 'wisp.maximumValue', 0)}}%</view>
            </view>
            <view class="flex_item">
                <view>培養天數</view>
                <view>{{ _get(item, 'wisp.growthDays', 0)}}</view>
            </view>
            <view class="but_content">
                <!-- 预约 -->
                <pretty-button class="but" v-if="item.bookStatus == 'WAITING_MATCH'" type="hollow" text="預約成功"></pretty-button>
                <pretty-button class="but" v-if="item.bookStatus=='MATCH_SUCCESS'"  type="hollow"  text="匹配成功"></pretty-button>
                <pretty-button class="but" v-if="item.bookStatus=='MATCH_FAIL'"  type="hollow"  text="匹配失敗"></pretty-button>
                
                <!-- 匹配 -->
                <pretty-button class="but" v-if="item.status=='WAITING_PAYMENT'" :text="`待付款(剩${item.remainingMinutes}分鍾)`" ></pretty-button>
                <pretty-button class="but fail" v-if="item.status=='PAID'" text="已付款"></pretty-button>
                <pretty-button class="but" v-if="item.status=='PAYMENT_TIMEOUT'" text="玩家處理超時"></pretty-button>
                <pretty-button class="but" v-if="item.status=='RECEIVED'" text="已确認收款"></pretty-button>
                <pretty-button class="but" v-if="item.status=='COMPLAINING'" text="申訴中"></pretty-button>
                <pretty-button class="but" v-if="item.status=='CANCEL'" text="已取消"></pretty-button>
                
                <!-- 出售中 -->
                <pretty-button class="but" v-if="_get(item, 'wispOrder.status') === 'RECEIVED'" text="已确认收款"></pretty-button>
                <pretty-button class="but" v-if="_get(item, 'wispOrder.status') === 'SELLING'" text="出售中"></pretty-button>
                <pretty-button class="but" v-if="_get(item, 'wispOrder.status') === 'WAITING_PAYMENT'" text="對方付款中..."></pretty-button>
                <pretty-button class="but" v-if="_get(item, 'wispOrder.status') === 'PAID'" text="對方已付款"></pretty-button>
                <pretty-button class="but" v-if="_get(item, 'wispOrder.status') === 'PAYMENT_TIMEOUT'" text="對方未付款"></pretty-button>
                <!-- <pretty-button class="but" v-if="_get(item, 'wispOrder.status') === 'WAITING_PAYMENT' || _get(item, 'wispOrder.status') === 'PAYMENT_TIMEOUT'" :text="`剩餘付款時間${_get(item, 'wispOrder.remainingMinutes', 0)}分鍾`"></pretty-button> -->
                <pretty-button class="but" v-if="_get(item, 'wispOrder.status') === 'SELLING'" text="出售中..."></pretty-button>
                <pretty-button class="but" v-if="_get(item, 'wispOrder.status') === 'RECEIVED'" text="已确认收款"></pretty-button>
                <pretty-button class="but" v-if="_get(item, 'wispOrder.status') === 'COMPLAINING'" text="申诉中.."></pretty-button>
                
            </view>
        </view>
    </view>
</template>

<script>
    import _ from 'lodash'
    export default {
        name: 'spirit_record',
        props: {
        	item: Object,
        	default: () => {}
        },
        methods: {
            _get(data, field, defaultValue = '') {
                return _.get(data, field, defaultValue)
            }
        }
    }
</script>

<style lang="less" scoped>
    .spirit_record_container {
        background-color: #050e17;
        padding: 24rpx;
        .spirit_record_content {
            border-radius: 16rpx;
            background-color: #1A2646;
            padding: 24rpx;
            .header_item {
                display: flex;
                justify-content: space-between;
                >.name {
                    font-size: 32rpx;
                    font-family: PingFang SC-Bold, PingFang SC;
                    font-weight: bold;
                    color: #ffffff;
                }
                >.levelImg {
                    width: 134rpx;
                    height: 36rpx;
                }
                margin-bottom: 40rpx;
            }
            .flex_item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(247, 248, 250, 0.18);
                margin-bottom: 28rpx;
                color: #c8ccd3;
                font-size: 28rpx;
            }
            .but_content {
                margin-top: 50rpx;
                margin-bottom: 30rpx;
                display: flex;
                justify-content: center;
                .but {
                    width: 80%;
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
            }
        }
    }
</style>
