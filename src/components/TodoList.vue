<template>
	<el-row class="content">
		<el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
			<span>
				欢迎：{{name}} ! 您的待办事项有：
			</span>
			<el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data(){
			return {
				name: 'Panfen',
				todos: ''
			};
		},
		methods: {
			addTodos() {
				if(this.todos == '')
					return
				alert(this.todos)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.el-input
		margin 20px auto
</style>