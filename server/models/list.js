const db = require('../config/db.js');
const listModel = '../schema/list.js';   // 引入表结构

const TodolistDB = db.Todolist;   // 引入数据库

const List = TodolistDB.import(listModel);

/*
 *获取某个用户的全部todolist
 */
const getListById = async function(id){
	const list = await List.findAll({
		where:{
			user_id: id
		},
		attributes:['id', 'content', 'status']   //只需返回三个字段的结果
	});
	return list;
}

const createListItem = async function(data){
	const result = await List.create({
		user_id: data.id,
		content: data.content,
		status: data.status
	});
	console.log(result);
	return result ? true : false;
}

const removeTodolist = async function(id, user_id){
	await List.destroy({
		where:{
			id,
			user_id
		}
	});
	return true;
}

const updateTodolist = async function(id, user_id, status){
	await List.update({
		{
			status
		},{
			where:{
				id,
				user_id
			}
		}
	});
	return true;
}

module.exports = {
	getListById,
	createListItem,
	removeTodolist,
	updateTodolist
}