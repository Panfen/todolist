<template>
	<el-row class="content">
		<el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
			<span>
				欢迎：{{name}} ! 您的待办事项有：
			</span>
			<el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
			<el-tabs v-model="activeName">
				<el-tab-pane label="待办事务" name="first">
					<el-col :xs="24">
						<template v-if="!Done">
							<template v-for="(item, index) in list">
								<div class="todo-list" v-if="item.status==false">
									<span class="item">
										{{index + 1}}.{{item.content}}
									</span>
									<span class="pull-right">
										<el-button size="small" type="primary" v-on:click="finished(index)">完成</el-button>
										<el-button size="small" :plain="true" type="danger" v-on:click="remove(index)">删除</el-button>
									</span>
								</div>
							</template>
						</template>
						<div v-else-if="Done">
							暂无待办事项
						</div>
					</el-col>
				</el-tab-pane>
				<el-tab-pane label="已完成事项" name="second">
					<template v-if="count>0">
						<template v-for="(item, index) in list">
							<div class="todo-list" v-if="item.status==true">
								<span class="item finished">
									{{index + 1}}.{{item.content}}
								</span>
								<span class="pull-right">
									<el-button size="small" type="primary" v-on:click="restore(index)">还原</el-button>
								</span>
							</div>
						</template>
					</template>
					<div v-else>
						暂无已完成事项
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-col>
	</el-row>
</template>

<script>

	// import jwt from 'jsonwebtoken';

	export default {
		created(){
			const userInfo = this.getUserInfo();
			if(userInfo){
				this.id = userInfo.id;
				this.username = userinfo.username
			}else{
				this.id = '';
				this.username = '';
			}
		},
		data(){
			return {
				id: '',
				name: 'Panfen',
				todos: '',
				activeName: 'first',
				list: [],
				count: 0
			};
		},
		computed:{   //计算属性用于计算是否已经完成了所有任务
			Done(){
				let count = 0;
				let length = this.list.length;
				for(let i in this.list){
					this.list[i].status == true ? count += 1 : 0;
				}
				this.count = count;
				return (count == length || length == 0) ? true : false;
			}
		},
		methods: {
			addTodos() {
				if(this.todos == '')
					return;
				let obj = {
					user_id: this.id,
					status: false,
					content: this.todos
				}

				this.$http.post('/api/createTodolist', obj).then((res) => {
					if(res.status == 200){
						this.$message({
							type: 'success',
							message: '创建成功！'
						});
						this.getTodolist();
					}else{
						this.$message.error('创建失败！');
					}
				}, (err) => {
					this.$message.error('创建失败！');
					console.log(err);
				});
				// this.list.push(obj);
				this.todos = '';
			},
			getTodolist(){
				this.$http.get('/api/getTodolist/' + this.id).then((res) => {
					if(res.status == 200){
						this.list = res.data;
					}else{
						this.$message.error('获取列表失败！');
					}
				}, (err) => {
					this.$message.error('获取列表失败！');
					console.log(err);
				});
			},
			finished(index){
				this.$set(this.list[index], 'status', true);
				this.$message({
					type: 'success',
					message: '任务已完成'
				});
			},
			remove(index){
				this.list.splice(index, 1);
				this.$message({
					type: 'info',
					message: '任务已删除'
				});
			},
			restore(index){
				this.$set(this.list[index], 'status', false);
				this.$message({
					type: 'info',
					message: '任务已还原'
				});
			},
			getUserInfo(){
				const token = sessionStorage.getItem('vue-koa-todolist');
				if(token != null && token != 'null'){
					// let decode = jwt.verify(token, 'vue-koa-todolist');
					return decode;
				}else{
					return null;
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.el-input
		margin 20px auto
	.todo-list
		width 100%
		margin-top 8px
		padding-bottom 8px
		border-bottom 1px solid #eee
		over-flow hidden
		text-align left
		.item
			font-size 20px
			&.finished
				text-decoration line-through
				color #ddd
	.pull-right
		float right
</style>