const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const sequelize = require("../");

const RoleCode = require("../../utils/constant/Role");

const User = sequelize.define(
	"User",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		email: {
			allowNull: false,

			unique: true,
			type: DataTypes.STRING,
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		name: {
			type: DataTypes.TEXT,
		},
		avatar: {
			type: DataTypes.STRING,
		},
		class: {
			type: DataTypes.STRING,
		},
		history: {
			type: DataTypes.TEXT,
		},
	},
	{
		tableName: "user",
	}
);

User.beforeCreate((user) => {
	const hashedPassword = bcrypt.hashSync(user.password, 10);
	user.password = hashedPassword;
});

User.beforeUpdate((user) => {
	const hashedPassword = bcrypt.hashSync(user.password, 10);
	user.password = hashedPassword;
});

User.afterCreate(async (user) => {
	await user.addRole(RoleCode.User);
});

module.exports = User;
