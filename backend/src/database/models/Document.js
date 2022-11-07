const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Course = require("./Course");

const Document = sequelize.define(
	"Document",
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

Document.belongsTo(Course);
Course.hasMany(Document);

module.exports = Document;
