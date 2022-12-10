const { DataTypes } = require("sequelize");
const sequelize = require("../");

const User = require("./User");

const Club = sequelize.define(
	"club",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		fanpage: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "club",
	}
);

module.exports = Club;
