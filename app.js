const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const auth = require('./server/routes/auth.js');

app.use(require('koa-bodyparser')());

router.use('/auth', auth.routes());

app.use(router.routes());
app.listen(8889, () => {
	console.log('koa is listen at 8889');
});

module.exports = app;