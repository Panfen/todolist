const Koa = require('koa');
const router = require('koa-router')();
var app = new Koa();
app.use(require('koa-bodyparser')());

router.get('/', (ctx, next) => {
	this.body = 'hello world';
});

app.use(router.routes());
app.listen(8889, () => {
	console.log('koa is listen at 8889');
});

module.exports = app;