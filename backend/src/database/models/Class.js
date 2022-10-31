import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Class = sequelize.define(
	"Class",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		id_course: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		id_user: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		id_teacher: {
			allowNull: false,
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

export default Class;
