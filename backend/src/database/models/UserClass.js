const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Class = require("./Class");
const User = require("./User");

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

module.exports = UserClass;
