import { DataTypes, Model } from "sequelize";
import sequelize from "../index.js";

const User = sequelize.define(
	"User",
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
		password: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		role: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		name: {
			type: DataTypes.STRING,
		},
		avatar: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "user",
	}
);

export default User;
