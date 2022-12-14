const { DataTypes } = require("sequelize");
const sequelize = require("../");

const User = require("./User");
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
		name: {
			allowNull: false,
			type: DataTypes.STRING,
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
		description: {
			type: DataTypes.STRING,
		},
		unit: {
			type: DataTypes.STRING,
		},
		major: {
			type: DataTypes.STRING,
		},
		linkView: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		linkDownload: {
			allowNull: false,
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "document",
	}
);

Document.belongsTo(User);
User.hasMany(Document);

Document.belongsTo(Course);
Course.hasMany(Document);

Document.belongsTo(Teacher);
Teacher.hasMany(Document);

module.exports = Document;
