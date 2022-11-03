import { DataTypes } from "sequelize";
import sequelize from "../index.js";
import Teacher from "./Teacher.js";
import Class from "./Class.js";

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

export default TeacherClass;
