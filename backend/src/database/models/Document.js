import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Document = sequelize.define(
	"Document",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		id_file: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		id_course: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		id_upload: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		year: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		category: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
	},
	{
		tableName: "document",
	}
);

export default Document;
