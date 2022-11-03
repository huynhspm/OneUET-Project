import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Teacher = sequelize.define(
	"Teacher",
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
		faculty: {
			type: DataTypes.TEXT,
		},
	},
	{
		tableName: "teacher",
	}
);

export default Teacher;
