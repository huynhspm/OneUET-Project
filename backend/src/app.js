import express from "express";

import * as dotenv from "dotenv";
dotenv.config();

import sequelize from "./database/index.js";
import "./database/models/index.js";
import router from "./api/index.js";

const app = express();

const init = async () => {
	await sequelize.sync();
	console.log("Finish load database.");
	app.use(router);
};

init();

export default app;
