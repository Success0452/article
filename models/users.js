/* imports */
const Sequelize = require('sequelize');
const sequelize = require('../config/helper');

// Define the model
const User = sequelize.define('users', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	first_name: Sequelize.STRING,
	last_name: Sequelize.STRING,
	email: Sequelize.STRING,
	password: Sequelize.STRING,
	gender: Sequelize.STRING,
	bio: Sequelize.TEXT,
	phone: Sequelize.STRING,
	otp: Sequelize.STRING,
	status: Sequelize.BOOLEAN
},
{
	sequelize,
	modelName: "User",
	tableName: "users",
	createdAt: "created_at",
	updatedAt: "updated_at",
});

/* exports */
module.exports = User;