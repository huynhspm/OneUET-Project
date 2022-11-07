const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Course = require("./Course");

const Class = sequelize.define(
	"Class",
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
		credit: {
			type: DataTypes.INTEGER,
		},
	},
	{
		tableName: "class",
	}
);

Class.belongsTo(Course);
Course.hasMany(Class);

module.exports = Class;
