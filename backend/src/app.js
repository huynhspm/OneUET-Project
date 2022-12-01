const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./database");
const models = require("./database/models");
const router = require("./api");

const app = express();
var cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const createData = require("./utils/data");

const init = async () => {
	await sequelize.sync();
	console.log("Finish load database.");
	app.use(router);
	// await createData();
	console.log("Create data successfully");
};

init();

module.exports = app;
