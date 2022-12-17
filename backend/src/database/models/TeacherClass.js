const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Teacher = require("./Teacher");
const Class = require("./Class");

const TeacherClass = sequelize.define(
	"teacherClass",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
	},
	{
		tableName: "teacher_class",
	}
);

Teacher.belongsToMany(Class, { through: TeacherClass, uniqueKey: true });
Class.belongsToMany(Teacher, { through: TeacherClass, uniqueKey: true });

module.exports = TeacherClass;
