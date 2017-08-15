const db = require('../config/db.js');
const userModel = '../schema/user.js';

const TodolistDB = db.Todolist;

const User = TodolistDB.import(userModel); //用sequelize的import方法引入表结构，实例化User

const getUserById = async function(id){
	const userInfo = await User.findOne({
		where:{
			id: id
		}
	});
	return userInfo ? userInfo.dataValues : null;
}

const getUserByName = async function(name){
	const userInfo = await User.findOne({
		where:{
			username: name
		}
	});
	return userInfo ? userInfo.dataValues : null;
}

module.exports = {
	getUserById,
	getUserByName
}