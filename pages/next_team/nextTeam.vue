<!-- 對接PageTabbar組件的标準頁面 -->
<template>
	<view class="main-container">
		<view style="padding: 0 15rpx;">團隊層級導航</view>
		<view class="nav" style="ba">
			<view v-for="(item, index) in navs">
				<view @click="showCurrentTeam(item)" style="padding: 5rpx 10rpx;">{{item.name}}{{item.arrow}}</view>
			</view>
		</view>
		<view class="list-container" v-for="tItem in teamList">
			<view class="team newTeam">
				<view class="item" @click="showNextTeam(tItem)">
					<view class="left">
						<image :src="getImage(tItem.avatar)" mode="widthFix" class="avator"></image>
					</view>
					<view class="right">
						<view class="flex i"><text class="name">{{tItem.name}}</text></view>
						<view class="flex"><text class="account">團隊總人數:{{tItem.teamSize}}</text></view>
						<view class="flex ii">
							<!-- <text class="num">領養數: {{tItem.adoptCount||0}}人</text> -->
							<text class="num">直推數: {{tItem.recommendCount||0}}人</text>
							<!-- <text class="num tt">預約數: {{tItem.appointmentCount||0}}人</text> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'nextTeam',
		props: {},
		onLoad(e) {
			console.log(e.id)
			const item = {
				id: e.id,
				name: e.name
			}
			this.navs = [item]
			this.getChildData(e.id)
		},
		data() {
			return {
				userId: '',
				navs: [],
				teamList: []
			}
		},
		mounted: function() {
			this.setScrollBar();
			// 浏覽器縮放，更新ScrollBar位置
			window.addEventListener('resize', this.setScrollBar);
		},
		methods: {
			setScrollBar() {
				this.$nextTick(function() {
					var div = document.querySelector('.main-container');
					div.style.height = window.innerHeight - 10 + 'px';
					console.log('mounted: ', div);
					console.log('mounted: ', window.innerHeight);
				})
			},
			getImage(url) {
				console.log(this.$config)
				let that = this
				let imagePath = "";
				if (![null, undefined, ''].includes(url)) {
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
									imagePath = that.$config.endpoint + "/" + imageUrl;
								} else {
									imagePath = that.$config.imageEndpoint + "/" + imageUrl
								}
								// return this.$config.endpoint + "/" + imageUrl
							}
						}
					}
					return imagePath
				} else {
					return 'data:image/png;base64,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'
				}
			},
			async getChildData(id) {
				let params = {}
				let res = await this.$api.getUserTeamById(params, id)
				if (res.code === 200) {
					this.teamList = res.data
				} else {
					console.log('獲取團隊信息失敗')
				}
			},
			showNextTeam(currentItem) {
				if (currentItem.teamSize >= 1) {
					const nItem = {
						id: currentItem.id,
						name: currentItem.name
					}
					this.navs.push(nItem)
					this.navs.map((item, index) => {
						if (index != this.navs.length - 1) {
							item.arrow = ' > '
						}
						return item
					})
					this.navs = this.navs
					this.getChildData(currentItem.id)
				}
			},
			showCurrentTeam(cItem) {
				const newNavs = []
				for (var i in this.navs) {
					newNavs.push(this.navs[i])
					if (this.navs[i].id == cItem.id) {
						this.navs[i].arrow = ''
						break
					}
				}
				this.navs = newNavs
				this.getChildData(cItem.id)
			}
		}
	}
</script>

<style lang="less">
	.main-container {
		.nav {
			width: 100%;
			display: flex;
			overflow-x: auto;
			overflow-y: hidden;
			white-space: nowrap;
			padding: 12rpx;
			flex-direction: row;
			background: rgb(17, 24, 30);
			&::-webkit-scrollbar {
				// 滾動條整體
				background: none;
			}

			&::-webkit-scrollbar-thumb {
				//滑塊
				background: rgba(71, 145, 242, .5);
				border-radius: 5px;
			}

			&::-webkit-scrollbar-track {
				//軌道

			}

			&::-webkit-scrollbar-button {
				//兩端按鈕

			}

			&::-webkit-scrollbar-track-piece {
				//滾動條中間部分
			}
		}

		.list-container {
			margin-top: 10rpx;

			.team {
				width: 100%;
				background: rgb(5, 14, 23);
				padding-bottom: 20rpx;

				.self {
					width: 100%;
					height: 60rpx;
					display: flex;
					align-items: center;
					justify-content: space-around;
					margin-bottom: 20rpx;
					background: #1C294C;

					.num {
						color: grey;
						font-size: 30rpx;
					}
				}

				.item {
					width: 90%;
					height: 180rpx;
					margin-left: 5%;
					background: rgb(17, 24, 30);
					border-radius: 20rpx;
					display: flex;
					flex-direction: row;

					.left {
						width: 20%;
						height: 100%;
						display: flex;
						align-items: flex-start;
						justify-content: center;

						.avator {
							margin-top: 20rpx;
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
						}
					}

					.right {
						width: 80%;
						height: 100%;
						display: flex;
						flex-direction: column;

						.flex {
							flex: 1;
							display: flex;
							align-items: center;

							.account {
								color: grey;
								font-size: 30rpx;
							}

							.num {
								color: grey;
								font-size: 25rpx;
							}
						}

						.ii {
							display: flex;
							justify-content: space-between;

							.tt {
								margin-right: 40rpx;
							}
						}

						.i {
							flex: 1.5;
							display: flex;
							align-items: center;

							.name {
								color: #FFFFFF;
							}
						}
					}
				}
			}
		}
	}
</style>
