const user = require('../controllers/user.js');
const router = require('koa-router')();

router.get('/user', user.getUserInfo);
router.post('/user', user.postUserAuth);

module.exports = router;