const Router = require('koa-router');
const users = require('./routes/users.js');
const authRoutes = require('./routes/authentications.js');
const jwtMiddleware = require('koa-jwt');
const scopeProtectedRoutes = require('./routes/scopeExample.js')

const router = new Router();

// todas las requests que comienzan con users serán gestionados por este middleware

router.use(authRoutes.routes());
router.use('/users', users.routes());

// las rutas protegidas van a estar de aqui hacia abajo:
router.use(jwtMiddleware( {secret: process.env.JWT_SECRET} ))

router.use('/scope-example', scopeProtectedRoutes.routes());

module.exports = router;