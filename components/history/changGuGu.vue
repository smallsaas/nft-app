<template>
  <view class="transfers">
    <text class="t"> 轉化GuGu令 </text>
    <text class="tt tttt">当前市场价格转化比 1 : {{companionWispCoin}}</text>
    <input v-model="data.number" class="ttt ttttt" placeholder="輸入數量" type="number" />
    <view class="line"></view>
    <view class="btnBox">
      <button class="btn ccc" @click="cancel">取消</button>
      <button class="btn" @click="subAction">确定</button>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      data: {
        // 13692842253
        // 123456
        number: "",
      },
      showError: false,
      showErrorTwo: false,
      loading: false
    }
  },
  props:{
  	  companionWispAmount: 0,
	  companionWispCoin: 0
  },
  methods: {
    cancel () {
      this.$emit('close')
    },
    subAction () {
      this.successTransfer()
    },
    async successTransfer () {

      if (this.loading) {
        return
      }

      this.loading = true

      if (this.data.number < 1) {
        uni.showToast({
          title: '請輸入轉化數量',
          icon: "",
          duration: 1500
        })
		this.loading = false
        return
      }
	  
	  if (this.data.number > this.companionWispAmount) {
	    uni.showToast({
	      title: '轉化數量不能高於擁有數量',
	      icon: "",
	      duration: 1500
	    })
		this.loading = false
	    return
	  }
	  
      this.data.number = parseInt(this.data.number)
      // console.log(this.data)
      const res = await this.$api.changeGUGU(this.data)
      // console.log(res)
      if (res.code == 200) {
        uni.showToast({
          title: '轉化成功',
          icon: "success",
          duration: 1000
        })
        this.loading = false
        this.$emit('close')
        this.$emit('tellFather', true)
      } else {
        this.loading = false
        let data = {
          message: res.message
        }
        // uni.showToast({
        // 	title: res.message,
        // 	icon: "error",
        // 	duration: 1000
        // })
        this.$emit('close', data)
      }
    }
  },
  mounted(){
  }
}

</script>

<style lang="less">
.transfers {
  width: 320px;
  height: 280px;
  background: linear-gradient(135deg, #1d294f 0%, #17253f 100%);
  border-radius: 8px 8px 8px 8px;
  opacity: 1;
  position: fixed;
  top: 358rpx;
  left: 56rpx;
  z-index: 99999;
  border-top: 2rpx solid rgb(50, 71, 137);
  border-left: 2rpx solid rgb(50, 71, 137);

  .t {
    width: 200px;
    height: 25px;
    font-size: 18px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #ffffff;
    position: absolute;
    top: 45rpx;
    left: 230rpx;
  }

  .tt {
    width: 160px;
    height: 17px;
    font-size: 12px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    position: absolute;
    top: 122rpx;
    left: 48rpx;
  }

  .ttt {
    width: 282px;
    height: 40px;
    background: #131d33;
    border-radius: 8px 8px 8px 8px;
    opacity: 1;
    position: absolute;
    top: 172rpx;
    left: 38rpx;
    padding-left: 10rpx;
  }

  .tttt {
    top: 190rpx;
  }

  .ttttt {
    top: 240rpx;
  }

  .tttttt {
    top: 260rpx;
  }

  .ttttttt {
    top: 300rpx;
  }

  .line {
    width: 320px;
    height: 1px;
    background: linear-gradient(270deg, #182641 0%, #3f547d 49%, #182641 100%);
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    position: absolute;
    top: 624rpx;
  }

  .btnBox {
    width: 320px;
    height: 84px;
    position: absolute;
    bottom: 0rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .btn {
      width: 132px;
      height: 40px;
      background: linear-gradient(270deg, #9331f5 0%, #0b95ff 100%);
      border-radius: 4px 4px 4px 4px;
      opacity: 1;
      font-size: 16px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ccc {
      background: #1d294d;
      border: 1px solid #ffffff;
    }
  }
}
</style>
