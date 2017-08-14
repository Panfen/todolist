const user = require('../models/user.js');

const getUserInfo = async function(ctx){
	ctx.body = await user.getUserById(ctx.query.id);
}

module.exports = {
	getUserInfo
}