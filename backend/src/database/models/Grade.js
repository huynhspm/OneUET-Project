const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Grade = sequelize.define(
	"grade",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		linkPDF: {
			type: DataTypes.STRING,
		},
		studentCode: {
			type: DataTypes.STRING,
		},
		midterm: {
			type: DataTypes.FLOAT,
		},
		final: {
			type: DataTypes.FLOAT,
		},
		total: {
			type: DataTypes.FLOAT,
		},
	},
	{
		tableName: "grade",
	}
);

module.exports = Grade;
