<template>
	<div>
		<div class="box-list">
			<div class="box-list-item" v-for="(item,i) in list" :key="i" :style="{'width':100/list.length+'%'}">
				<div class="box-list-body">
					<div class="box-list-children">
						<div class="box-list-number">{{item.number}}</div>
						<div class="box-list-title">{{item.title}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:"box-list",
		data() {
			return {
			};
		},
		props:{
			list:{
				number:{
					type:Number
				},
				title:{
					type:String
				},
				default(){
					return []
				}
			}
		},
		methods:{
		}
	}
</script>

<style lang="less">
	.box-list{
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background-color: #fff;
	}
	.box-list-item{
		flex: 1;
		min-width: 25%;
		text-align: center;
	}
	.box-list-body{
		width: 100%;
		border-left: 2px solid #F3F3F3;
	}
	.box-list-children{
		width: 100%;
		margin: 15px 0;
	}
	.box-list-number{
		color: #2A82E4;
		font-size: 21px;
	}
	.box-list-title{
		margin-top: 8px;
		font-size: 12px;
	}
</style>
