const { DataTypes } = require("sequelize");
const sequelize = require("../");
const Role = require("./Role");
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
			primaryKey: true,
			unique: true,
			type: DataTypes.STRING,
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		otherEmail: {
			unique: true,
			type: DataTypes.STRING,
		},
		birthday: {
			type: DataTypes.DATE,
		},
		gender: {
			type: DataTypes.STRING,
		},
		address: {
			type: DataTypes.STRING,
		},
		phone: {
			type: DataTypes.STRING,
		},
		avatar: {
			type: DataTypes.STRING,
		},
		program: {
			type: DataTypes.INTEGER,
		},
		academicYear: {
			type: DataTypes.INTEGER,
		},
		unit: {
			type: DataTypes.STRING,
		},
		major: {
			type: DataTypes.STRING,
		},
		unionJoint: {
			type: DataTypes.BOOLEAN,
		},
		partyJoint: {
			type: DataTypes.BOOLEAN,
		},
		unionPosition: {
			type: DataTypes.STRING,
		},
		associationPosition: {
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
		expiredTime: {
			type: DataTypes.DATE,
		},
	},
	{
		tableName: "user",
	}
);

User.belongsTo(Student);
Student.hasOne(User);

User.belongsTo(Role);
Role.hasMany(User);

module.exports = User;
