import { DataTypes } from "sequelize";
import sequelize from "../index.js";

import Course from "./Course.js";

const Document = sequelize.define(
	"Document",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		year: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		category: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		startVote: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		status: {
			type: DataTypes.STRING,
			defaultValue: "private",
		},
	},
	{
		tableName: "document",
	}
);

Document.belongsTo(Course);
Course.hasMany(Document);

export default Document;
