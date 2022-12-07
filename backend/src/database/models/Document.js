const { DataTypes } = require("sequelize");
const sequelize = require("../");

const User = require("./User");
const File = require("./File");
const Course = require("./Course");
const Teacher = require("./Teacher");

const Document = sequelize.define(
	"document",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		year: {
			type: DataTypes.INTEGER,
		},
		category: {
			type: DataTypes.STRING,
		},
		star: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		status: {
			type: DataTypes.STRING,
			defaultValue: "private",
		},
		title: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		faculty: {
			type: DataTypes.STRING,
			defaultValue: "faculty"
		},
		major: {
			type: DataTypes.STRING,
			defaultValue: "major"
		}
	},
	{
		tableName: "document",
	}
);

Document.belongsTo(User);
User.hasMany(Document);

Document.belongsTo(File);
File.hasOne(Document);

Document.belongsTo(Course);
Course.hasMany(Document);

Document.belongsTo(Teacher);
Teacher.hasMany(Document);

module.exports = Document;
