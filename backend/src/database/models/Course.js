const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Class = require("./Class");

const Course = sequelize.define(
	"Course",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		name: {
			allowNull: false,
			type: DataTypes.TEXT,
		},
		code: {
			allowNull: false,
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "course",
	}
);

module.exports = Course;
