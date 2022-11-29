const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Course = require("./Course");
const User = require("./User");
const File = require("./File");

const Document = sequelize.define(
	"document",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		year: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		category: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		startVote: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		status: {
			type: DataTypes.STRING,
			defaultValue: "private",
		},
	},
	{
		tableName: "document",
	}
);

Document.belongsTo(User);
User.hasMany(Document);

Document.belongsTo(File);
File.hasOne(Document);

module.exports = Document;
