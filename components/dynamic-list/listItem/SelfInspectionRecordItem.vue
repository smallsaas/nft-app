<template>
	<div class="self-item">
		<div class="flex">
			<div class="left flex1">
				<div class="title text-line-1">{{ item.name }}</div>
				<div class="times text-line-1">
					期间: {{ item.code }}
				</div>
				<div class="submit-time">提交时间: {{ item.createTime }}</div>
			</div>
			<div class="right">
				<div v-if="item.status === 'START'" class="status">
					待审核
				</div>
				<div v-else-if="item.status === 'VERIFYING'" class="status" style="background-color: #F5A623;">
					审核中
				</div>
				<div v-else-if="item.status === 'CLOSE_REJECTED'" class="status" style="background-color: #D43030;">
					被拒绝
				</div>
				<div v-else-if="item.status === 'CLOSE_APPROVED'" class="status" style="background-color: #979797;">
					已审核
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'SelfInspectionRecordItem',
		props: {
			item: Object,
			ext: Object
		}
	}
</script>
<style lang="less" scoped>
	.self-item {
		padding: 32rpx;
		background: #fff;
		border-bottom: 1px solid #eee;
		font-size: 28rpx;
		transition: all .4s;
		margin: 0 4rpx;

		.flex {
			display: flex;
			justify-content: space-between;

			.left {
				.title {
					color: #333;
					font-weight: 700;
					font-size: 32rpx;
				}

				.times {
					margin: 10rpx 0;
					color: #505050;
				}

				.text-line-1 {
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}

				.submit-time {
					color: #a6a6a6;
				}
			}

			.flex1 {
				flex: 1;
				max-width: calc(100% - 200rpx);
			}

			.right {
				width: 164rpx;
				height: 128rpx;

				.status {
					width: 170rpx;
					height: 50rpx;
					line-height: 50rpx;
					text-align: center;
					font-size: 24rpx;
					background-color: #43CF7C;
					color: #ffffff;
					border-radius: 12rpx;
					margin-top: 40rpx;
				}
			}
		}
	}

	.self-item:active {
		background-color: #f2f2f2;
		transition: all .4s;
	}
</style>
