const user = require('../controllers/user.js');
const router = require('koa-router')();

router.get('/user', user.getUserInfo);

module.exports = router;