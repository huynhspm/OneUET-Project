const { DataTypes } = require("sequelize");
const sequelize = require("../");

const User = require("./User");
const Document = require("./Document");

const Comment = sequelize.define(
	"comment",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		content: {
			allowNull: false,
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "comment",
	}
);

Comment.belongsTo(User);
User.hasMany(Comment);

Comment.belongsTo(Document);
Document.hasMany(Comment);

module.exports = Comment;
