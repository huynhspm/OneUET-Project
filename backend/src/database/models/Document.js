const { DataTypes } = require("sequelize");
const sequelize = require("../");

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
			type: DataTypes.INTEGER,
		},
		category: {
			type: DataTypes.STRING,
		},
		star: {
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
