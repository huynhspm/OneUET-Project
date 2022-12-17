const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Course = sequelize.define(
	"course",
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
			unique: true,
			type: DataTypes.STRING,
		},
		credit: {
			type: DataTypes.INTEGER,
		},
	},
	{
		tableName: "course",
	}
);

module.exports = Course;
