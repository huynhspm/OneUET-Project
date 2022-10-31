import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Course = sequelize.define(
	"Course",
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
		code: {
			allowNull: false,
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "course",
	}
);

export default Course;
