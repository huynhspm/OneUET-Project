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

const fetch = require("cross-fetch");

const getData = async () => {
	const url = "https://b898-117-1-94-219.ap.ngrok.io/convert?path=C%3A%5CUsers%5Ca%5CDesktop%5Cctdl.pdf";
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
};
// getData();

const init = async () => {
	await sequelize.sync();
	console.log("Finish load database.");
	app.use(router);
	// await createData();
	console.log("Create data successfully");
};

init();

module.exports = app;

// token admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZUlkIjoxLCJpYXQiOjE2NzA0ODk2ODEsImV4cCI6MTY3MzA4MTY4MX0.rSseHQSrXVyf_PyY3WAIoU07AKavd3-XP-RIXgXRgr4
// token user: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoyLCJpYXQiOjE2NzA0ODk2NDgsImV4cCI6MTY3MzA4MTY0OH0.kKVgxO566QaVpvGbqtKBmr_I_Sl8RSlEk8Nhr-GWM74
