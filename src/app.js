const koa = require('koa');
const KoaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const router = require('./routes');
const orm = require('./models');
const cors = require('@koa/cors');

const app = new koa();

app.context.orm = orm;

app.use(cors()); // cors para poder acceder desde el frontend
app.use(KoaLogger());
app.use(koaBody());

//koa oruter
app.use(router.routes());

router.get("/", (ctx, next) => {
    ctx.response.body = { message: "Hello world!" };
    ctx.status = 200;
  });

module.exports = app;