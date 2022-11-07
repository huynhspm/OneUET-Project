const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Teacher = require("./Teacher");
const Class = require("./Class");

const TeacherClass = sequelize.define(
	"TeacherClass",
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

Teacher.belongsToMany(Class, { through: TeacherClass });
Class.belongsToMany(Teacher, { through: TeacherClass });

module.exports = TeacherClass;
