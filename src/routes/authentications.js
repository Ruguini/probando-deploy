//import Router from "koa-router"
const Router = require('koa-router');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const router = new Router();



// {
//     username: 'usuario'
//     password: '123'
// }
router.post('authentication.signup', '/signup', async (ctx) => {
    const authInfo = ctx.request.body;
    let user = await ctx.orm.User.findOne( {where: { username: authInfo.username}} )
    if (user) {
        ctx.body = `El usuario ${authInfo.username} ya existe`;
        ctx.status = 400;
        return
    }
    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(authInfo.password, saltRounds); // entrega una promesa

        user = await ctx.orm.User.create({
            username: authInfo.username,
            password: hashPassword
        })
    } catch (error) {
		ctx.body = error;
		ctx.status = 400;
        return
	}
    ctx.body = {
        username: user.username
    }
    ctx.status = 201;
});



router.post("authentication.login", "/login", async (ctx) => {
    let user;
    const authInfo = ctx.request.body
    try {
        user = await ctx.orm.User.findOne({where:{username:authInfo.username}});
    }
    catch(error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    if (!user) {
        ctx.body = `The user by the email '${authInfo.username}' was not found`;
        ctx.status = 400;
        return;
    }
    console.log(user.password)
    console.log(authInfo.password)
    const validPassword = await bcrypt.compare(authInfo.password, user.password)
    if (validPassword) {
        ctx.body = {
            username: user.username
        };
        ctx.status = 200;
    } else {
        ctx.body = "Incorrect password";
        ctx.status = 400;
        return;
    }
    // Creamos el JWT. Si quisieras agregar distintos scopes, como por ejemplo
    // "admin", podrían hacer un llamado a la base de datos y cambiar el payload
    // en base a eso.
    const expirationSeconds = 1 * 60 * 60 * 24;
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
    var token = jwt.sign(
        { scope: ['user'] }, // payload
        JWT_PRIVATE_KEY,
        { subject: user.id.toString() },
        { expiresIn: expirationSeconds }
    ); // esta var token es lo que, si veo en la pagina jwt.io, puedo ver los detalles.
    // se asigna el scope user
    ctx.body = {
    "access_token": token,
    "token_type": "Bearer",
    "expires_in": expirationSeconds,
    }
    ctx.status = 200;

})

module.exports = router;