const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Course = require("./Course");

const Class = sequelize.define(
	"class",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		code: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING,
		},
		semester: {
			type: DataTypes.STRING,
		},
		group: {
			type: DataTypes.STRING,
		},
		quantity: {
			type: DataTypes.INTEGER,
		},
		date: {
			type: DataTypes.TEXT,
		},
		section: {
			type: DataTypes.TEXT,
		},
		classroom: {
			type: DataTypes.TEXT,
		},
	},
	{
		tableName: "class",
	}
);

Class.belongsTo(Course);
Course.hasMany(Class);

module.exports = Class;
