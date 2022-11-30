const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Student = sequelize.define(
	"student",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		class: {
			type: DataTypes.STRING,
		},
		code: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "student",
	}
);

module.exports = Student;
