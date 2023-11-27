//import Router from "koa-router"
const Router = require('koa-router');

const router = new Router();

// los parámetros de aca abajo son
// primero en nombre de nuestro endpoint
// segundo la ruta
// tercero la función que se ejecutará cuando se accede a esa ruta
// http://localhost:3000/usuarios/show
// router.get("usuarios.show", "/show", async (ctx) =>{
//     ctx.body = usuarios;
// })

router.get('usuarios.list', '/', async (ctx) =>{
	try{
		console.log('entro a get para ver todos los usuarios');
		const user = await ctx.orm.User.findAll();
		ctx.body = user;
		ctx.status = 200; //request se realizo con exito
	} catch(error){
		ctx.body = error;
		ctx.status = 400;
	}
});

// router.get("usuarios.show", "/:id", async (ctx) =>{
//     try{
//         const user = await ctx.orm.User.findByPk(ctx.params.id)
//         ctx.body = user;
//         ctx.status = 200; //request se realizo con exito
//     } catch(error){
//         ctx.body = error;
//         ctx.status = 400;
//     }
// })

// router.get('usuarios.show', '/:id', async (ctx) =>{
// 	try{
// 		console.log('entro a get');
// 		const user = await ctx.orm.User.findOne({where:{id:ctx.params.id}}); //puede ser find one o find all usando el where
// 		ctx.body = user;
// 		ctx.status = 200; //request se realizo con exito
// 		if (!user) {
// 			ctx.status = 404; // No se encontró el usuario
// 			return;
// 		}
// 	} catch(error){
// 		// ctx.body = error;
// 		ctx.body = {
// 			'error': 1,
// 			'detalle': error
// 		};
// 		ctx.status = 400;
// 	}
// });

// aca ctx.orm es sequelize
// User es la tabla user
// router.post('users.create', '/', async (ctx) =>{
// 	try{
// 		console.log('Entro a crear usuario, los parametros son')
// 		console.log(ctx.request.body);
// 		const user = await ctx.orm.User.create(ctx.request.body);
// 		ctx.body = user;
// 		ctx.status = 201; //creado con exito
// 	} catch(error){
// 		//ctx.body = error;
// 		ctx.body = {
// 			'error': 2,
// 			'detalle': error
// 		};
// 		ctx.status = 400;
// 	}
// });

// aca deberia haber un body en verdad
// router.patch("usuarios.updateexperiencia", "/:id", async (ctx) =>{
//     try{
//         const user = await ctx.orm.User.findOne({where:{id:ctx.params.id}});
//         user.experiencia = user.experiencia +1;
//         await user.save();
//         ctx.body = user;
//         ctx.status = 201; //creado con exito
//     } catch(error){
//         ctx.body = error;
//         ctx.status = 400;
//     }
// })


// router.patch('usuarios.update', '/:id', async (ctx) => {
// 	try {
// 		console.log('entro a patch');
// 		const userId = ctx.params.id;
// 		const user = await ctx.orm.User.findOne({ where: { id: userId } });
  
// 		if (!user) {
// 			ctx.status = 404; // No se encontró el usuario
// 			return;
// 		}
  
// 		// Analiza el cuerpo JSON de la solicitud
// 		const requestBody = ctx.request.body;
  
// 		// Actualiza los campos según el cuerpo de la solicitud
// 		user.usuario = requestBody.usuario || user.usuario;
// 		user.mail = requestBody.mail || user.mail;
// 		user.contraseña = requestBody.contraseña || user.contraseña;
// 		user.experiencia = requestBody.experiencia || user.experiencia;
// 		user.monedas = requestBody.monedas || user.monedas;
// 		user.bombas_base = requestBody.bombas_base || user.bombas_base;
// 		user.vida_base = requestBody.vida_base || user.vida_base;
// 		user.personajeSeleccionado = requestBody.personajeSeleccionado || user.personajeSeleccionado;
// 		// Agrega más campos según sea necesario
  
// 		// Guarda la entidad actualizada
// 		await user.save();
  
// 		ctx.body = user;
// 		ctx.status = 200; // Actualizado con éxito
// 	} catch (error) {
// 		ctx.body = error;
// 		ctx.status = 400;
// 	}
// });

router.del('usuarios.delete', '/:id', async (ctx) => {
	try {
		console.log('entro a delete');
		const userId = ctx.params.id;
		const user = await ctx.orm.User.findOne({ where: { id: userId } });
  
		if (!user) {
			ctx.status = 404; // No se encontró el usuario
			return;
		}
  
		// Elimina el usuario
		await user.destroy();
  
		ctx.status = 204; // Sin contenido (usuario eliminado con éxito)
	} catch (error) {
		ctx.body = error;
		ctx.status = 400;
	}
});


// Ruta para probar cosas
// router.get('usuarios.prueba', '/probando/prueba', async (ctx) =>{
// 	try{
// 		console.log('entro a probar');
// 		const usuarioConCompras = await ctx.orm.User.findOne({
// 			where: { id: 2 }, // Reemplaza 1 con el ID del usuario que quieres consultar
// 			include: ctx.orm.Compra,
// 		});
// 		console.log(usuarioConCompras);
// 		ctx.body = usuarioConCompras;
// 	} catch(error){
// 		// ctx.body = error;
// 		ctx.body = {
// 			'error': 1,
// 			'detalle': error
// 		};
// 		ctx.status = 400;
// 	}
// });


//export default router
module.exports = router;