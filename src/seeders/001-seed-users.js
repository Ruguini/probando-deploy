// 'use strict';
const bcrypt = require('bcrypt');
const { getMaxListeners } = require('koa');
const { QueryInterface } = require('sequelize');
const saltRounds = 10;
const dotenv = require('dotenv');

// esto es para poder usar variables de entorno
dotenv.config();

module.exports = {
	up: async (queryInterface) => {
		const pass1 = await bcrypt.hash(process.env.PASS1, saltRounds); // entrega una promesa
		const pass2 = await bcrypt.hash(process.env.PASS2, saltRounds); // entrega una promesa

		return queryInterface.bulkInsert('Users', [
			{
				username: 'nicorad',
				password: pass1,
				createdAt: new Date(),
				updatedAt: new Date(),
			}, {
				username: 'user2',
				password: pass2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};

