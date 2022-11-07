const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Document = require("./Document");

const File = sequelize.define(
	"File",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		link: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		type: {
			allowNull: false,
			type: DataTypes.STRING,
		},
	},
	{
		tableName: "file",
	}
);

Document.hasOne(File);
File.belongsTo(Document);

module.exports = File;
