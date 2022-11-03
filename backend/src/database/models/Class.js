import { DataTypes } from "sequelize";
import sequelize from "../index.js";

import Course from "./Course.js";

const Class = sequelize.define(
	"Class",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
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

export default Class;
