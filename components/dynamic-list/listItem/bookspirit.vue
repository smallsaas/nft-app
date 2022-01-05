<template>
	<view class="bookSpirit">
		<text>預約狀态{{item.bookStatus}}</text>
		<br>
		<text>玩家id{{item.playerId}}</text>
		<br>
		<text>預約場次号{{item.marketSessionId}}</text>
		<br>
		<text>預約時間{{item.appointmentTime}}</text>
	</view>
</template>

<script>
	export default {
		name:'spiritMarket',
		props: {
			item: Object,
			ext: Object
		},
		}
</script>

<style lang="scss">
	.bookSpirit{
		width: auto;
		height: auto;
		border: 1px solid red;
	}
</style>
