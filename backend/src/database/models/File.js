const { DataTypes } = require("sequelize");
const sequelize = require("../");

const File = sequelize.define(
	"file",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		link: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		type: {
			allowNull: false,
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "file",
	}
);

module.exports = File;
