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

// token admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2OTAzLCJleHAiOjE2NzMwMjg5MDN9.P24YIktlAWfNTZwY-aulJJRnEBpX13RGu56VFHn5ApY
// token user: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkcyI6MiwiaWF0IjoxNjcwNDM2ODU2LCJleHAiOjE2NzMwMjg4NTZ9.2G84rwn7b1FcD60TAbxcljmTylOZJ4VXz2Y932g55bo
