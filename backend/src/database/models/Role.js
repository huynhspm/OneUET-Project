import { DataTypes } from "sequelize";
import sequelize from "../index.js";

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

export default Role;
