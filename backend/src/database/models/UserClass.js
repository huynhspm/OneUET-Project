import { DataTypes } from "sequelize";
import sequelize from "../index.js";

import Class from "./Class.js";
import User from "./User.js";

const UserClass = sequelize.define(
	"UserClass",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		grade: {
			type: DataTypes.INTEGER,
		},
		finish: {
			type: DataTypes.BOOLEAN,
		},
	},
	{
		tableName: "user_class",
	}
);

User.belongsToMany(Class, { through: UserClass });
Class.belongsToMany(User, { through: UserClass });

export default UserClass;
