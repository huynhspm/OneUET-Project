const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Role = sequelize.define(
	"Role",
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
	},
	{
		tableName: "role",
	}
);

module.exports = Role;
