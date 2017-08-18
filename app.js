const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const auth = require('./server/routes/auth.js');
const api = require('./server/routes/api.js');
const jwt = require('jsonwebtoken');

app.use(require('koa-bodyparser')());

router.use('/auth', auth.routes());
// router.use("/api", jwt({secret: 'vue-koa-todolist'}), api.routes());
router.use("/api", api.routes());

app.use(router.routes());
app.listen(8889, () => {
	console.log('koa is listen at 8889');
});

module.exports = app;