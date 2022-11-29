const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const sequelize = require("../");

const RoleCode = require("../../utils/constant/RoleCode");

const User = sequelize.define(
	"user",
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
			type: DataTypes.STRING,
		},
		birthday: {
			type: DataTypes.DATE,
		},
		gender: {
			type: DataTypes.STRING,
		},
		class: {
			type: DataTypes.STRING,
		},
		avatar: {
			type: DataTypes.STRING,
		},
		history: {
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "user",
	}
);

User.beforeCreate(
	(user) => (user.password = bcrypt.hashSync(user.password, 10))
);

User.beforeBulkCreate((users) => {
	users.forEach((user) => (user.password = bcrypt.hashSync(user.password, 10)));
});

User.beforeUpdate((user) => {
	const hashedPassword = bcrypt.hashSync(user.password, 10);
	user.password = hashedPassword;
});

User.afterCreate(async (user) => {
	await user.addRole(RoleCode.User);
});

User.afterBulkCreate((users) => {
	users.forEach(async (user) => await user.addRole(RoleCode.User));
});

module.exports = User;
