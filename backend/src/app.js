import express from "express";

import sequelize from "./database/index.js";
import "./database/models/index.js";

const app = express();

const init = async () => {
	await sequelize.sync();
	console.log("Finish load database.");

	
};

init();

export default app;
