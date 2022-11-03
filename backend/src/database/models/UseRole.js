import { DataTypes } from "sequelize";
import sequelize from "../index.js";

import User from "./User.js";
import Role from "./Role.js";

const UserRole = sequelize.define(
	"UserRole",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
	},
	{
		tableName: "user_role",
	}
);

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

export default UserRole;
