const { DataTypes } = require("sequelize");
const sequelize = require("..");

const User = require("./User");
const Role = require("./Role");

const UserRole = sequelize.define(
	"userRole",
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

User.belongsToMany(Role, { through: UserRole, uniqueKey: true });
Role.belongsToMany(User, { through: UserRole, uniqueKey: true });

module.exports = UserRole;
