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
			allowNull: false,
			unique: true,
			type: DataTypes.STRING,
		},
		name: {
			type: DataTypes.STRING,
		},
		academicLevel: {
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
