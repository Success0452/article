/* imports */
const Sequelize = require('sequelize');
const sequelize = require('../config/helper');

// Define the model
const Comment = sequelize.define('comment', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	comment: Sequelize.STRING,
	comment_by: Sequelize.STRING,
    parent_id: Sequelize.STRING
},
{
	sequelize,
	modelName: "Comment",
	tableName: "comments",
	createdAt: "created_at",
	updatedAt: "updated_at",
});

/* exports */
module.exports = Comment;