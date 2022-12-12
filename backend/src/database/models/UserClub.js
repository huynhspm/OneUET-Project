const { DataTypes } = require("sequelize");
const sequelize = require("../");

const Club = require("./Club");
const User = require("./User");

const UserClub = sequelize.define(
	"userClub",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		position: {
			type: DataTypes.STRING,
			defaultValue: "culi",
		},
	},
	{
		tableName: "user_club",
	}
);

User.belongsToMany(Club, { through: UserClub, uniqueKey: true });
Club.belongsToMany(User, { through: UserClub, uniqueKey: true });

module.exports = UserClub;
