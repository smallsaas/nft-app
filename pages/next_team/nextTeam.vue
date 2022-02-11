<!-- 對接PageTabbar組件的标準頁面 -->
<template>
	<view class="main-container">
			测试页面
			测试页面
			测试页面
			测试页面
			测试页面
			测试页面
			测试页面
			测试页面
			测试页面
			测试页面
			测试页面
			测试页面
			测试页面
	</view>
</template>

<script>
   
   export default {
	   name: 'nextTeam',
	   props: {
	   },
	   onLoad(e) {
	   	console.log(e.id)
	   },
	   data() {
	   	return {
			list:[]
	   	}
	   },
	   mounted: function () {
		   this.setScrollBar();
		   // 浏览器缩放，更新ScrollBar位置
		   window.addEventListener('resize', this.setScrollBar);
	   },
	   methods: {
	   	 setScrollBar() {
			this.$nextTick(function () {
				var div = document.querySelector('.main-container');
				div.style.height = window.innerHeight - 10 + 'px';
				console.log('mounted: ', div);
				console.log('mounted: ', window.innerHeight);
			})
			
		},
	   }
   }
</script>

<style lang="less">
	.main-container {
		width:100%;
        display: flex;
		overflow-x: auto;
		overflow-y: hidden;
		white-space:nowrap;
		&::-webkit-scrollbar{// 滚动条整体
			background:none;
		}
		&::-webkit-scrollbar-thumb{//滑块
			background: rgba(71, 145, 242,.5);
			border-radius: 5px;
		}
		&::-webkit-scrollbar-track{//轨道
	
		}
		&::-webkit-scrollbar-button{//两端按钮
	
		}
		&::-webkit-scrollbar-track-piece{//滚动条中间部分
		}
    }    
		
</style>
