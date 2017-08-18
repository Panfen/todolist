const list = require('../models/list.js');

const getList = async function(ctx){
	ctx.body = await list.getListById(ctx.query.id);
}

const createTodolist = async function(ctx){
	const data = ctx.request.body;
	const result = await list.createListItem(data);

	ctx.body = {
		success: true
	}
}

const updateTodolist = async function(ctx){
	const id = ctx.query.id;
	const user_id = ctx.query.userId;
	const status = ctx.query.status;
	status = status == '0' ?  true : false;

	const result = async list.updateTodolist(id, user_id, status);
	this.body = {
		success：true
	}
}

module.exports = {
	getList,
	createTodolist
}