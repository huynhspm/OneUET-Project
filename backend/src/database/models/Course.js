import { DataTypes } from "sequelize";
import sequelize from "../index.js";

import Class from "./Class.js";

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
			type: DataTypes.TEXT,
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
