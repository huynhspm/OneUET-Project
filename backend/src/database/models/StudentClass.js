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
		midterm: {
			type: DataTypes.FLOAT,
		},
		final: {
			type: DataTypes.FLOAT,
		},
		total: {
			type: DataTypes.FLOAT,
		},
	},
	{
		tableName: "student_class",
	}
);

Student.belongsToMany(Class, { through: StudentClass, uniqueKey: true });
Class.belongsToMany(Student, { through: StudentClass, uniqueKey: true });

module.exports = StudentClass;
