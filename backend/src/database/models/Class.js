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
			type: DataTypes.STRING,
		},
		semester: {
			type: DataTypes.STRING,
		},
		finish: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		group: {
			type: DataTypes.STRING,
		},
		quantity: {
			type: DataTypes.INTEGER,
		},
		section: {
			type: DataTypes.STRING,
		},
		classroom: {
			type: DataTypes.STRING,
		},
		dayOfWeek: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "class",
	}
);

Class.belongsTo(Course);
Course.hasMany(Class);

module.exports = Class;
