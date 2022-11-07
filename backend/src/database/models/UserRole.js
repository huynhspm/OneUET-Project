const { DataTypes } = require("sequelize");
const sequelize = require("..");

const User = require("./User");
const Role = require("./Role");

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

module.exports = UserRole;
