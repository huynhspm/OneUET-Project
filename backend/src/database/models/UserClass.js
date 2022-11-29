const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Class = require("./Class");
const User = require("./User");

const UserClass = sequelize.define(
	"userClass",
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
		tableName: "userClass",
	}
);

User.belongsToMany(Class, { through: UserClass, uniqueKey: true });
Class.belongsToMany(User, { through: UserClass, uniqueKey: true });

module.exports = UserClass;
