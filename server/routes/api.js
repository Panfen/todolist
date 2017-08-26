const router = require('koa-router')();
const list = require('../controllers/list.js');

router.get('/getTodolist', list.getTodolist);
router.post('/createTodolist', list.createTodolist);

module.exports = router;