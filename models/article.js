const Sequelize = require('sequelize');
const sequelize = require('../config/helper');

// Define the model
const Article = sequelize.define('article', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	posted_by: Sequelize.STRING,
	description: Sequelize.TEXT,
	title: Sequelize.STRING,
	post_image: Sequelize.STRING,
	subject: Sequelize.STRING,
	comments:  { type: Sequelize.ARRAY(Sequelize.JSON), allowNull: false, defaultValue: []}
},
{
	sequelize,
	modelName: "Article",
	tableName: "articles",
	createdAt: "created_at",
	updatedAt: "updated_at",
});

module.exports = Article;