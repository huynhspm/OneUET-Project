const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Teacher = sequelize.define(
	"teacher",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		email: {
			unique: true,
			type: DataTypes.STRING,
		},
		name: {
			type: DataTypes.STRING,
		},
		level: {
			type: DataTypes.STRING,
		},
		faculty: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "teacher",
	}
);

module.exports = Teacher;
