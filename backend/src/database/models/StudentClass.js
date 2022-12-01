const { DataTypes } = require("sequelize");
const sequelize = require("..");

const Class = require("./Class");
const Student = require("./Student");

const StudentClass = sequelize.define(
	"studentClass",
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
		tableName: "studentClass",
	}
);

Student.belongsToMany(Class, { through: StudentClass, uniqueKey: true });
Class.belongsToMany(Student, { through: StudentClass, uniqueKey: true });

module.exports = StudentClass;
