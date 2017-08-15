const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../models/user.js');

const getUserInfo = async function(ctx){
	ctx.body = await user.getUserById(ctx.query.id);
}

const postUserAuth = async function(ctx){
	let data = ctx.request.body
	const userInfo = await user.getUserByName(data.username);

	if(userInfo != null){
		if(!bcrypt.compareSync(data.password, userInfo.password)){
			ctx.body = {
				success: false,
				info: '密码输入错误！'
			}
		}else{
			const userToken = {
				id: userInfo.id,
				name: userInfo.username
			}
			const secret = 'vue-koa-todolist'; //指定密钥，用来判断token合法性的标志
			const token = jwt.sign(userToken, secret); //签发token
			ctx.body = {
				success: true,
				token: token
			}
		}
	}else{
		ctx.body = {
			success: false,
			info: '用户名不存在！'
		}
	}
}

module.exports = {
	getUserInfo,
	postUserAuth
}