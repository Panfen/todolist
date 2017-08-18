const router = require('koa-router')();
const list = require('../controllers/list.js');

router.get('/api', list.getList);
router.post('/api', list.createTodolist);

module.exports = router;