const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const sequelize = require("../");

const RoleCode = require("../../utils/constant/RoleCode");
const Student = require("./Student");

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
		birthday: {
			type: DataTypes.DATE,
		},
		gender: {
			type: DataTypes.STRING,
		},
		avatar: {
			type: DataTypes.STRING,
		},
		history: {
			type: DataTypes.STRING,
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		otp: {
			type: DataTypes.INTEGER,
		},
	},
	{
		tableName: "user",
	}
);

User.belongsTo(Student);
Student.hasOne(User);

User.beforeCreate(
	(user) => (user.password = bcrypt.hashSync(user.password, 10))
);

User.beforeUpdate((user) => {
	const hashedPassword = bcrypt.hashSync(user.password, 10);
	user.password = hashedPassword;
});

User.afterCreate(async (user) => {
	await user.addRole(RoleCode.User);
	const student = await Student.findOne({
		where: { code: user.email.slice(0, 8) },
	});
	if (student) {
		await user.update({ studentId: student.id });
	}
});

module.exports = User;
