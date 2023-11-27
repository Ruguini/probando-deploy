
const app = require('./app');
const db = require('./models');
const dotenv = require('dotenv');

// esto es para poder usar variables de entorno
dotenv.config();


const PORT = process.env.PORT || 3000;


//aquí, primero autentificamos el acceso. Si ocurre bien, se establece la conexión
// sino, se maneja el error
db.sequelize
	.authenticate()
	.then(() => {
		console.log('Connection to the database  has been established successfully');
		app.listen(PORT, (err) => {
			if (err) {
				return console.error('Failed', err);
			}
			console.log(`Listening on port ${PORT}`);
			return app;
		});
	})
	.catch((err) => console.error('Unable to connect to the database:', err));

