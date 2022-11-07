const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./database");
const models = require("./database/models");
const router = require("./api");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const init = async () => {
	await sequelize.sync();
	console.log("Finish load database.");
	app.use(router);

	// const admin = await models.Role.create({ name: "admin" });
	// const user = await models.Role.create({ name: "user" });
};

init();

module.exports = app;
